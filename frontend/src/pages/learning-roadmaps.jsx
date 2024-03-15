import { Avatar, Card, CardContent, CardHeader, CardMedia, CircularProgress, IconButton, Typography } from "@mui/material";
import React, {useState, useEffect} from 'react';
import axios from "axios";
import UseAuthContext from "src/hooks/use-auth-context";
import { MoreVertRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {format} from "date-fns"; 


const LearningRoadmaps = () => {
    const [learningRoadmaps, setLearningRoadmaps] = useState([]);
    const {user} = UseAuthContext();

    useEffect(()=>{
        const handleFetchLearningRoadMaps = async() => {
            try {
                const roadmaps = await axios.get(`http://localhost:5550/api/roadmaps/`);
                if(roadmaps.status === 200){
                    console.log(roadmaps.data);
                    setLearningRoadmaps(roadmaps.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
            handleFetchLearningRoadMaps();
    },[user.sector])

    useEffect(() => {
        console.log("The state", learningRoadmaps);
    },[learningRoadmaps]);
    return ( 
        <div>
            <div className="head" style={{ display: "grid", gridTemplateColumns: "2fr 2fr" }}>
                <div className="left-head">
                    <Typography variant="h4">
                        Start your learning journey today!
                    </Typography>
                    <div style={{ marginTop: "40px" }}>
                        <Typography variant="subtitle">
                            Follow our structured learning roadmaps to guide you in learning 
                            in-demand tech skills so you can go from novice to a talented professional.
                        </Typography>
                    </div>
                </div>
                <div className="right-head">
                    <img style={{
                        borderRadius : "6px"
                    }} 
                    src="https://images.unsplash.com/photo-1459180129673-eefb56f79b45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyZWVyJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D" alt="roadmap" />
                </div>
            </div>
            <Typography variant="h4">
                Learning roadmaps
            </Typography>
            <div className="roadmaps-content">
                <div className="filter-section">
                    <Typography variant="h5">Filter by role</Typography>
                </div>
                    {
                        learningRoadmaps ? (
                            <div className="card-content" style={{ display:"flex", 
                                                                    alignItems:"center",
                                                                    flexWrap:"wrap",
                                                                    gap:"15px"
                                                                    }}>
                                {
                                    learningRoadmaps.map(roadmap => (
                                        <Link to={`/dashboard/dashboard/roadmap/${roadmap._id}`}>
                                            <Card sx={{ maxWidth: 300 }}>
                                                <CardHeader 
                                                    avatar={
                                                        <Avatar alt="front pic" 
                                                            src={`http://localhost:5550/${roadmap.roleFrontImage}`}
                                                        />
                                                    }
                                                    action={
                                                        <IconButton aria-label="settings">
                                                            <MoreVertRounded />
                                                        </IconButton>
                                                    }
                                                    title={roadmap.role}
                                                    subheader={format(new Date(roadmap.createdAt), 'do MMMM yyyy')}
                                                />
                                                <CardMedia 
                                                    component="img"
                                                    height="194"
                                                    image={`http://localhost:5550/${roadmap.roleBackgroundImage}`}
                                                    alt="background-img"
                                                />
                                                <CardContent>
                                                    <Typography variant="body2" color="text.secondary">
                                                        ChatGPT is one example of a large language model. It is based on 
                                                        the GPT-3.5 architecture, which is an advanced version of the 
                                                        GPT-3 model. ChatGPT is designed specifically for conversational 
                                                        applications, such as chatbots and virtual assistants.
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    ))
                                }
                            </div>
                        ) : (
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                                <CircularProgress />
                            </div>
                        )
                    }
            
            </div>
        </div>
     );
}
 
export default LearningRoadmaps;