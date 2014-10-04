var mongoose = require('mongoose');
var User = require('./user');

module.exports = mongoose.model('Bill', {
		username: String,
		name: String, //what for
		amount: String,
		type: String,
	    date: { type: Date, default: Date.now }
})