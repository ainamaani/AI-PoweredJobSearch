import multer from "multer";
import path from "path"
import { Request } from "express";
import { v2 as cloudinary } from "cloudinary";


const storage = multer.diskStorage({
  filename: function (req: Request, file: Express.Multer.File, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
      }
});

const upload = multer({storage : storage});

export default upload;


