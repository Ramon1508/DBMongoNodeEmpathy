'use strict'
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/Empathydb', { useNewUrlParser: true })
var Escuelas = mongoose.model('Escuelas')
var Archivos = mongoose.model('Archivos')
var Eventos = mongoose.model('Eventos')
var Perfiles = mongoose.model('Perfiles')
var Post = mongoose.model('Post')
exports.list_all_Schools = function(req, res) {
  Escuelas.find({}, function(err, School) {
    if (err)
      res.send(err)
    res.send(School)
  })
}

exports.create_a_School = function(req, res) {
    var new_school = new Escuelas(req.body)
    new_school.save(function(err, School) {
        if (err)
            res.send(err)
        res.send(School)
    })
}

exports.read_a_School = function(req, res) {
    Escuelas.findById(req.params.SchoolId, function(err, school) {
        if (err)
            res.send(err)
        res.send(school)
    })
}

exports.delete_a_School = function(req, res) {
  Escuelas.deleteOne({
    _id: req.params.SchoolId
    }, function(err, School) {
        if (err)
            res.send(err)
        res.send({ message: 'Escuela eliminada exitosamente.' })
    })
}

exports.list_all_Profiles = function(req, res) {
  Perfiles.find({}, function(err, Profile) {
    if (err)
      res.send(err)
    res.send(Profile)
  })
}
exports.create_a_Profile = function(req, res) {
  var new_Profile = new Perfiles(req.body)
  if (new_Profile.Institucion)
  {
    Escuelas.findById(new_Profile.Institucion, function(err, school) {
      if (err)
        res.send(err)
      if(school)
      {
        //CODIGO DE ACEPTADO
        new_Profile.save(function(err, Profile) {
          if (err)
            res.send(err)
          res.send(Profile)
        })
      }
      else
        res.send('Escuela inválida')
    })
  }
  else
  {
    new_Profile.save(function(err, Profile) {
      if (err)
        res.send(err)
      res.send(Profile)
    })
  }
}

exports.read_a_Profile = function(req, res) {
    Perfiles.findById(req.params.ProfileId, function(err, Profile) {
        if (err)
            res.send(err)
        res.send(Profile)
    })
}

exports.update_a_Profile = function(req, res) {
  Perfiles.find({_id: req.params.ProfileId}, function(err, Profile) {
    if (err){
      res.send(err)
      return
    }
    else if (Profile.toString() === ""){
      res.send(Profile)
      return
    }
    else {
      if (req.body.Institucion){
        Escuelas.findById(req.body.Institucion, function(err, school) {
        if (err)
          res.send(err)
        if(school)
          {
            Perfiles.findOneAndUpdate({_id: req.params.ProfileId}, {$set: req.body}, {upsert: true}, function(err, doc) {
              if (err) {
                res.send(err)
              }
              else {
                res.send("Escuela cambiada")
              }
            })
          }
          else
            res.send('Escuela inválida')
        })
      }
      else if (req.body.CveEstudiante){
        Perfiles.findOneAndUpdate({_id: req.params.ProfileId}, {$set: req.body}, {upsert: true}, function(err, doc) {
          if (err)
            res.send(err)
          else
            res.send("Clave de estudiante cambiada")
        })
      }
      else if (req.body.Celular){
        Perfiles.findOneAndUpdate({_id: req.params.ProfileId}, {$set: req.body}, {upsert: true}, function(err, doc) {
          if (err)
            res.send(err)
          else
            res.send("Celular cambiado")
        })
      }
      else if (req.body.Favoritos){
        Eventos.find({_id: req.body.Favoritos, Estado: "A"}, function(err, event) {
          if (err)
            res.send(err)
          if(event != undefined)
            {
              event = event[0]
              var arreglo = []
              if (Profile.Favoritos)
                arreglo = Profile.Favoritos
              if (arreglo.indexOf(event._id.toString()) != -1)
                res.send("Ya existe este favorito")
              else {
                arreglo.push(event._id.toString())
                Perfiles.findByIdAndUpdate(req.params.ProfileId, {$set: {'Favoritos': arreglo}}, {new: true}, function(err, doc) {
                  if (err)
                    res.send(err)
                  else
                    res.send(doc)
                })
              }
            }
            else
              res.send('Evento inválido')
          })
      }
      else if (req.body.Cumplidos){
        Eventos.find({_id: req.body.Cumplidos, Estado: "A"}, function(err, event) {
          if (err)
            res.send(err)
          if(event != undefined)
            {
              event = event[0]
              var arreglo = []
              if (Profile.Cumplidos)
                arreglo = Profile.Cumplidos
              if (arreglo.indexOf(event._id.toString()) != -1)
                res.send("Ya existe este cumplido")
              else {
                arreglo.push(event._id.toString())
                Perfiles.findByIdAndUpdate(req.params.ProfileId, {$set: {'Cumplidos': arreglo}}, {new: true}, function(err, doc) {
                  if (err)
                    res.send(err)
                  else
                    res.send(doc)
                })
              }
            }
            else
              res.send('Evento inválido')
          })
      }
      else if (req.body.HistorialPuntos){
        if (!req.body.HistorialPuntos.DescHistPuntos || !req.body.HistorialPuntos.Puntos) {
          if (!req.body.HistorialPuntos.DescHistPuntos) res.send('Falta la descripcion de los puntos')
          else res.send('Falta la cantidad de puntos')
        }
        else {
          var arreglo = []
          if (Profile[0].HistorialPuntos) 
            arreglo = Profile[0].HistorialPuntos
          arreglo.push(req.body.HistorialPuntos)
          Perfiles.findByIdAndUpdate(req.params.ProfileId, {$set: {'HistorialPuntos': arreglo}}, {new: true}, function(err, doc) {
            if (err)
              res.send(err)
            else
              res.send(doc)
          })
        }
      }
      else {
        res.send("Error con los parámetros")
      }
    }
  })
}

exports.delete_a_Profile = function(req, res) {
  Perfiles.deleteOne({
    _id: req.params.ProfileId
  }, function(err, Profile) {
    if (err)
      res.send(err)
    res.send({ message: 'Perfil eliminado exitosamente.' })
  })
}

exports.list_all_Events = function(req, res) {
  Eventos.find({}, function(err, Event) {
    if (err)
      res.send(err)
    res.send(Event)
  })
}

exports.create_a_Event = function(req, res) {
    var new_Event = new Eventos(req.body)
    new_Event.save(function(err, Event) {
        if (err)
            res.send(err)
        res.send(Event)
    })
}

exports.read_a_Event = function(req, res) {
    Eventos.findById(req.params.EventId, function(err, Event) {
        if (err)
            res.send(err)
        res.send(Event)
    })
}

exports.update_a_Event = function(req, res) {
  Eventos.find({_id: req.params.EventId}, function(err, Event) {
    if (err)
      res.send(err)
    else if (Event.toString() === ""){
      res.send(Event)
    }
    else {
      if (req.body.Imagenes){
        if (req.body.Imagenes.TipoUpdate === "A"){    //TipoUpdate es un parámetro extra para decidir si se va a añadir o eliminar.
          var arreglo = []
          if (Event[0].Imagenes) 
            arreglo = Event[0].Imagenes
          arreglo.push(req.body.Imagenes.ID)    //ID es el ID de la imagen
          Eventos.findByIdAndUpdate(req.params.EventId, {$set: {'Imagenes': arreglo}}, {new: true}, function(err, doc) {
            if (err)
              res.send(err)
            else
              res.send(doc)
          })
        }
        else if (req.body.Imagenes.TipoUpdate === "E"){
          var arreglo = []
          if (Event[0].Imagenes) 
            arreglo = Event[0].Imagenes
          var indice = arreglo.indexOf(req.body.Imagenes.ID)
          if (indice === -1) {
            res.send("Error, esta imagen no pertenece a este Evento")
          }
          else {
            var Eliminado 
            Archivos.findById(req.body.Imagenes.ID, function(err, File) {
            Eliminado = File
              if (err)
                Eliminado = err
              else {
                arreglo.splice(indice, 1);
                Eventos.findByIdAndUpdate(req.params.EventId, {$set: {'Imagenes': arreglo}}, {new: true}, function(err, doc) {
                  if (err)
                    res.send(err)
                  else{
                    Archivos.deleteOne({
                        _id: req.body.Imagenes.ID
                      }, function(err, File) {
                        if (err)
                          res.send(err)
                        Archivos.create(Eliminado)
                        var fs = require('fs')
                        var filePath = Eliminado.GuardadoEn
                        fs.unlink(filePath, (err) => {
                          if (err) {
                            Archivos.create(File)
                            arreglo.splice(indice, 0, req.body.Imagenes.ID);
                            Eventos.findByIdAndUpdate(req.params.EventId, {$set: {'Imagenes': arreglo}}, {new: true})
                            res.send(err)
                          }
                          else {
                            res.send('Archivo eliminado exitosamente.')
                          }
                        })
                    })
                  }
                })
              }
            })
          }
        }
        else {
          res.send("Falta el tipo de update a la imagen")
        }
      }
      else {
        Eventos.findOneAndUpdate({_id: req.params.EventId}, req.body, {new: true}, function(err, Event) {
          if (err)
            res.send(err)
          res.send(Event)
        })
      }
    }
  })
}

exports.delete_a_Event = function(req, res) {
  Eventos.deleteOne({
    _id: req.params.EventId
  }, function(err, Event) {
    if (err)
      res.send(err)
    res.send({ message: 'Evento eliminado exitosamente.' })
  })
}

exports.addFile = function(req,res){
  if(req.files.upfile){
    var file = req.files.upfile,
      name = file.name,
      type = file.mimetype
    Archivos.find({}, (error, Last) => {
      var Nnombre = Last[0].Numero + 1
      var uploadpath = (__dirname + '/../../public/' + Nnombre + '.' + type.substr(type.lastIndexOf('/') + 1)).replace(/\\/g,"/")
      file.mv(uploadpath,function(err){
        if(err){
          console.log("File Upload Failed",name,err)
          res.send("Error Occured!")
        }
        else {
          Archivos.create({
            Numero: Nnombre,
            NombreOriginal: name,
            GuardadoEn: uploadpath,
            Direccion: Nnombre + '.' + type.substr(type.lastIndexOf('/') + 1)
          }, (erro, post) => {
            if (erro)
            console.log(erro)
            else
            console.log(Nnombre + '.' + type.substr(-3),' Guardado con éxito')
            res.send(post._id)
          })
        }
      })
    }).sort({ _id: -1 }).limit(1)
  }
  else {
    res.send("No File selected !")
    res.end()
  }
}

exports.list_all_Files = function(req, res) {
  Archivos.find({}, function(err, task) {
    if (err)
      res.send(err)
    res.send(task)
  })
}

exports.search_a_File = function(req, res) {
  Archivos.findById(req.params.FileId, function(err, File) {
    if (err)
      res.send(err)
    res.send(File)
  })
}

exports.delete_a_File = function(req, res) {
  var Eliminado 
  Archivos.findById(req.params.FileId, function(err, File) {
    if (err)
      Eliminado = err
    else {
      Eliminado = File
      Archivos.deleteOne({
          _id: req.params.FileId
        }, function(err, File) {
          if (err)
            res.send(err)
          Archivos.create(Eliminado)
          var fs = require('fs')
          var filePath = Eliminado.GuardadoEn
          fs.unlink(filePath, (err) => {
            if (err) {
              Archivos.create(File)
              res.send(err)
            }
            res.send({ message: 'Archivo eliminado exitosamente.' })
          })
      })
    }
  })
}
exports.create_a_Post = function(req, res) {
  var new_Post = new Post(req.body)
  new_Post.save(function(err, posteo) {
    if (err)
      res.send(err)
    res.send(posteo)
  })
}
exports.list_all_Post = function(req, res) {
  Post.find({}, function(err, posteo) {
    if (err){
      res.send(err)
    }
    else if (posteo.toString() === "") {
      res.send(err)
    }
    else {
      res.send(posteo)
    }
  })
}
