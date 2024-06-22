import User from "../models/User";
import Company from "../models/Company";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import validator from "validator";
import sendEmail from "../functions/SendEmail";
import upload from "../middleware/MulterConfig";
import { v2 as cloudinary } from "cloudinary";

interface CloudinaryResult {
    secure_url: string;
}

const registerUser = async (req: Request, res: Response) => {
    try {
        let companyLogo = null;
        if (req.files && 'companyLogo' in req.files) {
            companyLogo = (req.files as { [fieldname: string]: Express.Multer.File[] })['companyLogo'][0].path;

            // Upload images to Cloudinary
            const companyLogoUpload = await new Promise<CloudinaryResult>((resolve, reject) => {
                cloudinary.uploader.upload(companyLogo, (error, result) => {
                    if (error) reject(error);
                    resolve(result as CloudinaryResult);
                });
            });

            companyLogo = companyLogoUpload.secure_url;
        }

        const { firstname, lastname, email, userCategory, sector, company,
            companyEmail, companyDescription, industry, location, companyWebsiteUrl, password, passwordConfirm } = req.body;

        // check passwords if they match
        if (password !== passwordConfirm) {
            return res.status(400).json({ "error": "The passwords do not match" });
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ "error": "Please enter a strong password" });
        }

        // generate salt to hash the passwords
        const salt = await bcrypt.genSalt(10);

        // create a hashed password using the generated salt
        const hashedPassword = await bcrypt.hash(password, salt);

        // register the user in the database
        const newUser = await User.create({
            firstname, lastname, email, sector, userCategory, password: hashedPassword
        });

        if (newUser.userCategory === "Recruiter") {
            // register the company and details
            const newCompany = await Company.create({
                company, companyEmail, companyDescription, industry,
                location, member: email, companyWebsiteUrl, companyLogo
            });
        }

        if (newUser) {
            sendEmail(newUser.email,
                'Welcome to CareerConnect - Unlocking New Opportunities in Your Job Search!',
                `Dear ${newUser.firstname} ${newUser.lastname},
We are thrilled to welcome you to CareerConnect, the AI-Powered Job Search and Matching 
Platform designed to revolutionize your job search experience. Thank you for registering with 
us and taking the first step toward discovering exciting career opportunities in Uganda.

Your Journey Begins Here:

At CareerConnect, our mission is to bridge the gap between job seekers like you and the myriad 
of employment opportunities available in various organizations. Our advanced artificial 
intelligence and machine learning algorithms are dedicated to providing you with intelligent 
and personalized job recommendations tailored to your skills, preferences, and career aspirations.

What to Expect:

1. Smart Job Matching: Our algorithms analyze your uploaded resume to match you with suitable job 
openings from diverse industries and sectors.

2. Enhanced Awareness: Stay informed about the latest job openings in your field with our 
platform's ability to analyze vast datasets and keep you updated on relevant opportunities.

3. Efficient Recruitment Process: For employers, CareerConnect streamlines the recruitment 
process, making it easier for organizations to connect with talented individuals like yourself.

4. Personalized Experience: Your job search experience is personalized to cater to your unique 
background and career goals, ensuring that you receive recommendations that truly matter to you.

What's Next?

Now that you've successfully registered, we encourage you to complete your profile by adding 
additional details about your skills, experience, and preferences. The more information you 
provide, the more accurate and tailored your job recommendations will be.

Feel free to explore the platform, upload your resume, and start receiving personalized job 
recommendations right away. If you have any questions or encounter any issues, our support 
team is here to assist you. Simply reach out to careerconnect@gmail.com, and we'll be happy 
to help.

Thank you for choosing CareerConnect to embark on your job search journey. We look forward to 
being part of your success story.

Best regards,

Wamimbi Ronald
Systems Administrator
CareerConnect
+256 743152570 `
            );

            return res.status(200).json(newUser);
        } else {
            return res.status(400).json({ error: "Failed to register new user" });
        }
    } catch (error: any) {
        // Check if the error is a validation error
        if (error.name === 'ValidationError' || error.code === 11000) {
            const errors: { [key: string]: string } = {};

            // Iterate through the validation errors and build the errors object
            for (const field in error.errors) {
                errors[field] = error.errors[field].message;
            }
            return res.status(400).json({ errors });
        }
        // Handle other types of errors (e.g., database errors) here
        return res.status(500).json({ error: error.message });
    }
};

// function to create the json webtokens
const createToken = (_id: mongoose.Types.ObjectId) => {

    const secret = process.env.SECRET;
    if (!secret) {
        throw new Error("The JWT token is not defined in the environment variables");
    }
    return jwt.sign({ _id }, secret, { expiresIn: '3d' });
};

const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Both the email and password are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "Invalid credentials" });
        }

        const storedPassword = user.password;

        const match = await bcrypt.compare(password, storedPassword);
        if (match) {
            let company;
            if (user.userCategory === 'Recruiter') {
                company = await Company.findOne({ member: email });
            }

            const token = createToken(user._id);
            const userData = {
                token,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                sector: user.sector,
                id: user._id,
                userCategory: user.userCategory,
                company: user.userCategory === 'Recruiter' ? company?.company : null,
                isFollowingCompany: false // Adjust based on your logic
            };

            // Check if the user is following any company
            if (user.userCategory === 'Job seeker') {
                const companies = await Company.find({ followers: user._id });
                userData.isFollowingCompany = companies.length > 0;
            }

            return res.status(200).json(userData);
        } else {
            return res.status(400).json({ error: "Invalid credentials" });
        }

    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
};

const fetchUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({}).sort({ createdAt: -1 });
        if (users) {
            return res.status(200).json(users);
        } else {
            return res.status(400).json({ error: "Failed to fetch the users" });
        }
    } catch (error: any) {
        console.log(error);
    }
};

const handleChangePassword = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: "All fields are required" });
        }
        // fetch user changing password
        const userchanging = await User.findById(id);
        if (!userchanging) {
            return res.status(400).json({ error: "The user trying to change password does not exist" });
        }
        const currentStoredPassword = userchanging.password;
        console.log(currentPassword);
        // check if the supplied password is the correct current password
        const matches = await bcrypt.compare(currentPassword, currentStoredPassword);
        if (!matches) {
            return res.status(400).json({ error: "Please provide the correct current password" });
        }
        // check for the strength of the password
        if (!validator.isStrongPassword(newPassword)) {
            return res.status(400).json({ error: "Please enter a strong password" });
        }
        // generate salt to hash new password
        const salt = await bcrypt.genSalt(10);
        // hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        userchanging.password = hashedNewPassword;
        userchanging.save({ validateBeforeSave: false })
            .then((data) => {
                return res.status(200).json(data);
            }).catch((error) => {
                return res.status(400).json({ error: error.message });
            });
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
};

export {
    registerUser,
    loginUser,
    fetchUsers,
    handleChangePassword
};
