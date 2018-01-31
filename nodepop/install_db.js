'use strict';
/*
 * Script que se encarga de poblar la base de datos  
 */

const mongoose = require('mongoose');
const conn = mongoose.connection;  

/* Eventos de la conexión */
conn.on('error', err => {
    console.log('VAYA, HA HABIDO UN ERROR CONECTANDO A LA BBDD CON MONGOOSE', err);
    process.exit(1);
});
conn.once('open', () => {
    console.log(`Conectado a mongoDB con Mongoose en ${mongoose.connection.name}`)
});
/* Importamos los modelos*/
const Anuncio = require('./models/Anuncio');
const Usuario = require('./models/Usuario');
/* Importamos el archivo con el JSON con los datos de inicialización de la BBDD*/
const datos = require('./anuncios.json');

async function LimpiarBBDD () {
    try{
        /* Conectamos a la BBDD*/
        console.log("*********** Conectando a Base de Datos *********");
        await mongoose.connect('mongodb://localhost/nodepop',{
            useMongoClient: true
        });
        /*Limpiamos la base de datos por si existia algo antes*/
        console.log("*********** Reiniciamos Base de Datos *********");
        await conn.collections['anuncios'].drop( err => {
            if (err){console.log('Error eliminando collection anuncios');
            }else {console.log('Collection anuncios eliminada')}   
        });
        await conn.collections['usuarios'].drop( err => {
            if (err){console.log('Error eliminando collection usuarios');
            }else {console.log('Collection usuarios eliminada')}   
        });
    
        /* ANUNCIOS - Cargamos todos los anuncios en el array */
        await console.log("*********** Cargando Anuncios *********");
        for (let i = 0; i < datos.anuncios.length; i++){
            const anuncio = new Anuncio (datos.anuncios[i]);
            await anuncio.save((err, anuncioCreado) => {
                if (err) throw err;
                console.log(`Anuncio ${anuncio.nombre} creado`);
            });
        }
        /* USUARIOS - Cargamos todos los usuarios en el array */
        console.log("*********** Cargando Usuarios *********");
        for (let i = 0; i < datos.usuarios.length; i++){
            const usuario = new Usuario (datos.usuarios[i]);
            await usuario.save((err, usuarioCreado) => {
                if (err) throw err;
                console.log(`Usuario ${usuario.nombre} ${usuario.email} creado`);
            });
        }
        //Cerramos la conexión y salimos
        console.log("*********** Cerramos Conexión  *********");
        conn.close();
    }catch(error){
        console.log('ERROR EN CATCH');
        //Cerramos la conexión y salimos
        console.log("*********** Cerramos Conexión  *********");
        conn.close();
    }
}

LimpiarBBDD();


