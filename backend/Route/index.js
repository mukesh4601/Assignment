const express = require('express')
const router = express.Router()
const middleware = require("../Middleware/auth_check")

const login = require("../Controller/login")
const calender = require("../Controller/calender")
const register = require("../Controller/register")

router.post('/login', login._login)
router.post('/register', register._register)
router.post('/calender-data', middleware, calender._getcalanderDetails)

module.exports = router