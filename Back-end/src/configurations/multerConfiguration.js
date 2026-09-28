const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

// const picStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, '../../uploads'));
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = "img-" + Date.now() + '-' + file.originalname;
//     cb(null, uniqueSuffix);
//   },
// });

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'tungsahur',
    // format: async (req, file) => 'png', 
    allowed_formats: ["JPEG", "PNG", "HEIC", "WebP", "AVIF", "BMP", "TIFF", "GIF"]

  },
});
    
const upload = multer({ storage: storage });


module.exports = upload