const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

//Importar Cors (Permitir que un cliente se conecte a otro servidor para intercambio de datos)
const cors = require('cors');

//Conectar a MongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1/restapis')

//Crear servidor
const app = express();

//Habilitar body parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Habilitar Cors
app.use(cors());

//Rutas app
app.use('/', routes());

//Puerto
app.listen(5000);