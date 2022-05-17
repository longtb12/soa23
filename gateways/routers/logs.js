require("dotenv").config();
var express = require('express');
var router = express.Router()

const prefix = 'logs'

router.post(`/${prefix}/save`, (req, res) => {
  res.send(process.env.LOG_URL + req.path + " called")
})

module.exports = router