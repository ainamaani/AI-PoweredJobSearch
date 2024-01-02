import express, { Express,Router } from "express";
const router : Router = express.Router();

import userControllers from "../controllers/UserController";
const { registerUser,loginUser,fetchUsers } = userControllers;

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/', fetchUsers);

export default router;