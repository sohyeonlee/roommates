var mongoose = require('mongoose');
var User = require('./user');

var listSchema = new mongoose.Schema({
	username: String,
	content: String,
    date: { type: Date, default: Date.now }
});

module.exports = listSchema;