const Usuario = require('../model/usuario.js')
const { validationResult } = require('express-validator')

module.exports = {
    login: async (req, res) => {
        const usuario = await Usuario.findOne({ email: req.body.email })
        if (!usuario || !(await usuario.compareSenha(req.body.senha)))
            return res.status(400).json({ error: 'Credenciais incorretas' })
        await usuario.createToken()
            .then(res.status(200).json)
            .catch(res.status(401).json)
    },
    all: async (req, res) => {
        const itens = await Usuario.find()
        res.json(itens)
    },
    add: async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty())
            return res.status(400)
                .json({ errors: errors.array() })

        const usuario = new Usuario()

        for (const prop in req.body)
            usuario[prop] = req.body[prop]

        try {
            await usuario.save()
            res.json(usuario)
        } catch (error) {
            res.json({ error })
        }
    },
    edit: async (req, res) => {
        const errors = validationResult(req).array()
            .filter(v => v.path in req.body)
        if (errors.length)
            return res.status(400)
                .json({ errors })
        try {
            const usuario = await Usuario
                .findOneAndUpdate(
                    { _id: req.params.id },
                    req.body,
                    { returnDocument: "after" }
                )
            res.json(usuario)
        } catch (ex) {
            if (ex.path !== '_id') throw ex
            let error = 'Registro não encontrado'
            res.status(404).json({ error })
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const info = await Usuario.findOneAndRemove({ _id: id })
            res.json(info)
        } catch (ex) {
            if (ex.path !== '_id') throw ex
            let error = 'Registro não encontrado'
            res.status(404).json({ error })
        }
    }
}
