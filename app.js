var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var dbConfig = require('./db');
var mongoose = require('mongoose');
// Connect to DB
mongoose.connect(dbConfig.url);
var mydb = mongoose.connection;
var app = express();
// import bills.js
var bills = require('./routes/bills')
// import lists.js
var lists = require('./routes/lists');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//static folders import
app.use("/css", express.static(__dirname + '/css'));
app.use("/img", express.static(__dirname + '/img'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/fonts", express.static(__dirname + '/fonts'));
app.use("/less", express.static(__dirname + '/less'));
app.use("/font2", express.static(__dirname + '/font-awesome-4.1.0'));

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
// TODO - Why Do we need this key ?
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

 // Using the flash middleware provided by connect-flash to store messages in session
 // and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);
var routes = require('./routes/index')(passport);
app.use('/', routes);

//home
app.get('/', function(req, res, next) {
	res.render('home');
});

//Expenses
app.get('/bill', function(req, res, next) {
	res.render('bill');
	console.log("hi");
});


app.post('/bill', bills.list);

//Lists
app.get('/list', function(req, res, next) {
	res.render('list');
});
app.post('/list', lists.add);
/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

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

module.exports = app;