var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

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

app.use('/', require('./routes/index'));
app.use('/inscricao', require('./routes/inscricao'));
app.use('/comprovante', require('./routes/comprovante'));
app.use('/downloads', require('./routes/downloads'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    var devEnv = req.app.get('env') === 'development';
    // set locals, only providing error in development
    res.locals.message = devEnv ? err.message : 'Desculpe o transtorno.';
    res.locals.error = devEnv ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// application root directory
global.appRoot = path.resolve(__dirname);

module.exports = app;
