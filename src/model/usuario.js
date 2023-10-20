const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
mongoose.Promise = global.Promise

const Usuario = new mongoose.Schema({
    id: Number,
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    tipo: { type: String, enum: ['cliente', 'prestador'] }
})

Usuario.statics.getNextAutoIncrement = async function () {
    const usuario = await this.findOne({}, {}, { sort: { id: -1 } });
    return usuario ? usuario.id + 1 : 1;
}

Usuario.pre('save', async function (next) {
    const usuario = this
    console.log('presave')
    if (usuario.isNew || usuario.isModified('senha'))
        try {
            const salt = await bcrypt.genSalt(10)
            usuario.senha = await bcrypt.hash(usuario.senha, salt)
        } catch (e) {
            next(e)
        }
    next()
})

Usuario.methods.compareSenha = async function (senha) {
    return await bcrypt.compare(senha, this.senha)
}

Usuario.methods.createToken = function () {
    const { _id } = this
    const expiresIn = '2h'
    return new Promise((res, rej) => {
        try {
            const token = jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn })
            res({ token })
        } catch (error) {
            rej({ error })
        }
    })
}

module.exports = mongoose.model('Usuario', Usuario)
