const Category = require('../model/category')
const {validationResult, matchedData} = require('express-validator')

module.exports = {
    add: async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty())
            return res.status(400)
                .json({errors: errors.array()})

        const data = matchedData(req)

        const category = new Category()
        
        category.name = data.name
        category.type = data.type
        category.status = data.status

        res.json({category})
    }
}