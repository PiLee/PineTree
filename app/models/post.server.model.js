var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	title:String,
	content:String,
	tag:String,
	category:String,
	author:String,
	createTime: {type: Date, default: Date.now},
	pv:0
});

var Post = mongoose.model('Post', PostSchema);