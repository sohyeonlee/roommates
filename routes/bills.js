var dbConfig = require('../db');
var mongoose = require('mongoose');
// Connect to DB
var Bill = require('../models/bill');

module.exports = {
	list: function(req, res, next) {
		var newBill = new Bill();
		newBill.username = req.body.username;
		newBill.name = req.body.name;
		newBill.amount = req.body.amount;
		newBill.type = req.body.type;
		newBill.save(function(err) {
		if (err) {
			console.log('Error in saving bill: '+err);
			throw err
		}
		res.send(newBill);
	});
}
}
