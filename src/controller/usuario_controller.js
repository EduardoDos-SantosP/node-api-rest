const Controller = require('./controller.js')
const Usuario = require('../model/usuario.js')

module.exports = {
    ...Controller(Usuario),
    login: async (req, res) => {
        console.log(res.body);
        const usuario = await Usuario.findOne({ login: req.body.login })
        if (!usuario || !(await usuario.compareSenha(req.body.senha)))
            return res.status(400).json({ error: 'Credenciais incorretas' })

        const token = await usuario.createToken()
        return res.json(token)
    }
}
