const express = require('express');
const passport = require('passport');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcrypt-nodejs');
const { category, product, user } = require('../models');
const router = express.Router();

router.get('/login', (req, res) => {
	res.render('login', { token: req.csrfToken() })
});

router.post('/login', [
		check('email').isEmail()
	], passport.authenticate('login', {
    	successRedirect : '/admin',
    	failureRedirect : '/account/login',
 }));

router.get('/signup', (req, res) => {
	res.render('signup', { token: req.csrfToken() })
});

router.post('/signup', [
	check('email').isEmail()
	], (req, res) => {

	const errors = validationResult(req);

	if(!errors){
		user.create({
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
			authorization: req.body.authorization ? true : false
		})
	}

	res.redirect('/account/login');
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/account/login');
}

module.exports = router;