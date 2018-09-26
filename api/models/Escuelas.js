'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SchoolSchema = new Schema({
    Nombre: {type: String, required: true}
});
module.exports = mongoose.model('Escuelas', SchoolSchema);