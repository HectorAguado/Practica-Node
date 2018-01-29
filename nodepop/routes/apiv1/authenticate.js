'use strict';

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Usuario = require('../../models/Usuario');

router.post('/', async (req, res, next) => {
    try{
        //recogemos las credenciales
        const email = req.body.email;
        const clave = req.body.clave;
        //buscamos en la BBDD
        const user = await Usuario.findOne({email: email}).exec();
        console.log(`USUARIO CON EMAIL EN BODY: ${email} y PASSWORD ${clave}`);
        console.log(`USUARIO CON EMAIL EN BBDD: ${user.email} y PASSWORD ${user.clave}`);
        if ((user.email !== email) || (user.clave !== clave)){
            res.status(401);
            res.json({error: 'Credenciales incorrectas'});
            return; 
        }
        //si el usuario existe y la clave coincide 
        jwt.sign({user_id: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN}, (err, token) => {
        if (err){
            return next(err);
        }
        res.json({success: true, token: token})
        });
    }catch(err){
        err.status = 422;
        err.message = 'Email incorrecto';
        return next(err);
    } 
});

module.exports = router;
