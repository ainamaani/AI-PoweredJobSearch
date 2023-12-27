"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Profile_1 = __importDefault(require("../models/Profile"));
const createNewProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get the uploaded file path from the request object
        const profilePicPath = req.files['profilePic'][0].path;
        const resumePath = req.files['resume'][0].path;
        // Destructure other data properties from  the request object
        const { firstname, lastname, dateOfBirth, gender, nationality, email, phoneContact, profession, personalDescription, website, github, linkedIn, twitter, facebook, instagram } = req.body;
        const profile = yield Profile_1.default.create({ firstname, lastname, dateOfBirth, email, gender, nationality, phoneContact,
            profession, personalDescription, website, github, linkedIn, twitter, facebook, instagram,
            profilePic: profilePicPath, resume: resumePath
        });
        if (profile) {
            return res.status(200).json(profile);
        }
        else {
            return res.status(400).json("Failed to create new job");
        }
    }
    catch (error) {
        // Check if the error is a validation error
        if (error.name === 'ValidationError' || error.code === 11000) {
            const errors = {};
            // Iterate through the validation errors and build the errors object
            for (const field in error.errors) {
                errors[field] = error.errors[field].message;
            }
            return res.status(400).json({ errors });
        }
        // Handle other types of errors (e.g., database errors) here
        return res.status(500).json({ error: error.message });
    }
});
const getProfiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profiles = yield Profile_1.default.find({}).sort({ createdAt: -1 });
        if (profiles) {
            return res.status(200).json(profiles);
        }
        else {
            return res.status(400).json({ error: "Failed to fetch user profiles" });
        }
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
exports.default = {
    createNewProfile, getProfiles
};
