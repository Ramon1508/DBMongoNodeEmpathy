const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const FileSchema = new mongoose.Schema(
    {
        Numero: {type:Number, required: true},
        NombreOriginal: {type: String, required: true},
        Direccion: {type:String, required: true},
        GuardadoEn: {type:String, required: true}
    }
)
const File = mongoose.model('Archivos', FileSchema)
module.exports = File