import express,{ Router } from "express";
import recommendationsController from "../controllers/RecommendationsController";
import RequireAuth from "../middleware/RequireAuth";

const router : Router = express.Router();
const {handleJobsRecommendations} = recommendationsController;

router.get('/:sector', handleJobsRecommendations);

export default router;