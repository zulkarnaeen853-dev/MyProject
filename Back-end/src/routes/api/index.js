const express = require('express')
const router = express.Router()

const authRoute = require('./authRouter')
const userRoute = require('./userRoute')

router.use('/auth', authRoute)
router.use('/user', userRoute)

module.exports = router