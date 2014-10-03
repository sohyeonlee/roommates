var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport) {
	passport.use('signup', new LocalStrategy({
		passReqToCallback : true
	}, function(req, username, password, done) {
		findOrCreateUser = function() {
			//find a user in mongo
			User.findOne({'username' : username}, function(err, user) {
				if (err){
					console.log('Error in signup: '+err);
					return done(err);
				}
				//already exists
				if (user) {
					console.log('User already exists with username: '+username);
					return done(null, false, req.flash('message', 'User Already Exists'));
				} else {
					//if no user with that email
					//create user
					var newUser = new User();
					//set credentials
					newUser.username = username;
					newUser.password = createHash(password);
					newUser.email = req.param('email');
					newUser.firstName = req.param('firstName');
					newUser.lastName = req.param('lastName');
					
					//save the user
					newUser.save(function(err) {
						if (err) {
							console.log('Error in Saving user: '+err);
							throw err;
						}
						console.log('User registered successfully');
						return done(null, newUser);
					});
				}
			});
		};
		process.nextTick(findOrCreateUser);
	}));
	
	var createHash = function(password) {
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	}
}