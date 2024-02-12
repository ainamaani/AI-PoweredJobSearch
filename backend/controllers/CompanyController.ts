import { Response, Request } from "express"
import Company from "../models/Company";

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

export default {
    fetchCompanies,
    followCompany,
    unfollowCompany
}