var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var basicAuth = require("basic-auth-connect");

var Heroku = require('heroku.node');
var client = new Heroku({email: process.env.EMAIL, api_key: process.env.API_KEY});

var app = express();

app.use(basicAuth(process.env.BASIC_AUTH_ID, process.env.BASIC_AUTH_PASS));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.get('/api/applist', function(req, res){
    client.apps.list(function(err, apps) {
        res.send(apps);
    });
});

app.get('/api/restart', function(req, res){
    console.log(req.query.app);
    client.app(req.query.app).dynos.restart(function(err, data){
        console.log("ERROR"+err);
        console.log("DATA"+data);
        res.send(data);
    });
});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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
