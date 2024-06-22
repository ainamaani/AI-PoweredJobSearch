import multer from "multer";
import path from "path"
import { Request } from "express";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";


const storage = multer.diskStorage({
  filename: function (req: Request, file: Express.Multer.File, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
      }
});

const upload = multer({storage : storage});

module.exports = upload;

// cloudinary.config({
//   cloud_name: "dkg3cnvfk",
//   api_key: "227973491399799",
//   api_secret: "xzi43GTuOkXwyKyp8GLdm39_uaw",
// });

// // Configure multer storage to use Cloudinary
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "uploads", // Optional - specify the folder for the uploads
//     allowed_formats: ["jpg", "png", "jpeg"], // Optional - specify allowed formats
//     // You can add more options here, such as transformations and public_id
//   },
// });

// // Multer upload instance with Cloudinary storage
// const upload = multer({ storage: storage });

// export default upload;





// import multer from "multer";
// import path from "path"
// import { Request,Response,Express } from "express";

// // Multer storage configuration
// const storage = multer.diskStorage({
//   destination: function (req: Request, file: Express.Multer.File, cb) {
//     cb(null, 'uploads'); // Directory where the uploaded files will be stored
//   },
//   filename: function (req: Request, file: Express.Multer.File, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   },
// });

// // Multer file filter to accept all file types
// const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
//   cb(null, true);
// };

// // Multer upload instance
// const upload = multer({ storage: storage , fileFilter: fileFilter });

// export default upload;
