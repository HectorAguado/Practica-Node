'use strict';

//Creamos un reouter
const express = require('express');
const router = express.Router();
// Cargamos nuestro middleware de autenticación
 const jwtAuth = require('../../lib/jwtAuth');

//cargamos modelo de anuncio
const Anuncio = require ('../../models/Anuncio.js');


//pedimos a jswAuth que nos fabrique un middleware de autenticación con JWT.
//lo ponemos el primero, así me aseguro que lo primero que se hace es autenticar.
router.use(jwtAuth());

/** 
 * GET /anuncios/tags
 */
router.get('/tags', async(req, res, next)=> {
    try{

    }catch(err){
        next(err);
    }
});
/** 
 * GET /anuncios
 */
router.get('/', async(req, res, next) =>{
    try{
        const nombre = req.query.nombre;
        const venta = req.query.venta;
        const precio = req.query.precio;
        const foto = req.query.foto;
        const tags = req.query.tags;

        const limit = parseInt(req.query.limit);   //tb se puede usar un casting Number(str)
        const skip = parseInt(req.query.skip);
        const sort = req.query.sort;
        const fields = req.query.fields;
        //creo filtro vacio
        const filter = {}
        if (nombre){
            filter.nombre = nombre;
        }
        if (venta){
            filter.venta = venta;
        }
        if (precio){
            filter.precio = precio;
        }
        if (tags){
            filter.tags = tags;
        }
        //hago consulta y doy respuesta
        const rows = await Anuncio.list(filter, limit, skip, sort, fields);
        res.json({success: true, result: rows});     
    } catch (err){
        next(err);
    }
});

//Exportamos el router
module.exports = router;