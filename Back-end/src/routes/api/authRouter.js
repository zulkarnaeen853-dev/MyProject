const express = require('express')
const router = express.Router()
const authController = require('../../controllers/authController');
const authMiddleware = require('../../middlewares/authMiddleware');
const multer = require('multer');
const path = require('path');


const picStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = "img-" + Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: picStorage });

router.get('/users', authController.users);
router.post('/register', upload.single('picture'), authMiddleware, authController.register);

module.exports = router