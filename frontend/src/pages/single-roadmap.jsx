import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Avatar, Button, CircularProgress, IconButton, Typography } from "@mui/material";
import { useParams, Link, useNavigate } from "react-router-dom";
import React,{ useEffect, useState } from 'react';
import axios from "axios";
import { ArrowBackRounded, ArrowForwardRounded, ExpandMoreRounded } from "@mui/icons-material";

const SingleRoadMap = () => {

    const [singleRoadMap, setSingleRoadMap] = useState({});

    const {id} = useParams();

    const navigate = useNavigate();

    useEffect(()=>{
        const fetchSingleRoadMap = async() => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/roadmaps/roadmap/${id}`);
                if(response.status === 200){
                    setSingleRoadMap(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleRoadMap();
    },[id]);

    const handleRewind = () =>{
        navigate('/dashboard/dashboard/roadmaps');
    }

    return ( 
        <div>
            <Typography variant="h4">
                Single road map details
            </Typography>
            <IconButton size="large" onClick={handleRewind}>
                <ArrowBackRounded />
            </IconButton>
            { singleRoadMap ? (
                <div style={{ display:"grid",gridTemplateColumns:"1.5fr 2.5fr", gap:"4px" }}>
                    <div className="left-single" style={{
                        background:"white",
                        padding:"10px",
                        borderRadius:"6px"
                    }}>
                        <Avatar alt="front-image" style={{
                            marginBottom:"20px"
                        }}
                            src={`${process.env.REACT_APP_API_BASE_URL}/${singleRoadMap.roleFrontImage}`}
                        />
                        <Typography variant="h5">
                            {singleRoadMap.role}
                        </Typography>
                        <Typography variant="subtitle">
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
                                <Typography variant="h5">
                                    {step.title}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {step?.subSteps?.map((subStep, subStepIndex) => (
                                <div style={{ 
                                    display:"flex", 
                                    alignItems:"center", 
                                    justifyContent:"space-between",
                                    borderBottom: "1px solid #f1f1f1", 
                                    padding: "8px 0" 
                                    }} key={subStepIndex}>
                                    <div className="sub-step">
                                        <Typography variant="body1">
                                            {subStep.name}
                                        </Typography>
                                    </div>
                                    <div className="url-link">
                                        <Link to={subStep.url}>
                                            <ArrowForwardRounded style={{color:"black"}} />
                                        </Link>
                                    </div>
                                    {/* <Typography variant="body1">
                                        URL: {subStep.url}
                                    </Typography> */}
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
