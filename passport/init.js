const models = require('../models');
const login = require('./login');
const singup = require('./singup');

function init(passport){
	passport.serializeUser(function(user, done) {
	  	done(null, user.email);
	});
 
	passport.deserializeUser(function(email, done) {
		models.user.findById(email).then(user => {
			done(null, user);
		});
	});

	singup(passport);
	login(passport);
}

module.exports = init