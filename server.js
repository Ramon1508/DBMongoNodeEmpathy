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
mongoose.connect('mongodb://Ramon1508:8182025a@ds231588.mlab.com:31588/abogapp', { useNewUrlParser: true }, (err) => {
  if (!err) { console.log('MongoDB connection succeeded.'); }
  else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
});
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
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
          var Perfiless = mongoose.model('Perfiles')
          Perfiless.find({Favoritos:eve._id}, function(err, perfi) {
            if (err)
              Salida = err
            else if (perfi === undefined){}
            else{
              for (var n in perfi) {
                var perf = perfi[n]
                var arreglo = []
                if (perf.Favoritos)
                  arreglo = perf.Favoritos
                var index = arreglo.indexOf(eve._id)
                if (index > -1) {
                  arreglo.splice(index, 1);
                  Perfiles.findByIdAndUpdate(perf._id, {$set: {'Favoritos': arreglo}}, {new: true}, function(err, doc) {
                    if (err)
                      Salida = err
                  })
                }
              }
            }
          })
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