const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var cors = require('cors');
const app = express();
const methodOverride = require("method-override");
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');

//DECLARACION DE RUTAS
const indexRouter = require('./routes/index');
const ejemploRouter = require('./routes/ejemplo');

swaggerDocument = require('./swagger.json');

// SETTINGS
app.set('port', process.env.PORT || 3000);

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(morgan('combined'))
app.use(express.static(path.join(__dirname, 'public')));
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', { flags: 'a' });


// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))


//VIEWS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ROUTES
app.use('/', indexRouter);
app.use('/ejemplo', ejemploRouter);

/*
// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Node.js server on port ${app.get('port')}`);
});
*/

//SWAGGER
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(function(req, res, next) {
  var err = new Error('Ruta no encontrada');
  err.status = 404;
  next(err);
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

const TOKEN =
    process.env.NODE_ENV === "production" ?
    process.env.PROD_TOKEN :
    process.env.DEV_TOKEN;

module.exports = app;