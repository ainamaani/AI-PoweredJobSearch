import Job from "../models/Job";
import { Request, Response } from "express";

const addNewJob = async(req: Request,res: Response) =>{
    const { title,company,companyEmail,companyContact,description,category,skills,experience,
            qualifications,location,salaryRange,jobType,additionalBenefits,
            applicationDeadline,applicationInstructions } = req.body;

    try {
        const newJob = await Job.create({ title,company,companyEmail,companyContact,description,category,skills,experience,
            qualifications,location,salaryRange,jobType,additionalBenefits,
            applicationDeadline,applicationInstructions })

        if(newJob){
            return res.status(200).json(newJob);
        }else{
            return res.status(400).json({ error: "Failed to add the new job" })
        }
    } catch (error: any) {
        // Check if the error is a validation error
      if (error.name === 'ValidationError' || error.code === 11000) {
          const errors: {[key:string]: string}  = {};
  
          // Iterate through the validation errors and build the errors object
          for (const field in error.errors) {
            errors[field] = error.errors[field].message;
          }
          return res.status(400).json({ errors });
      }
      // Handle other types of errors (e.g., database errors) here
      return res.status(500).json({ error: error.message });
  }
}

const fetchJobs = async(req: Request,res: Response) =>{
    try {
        const jobs = await Job.find({}).sort({ createdAt: -1 });
        if(jobs){
            return res.status(200).json(jobs);
        }else{
            return res.status(400).json({ error: "Failed to fetch job postings" });
        }
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
}

export default {
    addNewJob,fetchJobs}
