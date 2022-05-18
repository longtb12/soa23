const knex = require('../connector')
const Joi = require('@hapi/joi')
const moment = require('moment')

function schemaLogs() {
    return {
        path: Joi.string().required(),
        request: Joi.string().required(),
        response: Joi.string().required()
    }
}

async function saveLogs(params) {
    const { body } = params
    const schema = schemaLogs()
    const { error } = Joi.validate(body, schema)
    const verbosity = !error || error.details

    if (error) {
        return {
            success: false,
            message: '(╯°□°）╯︵ ┻━┻ missing or invalid params',
            verbosity
        }
    }
    try{
        const data = {...body, create_at: moment().format('DD/MM/YYYY HH:MM:SS').toString()}
        await knex('logs').insert(data)

        return {
            success: true,
            message: `Save logs successful!`
        }
    }
    catch(err) {
        return {
            success: false,
            message: err.message
        }
    }
    
    
}

module.exports = { saveLogs }