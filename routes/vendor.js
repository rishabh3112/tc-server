const path = require('path');
const passport = require('passport');
const Vendor = require('../models/User');
const router = require('express').Router();

router.get('/status', (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.isUser) return next(new Error("User can't access vendor"));
        res.json({vendor: req.user, authentication: true});
    }
    else res.json({authentication: false});
});

router.post('/register', (req, res, next) => {
    Vendor.register(new Vendor({username: req.body.username, name: req.body.name, address: req.body.address, owner: req.body.owner, type: req.body.type, isUser: false }),req.body.password, (err) => {
         if(err) return next(err);
    });
    res.json({success: true});
});

router.post('/login', passport.authenticate('local' , {session: true}), function(req, res, next) {
    if (req.user.isUser) return next(new Error("User can't login at vendor"))
    res.json({success: true});
});

router.post('/logout', function(req, res, next){
    if (req.user.isUser) return next(new Error("User can't logout at vendor"))
    req.logout();
    res.json({success: true});
});

module.exports = router;