"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const JobsController_1 = __importDefault(require("../controllers/JobsController"));
const { addNewJob, fetchJobs } = JobsController_1.default;
router.post('/newjob', addNewJob);
router.get('/', fetchJobs);
exports.default = router;
