import express,{ Router }  from "express";
import upload from "../middleware/MulterConfig";

const router : Router = express.Router();
import applicationsController from "../controllers/ApplicationController";

const { newJobApplication, jobApplications, downloadResume, downloadApplicationLetter } = applicationsController;

router.post('/apply', upload.fields([{name: 'resume', maxCount: 1},{name: 'applicationLetter', maxCount:1}]), newJobApplication )

router.get('/', jobApplications);

router.get('/downloadresume/:id', downloadResume);

router.get('/downloadapplicationletter/:id', downloadApplicationLetter);

export default router;

