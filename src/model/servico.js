const mongoose = require('mongoose');
const Usuario = require('./usuario.js')
const { ObjectID } = require("mongoose/lib/schema/index.js");

const Servico = new mongoose.Schema({
    nome: { type: String, require: true },
    preco: { type: Number, require: true },
    idPrestador: { type: ObjectID, require: true }
})

/*Servico.pre('save', async function (next) {
    const _id = this._id
    console.log({_id})
    if (!(await Usuario.exists({ _id })))
        throw new Error('O serviço não pode ser vinculado à o usuário inexistente ' + _id)

    next()
})*/

module.exports = mongoose.model('Servico', Servico)
