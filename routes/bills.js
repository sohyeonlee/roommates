var dbConfig = require('../db');
var mongoose = require('mongoose');
// Connect to DB
var Bill = mongoose.model('Bill', require('../models/bill'));  

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
<<<<<<< HEAD
		}
		Bill.find(function (err, brownies) {
			if (err) return console.error(err);
			res.send(brownies);
		}
		// res.sendfile('views/index.html');
=======
		} 
		// Find all bills.
		Bill.find(function(err, brownies) {
		  if (err) return console.error(err);
		  res.send(brownies);
		});
>>>>>>> f9fa8671fd967ceb0f7dbdb922418ff98da65ead
	});
}	
}
