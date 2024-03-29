import Application from "../models/Application";
import { Request, Response } from "express";
import path from "path";

const newJobApplication = async(req: Request, res: Response) =>{
    try {
        // get uploaded files from the request object
        const resumePath = (req.files as { [fieldname: string]: Express.Multer.File[] })['resume'][0].path;
        const applicationLetterPath = (req.files as { [fieldname: string]: Express.Multer.File[] })['applicationLetter'][0].path;

        // destructure other properties off the request object
        const { job } = req.body;

        // create a new Application object and save it in the database
        const application = await Application.create({
            job,resume:resumePath,applicationLetter:applicationLetterPath,
            applicationDate:new Date()
        })
        if(application){
            return res.status(200).json(application)
        }else{
            return res.status(400).json({ error: "Failed to add the new application" });
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

const jobApplications = async(req: Request, res: Response) =>{
    try {
        const jobapplications = await Application.find({}).populate('job').sort({ createdAt: -1 });
        if(jobapplications){
            return res.status(200).json(jobapplications);
        }else{
            return res.status(400).json({ error: "Failed to fetch job applications" })
        }
    } catch (error: any) {
        return res.status(400).json({ error: error.message })
    }
}

const downloadResume = async(req: Request, res: Response) =>{
    const resumeId = req.params;
    try {
        const application = await Application.findById(resumeId);
        if( !application || !application.resume ){
            return res.status(404).json({ error: "Job application not found" });
        }

        const resumePath = application.resume;
        res.sendFile(path.resolve(resumePath));
    } catch (error: any) {
        return res.status(400).json({ error: error.message })
    }
}

const downloadApplicationLetter = async(req: Request, res: Response) =>{
    const applicationLetterId = req.params;
    try {
        const application = await Application.findById(applicationLetterId);

        if( !application || !application.applicationLetter ){
            return res.status(404).json({ error: "Job application not found" });
        }

        const applicationLetterPath = application.applicationLetter;
        res.sendFile(path.resolve(applicationLetterPath));
    } catch (error: any) {
        return res.status(400).json({ error: error.message })
    }
}

export default {
    newJobApplication,
    jobApplications,
    downloadResume,
    downloadApplicationLetter
};