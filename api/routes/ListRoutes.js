'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/ListController');
  // todoList Routes
  app.route('/Escuelas')
    .get(todoList.list_all_Schools)
    .post(todoList.create_a_School);
  app.route('/Escuelas/:SchoolId')
    .get(todoList.read_a_School)
    .delete(todoList.delete_a_School);
  app.route('/Perfiles')
    .get(todoList.list_all_Profiles)
    .post(todoList.create_a_Profile);
  app.route('/Perfiles/:ProfileId')
    .get(todoList.read_a_Profile)
    .put(todoList.update_a_Profile)
    .delete(todoList.delete_a_Profile);
  app.route('/Eventos')
    .get(todoList.list_all_Events)
    .post(todoList.create_a_Event);
  app.route('/Eventos/:EventId')
    .get(todoList.read_a_Event)
    .put(todoList.update_a_Event)
    .delete(todoList.delete_a_Event);
};