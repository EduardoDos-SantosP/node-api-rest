const Controller = require('./controller.js')
const Usuario = require('../model/usuario.js')

module.exports = {
    ...Controller(Usuario),
    login: async (req, res) => {
        const usuario = await Usuario.findOne({ email: req.body.email })
        if (!usuario || !(await usuario.compareSenha(req.body.senha)))
            return res.status(400).json({ error: 'Credenciais incorretas' })

        const token = await usuario.createToken()
        return res.json(token)
    }
}
