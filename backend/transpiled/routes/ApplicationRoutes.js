"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MulterConfig_1 = __importDefault(require("../middleware/MulterConfig"));
const router = express_1.default.Router();
const ApplicationController_1 = __importDefault(require("../controllers/ApplicationController"));
const { newJobApplication, jobApplications, downloadResume, downloadApplicationLetter } = ApplicationController_1.default;
router.post('/apply', MulterConfig_1.default.fields([{ name: 'resume', maxCount: 1 }, { name: 'applicationLetter', maxCount: 1 }]), newJobApplication);
router.get('/', jobApplications);
router.get('/downloadresume/:id', downloadResume);
router.get('/downloadapplicationletter/:id', downloadApplicationLetter);
exports.default = router;
