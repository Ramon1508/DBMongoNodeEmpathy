'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var FileSchema = new Schema({
    Numero: {type:Number, required: true},
    NombreOriginal: {type: String, required: true},
    Direccion: {type:String, required: true},
    GuardadoEn: {type:String, required: true}
})
module.exports = mongoose.model('Archivos', FileSchema)