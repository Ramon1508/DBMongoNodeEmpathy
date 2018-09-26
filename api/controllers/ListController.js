'use strict';
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Empathydb', { useNewUrlParser: true })
var Escuelas = mongoose.model('Escuelas')
var Archivos = mongoose.model('Archivos')
var Eventos = mongoose.model('Eventos')
var Perfiles = mongoose.model('Perfiles')
exports.list_all_Schools = function(req, res) {
  Escuelas.find({}, function(err, School) {
    if (err)
      res.send(err);
    res.json(School);
  });
};
exports.create_a_School = function(req, res) {
    var new_school = new Escuelas(req.body);
    new_school.save(function(err, School) {
        if (err)
            res.send(err);
        res.json(School);
    });
};
exports.read_a_School = function(req, res) {
    Escuelas.findById(req.params.SchoolId, function(err, school) {
        if (err)
            res.send(err);
        res.json(school);
    });
};
exports.delete_a_School = function(req, res) {
  Escuelas.deleteOne({
    _id: req.params.SchoolId
    }, function(err, School) {
        if (err)
            res.send(err);
        res.json({ message: 'Escuela eliminada exitosamente.' });
    });
};
exports.list_all_Profiles = function(req, res) {
  Perfiles.find({}, function(err, Profile) {
    if (err)
      res.send(err);
    res.json(Profile);
  });
};
exports.create_a_Profile = function(req, res) {
    var new_Profile = new Perfiles(req.body);
    new_Profile.save(function(err, Profile) {
        if (err)
            res.send(err);
        res.json(Profile);
    });
};
exports.read_a_Profile = function(req, res) {
    Perfiles.findById(req.params.ProfileId, function(err, Profile) {
        if (err)
            res.send(err);
        res.json(Profile);
    });
};
exports.update_a_Profile = function(req, res) {
  Perfiles.findOneAndUpdate({_id: req.params.ProfileId}, req.body, {new: true}, function(err, Profile) {
    if (err)
      res.send(err);
    res.json(Profile);
  });
};
exports.delete_a_Profile = function(req, res) {
  Perfiles.deleteOne({
    _id: req.params.ProfileId
  }, function(err, Profile) {
    if (err)
      res.send(err);
    res.json({ message: 'Perfil eliminado exitosamente.' });
  });
};
exports.list_all_Events = function(req, res) {
    Eventos.find({}, function(err, Event) {
      if (err)
        res.send(err);
      res.json(Event);
    });
  };
  exports.create_a_Event = function(req, res) {
      var new_Event = new Eventos(req.body);
      new_Event.save(function(err, Event) {
          if (err)
              res.send(err);
          res.json(Event);
      });
  };
  exports.read_a_Event = function(req, res) {
      Eventos.findById(req.params.EventId, function(err, Event) {
          if (err)
              res.send(err);
          res.json(Event);
      });
  };
  exports.update_a_Event = function(req, res) {
    Eventos.findOneAndUpdate({_id: req.params.EventId}, req.body, {new: true}, function(err, Event) {
      if (err)
        res.send(err);
      res.json(Event);
    });
  };
  exports.delete_a_Event = function(req, res) {
    Eventos.deleteOne({
      _id: req.params.EventId
    }, function(err, Event) {
      if (err)
        res.send(err);
      res.json({ message: 'Evento eliminado exitosamente.' });
    });
  };
  exports.addFile = function(req,res){
    if(req.files.upfile){
      var file = req.files.upfile,
        name = file.name,
        type = file.mimetype;
      Archivos.find({}, (error, Last) => {
        var Nnombre = Last[0].Numero + 1
        var uploadpath = __dirname + '/../../public/' + Nnombre + '.' + type.substr(type.lastIndexOf('/') + 1);
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
  }
  exports.list_all_Files = function(req, res) {
    Archivos.find({}, function(err, task) {
      if (err)
        res.send(err);
      res.json(task);
    });
  };
  exports.search_a_File = function(req, res) {
    Archivos.findById(req.params.FileId, function(err, File) {
      if (err)
        res.send(err);
      res.json(File);
    });
  };
  exports.update_a_File = function(req, res) {
    Archivos.findOneAndUpdate({_id: req.params.FileId}, req.body, {new: true}, function(err, File) {
      if (err)
        res.send(err);
      res.json(File);
    });
  };


  exports.delete_a_File = function(req, res) {
    var Eliminado 
    Archivos.findById(req.params.FileId, function(err, File) {
      if (err)
        Eliminado = err;
      else {
        Eliminado = File;
        Archivos.deleteOne({
          _id: req.params.FileId
        }, function(err, File) {
          if (err)
            res.send(err);
          Archivos.create(Eliminado)
          var fs = require('fs');
          var filePath = Eliminado.GuardadoEn.replace(/\\/g,"/")
          fs.unlink(filePath, (err) => {
            if (err) {
              Archivos.create(File)
              console.log(err)
              throw err
            }
            res.json({ message: 'Archivo eliminado exitosamente.' });
          });
        })
      }
    });
  };
// exports.list_all_tasks = function(req, res) {
//   Task.find({}, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };


// exports.create_a_task = function(req, res) {
//   var new_task = new Task(req.body);
//   new_task.save(function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };


// exports.read_a_task = function(req, res) {
//   Task.findById(req.params.taskId, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };


// exports.update_a_task = function(req, res) {
//   Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };


// exports.delete_a_task = function(req, res) {
//   Task.deleteOne({
//     _id: req.params.taskId
//   }, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json({ message: 'Task successfully deleted' });
//   });
// };