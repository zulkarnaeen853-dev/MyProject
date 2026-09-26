const expresss = require('express')
const router = expresss.Router()

const userController = require('../../controllers/userController');

router.put('/update/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router