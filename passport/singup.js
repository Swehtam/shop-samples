const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const models = require('../models');

function singup(passport){
	passport.use('signup', new localStrategy({
			usernameField : 'email',
			passwordField : 'password',
			passReqToCallback : true
		}, async (req, email, password, done) => {
	    	let user = await models.user.findById(email);

		    if (user) { 
		    	return done(null, false); 
		    } else {
		    	user = await models.user.create({
					email: email,
					password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
					authorization: req.body.authorization ? true : false
				})
				return done(null, user);
		    }
		})
	);
}

module.exports = singup;