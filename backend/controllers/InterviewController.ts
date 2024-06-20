import { Request, Response } from "express";
import Interview from "../models/Interview";
import Application from "../models/Application";
import CheckInterviewDueStatus from "../functions/CheckInterviewDueStatus";

const scheduleInterview = async(req: Request, res: Response) => {
    const { applicationId,interviewDate,interviewTime,location,additionalNotes } = req.body;
    try {
        // grab the job corresponding with the application
        const application = await Application.findById(applicationId);
        if(application){
            const job = application.job;
            const applicant = application.applicant;

            const interviewAlreadyScheduled = await Interview.findOne({ 
                applicant:applicant, 
                job:job,
                interviewDate:interviewDate,
                interviewTime:interviewTime
            });
            if(interviewAlreadyScheduled){
                return res.status(400).json({ error: "The same exact interview has already been scheduled." });
            }

            const interview = await Interview.create({ applicant, job, interviewDate, interviewTime, 
                location, additionalNotes, interviewStatus: "Scheduled" });

            if(interview){
                application.applicationStatus = "Accepted";
                application.save({ validateBeforeSave:false });
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
        CheckInterviewDueStatus();
        const interviews = await Interview.find({}).populate('job').populate('applicant').sort({ createdAt: -1 });
        if(interviews){
            return res.status(200).json(interviews);
        }else{
            return res.status(400).json({ error: "Failed to fetch interviews" });
        }
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
}

const getUserInterviews = async(req: Request, res: Response) => {
    try {
        const {userId} = req.params;

        const userInterviews = await Interview.find({ applicant : userId });
        if(userInterviews){
            return res.status(200).json(userInterviews);
        }else{
            return res.status(400).json({ error: "Failed to fetch user interviews" });
        }
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
}

const fetchCompanyInterviews = async(req: Request, res: Response) =>{
    const {company} = req.params;
    console.log(company);
    try {
        const interviews = await Interview.find({})
            .populate({
                path: 'job',
                match: { company: company } // Filter jobs by company
            })
            .populate('applicant');

        // Filter interviews to include only those with matching jobs
        const filteredInterviews = interviews.filter(app => app.job !== null);

        if (filteredInterviews.length > 0) {
            return res.status(200).json(filteredInterviews);
        } else {
            return res.status(404).json({ error: "No interviews found for the company" });
        }
    } catch (error:any) {
        return res.status(400).json({ error: error.message });
    }
}

const getSingleInterview = async(req: Request, res: Response) =>{
    try {
        const {id} = req.params;
        const interview = await Interview.findById(id).populate('job').populate('applicant');
        if(interview){
            return res.status(200).json(interview);
        }else{
            return res.status(400).json({ error: "Failed to fetch the interview requested" });
        }
     
    } catch (error: any) {
        return res.status(400).json({ error: error.message })
    }
}

const cancelInterview = async(req: Request, res: Response) =>{
    try {
        const {id} = req.params;
        const interviewToCancel  = await Interview.findById(id);
        if(interviewToCancel){
            interviewToCancel.interviewStatus = "Cancelled"
            interviewToCancel.save({ validateBeforeSave : false });
            return res.status(200).json(interviewToCancel);
        }else{
            return res.status(400).json({ error: "Failed to fetch the interview to cancel" });
        }
    } catch (error: any) {
        return res.status(400).json({ error: error.message })
    }
}

const doneInterview = async(req: Request, res: Response) =>{
    try {
        const {id} = req.params;
        const interviewDone  = await Interview.findById(id);
        if(interviewDone){
            interviewDone.interviewStatus = "Completed"
            interviewDone.save({ validateBeforeSave : false });
            return res.status(200).json(interviewDone);
        }else{
            return res.status(400).json({ error: "Failed to fetch the done interview" });
        }
    } catch (error: any) {
        return res.status(400).json({ error: error.message })
    }
}

const rescheduleInterview = async(req: Request, res: Response) =>{
    try {
        const {id} = req.params;
        const updatedFields = req.body;

        const reschedule = await Interview.findByIdAndUpdate(id, updatedFields,{new:true});
        if(reschedule){
            return res.status(200).json(reschedule);
        }else{
            return res.status(400).json({ error: "Failed to reschedule interview" });
        }
    } catch (error: any) {
        return res.status(400).json({ error: error.message })
    }
}

const fetchUserInterviews = async(req: Request, res: Response) =>{
    const {id} = req.params;

    try {
        const userInterviews = await Interview.find({ applicant:id });
        if(userInterviews){
            return res.status(200).json(userInterviews);
        }else{
            return res.status(400).json({ error: "Failed to retrieve the documents" });
        }
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
}

export default {
    scheduleInterview, getInterviews, cancelInterview, doneInterview, getSingleInterview,
    rescheduleInterview, fetchUserInterviews, fetchCompanyInterviews
}