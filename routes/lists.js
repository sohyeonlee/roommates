var mongoose = require('mongoose');
// Connect to DB
var List = mongoose.model('List', require('../models/list'));  

module.exports = {
	add: function(req, res, next) {
		var newList = new List();
		newList.username = req.body.username;
		newList.content = req.body.content;
		newList.save(function(err) {
		if (err) {
			console.log('Error in saving bill: '+err);
			throw err
		} 
		// Find all movies.
		List.find(function(err, brownies) {
		  if (err) return console.error(err);
		  var result = " ";
		  for(var i=0; i<brownies.length; i++) {
			  var obj = brownies[i];
			  result += obj.username + ' ' + obj.content; //think later
		  }
		  res.send(result)
		});
	});
}	
}
