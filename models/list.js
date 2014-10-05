var mongoose = require('mongoose');
var User = require('./user');
var db = mongoose.connection;

module.exports = db.model('List', {
		username: String,//who posted
		content: String,
	    date: { type: Date, default: Date.now }
})