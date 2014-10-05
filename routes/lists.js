var List = require('../models/list');
var mongoose = require('mongoose');

module.exports = {
	add: function(req, res, next) {
		var newList = new List();
		newList.username = req.body.username;
		newList.content = req.body.content;
		newList.save(function(err) {
		if (err) {
			console.log('Error in saving bill: '+err);
			throw err;
		}
		res.send(newList);
	});
}
}
