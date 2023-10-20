const express = require('express')
const usuario_validator = require('./src/validator/usuario_validator.js')
const usuario_controller = require('./src/controller/usuario_controller.js')
const router = express.Router()


router.get('/' , (req , res) => {
    res.json({ ok: true })
})

router.get('/usuario', usuario_controller.all)
router.post('/usuario', usuario_validator.validate, usuario_controller.add)
router.put('/usuario/:id', usuario_validator.validate, usuario_controller.edit)
router.patch('/usuario/:id', usuario_validator.validate, usuario_controller.edit)
router.delete('/usuario/:id', usuario_controller.delete)

module.exports = router
