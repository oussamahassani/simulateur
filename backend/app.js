var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const history = require('connect-history-api-fallback');


var indexRouter = require('./routes/index');
var iotRouter = require('./routes/iot');
var userRoute = require('./routes/user')
var mqttHandler = require('./conn/mqtt-device');
var coapHandler = require('./conn/coap-device');
var lwM2MHandler = require('./conn/lwm2m-device');
var batch = require('./config/batch');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Vue.js Routing page
app.use('/api/iot', iotRouter);
app.use('/api/user', userRoute);

app.use('/', indexRouter);
app.use(history());
app.use(express.static('public'));


// MQTT Server Start
mqttHandler.connect();
// CoAP Server Start
coapHandler.connect();

batch.batchStart();

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
