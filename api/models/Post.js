'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var PostSchema = new Schema({
    Estado: {type: String, default:"P"},
})
module.exports = mongoose.model('Post', PostSchema)