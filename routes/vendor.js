const path = require('path');
const passport = require('passport');
const Vendor = require('../models/Vendor');
const router = require('express').Router();

router.get('/status', (req, res) => {
    if (req.isAuthenticated()) res.json({vendor: req.user, authentication: true});
    else res.json({authentication: false});
});

router.post('/register', (req, res) => {
    Vendor.register(new Vendor({username: req.body.username, name: req.body.name, address: req.body.address, owner: req.body.owner, type: req.body.type }),req.body.password, (err) => {
         if(err) return next(err);
    });
});

router.post('/login', passport.authenticate('local' , {session: true}), function(req, res) {
    res.json({success: true});
});

router.post('/logout', function(req, res){
    req.logout();
    res.json({success: true});
});

module.exports = router;