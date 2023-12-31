import express,{ Router }  from "express";
const router: Router = express.Router();
import interviewsController from "../controllers/InterviewController";

const { scheduleInterview, getInterviews } = interviewsController;

router.post('/schedule', scheduleInterview);

router.get('/', getInterviews);

export default router;