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
const Application_1 = __importDefault(require("../models/Application"));
const path_1 = __importDefault(require("path"));
const newJobApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get uploaded files from the request object
        const resumePath = req.files['resume'][0].path;
        const applicationLetterPath = req.files['applicationLetter'][0].path;
        // destructure other properties off the request object
        const { job } = req.body;
        // create a new Application object and save it in the database
        const application = yield Application_1.default.create({
            job, resume: resumePath, applicationLetter: applicationLetterPath,
            applicationDate: new Date()
        });
        if (application) {
            return res.status(200).json(application);
        }
        else {
            return res.status(400).json({ error: "Failed to add the new application" });
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
const jobApplications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobapplications = yield Application_1.default.find({}).populate('job').sort({ createdAt: -1 });
        if (jobapplications) {
            return res.status(200).json(jobapplications);
        }
        else {
            return res.status(400).json({ error: "Failed to fetch job applications" });
        }
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
const downloadResume = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resumeId = req.params;
    try {
        const application = yield Application_1.default.findById(resumeId);
        if (!application || !application.resume) {
            return res.status(404).json({ error: "Job application not found" });
        }
        const resumePath = application.resume;
        res.sendFile(path_1.default.resolve(resumePath));
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
const downloadApplicationLetter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const applicationLetterId = req.params;
    try {
        const application = yield Application_1.default.findById(applicationLetterId);
        if (!application || !application.applicationLetter) {
            return res.status(404).json({ error: "Job application not found" });
        }
        const applicationLetterPath = application.applicationLetter;
        res.sendFile(path_1.default.resolve(applicationLetterPath));
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
exports.default = {
    newJobApplication,
    jobApplications,
    downloadResume,
    downloadApplicationLetter
};
