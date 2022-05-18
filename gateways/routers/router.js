const express = require('express');
const router = express.Router()
const booking = require('./booking')
const notification = require('./notification')
const logs = require('./logs')

router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
})

router.use(booking)
router.use(notification)
router.use(logs)

module.exports = router