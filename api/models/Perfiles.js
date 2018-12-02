'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ProfileSchema = new Schema({
    Nombres: {type: String, required: true},
    Appa: {type: String, required: true},
    Apma: {type: String},
    CURP: {type: String},
    Institucion:{           //PUEDE CAMBIAR
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Escuelas'
    },
    CveEstudiante: {type: String},      //PUEDE CAMBIAR
    Celular: {type: String, required: true},        //PUEDE CAMBIAR
    Favoritos: [            //PUEDE CAMBIAR
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Eventos'
        }
    ],
    Cumplidos: [            //PUEDE CAMBIAR
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Eventos'
        }
    ],
    created: { 
        type: Date,
        default: Date.now
    },
    HistorialPuntos: [          //PUEDE CAMBIAR
        {
            DescHistPuntos: {type: String, required: true},
            Puntos: {type: Number, required: true},
            IDEvento:         { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Eventos',
                required: true
            }
        }
    ],
    Administrador: { 
        type: Boolean,
        default: false
    },
})
module.exports = mongoose.model('Perfiles', ProfileSchema)