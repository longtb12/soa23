require("dotenv").config();
var express = require('express');
var router = express.Router()
const apiAdapter = require('./apiAdapter')

const prefix = 'customer'
const api = apiAdapter(process.env.CUSTOMER_URL)

router.post(`/${prefix}/insert`, (req, res) => {
  api.post('/insert', req.body).then(resp => {
    res.send({id: resp.data})
  })
  .catch(err=> {
    console.log(err.message)
    res.send(err)
  })
})

module.exports = router