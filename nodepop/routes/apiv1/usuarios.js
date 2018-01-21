'use strict';

//Creamos un reouter
const express = require('express');
const router = express.Router();

//cargamos modelo de anuncio
const Usuario = require ('../../models/Usuario.js');

//para validar
const {check, validationResult} = require('express-validator/check');
/* Equivale a
const check = require('express-validator/check');
const validationResult = check.validationResult;
*/
const { matchedData, sanitize } = require('express-validator/filter');

/**
 * POST /usuarios
 */
router.post('/', [
    check('nombre')
        .isLength({min: 3}).withMessage('must have 3 alphanumeric characters')
        .isAlphanumeric().withMessage('must be alphanumeric')
        //.exists().withMessage('the field can not be empty') //verifica que exista, no que este vacío
        .trim(),
    check('email')
        .isEmail().withMessage('must be a valid email')
        .trim().normalizeEmail(),
        // .custom(value => {
        //     console.log('Value', '['+value+']');
        //     return findUsersBymail(value).then( user =>{
        //         throw new Error('This email is already in use');
        //      })
        //  }),
    check('clave')
        .isLength({min: 4}).withMessage('must have 4 characters at least')
],(req, res, next) => { 
    console.log('ValidationResult:', validationResult(req))
    console.log('MatchedData:', matchedData(req));
    console.log('Req.Body:', req.body);
    
    validationResult(req).throw();
    
    // Una vez validados que los datos lo persistimos en la colección de usuarios
    //le pasamos el cuerpo de la petición. Moongose no permitirá nada que no cumpla el esquema
    const usuario = new Usuario(matchedData(req));
    //const existeEmail = Usuario.find({email: email});
    //if (!existeEmail){
        usuario.save((err, usuarioGuardado) => {
                if (err){
                    console.log(err);
                    next(err);
                    return;
                }
                res.json({ success: true, result: usuarioGuardado }); //res.json da ya un codigo 200
            });
    // }else{
    //     return new Error ('That email address is already in use.');
    //     res.json({ success: false, result: 'That email address is already in use.'});
    //}
});

/**
 * GET /usuarios
 */
router.get('/',async(req, res, next) =>{
    try{
        const rows = await Usuario.find({email: 'hector@gmail.com'});
        res.json({success: true, result: rows});
    }catch(err){
        next(err);
    }
});


function findUsersBymail(email) {
    const result = Usuario.find({email: 'hejhgfhjfgjr@gmail.com'}).exec().then();
    console.log('Result: ---> ',result);
    return result;
};
/** 

    //Creamos un usuario en memoria
    //le pasamos el cuerpo de la petición. Moongose no permitirá nada que no cumpla el esquema
    const usuario = new Usuario(req.body);  
    //si alguno de los campos vacío, mandamos error y salimos
    if(!(usuario.nombre && usuario.email && usuario.clave)){
        const err = new Error ('Algún campo esta vacío');
        err.status (400);
        return next (err);
    }
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
*/


//Exportamos el router
module.exports = router;