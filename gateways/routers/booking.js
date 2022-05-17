require("dotenv").config();
var express = require('express');
var router = express.Router()

const prefix = 'booking'

router.post(`/${prefix}/book`, (req, res) => {
  res.send(process.env.BOOKING_URL + req.path + " called")
})

module.exports = router