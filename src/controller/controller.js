const { validationResult } = require("express-validator");

/** @param schema: {module:mongoose.Model} */
module.exports = function Controller(schema) {

    /** @type {function(Request, module:mongoose.Model?): module:mongoose.Model} */
    const modelFromRequest = (req, model = new schema()) => {
        for (let prop in schema.schema.obj)
            model[prop] = req.body[prop]
        return model;
    }

    return {
        all: async (req, res) => {
            const itens = await schema.find()
            console.log(itens)
            res.json(itens)
        },
        add: async (req, res) => {
            const errors = validationResult(req)
            if (!errors.isEmpty())
                return res.status(400)
                    .json({ errors: errors.array() })

            const model = modelFromRequest(req)
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
                return res.status(400).json({ errors })
            try {
                const model = modelFromRequest(
                    req,
                    await schema.findOne({ _id: req.params.id })
                )
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
