require('dotenv').config({ quiet: true });
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Not an image, please upload an image!'), false);
  },
});

//! Upload to Cloudinary BEFORE controller
const uploadToCloudinary = async (req, res, next) => {
  if (!req.file) return next();

  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'Expense_Tracker_Project',
          transformation: [{ width: 300, height: 300, crop: 'limit' }],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      stream.end(req.file.buffer);
    });

    req.body.profilePic = result.secure_url; 
    next();
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Image upload failed', details: err.message });
  }
};

module.exports = { upload, uploadToCloudinary };
