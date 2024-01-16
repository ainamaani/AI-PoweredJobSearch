import Notification from "../models/Notification";
import { Request,Response } from "express";

const createNewNotification = async(req: Request,res: Response) =>{
    try {
        const { user, subject, message, type } = req.body;
        const notification = await Notification.create({
            user, subject, message, type
        })
        if(notification){
            return res.status(200).json(notification);
        }else{
            return res.status(400).json({ error: 'Failed to create new notification' });
        }
    } catch (error: any) {
        return res.status(400).json({ error: error.message })
    }
}

const getMemberNotifications = async(req: Request,res: Response) =>{
    try {
        const {id} = req.params;
        const membernotifications = await Notification.find({ user: id });
        if(membernotifications){
            return res.status(200).json(membernotifications);
        }else{
            return res.status(400).json({ error: 'Failed to get member notifications' });
        }
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
}

const getAllNotifications = async(req: Request,res: Response) =>{
    try {
        const notifications = await Notification.find({});
        if(notifications){
            return res.status(200).json(notifications);
        }else{
            return res.status(400).json({ error: "Failed to fetch all notifications" });
        }
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
}

const changeNotificationStatus = async(req: Request, res: Response) =>{
    try {
        const {id} = req.params;
        const notification = await Notification.findById(id);
        if(notification){
            notification.isUnread = false;
            await notification.save({ validateBeforeSave: false });
            return res.status(200).json(notification);
        }else{
            return res.status(400).json({ error: "Failed to fetch the notification to change status" })
        }
    } catch (error: any) {
        return res.status(400).json({ error: error.message })
    }
}

export default {
    createNewNotification,
    getMemberNotifications,
    getAllNotifications,
    changeNotificationStatus
}