require("dotenv").config();
var express = require('express');
var router = express.Router()

const prefix = 'notification'

router.post(`/${prefix}/send-email`, (req, res) => {
    res.send(process.env.NOTIFICATION_URL + req.path + " called")
})

module.exports = router