import axios from "axios";
import UseAuthContext from "src/hooks/use-auth-context";
import React,{ useEffect,useState } from 'react';
import { CircularProgress, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const MyProfile = () => {
    const {user} = UseAuthContext();

    const [myProfileDetails, setMyProfileDetails] = useState({});

    useEffect(()=>{
        try {
            const fetchMyProfileDetails = async() =>{
                const response = await axios.get(`http://localhost:5550/api/profiles/profile/${user.id}`);
                if(response.status === 200){
                    setMyProfileDetails(response.data);
                }
            }
            fetchMyProfileDetails();
        } catch (error) {
            console.log(error);
        }
    },[user.id])

    return ( 
        <div>
            <Typography variant="h3">
                My profile
            </Typography>
            { myProfileDetails ? (
                <div className="profile">
                    <h3>{myProfileDetails.firstname}</h3>
                    <h3>{myProfileDetails.lastname}</h3>
                    <h4>{myProfileDetails.profession}</h4>

                    <Link to={`/updateprofile/${user.id}`}>Update profile</Link>
                </div>
            ):(
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                    <CircularProgress />
                </div>
            )}
        </div>
     );
}
 
export default MyProfile;