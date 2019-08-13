const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const mongoose = require('mongoose')
const passport = require('passport')
const { Strategy } = require('passport-local');
const Logger = require('webpack-log');

const app = express();
process.log = Logger({ name: "server" })
// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({ secret: "DTU is full of monkeys", resave: false, saveUninitialized: true,}))
app.use(passport.initialize());
app.use(passport.session());

// Authentication
const User = require('./models/User');
passport.use(new Strategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// MongoDB connection
mongoose.connect('mongodb://rishabh:3hulkbusters@ds159574.mlab.com:59574/travel-cash', { useNewUrlParser: true }, (err) => {
    if (err) process.stdout.write(err);
});
mongoose.set('useCreateIndex', true);

// Register routes
app.use('/', require('./routes'))

// Error Handler Routes
app.use((req, res, next) => {
    const error = new Error('Requested Route is not found');
    error.status = 404;
    next(error);
});
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    if (app.get('env') == 'development') res.json({ error: err, message: err.message })
    else res.json({ error: {}, message: err.message});
})

app.listen('3300', () => {
    process.log.info('Listening at http://localhost:3300/');
})