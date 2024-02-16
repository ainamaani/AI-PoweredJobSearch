import { Request, Response } from "express";
import RoadMap from "../models/Roadmap";
import { RoadMapI } from "../models/Roadmap";

const handleAddRoadMap = async(req: Request, res: Response) =>{
    try {
        // Get the uploaded file path from the request object
        const roleBackgroundImagePath = (req.files as { [fieldname: string]: Express.Multer.File[] })['roleBackgroundImage'][0].path;
        const roleFrontImagePath = (req.files as { [fieldname: string]: Express.Multer.File[] })['roleFrontImage'][0].path;

        // Destructure other properties from the request object
        const {profession, role, description, step, subStep, subStepUrl} = req.body;

        // create new roadmap object
        const roadmap = await RoadMap.create({
            profession,
            role,
            description,
            step: {
            title: step,
            subStep: { name: subStep, url: subStepUrl },
            },
            roleBackgroundImage: roleBackgroundImagePath,
            roleFrontImage: roleFrontImagePath,
        });

        if(roadmap){
            return res.status(200).json(roadmap);
        }else{
            return res.status(400).json({ error: "Failed to add new roadmap to the db" });
        }
    } catch (error : any) {
        return res.status(400).json({ error: error.message })
    }
}

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

export default {
    handleAddRoadMap, handleFetchAllRoadMaps, handleFetchProfessionRoadMaps
}