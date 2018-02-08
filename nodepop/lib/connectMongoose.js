'use strict';

const mongoose = require('mongoose');
const conn = mongoose.connection;

/* Si en existe la variable entorno DB_USER, nos conectaremos con los datos que nos proporcionen, si no, lo hacemos normal */
var databaseUri = 'mongodb://localhost/nodepopdb';
console.log('EL VALOR DE LA VARIABLE process.env.DB_USER ES ---->>>', process.env.DB_USER);
if (process.env.DB_USER){
    databaseUri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@localhost/nodepopdb`;
}

conn.on('error', err => {
    console.log('VAYA, HA HABIDO UN ERROR CONECTANDO A LA BBDD CON MONGOOSE', err);
    process.exit(1);
});

conn.once('open', () => {
    console.log(`Conectado a mongoDB con Mongoose en ${mongoose.connection.name}`)
});

mongoose.connect(databaseUri,{
    useMongoClient: true
});

module.exports = conn;