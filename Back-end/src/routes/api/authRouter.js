const expresss = require('express')
const router = expresss.Router()

const authController = require('../../controllers/authController');
const authMiddleware = require('../../middlewares/authMiddleware')

router.get('/users', authController.users);
router.post('/register', authMiddleware, authController.register);

module.exports = router