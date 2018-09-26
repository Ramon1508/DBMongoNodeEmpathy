'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProfileSchema = new Schema({
    Nombres: {type: String, required: true},
    Appa: {type: String, required: true},
    Apma: {type: String, required: true},
    CURP: {type: String, required: true},
    Institucion:{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Escuelas',
        required: true
    },
    Celular: {type: String, required: true},
    Favoritos: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Eventos'
    },
    Cumplidos: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Eventos'
    },
    created: { 
        type: Date,
        default: Date.now
    },
    HistorialPuntos: [
        {
            DescHistPuntos: {
                type: String, 
                required: true
            }
        }
    ],
    PuntosActuales: {type: Number, required: true},
    Imagenes: {
        type: [
            {
                Imagen: {
                    type: String, 
                    required: true
                }
            }
        ], required: false
    },
});
module.exports = mongoose.model('Perfiles', ProfileSchema);