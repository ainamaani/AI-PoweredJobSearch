import JobRoutes from "./JobRoutes";
import ProfileRoutes from "./ProfileRoutes";
import ApplicationRoutes from "./ApplicationRoutes";
import InterviewRoutes from "./InterviewRoutes";
import UserRoutes from "./UserRoutes";
import ResetRoutes from "./ResetRoutes";
import NotificationRoutes from "./NotificationRoutes";
import CompanyRoutes from "./CompanyRoutes";
import RecommendationRoutes from "./RecommendationRoutes"
import LearningRoadMapRoutes from "./LearningRoadMapRoutes";

import { Router } from "express";

export default (app: { use: (arg0: string, arg1: Router) => void; }) => {
    app.use('/api/jobs', JobRoutes);
    app.use('/api/profiles', ProfileRoutes);
    app.use('/api/applications', ApplicationRoutes);
    app.use('/api/interviews', InterviewRoutes);
    app.use('/api/user', UserRoutes);
    app.use('/api/reset', ResetRoutes);
    app.use('/api/notifications', NotificationRoutes);
    app.use('/api/companies', CompanyRoutes);
    app.use('/api/recommendations', RecommendationRoutes);
    app.use('/api/roadmaps', LearningRoadMapRoutes);


}

