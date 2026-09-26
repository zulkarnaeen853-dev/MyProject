const expresss = require('express')
const router = expresss.Router()
const apiRoutes = require('./api')
const api = process.env.BASE_URL

router.use(api, apiRoutes)


module.exports = router