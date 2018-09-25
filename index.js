const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/node-js-blog')
const expressEdge = require('express-edge')
app.use(express.static('public'))
app.use(expressEdge)
app.set('views', `${__dirname}/views`)
app.get('/', (req,res) => {
    res.render('index');
})
app.get('/post', (req,res) => {
    res.render('post');
})


app.listen(3000, () => {
    console.log('App listening on port 3000')
})