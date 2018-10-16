const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const { category, product, user } = require('../models');

function login(passport){
	passport.use('login', new LocalStrategy({
			usernameField : 'email',
			passwordField : 'password',
			passReqToCallback : true
		}, async (req, email, password, done) => {

	    let costumer = await user.findOne({ email: email });

	    if (!costumer) { return done(null, false); } 
	    if (!bCrypt.compareSync(password, user.password)) { 
	    	return done(null, false); 
	    }
	    
		return done(null, costumer);
	}));
}

module.exports = login;