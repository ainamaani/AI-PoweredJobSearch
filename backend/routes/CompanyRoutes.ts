import express, { Router } from "express";
const router : Router = express.Router();
import RequireAuth from "../middleware/RequireAuth";

import companyController from "../controllers/CompanyController";

const { fetchCompanies, followCompany, unfollowCompany, fetchCompanyJobs } = companyController;

router.get('/', fetchCompanies);

router.post('/follow/:companyId', followCompany);

router.post('/unfollow/:companyId', unfollowCompany);

router.post('/company/jobs', fetchCompanyJobs);

export default router;

