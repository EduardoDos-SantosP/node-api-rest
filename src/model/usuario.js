const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
mongoose.Promise = global.Promise

const Usuario = new mongoose.Schema({
    nome: { type: String, required: true },
    login: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    tipo: { type: String, enum: ['cliente', 'prestador'] }
})

// Usuario.statics.getNextAutoIncrement = async function () {
//     const usuario = await this.findOne({}, {}, { sort: { id: -1 } });
//     return usuario ? usuario.id + 1 : 1;
// }

Usuario.pre('save', function (next) {
    const usuario = this
    if (usuario.isNew || usuario.isModified?.('senha'))
        try {
            console.log(new Date().toLocaleTimeString())
            const salt = bcrypt.genSaltSync(10)
            usuario.senha = bcrypt.hashSync(usuario.senha, salt)
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
            const token = jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn }, null)
            res({ token })
        } catch (error) {
            rej({ error })
        }
    })
}

module.exports = mongoose.model('Usuario', Usuario)
