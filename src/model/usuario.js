const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const Usuario = new mongoose.Schema({
    id: Number,
    nome: { type: String, required: true },
    email: { type: String, required: true },
    tipo: { type: String, enum: ['cliente', 'prestador'] }
})

Usuario.statics.getNextAutoIncrement = async function () {
    const usuario = await this.findOne({}, {}, { sort: { id: -1 } });
    return usuario ? usuario.id + 1 : 1;
};

module.exports = mongoose.model('Usuario', Usuario)
