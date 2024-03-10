import express,{ Router } from "express";
const router : Router = express.Router();
import jobsController from "../controllers/JobsController";
import RequireAuth from "../middleware/RequireAuth";

const { addNewJob,fetchJobs,fetchSingleJob } = jobsController;

router.post('/newjob', addNewJob);

router.get('/', fetchJobs);

router.get('/:id', fetchSingleJob);

export default router;