var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport) {
	passport.use('login', new LocalStrategy({
		passReqToCallback : true
	},
	function(req, username, password, done) {
		//check in mongo if username exists or not
		User.findOne({'username' : username },
		function(err, user) {
			if (err)
				return done(err);
				if (!user){
					console.log('User Not Found with username '+username);
					return done(null, false, req.flash('message', 'User not found.'));
				}
				if (!isValidPassword(user, password)) {
					console.log('Invalid Password');
					//redirect to login page
					return done(null, false, req.flash('message', 'Invalid Password'));
				}
				//if both match
				return done(null, user);
		});
	}));
	
	var isValidPassword = function(user, password) {
		return bCrypt.compareSync(password, user.password);
	}
}