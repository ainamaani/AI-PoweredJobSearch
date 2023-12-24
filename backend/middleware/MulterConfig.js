
const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Directory where the uploaded files will be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// Multer file filter to accept only images, PDFs, Word documents, and Excel files
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['.png', '.jpg', '.jpeg', '.pdf'];
  const extname = path.extname(file.originalname).toLowerCase();
  if (allowedFileTypes.includes(extname)) {
    cb(null, true);
  } else {
    cb(new Error('Only images, PDFs are allowed.'));
  }
};

// Multer upload instance
const upload = multer({ storage: storage , fileFilter: fileFilter });

module.exports = upload;
