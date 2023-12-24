const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const path =  require('path')
require('dotenv').config()
const JobRoutes = require('./routes/JobRoutes')

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

//routes
app.use('/api/jobs', JobRoutes);

// connect to the database
mongoose.connect(process.env.dbURI)
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log("Connected to the database...");
        })
    })
    .catch((error)=>{
        console.log(error)
    })


