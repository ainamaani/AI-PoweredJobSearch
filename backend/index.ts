import express from "express";
import cors from "cors";
import path from "path";
import database from "./config/database";
import apiRoutes from "./routes/api";
// set up an express application
const app = express()

//middleware
app.use(cors());
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
