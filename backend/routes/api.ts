import JobRoutes from "./JobRoutes";
import ProfileRoutes from "./ProfileRoutes";
import ApplicationRoutes from "./ApplicationRoutes";
import InterviewRoutes from "./InterviewRoutes";
import UserRoutes from "./UserRoutes";

import { Router } from "express";

export default (app: { use: (arg0: string, arg1: Router) => void; }) => {
    app.use('/api/jobs', JobRoutes);
    app.use('/api/profiles', ProfileRoutes);
    app.use('/api/applications', ApplicationRoutes);
    app.use('/api/interviews', InterviewRoutes);
    app.use('/api/user', UserRoutes);
}