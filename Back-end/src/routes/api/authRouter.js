const express = require('express')
const router = express.Router()
const authController = require('../../controllers/authController');
const authMiddleware = require('../../middlewares/authMiddleware')
const multer = require('multer');


const picStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../../uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

const upload = multer({ storage: picStorage });

router.get('/users', authController.users);
router.post('/register', authMiddleware, authController.register);

module.exports = router