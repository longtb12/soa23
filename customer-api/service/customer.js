const knex = require('../connector')
const Joi = require('@hapi/joi')

function schemaCustomer() {
    return {
        name: Joi.string().required(),
        age: Joi.number().required(),
        address: Joi.string().required()
    }
}

async function insert(params) {
    const { body } = params
    const schema = schemaCustomer()
    const { error } = Joi.validate(body, schema)
    const verbosity = !error || error.details

    if (error) {
        return {
            success: false,
            message: '(╯°□°）╯︵ ┻━┻ missing or invalid params',
            verbosity
        }
    } else {
        const data = await knex('customer').insert(body).then(res => res[0])
        return data
    }  
}

module.exports = { insert }