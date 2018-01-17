'use strict';

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

module.exports = conn;