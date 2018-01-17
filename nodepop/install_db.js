'use strict';
/*
 * Script que se encarga de poblar la base de datos  
 */
console.log("STARTING SCRIPT");

const mongoose = require('mongoose');
const conn = mongoose.connection;  

conn.on('error', err => {
    console.log('VAYA, HA HABIDO UN ERROR CONECTANDO A LA BBDD CON MONGOOSE', err);
    process.exit(1);
});
conn.once('open', () => {
    console.log(`Conectado a mongoDB con Mongoose en ${mongoose.connection.name}`)
});

mongoose.connect('mongodb://localhost/nodepop',{
    useMongoClient: true
});

const Anuncio = require('./models/Anuncio');
const Usuario = require('./models/Usuario');


/*Limpiamos la base de datos por si existia algo antes*/
console.log("*********** Linpiando Base de Datos *********");
conn.collections['anuncios'].drop( err => {
    if (err){console.log('Error eliminando collection anuncios');
    }else {console.log('Collection anuncios eliminada')}   
});
conn.collections['usuarios'].drop( err => {
    if (err){console.log('Error eliminando collection usuarios');
    }else {console.log('Collection usuarios eliminada')}   
});

/* Anuncios */
console.log("*********** Creando Anuncios *********");

const anuncio1 = new Anuncio ({
    "nombre" : "Bicicleta",
    "venta" : true,
    "precio": 350.00,
    "foto": "img/anuncios/bici.jpg",
    "tags": "lifestyle"
});
const anuncio2 = new Anuncio ({
    "nombre" : "iPhone 3GS",
    "venta" : false,
    "precio": 230.00,
    "foto": "img/anuncios/iphone.jpg",
    "tags": ['lifestyle', 'mobile']
});
const anuncio3 = new Anuncio ({
    "nombre" : "Ferrari Testarosa",
    "venta" : true,
    "precio": 12350.00,
    "foto": "img/anuncios/ferrari.jpg",
    "tags": ["motor", "mobile", "lifestyle"]
});

/* Usuarios */
console.log("*********** Creando Usuarios *********");

const usuario1 = new Usuario ({
    "nombre": "Hector AP",
    "email": "hetor@gmail.com",
    "clave": "clavehector"
});


console.log("*********** Guardando Anuncios *********");
anuncio1.save((err, anuncioCreado) => {
    if (err) throw err;
    console.log(`Anuncio ${anuncio1.nombre} creado`)
});
anuncio2.save((err, anuncioCreado) => {
    if (err) throw err;
    console.log(`Anuncio ${anuncio2.nombre} creado`)
});
anuncio3.save((err, anuncioCreado) => {
    if (err) throw err;
    console.log(`Anuncio ${anuncio3.nombre} creado`)
});


console.log("*********** Guardando Usuarios *********");
usuario1.save((err, usuarioCreado) => {
    if (err) throw err;
    console.log(`Usuario ${usuario1.nombre} creado`)
});

console.log("SCRIPT FINISHED");