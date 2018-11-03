const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const { category, product, user } = require('../models');

function login(passport){
	passport.use('login', new localStrategy({
			usernameField : 'email',
			passwordField : 'password',
			passReqToCallback : true
		}, async (req, email, password, done) => {
		    let costumer = await user.findById(email);
		    
		    if (!costumer || !bcrypt.compareSync(password, costumer.password)) { 
		    	return done(null, false); 
		    } 
			return done(null, costumer);
		})
	);
}

module.exports = login;