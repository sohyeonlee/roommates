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
		Bill.find(function (err, brownies) {
			if (err) return console.error(err);
			res.send(brownies);
		}
		// res.sendfile('views/index.html');
	});
}
}
