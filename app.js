var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// load docwd configuration file, check for config.json first, if not use config.default.json
var docwdConfig = require('./config.default.json');
var pg = require('pg');

// console.log(docwdConfig['database']['host']); // test that this is read properly
const { Pool,  Client } = require('pg');
const dbuser = docwdConfig['database']['user'];
const dbpassword = docwdConfig['database']['password'];
const dbhost = docwdConfig['database']['host'];
const dbport = docwdConfig['database']['port'];
const dbname = 'docwd';

// const connectionString = 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'
const connectionString = 'postgresql://' + dbuser + ':' + dbpassword + '@' + dbhost + ':' + dbport + '/' + dbname;

//const pgpool = new Pool({
//  connectionString: connectionString,
// });

const pgclient = new Client({
  connectionString: connectionString,
});

// to connect simply do pgclient.connect();

module.exports = app;
