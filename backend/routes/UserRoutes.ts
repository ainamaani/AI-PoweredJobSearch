import express, { Express,Router } from "express";
const router : Router = express.Router();

import userControllers from "../controllers/UserController";
const { registerUser,loginUser,fetchUsers,handleChangePassword } = userControllers;

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/', fetchUsers);

router.post('/changepassword/:id', handleChangePassword)



export default router;