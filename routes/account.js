const express = require('express');
const passport = require('passport');
const { check, validationResult } = require('express-validator/check');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login', { token: req.csrfToken() })
});

router.post('/login', passport.authenticate('login', {
        successRedirect : '/admin',
        failureRedirect : '/login'
    })
);

router.get('/signup', (req, res) => {
    res.render('signup', { token: req.csrfToken() })
});

router.post('/signup', [
    check('email').isEmail()
    ], passport.authenticate('login', {
        successRedirect : '/admin',
        failureRedirect : '/signup'
    })
);

router.get('/logout', function(req,res){
    req.logout();
    res.redirect('/login');
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    else { res.redirect('/login'); }
}

module.exports = router;