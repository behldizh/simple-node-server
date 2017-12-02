/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config');
var log = require('./libs/log')(module);


var app = express();
app.set('port', config.get('port'));

//Middleware
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'templates')); // __dirname это путь где лежит проект
app.set('view engine', 'ejs');

app.use(express.favicon()); // ищет фаву по имени favicon.ico

// Обыкновенный логер, здесь будет выводиться информация о статусе и все такое
if (app.get('env') == 'development'){
	app.use(express.logger('dev'));
} else {
	app.use(express.logger('default'));
}

app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(app.router);

app.get('/', function(req, res, next){
	res.render("index", {
		body: '<b>Oh, hello there</b>',
		title: 'my chat'
	});
});

app.use(express.static(path.join(__dirname, 'public')));



app.use(function (err, req, res, next){
	// NODE_ENV статус приложения(разработка, продакшн) dev now
	if (app.get('env') == 'development'){
		var errorHandler = express.errorHandler();
		errorHandler(err, req, res, next);
	} else {
		res.send(500)
	}
});


// var routes = require('./routes');
// var user = require('./routes/user');


// // all environments

// // development only
// if ('development' == app.get('env')) {
//   app.use(express.errorHandler());
// }

// app.get('/', routes.index);
// app.get('/users', user.list);


http.createServer(app).listen(config.get('port'), function(){
	log.info('Express server listening on port ' + config.get('port'));
});


