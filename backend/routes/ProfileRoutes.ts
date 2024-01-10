import  express,{ Router }  from "express";
const router : Router = express.Router();
import upload from "../middleware/MulterConfig";
import profilesController from "../controllers/ProfileController";

const { createNewProfile,getProfiles,getProfileCategories,
    getCategoryProfiles,updateProfile,deleteProfile,getUserProfile,
    handleDownloadResume } = profilesController;

router.post('/newprofile', upload.fields([{name: 'profilePic', maxCount: 1},{name: 'resume', maxCount:1}]) ,createNewProfile)

router.get('/', getProfiles);

router.get('/categories', getProfileCategories);

router.get('/:category', getCategoryProfiles);

router.get('/profile/:id', getUserProfile);

router.delete('/delete/:id', deleteProfile);

router.get('/downloadresume/:id', handleDownloadResume);

router.patch('/updateprofile/:id', upload.fields([{ name: 'profilePic', maxCount: 1 }, { name: 'resume', maxCount: 1 }]), updateProfile);


export default router;