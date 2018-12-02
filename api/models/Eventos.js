'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var EventsSchema = new Schema({
    Titulo: {type: String, required: true},
    Latitud: {type: Number, required: true},
    Longitud: {type: Number, required: true},
    Descripcion: {type: String, required: true},
    DescHistPuntos: {type: String, required: true}, //PUEDE CAMBIAR
    Puntos: Number,
    Usuario: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Perfiles', 
        required: true
    },
    created: { 
        type: Date,
        default: Date.now
    },
    Horas: {type: Number, required: true},
    Imagenes:               //PUEDEN CAMBIAR
        [
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Archivos'
            }
        ],
    Estado: {type: String, default:"P"}, //A = ACTIVO, F = FINALIZADO, P = PENDIENTE
})
module.exports = mongoose.model('Eventos', EventsSchema)