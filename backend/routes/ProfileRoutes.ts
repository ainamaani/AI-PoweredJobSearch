import  express,{ Router }  from "express";
const router : Router = express.Router();
import upload from "../middleware/MulterConfig";
import profilesController from "../controllers/ProfileController";

const { createNewProfile,getProfiles,getProfileCategories,getCategoryProfiles } = profilesController;

router.post('/newprofile', upload.fields([{name: 'profilePic', maxCount: 1},{name: 'resume', maxCount:1}]) ,createNewProfile)

router.get('/', getProfiles);

router.get('/categories', getProfileCategories);

router.get('/:category', getCategoryProfiles);

export default router;