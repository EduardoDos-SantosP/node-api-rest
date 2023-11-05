const express = require('express')
const usuario_controller = require('./src/controller/usuario_controller.js')
const router = express.Router()

router.get('/', (req, res) => {
    res.json({ ok: true })
})

const models = ['usuario', 'servico']
models.forEach(model => {
    const controller = require(`./src/controller/${model}_controller.js`)
    const validator = (() => {
        try { return require(`./src/validator/${model}_validator.js`) }
        catch { return null }
    })()
    router.get(`/${model}`, controller.all)
    router.post(`/${model}`, ...[validator?.validate, controller.add].filter(m => m))
    router.put(`/${model}/:id`, ...[validator?.validate, controller.edit].filter(m => m))
    router.patch(`/${model}/:id`, ...[validator?.validate, controller.edit].filter(m => m))
    router.delete(`/${model}/:id`, controller.delete)
})
router.post('/login', usuario_controller.login)

module.exports = router
