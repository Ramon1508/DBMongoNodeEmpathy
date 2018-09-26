var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Escuelas = require('./api/models/Escuelas'),
  Eventos =  require('./api/models/Eventos'),
  Perfiles = require('./api/models/Perfiles'),
  bodyParser = require('body-parser')
  var upload = require('express-fileupload');
const Archivos = require('./api/models/Archivos')
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
app.post('/upload',function(req,res){
  if(req.files.upfile){
    var file = req.files.upfile,
      name = file.name,
      type = file.mimetype;
    Archivos.find({}, (error, Last) => {
      var Nnombre = Last[0].Numero + 1
      var uploadpath = __dirname + '/public/' + Nnombre + '.' + type.substr(type.lastIndexOf('/') + 1);
      file.mv(uploadpath,function(err){
        if(err){
          console.log("File Upload Failed",name,err);
          res.send("Error Occured!")
        }
        else {
          Archivos.create({
            Numero: Nnombre,
            NombreOriginal: name,
            GuardadoEn: uploadpath,
            Direccion: Nnombre + '.' + type.substr(-3)//INSERTE CÓDIGO DE INSERCIÓN EN EL LUGAR DONDE DEBA
          }, (erro, post) => {
            if (erro)
            console.log(erro);
            else
            console.log(Nnombre + '.' + type.substr(-3),' Guardado con éxito');
            res.send(post._id)
          })
        }
      });
    }).sort({ _id: -1 }).limit(1);
  }
  else {
    res.send("No File selected !");
    res.end();
  };
})
var routes = require('./api/routes/ListRoutes'); //importing route
routes(app); //register the route
app.listen(port);
console.log('Empathy RESTful API server started on: ' + port);