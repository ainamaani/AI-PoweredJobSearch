import { CircularProgress, Typography } from "@mui/material";
import React,{useEffect, useState} from 'react';
import axios from "axios";

const Allprofiles = () => {

    const [profiles, setProfiles] = useState([]);

    useEffect(()=>{
        const fetchAllProfiles = async() =>{
            try {
                const allprofiles = await axios.get('http://localhost:5550/api/profiles/');
                if(allprofiles.status === 200){
                    setProfiles(allprofiles.data)
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllProfiles();
    },[])

    return ( 
       <div>
        <Typography variant="h2">
            All profiles
        </Typography>
        {profiles ? (
            profiles.map((profile)=>(
                <div key={profile._id}>
                    <h4>{profile.firstname}</h4>
                    <p>{profile.lastname}</p>
                    <img
                            src={`http://localhost:5550/${profile.profilePic}`} // Assuming profilePic contains the relative path to the image
                            alt={profile.firstname}
                            style={{ maxWidth: '300px', maxHeight: '300px' }} // Set your desired width and height
                        />
                    
                </div>
            ))
        ):(
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                    <CircularProgress />
            </div>
        ) }
       </div>
     );
}
 
export default Allprofiles;