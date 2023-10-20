const { checkSchema }  = require('express-validator')

module.exports = {
    validate: checkSchema({
        name: {
            isString: true,
            notEmpty: true,
            trim: true
        }
    })
}