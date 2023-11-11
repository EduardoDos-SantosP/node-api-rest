const usuarioController = require('./src/controller/usuario_controller.js')
const servicoController = require('./src/controller/servico_controller.js')
const usuarioValidator = require('./src/validator/usuario_validator.js')

const router = require('express').Router()

router.get('/', (req, res) => {
    res.json({ ok: true })
})

router.get('/usuario', usuarioController.all)
router.post('/usuario', usuarioValidator.validate, usuarioController.add)
router.put('/usuario/:id', usuarioValidator.validate, usuarioController.edit)
router.delete('/usuario/:id', usuarioController.delete)
router.post('/login', usuarioController.login)

router.get('/servico', servicoController.all)
router.post('/servico', servicoController.add)
router.put('/servico/:id', servicoController.edit)
router.delete('/servico/:id', servicoController.delete)

module.exports = router
