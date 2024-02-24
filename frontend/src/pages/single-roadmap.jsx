import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Avatar, Button, CircularProgress, IconButton, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import React,{ useEffect, useState } from 'react';
import axios from "axios";
import { ArrowBackRounded, ExpandMoreRounded } from "@mui/icons-material";

const SingleRoadMap = () => {

    const [singleRoadMap, setSingleRoadMap] = useState({});

    const {id} = useParams();

    useEffect(()=>{
        const fetchSingleRoadMap = async() => {
            try {
                const response = await axios.get(`http://localhost:5550/api/roadmaps/roadmap/${id}`);
                if(response.status === 200){
                    setSingleRoadMap(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleRoadMap();
    },[id]);

    return ( 
        <div>
            <Typography variant="h4">
                Single road map details
            </Typography>
            { singleRoadMap ? (
                <div style={{ display:"grid",gridTemplateColumns:"1.5fr 2.5fr" }}>
                    <div className="left-single">
                        <IconButton size="large">
                            <ArrowBackRounded />
                        </IconButton>
                        <Avatar alt="front-image" 
                            src={`http://localhost:5550/${singleRoadMap.roleFrontImage}`}
                        />
                        <Typography variant="h4">
                            {singleRoadMap.role}
                        </Typography>
                        <Typography variant="h4">
                            {singleRoadMap.description}
                        </Typography>
                    </div>
                    <div className="right-single">
                        {singleRoadMap?.steps?.map((step, index) => (
                            <Accordion key={index}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreRounded />}
                                aria-controls={`panel${index + 1}-content`}
                                id={`panel${index + 1}-header`}
                            >
                                {step.title}
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body1">
                                    Substeps:
                                </Typography>
                                {step?.subSteps?.map((subStep, subStepIndex) => (
                                <div key={subStepIndex}>
                                    <Typography variant="body1">
                                        Name: {subStep.name}
                                    </Typography>
                                    <Typography variant="body1">
                                        URL: {subStep.url}
                                    </Typography>
                                </div>
                                ))}
                            </AccordionDetails>
                            </Accordion>
                        ))}
                        </div>
                </div>
            ):(
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                    <CircularProgress />
                </div>
            ) }
        </div>
     );
}
 
export default SingleRoadMap;
