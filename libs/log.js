var winston = require('winston');
var ENV = process.env.NODE_ENV; // какое-то окружение 

 function getLogger(module) {
 	// из пути типа User/... отрезает корневую директорию и склеивает ее с файлом приложения
 	var path = module.filename.split('/').slice(-2).join('/'); 

	return new winston.Logger({
		transports: [
			new winston.transports.Console({
				colorize: true,
				level: (ENV == 'development') ? 'debug' : 'erorr',
				lable: path
			})
		]
	});
}

module.exports = getLogger;
