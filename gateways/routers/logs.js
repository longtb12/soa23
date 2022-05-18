require("dotenv").config();
var express = require('express');
var router = express.Router()
const apiAdapter = require('./apiAdapter')

const prefix = 'logs'
const api = apiAdapter(process.env.LOG_URL)

router.post(`/${prefix}/save-logs`, (req, res) => {
  api.post('/save-logs', req.body).then(resp => {
    res.send(resp.data)
  })
  .catch(err => {
    console.log(err.message)
    res.send(err)
  })
})

module.exports = router