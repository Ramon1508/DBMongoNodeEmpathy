'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var EventsSchema = new Schema({
    Titulo: {type: String, required: true},
    Latitud: {type: Number, required: true},
    Longitud: {type: Number, required: true},
    Descripcion: {type: String, required: true},
    DescHistPuntos: {type: String, required: true},
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
    Imagenes: [
            {
                Imagen: {
                    type: mongoose.Schema.Types.ObjectId, 
                    ref: 'Archivos', 
                    required: true
                }
            }
        ],
    Estado: {type: String, default:"P"}, //A = ACTIVO, F = FINALIZADO, P = PENDIENTE
})
module.exports = mongoose.model('Eventos', EventsSchema)