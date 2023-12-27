import  express,{ Router }  from "express";
const router : Router = express.Router();
import upload from "../middleware/MulterConfig";
import profilesController from "../controllers/ProfileController";

const { createNewProfile,getProfiles } = profilesController;

router.post('/newprofile', upload.fields([{name: 'profilePic', maxCount: 1},{name: 'resume', maxCount:1}]) ,createNewProfile)

router.get('/', getProfiles);

export default router;