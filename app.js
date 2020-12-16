const express = require('express');
const session = require('express-session');
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');
const mysql = require('mysql'); // is this needed if we already include it in the dbPool.js, and use pool here?
const Pets = require('./models/Pets.js');
const User = require('./models/User.js');
const Services = require('./models/Services.js');
const middlewares = require('./routeMiddleware.js');
const pool = require('./dbPool.js');
var bodyParser = require('body-parser');

require('dotenv').config(); // process.env variables

// All UI routes will use these variables
const commonUIMiddlewares = [middlewares.appLocals];

const saltRounds = 10; // for bcrypt

const app = express();
// Parsing POST params
app.use(bodyParser.urlencoded({ extended: true })); // Parsing POST params
// parse application/json
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));


// Home Page
app.get('/', commonUIMiddlewares, async(req, res) => {
  const pets = await Pets.getAllPets();
  res.render('index', { pets });


});

// Login Page
app.get('/login', commonUIMiddlewares, (req, res) => {
  res.render('login', { loginError: req.query.loginError });
});

// Customer Profile Page
app.get('/customer/:id', [...commonUIMiddlewares, middlewares.auth], async(req, res) => {
  const customerWithPets = await User.getCustomerProfileById(req.params.id);
  res.render('customerProfile', { customer: customerWithPets });
});

// Schedule Service Page
app.get('/service/new', [...commonUIMiddlewares, middlewares.auth], async(req, res) => {
  // get services
  const services = await Services.getServices();
  // get pets owned by customer
  const { customerId } = res.locals; // From middleware
  const pets = await User.getPetsByCustomerId(customerId);
  res.render("scheduleService", { customerId, customerPets: pets, services });
}); // /services/new:id

app.post('/login', async(req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const [user] = await User.getByUsername(username);
  const hashedPassword = user ? user.password : '';

  const passwordMatch = await bcrypt.compare(password, hashedPassword);

  if (passwordMatch) {
    req.session.authenticated = true;
    req.session.customerId = user.customer_id;
    res.redirect('/'); // Go back to home page
  }
  else {
    res.redirect('login?loginError=true');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// updates and returns customer (no pet info)
app.put("/api/updateProfile", commonUIMiddlewares, function(req, res) {
  let custQuery = "UPDATE customers SET first_name = ?, last_name = ?, email = ?, phone = ?, address_1 = ?, address_2 = ?, city = ?, state = ?, zip = ? WHERE customer_id = ?";
  let custParam = [req.body.fn, req.body.ln, req.body.email, req.body.phone, req.body.addr1, req.body.addr2, req.body.city, req.body.state, req.body.zip, res.locals.customerId];

  // returns updated customer
  pool.query(custQuery, custParam, function(err, rows, fields) {
    if (err) throw err;
    res.send(rows);
  });

}); // api/updateProfile

// schedules selected pet for selected service
app.post("/api/scheduleService", function(req, res) {
  const sqlQuery = "INSERT INTO schedule (date, service_id, pet_id) VALUES (?,?,?)";
  const sqlParams = [req.body.date, req.body.serviceId, req.body.petId];
  pool.query(sqlQuery, sqlParams, function(err, rows, fields) {
    if (err) throw err;
    res.redirect("/"); // returns true if success, show success image / text
  });
}); // api/scheduleService

// checks in a pet based on id
app.put("/api/checkin", function(req, res) {
  let sqlQuery = "UPDATE pets SET checked_in = ? WHERE pet_id = ?";
  let sqlParams = [req.body.action, req.body.petId];
  pool.query(sqlQuery, sqlParams, function(err, rows, fields) {
    if (err) throw err;
    res.send(rows); // checkin status
  });
}); // api/checkin

// starting server
app.listen(process.env.PORT, process.env.IP, () => {
  console.log('Express server is running...');
});
