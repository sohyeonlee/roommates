var mongoose = require('mongoose');
var User = require('./user');

var billSchema = new mongoose.Schema({
	username: String,
	name: String, //what for
	amount: String,
	type: String,
    date: { type: Date, default: Date.now }
});

module.exports = billSchema;