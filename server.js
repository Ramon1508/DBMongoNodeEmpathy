var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Archivos = require('./api/models/Archivos'),
  Escuelas = require('./api/models/Escuelas'),
  Eventos =  require('./api/models/Eventos'),
  Perfiles = require('./api/models/Perfiles'),
  Post = require('./api/models/Post'),
  bodyParser = require('body-parser')
  var upload = require('express-fileupload')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/Empathydb', { useNewUrlParser: true })
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const expressEdge = require('express-edge')
app.use(express.static('public'))
app.use(upload()) // configure middleware
app.use(expressEdge)
setInterval(function(){
  var Eventoss = mongoose.model('Eventos')
  Eventoss.find({
    $or: [
      {
        Estado: "A",
      },
      {
        Estado: "P",
      },
    ]
  }, function(err, evento) {
    if (err)
      console.log(err)
    if (evento.toString() === ""){
      var Salida = "Actualizado a las " + (new Date()).getHours() + ":"
      if ( (new Date()).getMinutes() < 10 ) Salida += "0" + (new Date()).getMinutes()
      else Salida += (new Date()).getMinutes()
      console.log(Salida)
    }
    else
    {
      var Salida = "Actualizado a las " + (new Date()).getHours() + ":"
      if ( (new Date()).getMinutes() < 10 ) Salida += "0" + (new Date()).getMinutes()
      else Salida += (new Date()).getMinutes()
      var contados = 0
      for (var n in evento) {
        var eve = evento[n]
        var a = eve.created
        var b = new Date();
        //La diferencia se da en milisegundos así que debes dividir entre 1000 y luego entre 3600 para pasarlo a horas
        var c = Math.floor(Math.floor((b-a)/1000) / 3600)
        if (c < eve.Horas) {
          contados += 1
        }
        else {
          Eventoss.findOneAndUpdate({_id: eve._id},{$set: {Estado: "F"}} , {upsert: true}, function(err, doc) {
            if (err)
              Salida = err
            contados += 1
            if (contados === evento.length) {
              console.log(Salida)
            }
          })
        }
      }
    }
  })
}, 300000);
app.set('views', `${__dirname}/views`)
app.get('/', (req,res) => {
  res.render('index')
})
var routes = require('./api/routes/ListRoutes') //importing route
routes(app) //register the route
app.listen(port)
console.log('Empathy RESTful API server started on: ' + port)