const Controller = require('./controller.js');
const Servico = require('../model/servico.js')

const base = Controller(Servico)
module.exports = {
    ...base,
    async add(req, res) {
        req.body.idPrestador ??= req.usuario._id
        return base.add(req, res)
    }
}
