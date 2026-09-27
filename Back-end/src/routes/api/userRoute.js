const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const userController = require('../../controllers/userController');

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

router.put('/update/:id', upload.single('picture'), userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;