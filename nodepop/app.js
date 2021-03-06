var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// cargamos el conector a la BBDD que hemos creado para que Moongose se conecte
require('./lib/connectMongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// RUtas del APIv1
app.use('/apiv1/authenticate', require('./routes/apiv1/authenticate')); // login por API, recibo password y devuelve token de auth
app.use('/apiv1/anuncios', require('./routes/apiv1/anuncios'));
app.use('/apiv1/usuarios', require('./routes/apiv1/usuarios'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
 //comprobar errores de express-validator (sus errores son arrays)
  if (err.array){
    err.status = 422; // unprocessable Entity  - error de validación
    const errInfo = err.array({ onlyFirstError: true})[0]; 
    //para diferenciar los errores de API de los que no
    err.message = isAPI(req) ?
     { message: 'Not valid', errors: err.mapped()} :
    `Not Valid - ${errInfo.param} -- ${errInfo.msg}`;
    console.log(err.message)
  }
 
  res.status(err.status || 500);

  if (isAPI(req)) { //Si es API, devuelvo JSON
    res.json({ success: false, error: err.message });
    return;
  }
  
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  //console.log('****** VARIABLES DE ENTORNO ****', process.env);

  // render the error page  sólo cuando NO es API
  res.render('error');
});

//Nos creamos una función que nos diga si la petición vienen a mi apivX 
function isAPI(req){
  return req.originalUrl.indexOf('/apiv') === 0;  // si es 0 es una petición de APi
}

module.exports = app;
