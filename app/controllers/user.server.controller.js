var mongoose = require('mongoose');
var User = mongoose.model('User');
var crypto=require('crypto');

module.exports={
	//创建用户
	create:function(info,callback){
		var md5 = crypto.createHash('md5'),
      	password = md5.update(info.password).digest('hex');
      	info.password=password;
		var user = new User(info);
		var condition={
			username: info.username
		}
		User.findOne(condition, function (err, doc) {
		    if (err) {
		      return callback(err);
		    }
		    if(doc){
		    	callback(null, doc);
		    }else{
		    	user.save(function (err){
					if(err) return callback(err);
					callback();
				});
		    } 
		});
	},
	//获取用户
	getUser:function(username,callback){
		User.findOne({username: username}, function (err, doc) {
		    if (err) {
		      return callback(err);
		    }
		    callback(null, doc);
		});
	},
	//获取用户
	getUserById:function(uid,callback){
		User.findOne({_id: uid}, function (err, doc) {
		    if (err) {
		      return callback(err);
		    }
		    callback(null, doc);
		});
	},
	getAllUser:function(callback){
		User.find({},function(err,docs){
			if(err) callback(err);

			callback(null,docs)
		})

	},
	remove:function(uid,callback){
		User.remove({
			_id:uid
		},function(err,doc){
			if(err) callback(err);

			callback(null,doc)
		});
	},
	update:function(uid,info,callback) {
	  var conditions = {
	      _id:uid
	  },
	  update = {
	    $set: {
	      username:info.username
	    }
	  };
	  User.update(conditions,update,null, function (err, doc) {
	    if (err) {
	      return callback(err);
	    }
	    callback(null, doc);
	  });
	}
}