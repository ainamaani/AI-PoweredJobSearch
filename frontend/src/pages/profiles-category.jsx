import { CircularProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import React,{useEffect, useState} from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProfilesCategory = () => {
    const { category } = useParams();

    const [categoryProfiles, setCategoryProfiles] = useState([]);

    useEffect(()=>{
        const fetchCategoryProfiles = async() =>{
            try {
                const categoryprofilesfetched = await axios.get(`http://localhost:5550/api/profiles/${category}`)
                if(categoryprofilesfetched.status === 200){
                    setCategoryProfiles(categoryprofilesfetched.data);
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchCategoryProfiles()
    },[category]);

    return ( 
        <div>
            <Typography variant="h4">
                { category } profiles
            </Typography>
            {categoryProfiles ? (
                categoryProfiles.map((categoryprofile)=>(
                    <div>
                        <h4>{categoryprofile.firstname}</h4>
                        <p>{categoryprofile.lastname}</p>
                        <p>{categoryprofile.gender}</p>
                    </div>
                ))
            ):(
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                    <CircularProgress />
                </div> 
            )}
        </div>
     );
}
 
export default ProfilesCategory;