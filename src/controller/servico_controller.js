const Controller = require('controller.js');
const Servico = require('../model/servico.js')

module.exports = {
    ...Controller(Servico)
}
