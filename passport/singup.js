const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const { category, product, user } = require('../models');

function singup(passport){
	passport.use('signup', new LocalStrategy({
			usernameField : 'email',
			passwordField : 'password',
			passReqToCallback : true
		}, async (req, email, password, done) => {

	    let costumer = await user.findOne({ email: email });
	    if (costumer) { return done(null, false); } 
	    else {
	    	user.create({
				email: req.body.email,
				password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
				authorization: req.body.authorization ? true : false
			})
			return done(null, costumer);
	    }
	}));
}

module.exports = singup;