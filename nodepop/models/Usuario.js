'use strict';

const mongoose = require('mongoose');

//Creamos el Esquema
const usuarioSchema = mongoose.Schema({
    nombre: {type: String, index: true},
    email: {type: String, index: true, unique: true, require: true},  //si es único, Mongoose no permitirá duplicidades
    clave: {type: String, require: true }
});

//Creamos el Modelo
const Usuario = mongoose.model('Usuarios', usuarioSchema);

//Exportamos el Modelo
module.exports = Usuario;