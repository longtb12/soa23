require("dotenv").config();
var express = require('express');
var router = express.Router()
const apiAdapter = require('./apiAdapter')

const prefix = 'notification'
const api = apiAdapter(process.env.NOTIFICATION_URL)

router.post(`/${prefix}/send-email`, (req, res) => {
    api.post('/send-email', req.body).then(resp => {
        res.send(resp.data)
    })
    .catch(err => {
        console.log(err.message)
        res.send(err)
    })
})

module.exports = router