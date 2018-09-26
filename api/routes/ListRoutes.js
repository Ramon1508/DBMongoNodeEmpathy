'use strict';
module.exports = function(app) {
  var Controlador = require('../Controllers/ListController');
  // Controlador Routes
  app.route('/Escuelas')
    .get(Controlador.list_all_Schools)
    .post(Controlador.create_a_School);
  app.route('/Escuelas/:SchoolId')
    .get(Controlador.read_a_School)
    .delete(Controlador.delete_a_School);
  app.route('/Perfiles')
    .get(Controlador.list_all_Profiles)
    .post(Controlador.create_a_Profile);
  app.route('/Perfiles/:ProfileId')
    .get(Controlador.read_a_Profile)
    .put(Controlador.update_a_Profile)
    .delete(Controlador.delete_a_Profile);
  app.route('/Eventos')
    .get(Controlador.list_all_Events)
    .post(Controlador.create_a_Event);
  app.route('/Eventos/:EventId')
    .get(Controlador.read_a_Event)
    .put(Controlador.update_a_Event)
    .delete(Controlador.delete_a_Event);
  app.route('/upload')
    .post(Controlador.addFile)
  app.route('/files')
    .get(Controlador.list_all_Files)
  app.route('/files/:FileId')
    .get(Controlador.search_a_File)
    .put(Controlador.update_a_File)
    .delete(Controlador.delete_a_File);
};