'use strict';

const mongoose = require('mongoose');

//Creamos el Esquema
const anuncioSchema = mongoose.Schema({
    nombre: { type: String, index: true },
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: { type: [{ type: String, enum: ['work', 'lifestyle', 'motor', 'mobile'] }]}
});

//Creamos método estático para listar
anuncioSchema.statics.list = function(filters, limit, skip, sort, fields) {
    //obtenemos la query sin ejecutarla
    const query = Anuncio.find(filters);
    query.limit(limit);
    query.skip(skip);
    query.sort(sort);
    query.select(fields);
    //ejecutamos la query y devolvemos la promesa
    return query.exec();
}

//Creamos el Modelo
const Anuncio = mongoose.model('Anuncios', anuncioSchema);

//Exportamos el modelo
module.exports = Anuncio;