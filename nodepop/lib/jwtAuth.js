'use strict';

const jwt = require('jsonwebtoken');

//Exportamos un creador de middlewares de autenticación
module.exports = () => {
    return function (req, res, next){
        //leer credenciales tanto del body, como del query o las headers
        const token = req.body.token || req.query.token || req.get('x-access-token');
        if(!token){
            const error = new Error('No token provided');
            error.status = 401
            return next(error);
        }
        //comprobar credenciales
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
           if(err){
            const error = new Error('Invalid token');
            error.status = 401
            return next(error);
           } 
        //continuar llamando a next, pero ya que hemos decodificado el token, se lo pasamos al resto de middlewares por si lo necesitan
        req.userId = decodedToken.user_id; //lo guardamos en el req para las siguientes middlewares
        next()
        });
    }
}  