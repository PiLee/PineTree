var mongoose = require('mongoose');
var Post = mongoose.model('Post');


module.exports={
	create: function(req, res, next){
		var info=req.body;
		console.log(info);
		var post=new Post(info);
		post.save(function (err){
			if(err) return next(err);
			res.json(info);
		})
	},
	list: function(req, res, next){
		//var pageSize = pageSize || 10;
    	//var pageStart = pageStart || 1;
		Post
		.find({}/*,{content:0}*/)
		//.skip((pageStart-1)*pageSize)
		//.limit(pageSize)
		.exec(function(err,docs){
			if(err) return next(err);
			if(docs){
				res.json(docs);
			}
		});
	},

	get: function(req, res, next){
		Post
		.findOne({_id: req.params.articleId})
		.exec(function(err, doc){
			if(err) return next(err);
			res.json(doc);
		});
	  },
	remove: function(id,callback){
		if(!id) callback(err);
		Post
		.findOne({_id: id})
		.remove(function(err, doc){
			if(err) return callback(err);
			callback(null,doc);
		});
	  },
	update: function(id,info,callback){
		if(!id) callback(err);
		Post
		.update({_id: id},{$set: {key:info.key,category:info.category,title:info.title,content:info.content}},function(err, doc){
			if(err) return callback(err);
			callback(null,doc);
		});
	  }
}