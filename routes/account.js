const express = require('express');
const models = require('../models');
const { check, validationResult } = require('express-validator/check');
const router = express.Router();

router.get('/login', (req, res) => {
	res.render('login', { token: req.csrfToken() })
});

router.post('/login', (req, res) => {
	res.redirect('/admin');
});

router.get('/signup', (req, res) => {
	res.render('signup', { token: req.csrfToken() })
});

router.post('/signup', [
	check('email').isEmail(),
	], (req, res) => {

	const errors = validationResult(req);

	if(!errors){
		models.user.create({
			email: req.body.email,
			password: req.body.password,
			authorization: req.body.authorization ? true : false
		})
	}

	res.redirect('/account/login');
});

module.exports = router;