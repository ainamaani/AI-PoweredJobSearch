import express, { Express, Router } from "express";
import notificationControllers from "../controllers/NotificationController";
import { get } from "http";
const router : Router = express.Router()
import RequireAuth from "../middleware/RequireAuth";

const {createNewNotification, getMemberNotifications, 
    getAllNotifications, changeNotificationStatus} = notificationControllers;

router.post('/create', createNewNotification);

router.get('/', getAllNotifications);

router.get('/user/:id', getMemberNotifications);

router.get('/read', changeNotificationStatus);

export default router;