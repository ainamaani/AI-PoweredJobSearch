import { Response, Request } from "express"
import Company from "../models/Company";
import Job from "../models/Job";

const fetchCompanies = async(req: Request, res: Response) =>{
    try {
        const companies = await Company.find({}).sort({ createdAt: -1 });
        if(companies){
            return res.status(200).json(companies);
        }else{
            return res.status(400).json({ error: "Failed to fetch companies data" });
        }
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
}


const followCompany = async(req: Request, res: Response) =>{
    const { companyId } = req.params;
    const { userId } = req.body;

    try {
       const addFollowing = await Company.findByIdAndUpdate(
            companyId,
            {$addToSet: { followers: userId }},
            { new: true }
       ) 
       if(addFollowing){
            return res.status(200).json(addFollowing);
       }

    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
}

const unfollowCompany = async(req: Request,res: Response) => {
    const { companyId } = req.params;
    const { userId } = req.body;

    try {
        const removeFollowing = await Company.findByIdAndUpdate(
            companyId,
            {$pull: { followers: userId }},
            { new: true }
        ) 
        if(removeFollowing){
            return res.status(200).json(removeFollowing);
        }
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
}


const fetchCompanyJobs : any = async(req: Request, res: Response) => {
    try {
        const { userId } = req.body; // Assuming the user ID is sent in the request body

        // Step 1: Fetch all companies
        const companies = await Company.find({});

        // Step 2: Initialize an empty array to store followed company names
        const followedCompanies: string[] = [];

        // Step 3: Check if the user is among the followers of each company
        for (const company of companies) {
            if (company.followers.includes(userId)) { // Assuming userId is a string
                followedCompanies.push(company.company); // Add company name to the list
            }
        }

        console.log(followedCompanies);

        // Step 4: Fetch jobs posted by followed companies
        const jobs = await Job.find({ company: { $in: followedCompanies } });

        // Step 5: Send the jobs to the frontend
        if (jobs.length > 0) {
            return res.status(200).json(jobs);
        } else {
            return res.status(404).json({ message: "No jobs found for followed companies" });
        }
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
};

export default {
    fetchCompanies,
    followCompany,
    unfollowCompany,
    fetchCompanyJobs
}