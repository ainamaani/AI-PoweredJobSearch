"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const JobSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, "Job title is required"]
    },
    company: {
        type: String,
        required: [true, "The hiring company is required"]
    },
    companyEmail: {
        type: String,
        required: [true, "The company email is required"],
        validate: {
            validator: function (value) {
                // Check if the email format is valid
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                return emailRegex.test(value);
            },
            message: "Please enter a valid company email"
        }
    },
    companyContact: {
        type: String,
        required: [true, "The contact information is required"],
        validate: {
            validator: function (value) {
                // Check if the phone number has at least 10 digits
                return value.length >= 10;
            },
            message: "Please enter a valid contact details"
        }
    },
    description: {
        type: String,
        required: [true, "Job description is required"]
    },
    category: {
        type: String,
        required: [true, "Job category is required"]
    },
    skills: {
        type: String,
        required: [true, "Skills required for the job must be filled in"]
    },
    experience: {
        type: String,
        required: [true, "The minimum level of experience is required"]
    },
    qualifications: {
        type: String,
        required: [true, "Qualifications required for the job must be filled in"]
    },
    location: {
        type: String,
        required: [true, "The job location is required"]
    },
    salaryRange: {
        type: String,
        required: [true, "The salary range is required"]
    },
    status: {
        type: String,
        default: "open"
    },
    jobType: {
        type: String,
        required: [true, "The job type is required"],
        enum: {
            values: ["full-time", "part-time", "contract"],
            message: "The job type must be one of the values 'full-time','part-time' or 'contract' "
        }
    },
    additionalBenefits: {
        type: String,
        default: "None"
    },
    applicationDeadline: {
        type: Date,
        required: [true, "The application deadline date is required"],
        validate: {
            validator: function (value) {
                // check if the date supplied is valid(not in the past)
                return value >= new Date();
            },
            message: "Enter a valid application deadline, it can't be a past date!!"
        }
    },
    applicationInstructions: {
        type: String,
        required: [true, "The information on how to apply is required"]
    }
}, { timestamps: true });
const Job = mongoose_1.default.model('Jobs', JobSchema);
exports.default = Job;
