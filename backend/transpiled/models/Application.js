"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Job_1 = __importDefault(require("./Job"));
const ApplicationSchema = new mongoose_1.default.Schema({
    // applicant:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: User,
    //     required: [true, "The applicant is required"]
    // },
    job: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: Job_1.default,
        required: [true, "The job being applied for required"]
    },
    applicationDate: {
        type: Date,
        required: [true, "The application date is required"]
    },
    resume: {
        type: String,
        required: [true, "The resume of the applicant is required"]
    },
    applicationLetter: {
        type: String,
        required: [true, "The application letter of the applicant is required"]
    },
    applicationStatus: {
        type: String,
        default: "Pending",
        enum: {
            values: ["Pending", "Declined", "Accepted"],
            message: "The application status has to be one of 'Pending','Declined' or 'Accepted'"
        }
    }
}, { timestamps: true });
const Application = mongoose_1.default.model('Application', ApplicationSchema);
exports.default = Application;
