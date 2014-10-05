var mongoose = require('mongoose');
var db = mongoose.connection;

module.exports = db.model('User', {
		username: String,
	    password: String,
	    email: String,
	    firstName: String,
		lastName: String
})