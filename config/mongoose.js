var mongoose = require('mongoose');
var config = require('./config');

module.exports=function(){
	var db=mongoose.connect(config.mongodb);
	var Schema = mongoose.Schema;
	require("../app/models/user.server.model.js");
	require("../app/models/post.server.model.js");
	require("../app/models/category.server.model.js");
}
