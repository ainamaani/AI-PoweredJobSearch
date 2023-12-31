import { Request, Response } from "express";
import Interview from "../models/Interview";
import Application from "../models/Application";

const scheduleInterview = async(req: Request, res: Response) => {
    const { applicationId,interviewDate,interviewTime,location,additionalNotes } = req.body;
    try {
        // grab the job corresponding with the application
        const application = await Application.findById(applicationId);
        if(application){
            const job = application.job;

            const interview = await Interview.create({ job, interviewDate, interviewTime, 
                location, additionalNotes, interviewStatus: "Scheduled" });

            if(interview){
                return res.status(200).json(interview);
            }else{
                return res.status(400).json({ error: "Failed to schedule interview" })
            }
        }else{
            return res.status(400).json({ error: "Failed to get corresponding application" });
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

const getInterviews = async(req: Request, res: Response) =>{
    try {
        const interviews = await Interview.find({}).populate('job').sort({ createdAt: -1 });
        if(interviews){
            return res.status(200).json(interviews);
        }else{
            return res.status(400).json({ error: "Failed to fetch interviews" });
        }
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
}

export default {
    scheduleInterview, getInterviews
}