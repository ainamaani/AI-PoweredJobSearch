import express,{ Router } from "express";
const router : Router = express.Router();
import jobsController from "../controllers/JobsController";

const { addNewJob,fetchJobs } = jobsController;

router.post('/newjob', addNewJob);

router.get('/', fetchJobs);

export default router;