const express = require('express');
const passport = require('passport');
const { check, validationResult } = require('express-validator/check');
const router = express.Router();

router.get('/login', isAuthenticated, (req, res) => {
    res.render('login', { token: req.csrfToken() })
});

router.post('/login', passport.authenticate('login', {
        successRedirect : '/admin',
        failureRedirect : '/login'
    })
);

router.get('/signup', isAuthenticated, (req, res) => {
    res.render('signup', { token: req.csrfToken() })
});

router.post('/signup', [
    check('email').isEmail()
    ], passport.authenticate('signup', {
        successRedirect : '/admin',
        failureRedirect : '/signup'
    })
);

router.get('/logout', function(req,res){
    req.logout();
    req.session.destroy();
    res.redirect('/login');
});

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) { res.redirect('/admin'); } 
    else { return next(); }
}

module.exports = router;