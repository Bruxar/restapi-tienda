const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1/restapis')

//Crear servidor
const app = express();

//Habilitar body parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Rutas app
app.use('/', routes());

//Puerto
app.listen(5000);