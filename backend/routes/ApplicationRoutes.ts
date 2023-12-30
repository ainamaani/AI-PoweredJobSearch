import express,{ Router }  from "express";
import upload from "../middleware/MulterConfig";

const router : Router = express.Router();
import applicationsController from "../controllers/ApplicationController";

const { newJobApplication, jobApplications } = applicationsController;

router.post('/apply', upload.fields([{name: 'resume', maxCount: 1},{name: 'applicationLetter', maxCount:1}]), newJobApplication )

router.get('/', jobApplications);

export default router;

