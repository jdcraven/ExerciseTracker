var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('./app_api/models/db');
var uglifyJs = require("uglify-js");
var fs = require('fs');

/*Get the routes for the app_server and app_api*/
var routes = require('./app_server/routes/index');
var routesApi = require('./app_api/routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');


/* Include all the JS files and to compress into one file */
var appClientFiles = [
  'app_client/app.js',
  'app_client/exercise/exercise.module.js',
  'app_client/exercise/exercise.routes.js',
  'app_client/exercise/exercise.constants.js',
  'app_client/exercise/exercise.service.js',
  'app_client/exercise/exercise-home.controller.js',
  'app_client/exercise/exercise-create.controller.js',
  'app_client/exercise/exercise-update.controller.js' 
];
var uglified = uglifyJs.minify(appClientFiles, { compress : false });

fs.writeFile('public/lib/exercise.min.js', uglified.code, function (err){
    if(err) {
        console.log(err);
    } else {
        console.log("Script generated and saved:", 'exercise.min.js');
    }
});



// uncomment after placing favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

// - Using Morgan for logging -
// Set the logger type for Morgan
app.use(logger('dev'));

// - Using body-parser to parse the bodies of all incoming requests. - 
// parse aaplication/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

// Add public and app_client folders to the app
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));

// used to display the json in pretty print format
app.set('json spaces', 2);


// enable Cross-Origin Resource Sharing (CORS)
app.use(function(reg, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');   
    next();
});

/* Url route definitions used for app_api and app_client*/
app.use('/', routes);
app.use('/api/v1', routesApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({           
            "error": {
                "message": err.message,
                "status" : err.status
            }                    
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({           
        "error": {
            "message": err.message,
            "status" : err.status
        }                    
    });
});

// export/expose the app
module.exports = app;
