import express, { Router } from "express";
const router : Router = express.Router();
import learningRoadMapControllers from "../controllers/LearningRoadMapController";
import upload from "../middleware/MulterConfig";

const {handleAddRoadMap, handleFetchAllRoadMaps, handleFetchProfessionRoadMaps,
        handleFetchSingleRoadMap } = learningRoadMapControllers;

router.post('/add', upload.fields([{name: 'roleBackgroundImage', maxCount:1},{name: 'roleFrontImage', maxCount:1}]), handleAddRoadMap);

router.get('/', handleFetchAllRoadMaps);

router.get('/:profession', handleFetchProfessionRoadMaps);

router.get('/roadmap/:id', handleFetchSingleRoadMap);

export default router;