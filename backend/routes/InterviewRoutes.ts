import express,{ Router }  from "express";
const router: Router = express.Router();
import interviewsController from "../controllers/InterviewController";

const { scheduleInterview, getInterviews, cancelInterview, 
        doneInterview, getSingleInterview, rescheduleInterview } = interviewsController;

router.post('/schedule', scheduleInterview);

router.get('/', getInterviews);

router.get('/:id', getSingleInterview);

router.get('/cancel/:id', cancelInterview);

router.get('/done/:id', doneInterview);

router.patch('/reschedule/:id', rescheduleInterview);

export default router;