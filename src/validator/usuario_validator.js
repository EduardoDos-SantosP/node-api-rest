const { checkSchema }  = require('express-validator')

module.exports = {
    validate: checkSchema({
        nome: {
            notEmpty: {
                errorMessage: 'Nome é obrigatório'
            }
        },
        login: {
            isEmail: {
                errorMessage: 'E-mail é obrigatório'
            }
        }
    })
}
