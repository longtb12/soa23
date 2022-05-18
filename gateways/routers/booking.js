require("dotenv").config();
var express = require('express');
var router = express.Router()
const apiAdapter = require('./apiAdapter')

const prefix = 'booking'
const api = apiAdapter(process.env.BOOKING_URL)

router.post(`/${prefix}/book`, (req, res) => {
  api.post('/book', req.body).then(resp => {
    res.send({id: resp.data})
  })
  .catch(err=> {
    console.log(err.message)
    res.send(err)
  })
})

module.exports = router