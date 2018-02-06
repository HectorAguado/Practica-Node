'use strict';

const mongoose = require('mongoose');
const conn = mongoose.connection;

var databaseUri = 'mongodb://$localhost/nodepopdb'
if (process.env.DB_USER){
    databaseUri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@localhost/nodepopdb`;
    console.log('USUARIO:',process.env.DB_USER);
    console.log('PASS:',process.env.DB_PASS);
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