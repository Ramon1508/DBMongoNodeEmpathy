var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Archivos = require('./api/models/Archivos'),
  Escuelas = require('./api/models/Escuelas'),
  Eventos =  require('./api/models/Eventos'),
  Perfiles = require('./api/models/Perfiles'),
  bodyParser = require('body-parser')
  var upload = require('express-fileupload');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Empathydb', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const expressEdge = require('express-edge')
app.use(express.static('public'))
app.use(upload()); // configure middleware
app.use(expressEdge)
app.set('views', `${__dirname}/views`)
app.get('/', (req,res) => {
    res.render('index');
})
var routes = require('./api/routes/ListRoutes'); //importing route
routes(app); //register the route
app.listen(port);
console.log('Empathy RESTful API server started on: ' + port);