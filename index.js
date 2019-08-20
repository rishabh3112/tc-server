const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoSession = require('connect-mongo')(session);
const mongoose = require('mongoose')
const passport = require('passport')
const { Strategy } = require('passport-local');
const Logger = require('webpack-log');
const cors = require('cors')

const app = express();
process.log = Logger({ name: "server" })

// MongoDB connection
mongoose.connect('mongodb://rishabh:3hulkbusters@ds159574.mlab.com:59574/travel-cash', { useNewUrlParser: true }, (err) => {
    if (err) process.log.error(err);
});
mongoose.set('useCreateIndex', true);


// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
    res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
    next();
});
app.use(session({
    secret: "DTU is full of monkeys",
    store: new MongoSession({ mongooseConnection: mongoose.connection }),
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(passport.initialize());
app.use(passport.session());

// Authentication
const User = require('./models/User');
passport.use(new Strategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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

const port = process.env.PORT || 8080

app.listen(port, () => {
    process.log.info(`Listening at http://localhost:${port}/`);
})