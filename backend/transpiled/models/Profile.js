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
const mongoose_1 = __importDefault(require("mongoose"));
const ProfileSchema = new mongoose_1.default.Schema({
    // user:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:User,
    //     required:[true, "The user for the profile is required"]
    // },
    firstname: {
        type: String,
        required: [true, "The first name is required"]
    },
    lastname: {
        type: String,
        required: [true, "The last name is required"]
    },
    gender: {
        type: String,
        required: [true, "Gender is required"],
        enum: {
            values: ["male", "female"],
            message: "The gender can only be male or female"
        }
    },
    nationality: {
        type: String,
        required: [true, "Nationality is required"]
    },
    dateOfBirth: {
        type: Date,
        required: [true, "The date of birth is required"],
        validate: {
            validator: function (value) {
                // Define the minimum allowed year 
                const minimumYear = 2007;
                // Extract the year from the date of birth
                const birthYear = value.getFullYear();
                // Check if the birth year is after the minimum year
                return birthYear <= minimumYear;
            },
            message: 'Please enter a valid date of birth'
        }
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: function (value) {
                return __awaiter(this, void 0, void 0, function* () {
                    // Check if the email format is valid
                    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                    if (!emailRegex.test(value)) {
                        throw new Error('Invalid email format. Please provide a valid email address.');
                    }
                    // Check if the email is already in use
                    const existingMember = yield Profile.findOne({ email: value });
                    if (existingMember) {
                        throw new Error('Email already exists');
                    }
                });
            }
        }
    },
    phoneContact: {
        type: String,
        required: [true, "The phone number is required"],
        validate: {
            validator: function (value) {
                return __awaiter(this, void 0, void 0, function* () {
                    // Check if the phone number has at least 10 digits
                    if (value.length < 10) {
                        throw new Error('Phone number must be not less than 10 digits');
                    }
                    //check for uniqueness
                    const existingPhoneNumber = yield Profile.findOne({ phoneNumber: value });
                    if (existingPhoneNumber) {
                        throw new Error('This Phone number already exists');
                    }
                });
            }
        }
    },
    profilePic: {
        type: String,
        default: null
    },
    profession: {
        type: String,
        required: [true, "Your profession is required"]
    },
    personalDescription: {
        type: String,
        required: [true, "A description about yourself is required"]
    },
    website: {
        type: String,
        default: "None"
    },
    github: {
        type: String,
        default: "None"
    },
    socialmedia: {
        linkedIn: {
            type: String,
            default: "None"
        },
        twitter: {
            type: String,
            default: "None"
        },
        facebook: {
            type: String,
            default: "None"
        },
        instagram: {
            type: String,
            default: "None"
        }
    },
    resume: {
        type: String,
        required: [true, "Your resume/curriculum vitae is required"]
    }
}, { timestamps: true });
const Profile = mongoose_1.default.model('Profile', ProfileSchema);
exports.default = Profile;
