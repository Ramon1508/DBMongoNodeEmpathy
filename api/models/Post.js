'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var PostSchema = new Schema({
    Favoritos: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Eventos'
        }
    ],
    Estado: {type: String, default:"P"},
    Horas: {type: Number, required: true},
})
module.exports = mongoose.model('Post', PostSchema)