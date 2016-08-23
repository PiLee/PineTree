var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var multiparty = require('connect-multiparty');
var config=require('./config/config');
var mongodb=require('./config/mongoose');
var router = express.Router();
var _ = require("lodash");

var app = express();

//Connect Mongodb
var db=mongodb();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade',{ pretty: true });

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:'12345',
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}//30 days
}));
app.use(flash());


app.use(function(req, res, next){  
  var error = req.flash('error'); 
  var success = req.flash('success');  
  res.locals.user = req.session.user;  
  res.locals.error = error.length?error:null;
  res.locals.success = success.length?success:null;
  res.locals.session = req.session; 
  next();  
});  

// 跨域支持
app.all('/api/*', function(req, res, next) {
  var origin = req.headers.origin;
  if (config.whiteOrigins.indexOf(origin) !== -1) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  }
});

require('./app/routes/index.server.routes')(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.render('404', {
        message: err.message,
        error: err
    });
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
