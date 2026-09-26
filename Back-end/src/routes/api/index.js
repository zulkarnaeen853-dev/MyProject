const expresss = require('express')
const router = expresss.Router()

const authRoute = require('./authRouter')
const userRoute = require('./userRoute')

router.use('/auth', authRoute)
router.use('/user', userRoute)

module.exports