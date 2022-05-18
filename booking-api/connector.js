require("dotenv").config();
const Knex = require('knex')

const knex = Knex({
    client: 'mysql2',
    connection: process.env.MYSQL_CONNECTION
})

module.exports = knex
