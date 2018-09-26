'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EventsSchema = new Schema({
    Titulo: {type: String, required: true},
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
    Imagenes: {type: String, required: true},
    Estado: {type: String, required: true},
});
module.exports = mongoose.model('Eventos', EventsSchema);