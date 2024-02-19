import { Typography } from "@mui/material";
import React, {useState, useEffect} from 'react';
import axios from "axios";
import UseAuthContext from "src/hooks/use-auth-context";


const LearningRoadmaps = () => {
    const [learningRoadmaps, setLearningRoadmaps] = useState([]);
    const {user} = UseAuthContext();

    useEffect(()=>{
        const handleFetchLearningRoadMaps = async() => {
            try {
                const roadmaps = await axios.get(`http://localhost:5550/api/roadmaps`);
                if(roadmaps.status === 200){
                    setLearningRoadmaps(roadmaps.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        if(user.sector === "Software Development"){
            handleFetchLearningRoadMaps();
        }
    },[user.sector])
    return ( 
        <div>
            <Typography variant="h4">
                Learning roadmaps
            </Typography>
        </div>
     );
}
 
export default LearningRoadmaps;