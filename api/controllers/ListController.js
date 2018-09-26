'use strict';
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Empathydb', { useNewUrlParser: true })
var Escuelas = mongoose.model('Escuelas')
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
  Escuelas.remove({
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
  Perfiles.remove({
    _id: req.params.ProfileId
  }, function(err, Profile) {
    if (err)
      res.send(err);
    res.json({ message: 'Perfil eliminado exitosamente.' });
  });
};
exports.list_all_Events = function(req, res) {
    Eventoes.find({}, function(err, Event) {
      if (err)
        res.send(err);
      res.json(Event);
    });
  };
  exports.create_a_Event = function(req, res) {
      var new_Event = new Eventoes(req.body);
      new_Event.save(function(err, Event) {
          if (err)
              res.send(err);
          res.json(Event);
      });
  };
  exports.read_a_Event = function(req, res) {
      Eventoes.findById(req.params.EventId, function(err, Event) {
          if (err)
              res.send(err);
          res.json(Event);
      });
  };
  exports.update_a_Event = function(req, res) {
    Eventoes.findOneAndUpdate({_id: req.params.EventId}, req.body, {new: true}, function(err, Event) {
      if (err)
        res.send(err);
      res.json(Event);
    });
  };
  exports.delete_a_Event = function(req, res) {
    Eventoes.remove({
      _id: req.params.EventId
    }, function(err, Event) {
      if (err)
        res.send(err);
      res.json({ message: 'Evento eliminado exitosamente.' });
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
//   Task.remove({
//     _id: req.params.taskId
//   }, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json({ message: 'Task successfully deleted' });
//   });
// };