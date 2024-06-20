import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";
import database from "./config/database";
import apiRoutes from "./routes/api";

import userControllers from "./controllers/UserController"; // Import userControllers

// Destructure the needed controllers
const { loginUser } = userControllers;
// set up an express application
const app = express()

//middleware
app.use(cors({
    origin: "https://ai-powered-job-search-frontend.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads/')))
app.use((req, res, next) => {
    console.log(req.body, req.path, req.method)
    next()
});


//configure routes
apiRoutes(app);

// configure database and run the server 
database(app);

app.get('/' , (req, res) => {
    res.json("Successfully deployed");
})

app.get('/api/user/login', (req, res) => {
    res.json("Another route")
} );

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});
