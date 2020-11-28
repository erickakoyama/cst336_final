const express = require('express');
const session = require('express-session');
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const User = require('./models/User.js');

require('dotenv').config(); // process.env variables

const saltRounds = 10; // for bcrypt

const app = express();
app.use(express.urlencoded({ extended: true })); // Parsing POST params
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(session({
  secret: 'top secret!',
  resave: true,
  saveUninitialized: true
}));

// routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async(req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  let result = await User.checkUsername(username);
  const hashedPassword = result.length ? result[0].password : '';

  const passwordMatch = await bcrypt.compare(password, hashedPassword);

  if (passwordMatch) {
    res.redirect('/'); // Go back to home page
  }
  else {
    res.render('login', { loginError: true })
  }
});

// starting server
app.listen(process.env.PORT, process.env.IP, () => {
  console.log('Express server is running...');
});
