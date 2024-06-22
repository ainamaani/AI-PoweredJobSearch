import { Request, Response } from "express";
import path from "path";
import Application from "../models/Application";
import Job from "../models/Job";
import User from "../models/User";
import Profile from "../models/Profile";
import sendEmail from "../functions/SendEmail";
import upload from "../middleware/MulterConfig";
import cloudinary from "../config/cloudinary";
import { v2 as cloudinaryV2 } from "cloudinary";
import axios from "axios";

interface CloudinaryResult {
    secure_url: string;
}

const newJobApplication = async (req: Request, res: Response) => {
    try {
        const { applicant, job, applicantSkills } = req.body;

        const applicantt = await User.findById(applicant);
        const jobb = await Job.findById(job);

        if (!applicantt || !jobb) {
            return res.status(404).json({ error: 'Applicant or Job not found' });
        }

        const existingApplication = await Application.findOne({ applicant, job });
        if (existingApplication) {
            return res.status(400).json({ error: "You have already applied for this job" });
        }


        // Get the uploaded file paths from the request object
        const resumePath = (req.files as { [fieldname: string]: Express.Multer.File[] })['resume'][0].path;
        const applicationLetterPath = (req.files as { [fieldname: string]: Express.Multer.File[] })['applicationLetter'][0].path;

        // const resumeFile = req.files['resume'][0];
        // const applicationLetterFile = req.files['applicationLetter'][0];

        // Generate custom filenames
        const resumeFileName = `${applicantt.firstname}-${applicantt.lastname}-${jobb.title}-${jobb.company}-resume.pdf`;
        const applicationLetterFileName = `${applicantt.firstname}-${applicantt.lastname}-${jobb.title}-${jobb.company}-applicationLetter.pdf`;

        // Upload files to Cloudinary
        const resumeUpload = await cloudinary.uploader.upload(resumePath, {
            public_id: resumeFileName.replace(/\.[^/.]+$/, ''), // Remove file extension
            resource_type: 'auto',
            type: 'upload'
        });

        const applicationLetterUpload = await cloudinary.uploader.upload(applicationLetterPath, {
            public_id: applicationLetterFileName.replace(/\.[^/.]+$/, ''), // Remove file extension
            resource_type: 'auto',
            type: 'upload'
        });

        // Create a new Application object and save it
        const application = await Application.create({
            applicant,
            job,
            resume: resumeUpload.secure_url,
            applicationLetter: applicationLetterUpload.secure_url,
            applicantSkills,
            applicationDate: new Date()
        });

        if (application) {
            // Update job's number of applicants
            jobb.numberOfApplicants += 1;
            await jobb.save({ validateBeforeSave: false });

            return res.status(200).json(application);
        } else {
            return res.status(400).json({ error: "Failed to add the new application" });
        }
    } catch (error: any) {
        // Handle validation errors
        if (error.name === 'ValidationError' || error.code === 11000) {
            const errors: { [key: string]: string } = {};
            for (const field in error.errors) {
                errors[field] = error.errors[field].message;
            }
            return res.status(400).json({ errors });
        }
        // Handle other types of errors (e.g., database errors)
        return res.status(500).json({ error: error.message });
    }
};

const jobApplications = async (req: Request, res: Response) => {
    try {
        const jobapplications = await Application.find({}).populate('job').populate('applicant').sort({ createdAt: -1 });
        if (jobapplications) {
            return res.status(200).json(jobapplications);
        } else {
            return res.status(400).json({ error: "Failed to fetch job applications" });
        }
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
};

// Function to extract the public ID from the Cloudinary URL
const extractPublicId = (url: string): string => {
    const parts = url.split('/');
    const uploadIndex = parts.indexOf('upload');
    const publicIdParts = parts.slice(uploadIndex + 2); // Adjusted index to skip 'upload' and the following segment
    const publicId = publicIdParts.join('/').replace(/\.[^/.]+$/, "");
    return publicId;
};

const downloadResume = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const application = await Application.findById(id);
        if (!application || !application.resume) {
            return res.status(404).json({ error: "Applicant resume not found" });
        }

        // Extract the public ID from the resume URL
        const resumeUrl = application.resume;
        const publicId = extractPublicId(resumeUrl);

        // Generate the signed URL using Cloudinary SDK
        const signedUrl = cloudinary.url(publicId, {
            secure: true,
            type: 'private',
            sign_url: true,
        });

        // Send the signed URL to the frontend
        res.status(200).json({ url: signedUrl });
    } catch (error: any) {
        console.error("Error fetching resume URL:", error);
        return res.status(400).json({ error: error.message });
    }
};

const downloadApplicationLetter = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const application = await Application.findById(id);

        if (!application || !application.applicationLetter) {
            return res.status(404).json({ error: "Job application not found" });
        }

        const applicationLetterPath = application.applicationLetter;
        res.sendFile(path.resolve(applicationLetterPath));
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
};

const deleteApplication = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const applicationDeleted = await Profile.findByIdAndDelete(id);
        if (applicationDeleted) {
            return res.status(200).json(applicationDeleted);
        } else {
            return res.status(400).json({ error: "Failed to delete the application" });
        }
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
};

const rejectApplication = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const applicationToReject = await Application.findById(id).populate('applicant').populate('job');
        if (applicationToReject) {
            applicationToReject.applicationStatus = "Declined";
            await applicationToReject.save({ validateBeforeSave: false });
            res.status(200).json(applicationToReject);

            // Send email to the applicant after rejection asynchronously
            try {
                await sendEmail(
                    applicationToReject.applicant?.email,
                    `${applicationToReject.job.title} application feedback`,
                    `Dear ${applicationToReject.applicant.firstname} ${applicationToReject.applicant.lastname}
We appreciate your interest in the ${applicationToReject.job.title} position at ${applicationToReject.job.company}. 
After careful consideration, we regret to inform you that your application has been declined.
While we were impressed with your qualifications and experience, we have chosen to move forward 
with other candidates who more closely match the requirements of the role.
We want to express our gratitude for the time and effort you invested in the application process. 
We encourage you to keep an eye on our career opportunities, as new positions become available.
Thank you again for considering ${applicationToReject.job.company} as a potential employer. 
We wish you the best in your job search and future endeavors.
If you have any questions or would like feedback on your application, feel free to reach out.
Best regards,
Serunjogi Huzaifa
Human Resource Manager
Elite developers.
+256 770941412`
                );
                console.log("Email sent successfully."); // Log success
            } catch (error) {
                console.error("Error sending email:", error); // Log error
            }
        } else {
            return res.status(400).json({ error: 'Failed to find the application' });
        }
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
};

const fetchUserApplications = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const userApplications = await Application.find({ applicant: id }).populate('applicant').populate('job');
        if (userApplications) {
            return res.status(200).json(userApplications);
        } else {
            return res.status(400).json({ error: "Failed to retrieve the documents" });
        }
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
};

const fetchCompanyApplications = async (req: Request, res: Response) => {
    const { company } = req.params;
    console.log(company);
    try {
        const applications = await Application.find({})
            .populate({
                path: 'job',
                match: { company: company } // Filter jobs by company
            })
            .populate('applicant');

        // Filter applications to include only those with matching jobs
        const filteredApplications = applications.filter(app => app.job !== null);

        if (filteredApplications.length > 0) {
            return res.status(200).json(filteredApplications);
        } else {
            return res.status(404).json({ error: "No applications found for the company" });
        }
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
};

const selectBestApplicants = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        console.log(id);

        // Get the job details
        const job = await Job.findById(id);

        if (!job) {
            return res.status(400).json({ error: "Couldn't find the job" });
        }

        // Get all applications for the job
        const applications = await Application.find({ job: id }).populate('applicant');

        // Calculate similarity scores for each applicant's skills
        const rankedApplicants = applications.map(application => {
            const applicantSkills = application?.applicantSkills.split(',').map(skill => skill.trim());
            const jobRequiredSkills = job?.skills.split(',').map(skill => skill.trim());

            // Calculate Jaccard similarity coefficient
            const intersection = applicantSkills.filter(skill => jobRequiredSkills.includes(skill));
            const union = [...new Set([...applicantSkills, ...jobRequiredSkills])];
            const similarityScore = intersection.length / union.length;

            console.log(application.applicant);

            return {
                applicant: application.applicant,
                applicant_firstname: application.applicant.firstname,
                applicant_lastname: application.applicant.lastname,
                applicant_email: application.applicant.email,
                similarityScore: similarityScore,
                similarityPercentage: similarityScore * 100
            };
        });

        // Sort applicants by similarity score in descending order
        const sortedApplicants = rankedApplicants.sort((a, b) => b.similarityScore - a.similarityScore);
        return res.status(200).json(sortedApplicants);

    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
};

export default {
    newJobApplication,
    jobApplications,
    downloadResume,
    downloadApplicationLetter,
    deleteApplication,
    rejectApplication,
    fetchUserApplications,
    selectBestApplicants,
    fetchCompanyApplications
};
