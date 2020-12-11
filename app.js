const express = require('express');
const session = require('express-session');
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');
const mysql = require('mysql'); // is this needed if we already include it in the dbPool.js, and use pool here?
const User = require('./models/User.js');
const middlewares = require('./routeMiddleware.js');
const pool = require('./dbPool.js');

require('dotenv').config(); // process.env variables

// All UI routes will use these variables
const commonUIMiddlewares = [middlewares.appLocals];

const saltRounds = 10; // for bcrypt

const app = express();
app.use(express.urlencoded({ extended: true })); // Parsing POST params
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));


// routes
app.get('/', ...commonUIMiddlewares, (req, res) => {
  res.render('index');
});

app.get('/login', ...commonUIMiddlewares, (req, res) => {
  res.render('login');
});

app.get('/customer/:id', [...commonUIMiddlewares, middlewares.auth], (req, res) => {
  let custQuery = "select * from customers join pets on customers.customer_id where customers.customer_id = ?";
  let custParams = [req.params.id];
  pool.query(custQuery, custParams, function(err, rows, fields){
    if(err) throw err;
    console.log(err);
    res.render('customerProfile', {"rows":rows});
  });
});

app.get('/service/new:id', [...commonUIMiddlewares, middlewares.auth], (req, res) => {
   // get pets
  let petQuery = "select * from pets, services where pets.customer_id = ?";
  let petParams = [req.params.id];
  pool.query(petQuery, petParams, async function(err, rows, fields){
    if(err) throw(err);
    console.log(rows);
    res.render("scheduleService", {"rows":rows});
  });
});// /services/new:id

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
    res.render('login', { loginError: true })
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// updates and returns customer (no pet info)
app.put("/api/updateProfile", function (req, res){
  let custQuery = "UPDATE customers WHERE customer_id = SET first_name = ?, last_name = ?, email = ?, phone = ?, address_1 = ?, address_2 = ?, city = ?, sate = ?, zip = ?";
  let custParam = [req.query.customerId, req.query.fn, req.query.ln, req.query.email, req.query.phone, req.query.addr1, req.query.addr2, req.query.city, req.query.state, req.query.zip];
  
  // returns updated customer
  pool.query(custQuery, custParam, function (err, rows, fields){
    if(err) throw err;
    console.log(rows);
    res.send(rows);
  });  
  
});// api/updateProfile

// schedules selected pet for selected service
app.post("/api/scheduleService", function(req, res){
  let sqlQuery = "INSERT INTO schedule VALUES (?,?,?)";
  let sqlParams = [req.query.date, req.query.serviceId, req.query.petId];
  
  pool.query(sqlQuery, sqlParams, function(err, rows, fields){
    if(err) throw err;
    console.log(rows);
    res.send(true); // returns true if success, show success image / text
  });
});// api/scheduleService

// checks in a pet based on id
app.put("/api/checkin/:action/:petId", function(req, res){
  let sqlQuery;
  let sqlParams;
  let status = req.params.action?1:0;
  switch(status){
    case 0:
            sqlQuery = "UPDATE pets SET checked_in = ? WHERE pet_id = ?";
            sqlParams = [status, req.params.petId];
            break;
    case 1:
            sqlQuery = "UPDATE pets SET checked_in = ? WHERE pet_id = ?";
            sqlParams = [status, req.params.petId];
            break;
  }
  
  pool.query(sqlQuery, sqlParams, function(err, rows, fields){
    if(err) throw err;
    console.log(rows)
    res.send(status); // checkin status
  });
  
});// api/checkin


// starting server
app.listen(process.env.PORT, process.env.IP, () => {
  console.log('Express server is running...');
});
