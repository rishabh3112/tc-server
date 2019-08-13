const passport = require('passport');
const User = require('./models/User');
const router = require('express').Router();

const VERSION = require(path.resolve(__dirname, '../package.json')).version;

router.get('/status', (req, res) => {
    res.json({ authentication: false })
})

router.get('/status', passport.authenticate('local'), (req, res) => {
    res.json({ user: req.user.name, message: `Travel Cash v${VERSION}`, authentication: true })
})

router.post('/register', (req, res, next) => {
    User.register(new User({username: req.body.username, name: req.body.name}), req.body.password, (err) => {
        if (err) return next(err);
    })
    res.json({ success: true})
})

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.json({ success: true})
});

router.get('/logout', function(req, res) {
    req.logout();
    res.json({ success: true});
});