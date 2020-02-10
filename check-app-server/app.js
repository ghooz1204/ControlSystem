var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose = require('mongoose');

var app = express();



// CONNECT TO MONGO DB SERVER
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
  // CONNECTED TO MONGO DB SERVER
  console.log("Connected to mongo server");
});

mongoose.connect('mongodb://localhost/control_system', {useNewUrlParser: true});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// app.use(cors());
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Model
var User = require('./models/user');
var Schedule = require('./models/schedule');
var Journal = require('./models/journal');
var userRouter = require('./routes/user')(app, User);
var scheduleRouter = require('./routes/schedule')(app, Schedule);
var journalRouter = require('./routes/journal')(app, Journal);

app.get('/', function(req, res) {
  res.render('index');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
