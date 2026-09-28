const express = require('express')
const router = express.Router()
const authController = require('../../controllers/authController');
const authMiddleware = require('../../middlewares/authMiddleware');
const upload = require('../../configurations/multerConfiguration')


router.get('/users', authController.users);
router.post('/register', upload.single('picture'), authMiddleware, authController.register);

module.exports = router