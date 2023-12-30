import multer from "multer";
import path from "path"
import { Request,Response,Express } from "express";

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, 'uploads'); // Directory where the uploaded files will be stored
  },
  filename: function (req: Request, file: Express.Multer.File, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// Multer file filter to accept only images, PDFs, Word documents, and Excel files
const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  const allowedFileTypes = ['.png', '.jpg', '.jpeg', '.pdf', '.doc', '.docx'];
  const extname = path.extname(file.originalname).toLowerCase();
  if (allowedFileTypes.includes(extname)) {
    cb(null, true);
  } else {
    cb(new Error('Only images, PDFs and word documents are allowed.'));
  }
};

// Multer upload instance
const upload = multer({ storage: storage , fileFilter: fileFilter });

export default upload;
