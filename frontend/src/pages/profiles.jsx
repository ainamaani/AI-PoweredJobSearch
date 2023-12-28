import { CircularProgress, Typography } from "@mui/material";
import React,{useState, useEffect} from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

const ProfileCategories = () => {

    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        const fetchProfileCategories = async () =>{
            try {
                const response = await axios.get('http://localhost:5550/api/profiles/categories')
                if(response.status === 200){
                    setCategories(response.data)
                }
                
            } catch (error) {
                console.log(error)
            }
        }
        fetchProfileCategories();
    },[])

    return ( 
        <div className="categories">
            <Typography variant="h3">Profiles</Typography>
            <Link to={'/allprofiles'}>All profiles</Link>
            { categories ? (
                categories.map((category)=>(
                    <div>
                        <h3>{category}</h3>
                        <Link to={`/profiles/${category}`}>{category}</Link>
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
 
export default ProfileCategories;