const knex = require('../connector')
const Joi = require('@hapi/joi')

function schemaCustomer() {
    return {
        name: Joi.string().required(),
        age: Joi.number().required(),
        address: Joi.string().required(),
        email: Joi.string().required()
    }
}

function schemaBooking() {
    return {
        name: Joi.string().required(),
        age: Joi.number().required(),
        address: Joi.string().required(),
        email: Joi.string().required(),
        books: Joi.array().items(Joi.object().keys({
            id: Joi.number().required(),
            quantity: Joi.number().required(),
            price: Joi.number().required()
        })).min(1).required(),
        from_date: Joi.string().required(),
        to_date: Joi.string().required()
    }
}

async function insertCustomer(params) {
    const schema = schemaCustomer()
    const { error } = Joi.validate(params, schema)
    const verbosity = !error || error.details

    if (error) {
        return {
            success: false,
            message: '(╯°□°）╯︵ ┻━┻ missing or invalid params',
            verbosity
        }
    } else {
        const data = await knex('customer').insert(params).then(res => res[0])
        return data
    }  
}

async function insertBooking(params) {
    return knex('booking').insert(params).then(res => res[0])
}

async function insertBookingDetails(params) {
    return knex('booking_detail').insert(params)
}

async function calcTotalPrice(params) {
    let total = 0
    params.forEach(element => {
        total += element.price * element.quantity
    })

    return total
}

async function bookingProcess(params) {
    const { body } = params
    const schema = schemaBooking()
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
        const data = await insertCustomer({
            name: body.name, 
            age: body.age, 
            address: body.address,
            email: body.email
        })
        
        const dataBooking = {
            customer_id: data,
            from_date: body.from_date,
            to_date: body.to_date,
            total_price: await calcTotalPrice(body.books)
        }

        const book_id = await insertBooking(dataBooking)

        const bookDetails = body.books.map(ele => {
            return {
                booking_id: book_id,
                book_id: ele.id,
                quantity: ele.quantity,
                price: ele.price
            }
        })
        await insertBookingDetails(bookDetails)

        return {
            success: true,
            message: `Order successful with id: ${book_id}`
        }
    }
    catch(err) {
        return {
            success: false,
            message: err.message
        }
    }
    
    
}

module.exports = { bookingProcess }