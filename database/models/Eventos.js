const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const PostSchema = new mongoose.Schema(
    {
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
    }
)
const Post = mongoose.model('Eventos', PostSchema)
module.exports = Post