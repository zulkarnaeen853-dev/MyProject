const express = require('express');
const router = express.Router();

const apiRoutes = require('./api');
const api = process.env.BASE_URL || '/api/v1'

router.use(api, apiRoutes);

module.exports = router;