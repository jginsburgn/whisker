var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');

// Declare app
var app = express();

var mysql = require('mysql');
global.mysqlPool = mysql.createPool({
	connectionLimit: 10,
	host: 'localhost',
	user: 'whisker',
	password: 'whiskerpass',
	database: 'whisker'
});

// Express session creation
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var MySQLStoreOptions = {
	host: 'localhost',
	port: 3306,
	user: 'whisker',
	password: 'whiskerpass',
	database: 'whisker'
};
var sessionStore = new MySQLStore(MySQLStoreOptions);

// Get route controllers
var index = require('./routes/index');
var users = require('./routes/users');
var transactions = require('./routes/transactions');

// Mount express session
app.use(session({
	store: sessionStore,
	secret: 'whiskersecret',
	resave: false,
	saveUninitialized: false
}));

// Mount user middleware
var userMiddleware = require('./user-middleware');
app.use(userMiddleware);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
	src: path.join(__dirname, 'public'),
	dest: path.join(__dirname, 'public'),
	indentedSyntax: false, // true = .sass and false = .scss
	sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/transactions', transactions);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
