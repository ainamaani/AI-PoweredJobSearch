import express, { Router } from "express";
const router : Router = express.Router();

import companyController from "../controllers/CompanyController";

const { fetchCompanies, followCompany } = companyController;

router.get('/', fetchCompanies);

router.post('/follow/:companyId', followCompany);

export default router;

