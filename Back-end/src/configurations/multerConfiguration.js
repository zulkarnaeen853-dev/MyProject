const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2

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


module.exports = upload