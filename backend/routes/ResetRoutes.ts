import express, { Express, Router } from "express";
import RequireAuth from "../middleware/RequireAuth";

const router: Router = express.Router();
import resetPasswordControllers from "../controllers/ResetPasswordController";


const {handlePasswordResetCode, handleResetFogottenPassword,
        getPasswordResetRequests} = resetPasswordControllers;

router.post('/code', handlePasswordResetCode);

router.post('/forgotpassword', handleResetFogottenPassword);

router.get('/requests', getPasswordResetRequests);


export default router;