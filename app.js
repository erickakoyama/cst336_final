const express = require('express');
const session = require('express-session');
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const User = require('./models/User.js');
const middlewares = require('./routeMiddleware.js');

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
  res.render('customerProfile');
});

app.get('/service/new', [...commonUIMiddlewares, middlewares.auth], (req, res) => {
  res.render('scheduleService');
});

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

// starting server
app.listen(process.env.PORT, process.env.IP, () => {
  console.log('Express server is running...');
});
