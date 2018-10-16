const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const { category, product, user } = require('../models');

function init(passport){
	passport.serializeUser(function(user, done) {
	  done(null, user.email);
	});
 
	passport.deserializeUser(function(id, done) {
	  user.findById(id, function (err, user) {
	    done(err, user);
	  });
	});

	singup(passport);
	login(passport);
}

function singup(passport){
	passport.use('signup', new localStrategy({
			usernameField : 'email',
			passwordField : 'password',
			passReqToCallback : true
		}, async (req, email, password, done) => {

	    let costumer = await user.findOne({ where: {email: email} });

	    if (costumer) { return done(null, false); } 
	    else {
	    	user.create({
				email: email,
				password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
				authorization: req.body.authorization ? true : false
			})
			return done(null, costumer);
	    }
	}));
}

function login(passport){
	passport.use('login', new localStrategy({
			usernameField : 'email',
			passwordField : 'password',
			passReqToCallback : true
		}, async (req, email, password, done) => {

	    let costumer = await user.findOne({ where: {email: email} });

	    if (!costumer) { return done(null, false); } 
	    if (!bcrypt.compareSync(password, costumer.password)) { 
	    	return done(null, false); 
	    }
	    
		return done(null, costumer);
	}));
}

module.exports = init