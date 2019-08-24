const path = require('path');
const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/User');
const Travel = mongoose.model('Travel', require('../models/Travel'));
const router = require('express').Router();

const VERSION = require(path.resolve(__dirname, '../package.json')).version;

router.get('/status', (req, res, next) => {
    if (req.isAuthenticated()) {
        if (!req.user.isUser) return next(new Error("Vendor can't request on user"));
        res.json({ user: req.user, message: `Travel Cash v${VERSION}`, authentication: true })
    }
    else res.json({ authentication: false })
})

router.post('/register', (req, res, next) => {
    User.register(new User({username: req.body.username, name: req.body.name[0].toUpperCase() + req.body.name.slice(1), age: req.body.age, gender: req.body.gender}), req.body.password, (err) => {
        if (err) return next(err);
    })
    process.log.info(`New User ${req.body.name}("${req.body.username}") added 🎉`)
    res.json({ success: true})
});

router.post('/login', passport.authenticate('local', {session: true}), function(req, res, next) {
    if (!req.user.isUser) return next(new Error("Vendor can't request on user"));
    res.json({ success: true})
});

router.get('/logout', function(req, res, next) {
    if (!req.user.isUser) return next(new Error("Vendor can't request on user"));
    req.logout();
    res.json({ success: true});
});

router.post('/travel', (req, res, next) => {
    if (!req.isAuthenticated() || !req.user.isUser) return next(new Error("Invaild Access"));
    
    newTravel = new Travel({
        start: req.body.start,
        end: req.body.end,
        distance: req.body.distance,
        cash: req.body.cash,
    })

    req.user.isTravelling = true;
    
    User.findOne({username: req.user.username}, (err, user) => {
        if (err) return next(new Error("Cannot update user"));
        user.isTravelling = true;
        user.history.unshift(newTravel);
        user.save();
    })
    
    req.json({success: true});
});

router.get('/endtravel', (req, res, next) => {
    if (!req.isAuthenticated() || !req.user.isUser || !req.user.isTravelling) return next(new Error("Invalid Access _"));

    User.findOne({usename: req.user.username}, (err, user) => {
        if (err) return next(new Error("Cannot update user _"));
        user.isTravelling = false;
        let cash = 0;
        user.history.reduce((p, c) => {
            cash += !c.cash ? 0 : c.cash;
        });
        user.cash = cash;
        user.save();
    })
    req.user.isTravelling = false;
    req.json({success: true});
});

module.exports = router;