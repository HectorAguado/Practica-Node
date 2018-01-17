'use strict';

//Creamos un reouter
const express = require('express');
const router = express.Router();

//cargamos modelo de anuncio
const Usuario = require ('../../models/Usuario.js');

/**
 * POST /anuncios
 */
router.post('/', (req, res, next) => {
    //Creamos un usuario en memoria
    //le pasamos el cuerpo de la petición. Moongose no permitirá nada que no cumpla el esquema
    const usuario = new Usuario(req.body);  
    // lo persistimos en la colección de usuarios
    usuario.save((err, usuarioGuardado) => {
        if (err){
            console.log(err);
            next(err);
            return;
        }
        res.json({ success: true, result: usuarioGuardado }); //res.json da ya un codigo 200
    });
});



//Exportamos el router
module.exports = router;