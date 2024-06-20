import express, { Express,Router } from "express";
const router : Router = express.Router();
import upload from "../middleware/MulterConfig";
import RequireAuth from "../middleware/RequireAuth";

import userControllers from "../controllers/UserController";
const { registerUser,loginUser,fetchUsers,handleChangePassword } = userControllers;

router.post('/register',upload.fields([{name: 'companyLogo', maxCount: 1}]), registerUser);

router.post('/login', loginUser);

router.get('/', fetchUsers);

router.post('/changepassword/:id', handleChangePassword)



export default router;