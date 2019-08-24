const path = require('path');
const passport = require('passport');
const User = require('../models/User');
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
    User.register(new User({username: req.body.username, name: req.body.name, age: req.body.age, gender: req.body.gender}), req.body.password, (err) => {
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

module.exports = router;