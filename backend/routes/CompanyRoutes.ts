import express, { Router } from "express";
const router : Router = express.Router();
import RequireAuth from "../middleware/RequireAuth";

import companyController from "../controllers/CompanyController";

const { fetchCompanies, followCompany, unfollowCompany, fetchCompanyJobs, handleFollowsCompanyCheck } = companyController;

router.get('/', fetchCompanies);

router.post('/follow/:companyId', followCompany);

router.post('/unfollow/:companyId', unfollowCompany);

router.post('/company/jobs', fetchCompanyJobs);

router.post('/checkfollow', handleFollowsCompanyCheck);

export default router;

