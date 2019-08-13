const path = require('path');
const passport = require('passport');
const User = require('../models/User');
const router = require('express').Router();

const VERSION = require(path.resolve(__dirname, '../package.json')).version;

router.get('/status', (req, res) => {
    if (req.isAuthenticated()) res.json({ user: req.user.name, message: `Travel Cash v${VERSION}`, authentication: true })
    else res.json({ authentication: false })
})

router.post('/register', (req, res, next) => {
    User.register(new User({username: req.body.username, name: req.body.name}), req.body.password, (err) => {
        if (err) return next(err);
    })
    process.log.info(`New User ${req.body.name}("${req.body.username}") added 🎉`)
    res.json({ success: true})
})

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.json({ success: true})
});

router.get('/logout', function(req, res) {
    req.logout();
    res.json({ success: true});
});

module.exports = router;