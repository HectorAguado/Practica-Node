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
router.get('/tags', (req, res, next)=> {
    const listaTags = Anuncio.listTags();
    res.send(listaTags);
    //res.json({ success: true, result: listaTags});
});
/** 
 * GET /anuncios
 */
router.get('/', async(req, res, next) =>{
    try{
        const nombre = req.query.nombre;
        const venta = req.query.venta;
        let precio = req.query.precio;
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
            //convierto precio en un String para operar con él
            const stringPrecio = String(precio);    
            console.log(precio);
            //busco el guión en la cadena
            const guion = stringPrecio.indexOf('-');
            const longitud = stringPrecio.length;
            console.log(guion);

            if(guion === -1){   // no está. Pedimos precio exacto
                filter.precio = stringPrecio;
            }else if (guion === 0){ //esta al inicio, Pedimos menor o igual a precio
                console.log('Precio Sin Guion al principio', stringPrecio.replace('-',''));
                filter.precio ={ $lte: stringPrecio.replace('-','') } ;
            }else if(guion === longitud-1){ //esta al final. Pedimos mayor o igual que precio
                filter.precio ={ $gte: stringPrecio.replace('-','') } ;
            }else{   //esta en medio. Pedimos rango
                console.log (stringPrecio.substr(0, guion));
                console.log (stringPrecio.substr(guion + 1, longitud));
                filter.precio ={ $gte:  stringPrecio.substr(0, guion), $lte:  stringPrecio.substr(guion+1, longitud) } ;
            }



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

router.post('/', (req, res, next) => {
        const nombre = req.body.nombre;
        const venta = req.body.venta;
        const precio = req.body.precio;
        const foto = req.body.foto;
        const tags = req.body.tags;
        const anuncio = new Anuncio({
            nombre: nombre,
            venta: venta,
            precio: precio,
            foto: foto,
            tags: tags
        });
        anuncio.save((err, anuncioGuardado) => {
                    if (err){
                        console.log(err);
                        next(err);
                        return;
                    }
                    res.json({ success: true, result: anuncioGuardado }); //res.json da ya un codigo 200
                });
});

//Exportamos el router
module.exports = router;