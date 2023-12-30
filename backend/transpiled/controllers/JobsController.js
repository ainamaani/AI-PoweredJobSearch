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
const Job_1 = __importDefault(require("../models/Job"));
const addNewJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, company, companyEmail, companyContact, description, category, skills, experience, qualifications, location, salaryRange, jobType, additionalBenefits, applicationDeadline, applicationInstructions } = req.body;
    try {
        const newJob = yield Job_1.default.create({ title, company, companyEmail, companyContact, description, category, skills, experience,
            qualifications, location, salaryRange, jobType, additionalBenefits,
            applicationDeadline, applicationInstructions });
        if (newJob) {
            return res.status(200).json(newJob);
        }
        else {
            return res.status(400).json({ error: "Failed to add the new job" });
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
const fetchJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobs = yield Job_1.default.find({}).sort({ createdAt: -1 });
        if (jobs) {
            return res.status(200).json(jobs);
        }
        else {
            return res.status(400).json({ error: "Failed to fetch job postings" });
        }
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
exports.default = {
    addNewJob, fetchJobs
};
