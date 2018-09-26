const mongoose = require('mongoose')
const Escuelas = require('./database/models/Escuelas')
const Eventos = require('./database/models/Eventos')
const Perfiles = require('./database/models/Perfiles')
mongoose.connect('mongodb://localhost/Empathydb', { useNewUrlParser: true })
// mongoose.connect('mongodb://localhost/node-js-test-blog')
// mongoose.connect('mongodb://localhost/Empathydb', function (err) {
//     if (err) throw err;
//     console.log('Successfully connected');
//     Escuelas.find({
//         title: /mvc/i
//     }).sort('-created')
//     .limit(5)
//     .exec(function(err, books) {
//         if (err) throw err;
         
//         console.log(books);
//     });
// Post.find({}, (error, posts) => {
//     console.log(error, posts)
// })
// Post.create({
//     title: 'my sec post',
//     description: 'My desc sec',
//     content: 'my sec content'
// }, (error, post) => {
//     console.log(error, post)
// })
// Perfiles.findOneAndUpdate({name: {
//     Nombres: 'José',
//     Appa: 'Valenzuela',
//     Apma: 'Luna'
//     }}, {
//     Institucion: "5ba88e7eef1c4c4750fe9e90"}, (error, posts) => {
//         console.log(error, posts)
//     })
// Perfiles.findOne({}, (error, posts) => {
//     console.log(error, posts)
// })
// const Archivos = require('./api/models/Archivos')
// Archivos.create({
//     Numero: -1,
//     NombreOriginal: '/',
//     Direccion: '/',
//     GuardadoEn: '/'
// }, (error, post) => {
//     console.log(error, post)
// })

