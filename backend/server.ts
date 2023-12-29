import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
import JobRoutes from "./routes/JobRoutes";
import ProfileRoutes from "./routes/ProfileRoutes";
import ApplicationRoutes from "./routes/ApplicationRoutes";

// set up an express application
const app = express()

//middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use((req,res,next)=>{
    console.log(req.body, req.path, req.method)
    next()
});

// Check if dbURI is defined in the environment variables
const dbURI = process.env.dbURI;

if (!dbURI) {
    console.error("Database URI is not set. Please check your environment variables.");
    process.exit(1); // Exit the process, indicating an error
}

//routes
app.use('/api/jobs', JobRoutes);
app.use('/api/profiles', ProfileRoutes);
app.use('/api/applications', ApplicationRoutes);

// connect to the database
mongoose.connect(dbURI)
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log("Connected to the database...");
        })
    })
    .catch((error : any)=>{
        console.log(error)
    })


