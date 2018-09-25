const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const PostSchema = new mongoose.Schema(
    {
        Nombre: {type: String, required: true},
    }
)
const Post = mongoose.model('Escuelas', PostSchema)
module.exports = Post