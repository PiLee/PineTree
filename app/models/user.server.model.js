var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  name:String,
  email:String,
  isAdmin: {type: Boolean, default: false},
  createTime: {type: Date, default: Date.now}
});

var User = mongoose.model('User', UserSchema);