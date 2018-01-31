'use strict';

const mongoose = require('mongoose');

const tagTypes = ['work', 'lifestyle', 'motor', 'mobile']

//Creamos el Esquema
const anuncioSchema = mongoose.Schema({
    nombre: { type: String,  index: true },
    venta:  { type: Boolean, index: true },
    precio: { type: Number,  index: true },
    foto: String,
    tags: { type: [{ type: String, enum: tagTypes}], index: true}
    //tags: { type: [{ type: String, enum: ['work', 'lifestyle', 'motor', 'mobile'] }]}
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
//Creamos método estático para listar Tags
anuncioSchema.statics.listTags = function() {
    return tagTypes;
}

//Creamos el Modelo
const Anuncio = mongoose.model('Anuncios', anuncioSchema);

//Exportamos el modelo
module.exports = Anuncio;