"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Multer storage configuration
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); // Directory where the uploaded files will be stored
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path_1.default.extname(file.originalname));
    },
});
// Multer file filter to accept only images, PDFs, Word documents, and Excel files
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['.png', '.jpg', '.jpeg', '.pdf', '.doc', '.docx'];
    const extname = path_1.default.extname(file.originalname).toLowerCase();
    if (allowedFileTypes.includes(extname)) {
        cb(null, true);
    }
    else {
        cb(new Error('Only images, PDFs and word documents are allowed.'));
    }
};
// Multer upload instance
const upload = (0, multer_1.default)({ storage: storage, fileFilter: fileFilter });
exports.default = upload;
