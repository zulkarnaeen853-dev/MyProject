const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const upload = require('../../configurations/multerConfiguration')


router.put('/update/:id', upload.single('picture'), userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;