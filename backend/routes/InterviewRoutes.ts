import express,{ Router }  from "express";
const router: Router = express.Router();
import RequireAuth from "../middleware/RequireAuth";
import interviewsController from "../controllers/InterviewController";


const { scheduleInterview, getInterviews, cancelInterview, 
        doneInterview, getSingleInterview, rescheduleInterview,
        fetchUserInterviews, fetchCompanyInterviews
        } = interviewsController;



router.post('/schedule', scheduleInterview);

router.get('/', getInterviews);

router.get('/:id', getSingleInterview);

router.get('/user/:id', fetchUserInterviews);

router.get('/company/:company', fetchCompanyInterviews);

router.get('/cancel/:id', cancelInterview);

router.get('/done/:id', doneInterview);

router.patch('/reschedule/:id', rescheduleInterview);

export default router;