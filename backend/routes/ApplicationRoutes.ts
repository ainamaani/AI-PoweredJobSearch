import express, { Router } from "express";
import upload from "../middleware/MulterConfig";
import applicationsController from "../controllers/ApplicationController";

const router: Router = express.Router();
const {
    newJobApplication,
    jobApplications,
    downloadResume,
    downloadApplicationLetter,
    deleteApplication,
    rejectApplication,
    fetchUserApplications,
    selectBestApplicants,
    fetchCompanyApplications
} = applicationsController;

router.post('/apply', upload.fields([{ name: 'resume', maxCount: 1 }, { name: 'applicationLetter', maxCount: 1 }]), newJobApplication);

router.get('/', jobApplications);

router.get('/user/:id', fetchUserApplications);

router.get('/company/:company', fetchCompanyApplications);

router.get('/downloadresume/:id', downloadResume);

router.get('/downloadapplicationletter/:id', downloadApplicationLetter);

router.delete('/delete/:id', deleteApplication);

router.get('/decline/:id', rejectApplication);

router.get('/bestapplicants/:id', selectBestApplicants);

export default router;
