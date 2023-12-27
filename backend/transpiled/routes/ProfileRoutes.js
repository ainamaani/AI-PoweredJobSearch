"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const MulterConfig_1 = __importDefault(require("../middleware/MulterConfig"));
const ProfileController_1 = __importDefault(require("../controllers/ProfileController"));
const { createNewProfile, getProfiles } = ProfileController_1.default;
router.post('/newprofile', MulterConfig_1.default.fields([{ name: 'profilePic', maxCount: 1 }, { name: 'resume', maxCount: 1 }]), createNewProfile);
router.get('/', getProfiles);
exports.default = router;
