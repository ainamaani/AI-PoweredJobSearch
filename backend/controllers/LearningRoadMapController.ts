import { Request, Response } from "express";
import RoadMap from "../models/RoadMap";
import { RoadMapI } from "../models/RoadMap";
import upload from "../middleware/MulterConfig";
import cloudinary from "../config/cloudinary";

interface CloudinaryResult {
    secure_url: string;
}

const handleAddRoadMap = async (req: Request, res: Response) => {
    try {
        // Get the uploaded file paths from the request object
        const roleBackgroundImagePath = (req.files as { [fieldname: string]: Express.Multer.File[] })['roleBackgroundImage'][0].path;
        const roleFrontImagePath = (req.files as { [fieldname: string]: Express.Multer.File[] })['roleFrontImage'][0].path;

        // Upload images to Cloudinary
        const backgroundUpload = await new Promise<CloudinaryResult>((resolve, reject) => {
            cloudinary.uploader.upload(roleBackgroundImagePath, (error : any, result : any) => {
                if (error) reject(error);
                resolve(result as CloudinaryResult);
            });
        });

        const frontUpload = await new Promise<CloudinaryResult>((resolve, reject) => {
            cloudinary.uploader.upload(roleFrontImagePath, (error : any, result : any) => {
                if (error) reject(error);
                resolve(result as CloudinaryResult);
            });
        });

        // Destructure other properties from the request object
        const { profession, role, description, steps } = req.body;

        // Create new roadmap object
        const roadmap = await RoadMap.create({
            profession,
            role,
            description,
            steps: JSON.parse(steps),
            roleBackgroundImage: backgroundUpload.secure_url,
            roleFrontImage: frontUpload.secure_url,
        });

        if (roadmap) {
            return res.status(200).json(roadmap);
        } else {
            return res.status(400).json({ error: "Failed to add new roadmap to the db" });
        }
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
};




const handleFetchAllRoadMaps = async(req: Request, res: Response) => {
    try {
        const roadmaps = await RoadMap.find({});
        if(roadmaps){
            return res.status(200).json(roadmaps);
        }else{
            return res.status(400).json({ error: "Failed to fetch the roadmaps" })
        }
    } catch (error: any) {
        return res.status(400).json({ error: error.message })
    }
}

const handleFetchProfessionRoadMaps = async(req: Request, res: Response) => {
    const {profession} = req.params;
    try {
        const professionRoadMaps = await RoadMap.find({ profession:profession });
        if(professionRoadMaps){
            return res.status(200).json(professionRoadMaps);
        }else{
            return res.status(400).json({ error: "Failed to fetch profession road maps" });
        }
    } catch (error : any) {
        return res.status(400).json({ error: error.message })
    }
}

const handleFetchSingleRoadMap = async(req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const roadmap = await RoadMap.findById(id);
        if(roadmap){
            return res.status(200).json(roadmap);
        }else{
            return res.status(400).json({ error: "Failed to fetch the single roadmap" });
        }
    } catch (error : any) {
        return res.status(400).json({ error: error.message });
    }
}

export default {
    handleAddRoadMap, handleFetchAllRoadMaps, handleFetchProfessionRoadMaps,
    handleFetchSingleRoadMap
}