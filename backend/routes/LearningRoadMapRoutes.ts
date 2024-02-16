import express, { Router } from "express";
const router : Router = express.Router();
import learningRoadMapControllers from "../controllers/LearningRoadMapController";
import upload from "../middleware/MulterConfig";

const {handleAddRoadMap, handleFetchAllRoadMaps, handleFetchProfessionRoadMaps} = learningRoadMapControllers;

router.post('/add', upload.fields([{name: 'roleBackgroundImage', maxCount:1},{name: 'roleFrontImage', maxCount:1}]), handleAddRoadMap);

router.get('/', handleFetchAllRoadMaps);

router.get('/:profession', handleFetchProfessionRoadMaps);

export default router;