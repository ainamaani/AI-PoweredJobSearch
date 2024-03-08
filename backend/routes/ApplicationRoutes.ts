import express,{ Router }  from "express";
import upload from "../middleware/MulterConfig";

const router : Router = express.Router();
import applicationsController from "../controllers/ApplicationController";
import RequireAuth from "../middleware/RequireAuth";

const { newJobApplication, jobApplications, downloadResume, 
    downloadApplicationLetter, deleteApplication, rejectApplication,
    fetchUserApplications
    } = applicationsController;

// require auth for all application routes.
// router.use(RequireAuth);

router.post('/apply', upload.fields([{name: 'resume', maxCount: 1},{name: 'applicationLetter', maxCount:1}]), newJobApplication )

router.get('/', jobApplications);

router.get('/:id', fetchUserApplications);

router.get('/downloadresume/:id', downloadResume);

router.get('/downloadapplicationletter/:id', downloadApplicationLetter);

router.delete('/delete/:id', deleteApplication);

router.get('/decline/:id', rejectApplication);

export default router;

