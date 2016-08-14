var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
	key:String,
	catname:String
});

var Category = mongoose.model('Category',CategorySchema);
