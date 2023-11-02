const { validationResult } = require("express-validator");

/** @param schema: Model */
module.exports = function Controller(schema) {
    return {
        all: async (req, res) => {
            const itens = await schema.find()
            res.json(itens)
        },
        add: async (req, res) => {
            const errors = validationResult(req)
            if (!errors.isEmpty())
                return res.status(400)
                    .json({ errors: errors.array() })

            const model = new schema()

            for (const prop in req.body)
                model[prop] = req.body[prop]

            try {
                await model.save()
                res.json(model)
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
                const model = await schema.findOne({ _id: req.params.id })

                for (const prop in req.body)
                    model[prop] = req.body[prop]
                await model.save()

                res.json(model)
            } catch (ex) {
                if (ex.path !== '_id') throw ex
                let error = 'Registro não encontrado'
                res.status(404).json({ error })
            }
        },
        delete: async (req, res) => {
            try {
                const { id } = req.params
                const info = await schema.findOneAndRemove({ _id: id })
                res.json(info)
            } catch (ex) {
                if (ex.path !== '_id') throw ex
                let error = 'Registro não encontrado'
                res.status(404).json({ error })
            }
        }
    }
}
