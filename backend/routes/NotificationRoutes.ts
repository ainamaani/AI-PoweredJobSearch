import express, { Express, Router } from "express";
import notificationControllers from "../controllers/NotificationController";
import { get } from "http";
const router : Router = express.Router()

const {createNewNotification, getMemberNotifications, 
    getAllNotifications, changeNotificationStatus} = notificationControllers;

router.post('/create', createNewNotification);

router.get('/', getAllNotifications);

router.get('/user/:id', getMemberNotifications);

router.get('/read/:id', changeNotificationStatus);

export default router;