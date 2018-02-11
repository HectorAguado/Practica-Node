'use strict';

//Creamos un router
const express = require('express');
const router = express.Router();
//cargamos la autenticación por JWT
const jwtAuth = require ('../../lib/jwtAuth.js');

//cargamos modelo de anuncio
const Usuario = require ('../../models/Usuario.js');

//para validar
const {check, validationResult} = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

//para codificar en hash256 la clave
const sha256 = require('../../node_modules/sha256');

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
        .trim().normalizeEmail()
        .custom(value => {
            console.log(`Validando que el EMAIL: ${value} no existe previamente en la BBDD de usuarios`);
            return Usuario.findOne({ email: value }).then( emailRepetido => {
                if (emailRepetido){
                    throw new Error(`${value} is already in use`)
                }
                return true;
            }); 
        }),
    check('clave')
        .isLength({min: 4}).withMessage('must have 4 characters at least')
],(req, res, next) => { 
    console.log('ValidationResult:', validationResult(req))
    console.log('MatchedData:', matchedData(req));
    console.log('Req.Body:', req.body);
    
    validationResult(req).throw();
    
    console.log(req.body.clave);
    req.body.clave = sha256(req.body.clave);
    console.log(req.body.clave);
    
    // Una vez validados que los datos lo persistimos en la colección de usuarios
    //le pasamos el cuerpo de la petición. Moongose no permitirá nada que no cumpla el esquema
    const usuario = new Usuario(matchedData(req));
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
        const rows = await Usuario.find();
        console.log(rows);
        res.json({success: true, result: rows});
    }catch(err){
        next(err);
    }
});

//Exportamos el router
module.exports = router;