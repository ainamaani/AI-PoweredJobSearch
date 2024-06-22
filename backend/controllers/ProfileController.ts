import Profile from "../models/Profile";
import { Request, Response } from "express";
import path from "path";
import mongoose from "mongoose";
import multer from "multer";

const createNewProfile = async(req: Request,res: Response) =>{
    try {
        // Get the uploaded file path from the request object
        const profilePicPath = (req.files as { [fieldname: string]: Express.Multer.File[] })['profilePic'][0].path;
        

        // Upload images to Cloudinary
        const profilePicUpload = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload(profilePicPath, (error, result) => {
                if (error) reject(error);
                resolve(result);
            });
        });


        // Destructure other data properties from  the request object
        const { user,firstname,lastname,dateOfBirth,gender,nationality,email,phoneContact,category,profession,
                personalDescription,website,github,linkedIn,twitter,facebook,instagram } = req.body;

        const profileData : any = {
            user,firstname,lastname,dateOfBirth,email,gender,
            nationality,phoneContact,category,profession,personalDescription,website,
            github,profilePic:profilePicUpload.secure_url,
            socialmedia:{
                linkedIn,twitter,facebook,instagram
            }
        }

        // Remove properties with undefined values to prevent overriding default values
        Object.keys(profileData).forEach(key => profileData[key] === undefined && delete profileData[key]);
        
        const profile = await Profile.create(profileData);
                    

        if(profile){
            return res.status(200).json(profile);
        }else{
            return res.status(400).json("Failed to create new job");
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

const getProfiles = async(req: Request,res: Response) =>{
    try {
        const profiles = await Profile.find({}).sort({ createdAt: -1 });
        if(profiles){
            return res.status(200).json(profiles);
        }else{
            return res.status(400).json({ error: "Failed to fetch user profiles" });
        }
        
    } catch (error:any) {
        return res.status(400).json({ error: error.message });
    }
}

const getProfileCategories = async( req: Request,res: Response ) =>{
    try {
        const categories = await Profile.distinct('category');
        if(categories){
            return res.status(200).json(categories)
        }
        else{
            return res.status(400).json({ error: "Failed to fetch the categories" });
        }
    } catch (error:any) {
        return res.status(400).json({ error: error.message })
    }
}

const getCategoryProfiles = async(req: Request,res: Response) =>{
    const { category } = req.params;
    try {
        const categoryProfiles = await Profile.find({ category:category });
        if(categoryProfiles){
            return res.status(200).json(categoryProfiles);
        }else{
            return res.status(400).json({ error: "Failed to fetch category profiles" });
        }
    } catch (error: any) {
        return res.status(400).json({ error: error.message })
    }
}

const updateProfile = async(req: Request, res: Response) =>{
    try {
        const {id} = req.params;
        // get profile corresponding to the user
        const existingProfile = await Profile.findOne({ user: id });
        if(!existingProfile){
            return res.status(400).json({ error: "Profile to update not found"});
        }
        // Handle file updates
        console.log(req.files);
        if (req.files && ('profilePic' in req.files || 'resume' in req.files)) {
            const profilePicPath = (req.files as { [fieldname: string]: Express.Multer.File[] })['profilePic'][0].path;
            const resumePath = (req.files as { [fieldname: string]: Express.Multer.File[] })['resume'][0].path;
            // Update the profile with new file paths
            await existingProfile.updateOne({
            profilePic: profilePicPath,
            resume: resumePath,
            });
        }

        // Destructure other data properties from the request object
        const { user, firstname, lastname, dateOfBirth, gender, nationality, email, phoneContact, category, profession,
        personalDescription, website, github, linkedIn, twitter, facebook, instagram } = req.body;

        // Update the profile with other data properties
        const updatedprofile = await existingProfile.updateOne({
        user, firstname, lastname, dateOfBirth, email, gender, nationality, phoneContact, category,
        profession, personalDescription, website, github, linkedIn, twitter, facebook, instagram,
        });

        if(updatedprofile){
            return res.status(200).json(updatedprofile);
        }else{
            return res.status(400).json({ error: "Failed to update the profile" });
        }
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
}

const deleteProfile = async(req: Request, res: Response) =>{
    try {
        const { id } = req.params;
        const profileToDelete = await Profile.findByIdAndDelete(id);
        if(profileToDelete){
            return res.status(200).json(profileToDelete);
        }else{
            return res.status(400).json({ error: "Failed to delete project" });
        }
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
}

const getUserProfile = async(req: Request, res: Response) =>{
    try {
        const {id} = req.params;
        const profile = await Profile.findOne({ user: id });
        if(profile){
            return res.status(200).json(profile);
        }else{
            return res.status(404).json({ error: "Profile not found" });
        }
    } catch (error: any) {
        return res.status(400).json({ error: error.message })
    }

}

const handleDownloadResume = async(req: Request,res: Response) =>{
    try {
        const { id } = req.params;
        // get the profile corresponding to the id
        const profile = await Profile.findById(id);
        if(!profile){
            return res.status(400).json({ error: "The profile does not exist" });
        }
        if(!profile.resume){
            return res.status(400).json({ error: "The resume is not available to be downloaded" });
        }

        const resumePath = profile.resume;
        res.sendFile(path.resolve(resumePath));
    } catch (error: any) {
        return res.status(400).json({ error: error.message })
    }
}

export default {
    createNewProfile,getProfiles,getProfileCategories,getCategoryProfiles,
    updateProfile,deleteProfile,getUserProfile,handleDownloadResume
}