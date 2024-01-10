import { CircularProgress, Typography, Button } from "@mui/material";
import React,{useEffect, useState} from 'react';
import axios from "axios";
import { saveAs } from "file-saver";
import { DownloadOutlined } from "@mui/icons-material";


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

    const handleDownloadProfileResume = async(profileId, firstname, lastname) =>{
        try {
            const downloadresume = await axios.get(`http://localhost:5550/api/profiles/downloadresume/${profileId}`, {responseType: 'blob'});
            if(downloadresume.status === 200){
                const blob = new Blob([downloadresume.data], {type: 'application/pdf'})
                saveAs(blob, `${firstname}  ${lastname} resume.pdf` )
            }
        } catch (error) {
            console.log(error);
        }
    }

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

                    <Button variant='outlined' endIcon={ <DownloadOutlined /> }
                    onClick={() => handleDownloadProfileResume(profile._id, profile.firstname, profile.lastname)}
                    >Download resume</Button>
                    
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