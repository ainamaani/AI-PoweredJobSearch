import { Card, CardContent, CardMedia, CircularProgress, Typography } from "@mui/material";
import React,{useState, useEffect} from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProfileCategories = () => {

    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        const fetchProfileCategories = async () =>{
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/profiles/categories`)
                if(response.status === 200){
                    setCategories(response.data)
                }
                
            } catch (error) {
                console.log(error)
            }
        }
        fetchProfileCategories();
    },[])

    
  // Mapping between categories and their respective image URLs
  const categoryImages = {
    Accounting : "https://plus.unsplash.com/premium_photo-1679923813998-6603ee2466c5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGFjY291bnRpbmd8ZW58MHx8MHx8fDA%3D",
    Agriculture : "https://plus.unsplash.com/premium_photo-1678344170545-c3edef92a16e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWdyaWN1bHR1cmV8ZW58MHx8MHx8fDA%3D",
    Architecture : "https://plus.unsplash.com/premium_photo-1661335257817-4552acab9656?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGVuZ2luZWVyaW5nfGVufDB8fDB8fHww",
    'Arts and Entertainment' : "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8fDA%3D",
    'Business and Management' : "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFuYWdlbWVudHxlbnwwfHwwfHx8MA%3D%3D",
    Construction : "https://plus.unsplash.com/premium_photo-1682724602925-f0264b85953f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNvbnN0cnVjdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    Education : "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZWR1Y2F0aW9ufGVufDB8fDB8fHww",
    Engineering : "https://images.unsplash.com/photo-1463906033650-3288c7071a7b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGVuZ2luZWVyaW5nJTIwZGVzaWdufGVufDB8fDB8fHww",
    Finance : "https://plus.unsplash.com/premium_photo-1681469490209-c2f9f8f5c0a2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmluYW5jZXxlbnwwfHwwfHx8MA%3D%3D",
    Healthcare : "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGhlYWx0aGNhcmV8ZW58MHx8MHx8fDA%3D",
    'Information Technology' : "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW5mb3JtYXRpb24lMjB0ZWNobm9sb2d5fGVufDB8fDB8fHww",
    Legal : "https://plus.unsplash.com/premium_photo-1661329930662-19a43503782f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGxlZ2FsfGVufDB8fDB8fHww",
    Manufacturing : "https://images.unsplash.com/photo-1564182842834-681b7be6de4b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWFudWZhY3R1cmluZ3xlbnwwfHwwfHx8MA%3D%3D",
    'Marketing and Sales' : "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFya2V0aW5nfGVufDB8fDB8fHww",
    'Media and Communications' : "https://images.unsplash.com/photo-1575507479993-7bb702d5e966?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1lZGlhfGVufDB8fDB8fHww" ,
    Nonprofit : "https://images.unsplash.com/photo-1608052026785-0bc249c733e3?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bm9uJTIwcHJvZml0fGVufDB8fDB8fHww",
    'Real Estate' : "https://images.unsplash.com/photo-1512699355324-f07e3106dae5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8fDA%3D",
    Science : "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNjaWVuY2V8ZW58MHx8MHx8fDA%3D",
    'Social Services' : "https://plus.unsplash.com/premium_photo-1684772873056-474a10d466ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njl8fHNvY2lhbHxlbnwwfHwwfHx8MA%3D%3D",
    Transportation : "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dHJhbnNwb3J0YXRpb258ZW58MHx8MHx8fDA%3D",
    Tourism : "https://images.unsplash.com/photo-1609861517208-e5b7b4cd4b87?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dG91cmlzbXxlbnwwfHwwfHx8MA%3D%3D"
  }

    return ( 
        <div className="categories">
            <Typography variant="h4">Profiles</Typography>
               
                { categories ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            <div className="all">
                                <Card className="card" style={{ margin: '10px' }}>
                                    <CardContent className="content">
                                        <Link className="profile-links" to="/dashboard/dashboard/allprofiles">All profiles</Link>
                                    </CardContent>
                                </Card>
                            </div>
                            {categories.map((category) => (
                                <div>
                                    <div>
                                        <Card
                                        key={category}
                                        className="card"
                                        style={{ margin: '10px' }}
                                        sx={{ backgroundImage: `url('${categoryImages[category]}')` }}
                                        >
                                                
                                            <CardMedia
                                                component="img"
                                                alt={category}
                                                height="140"
                                                className="category-img"
                                                image={categoryImages[category]}
                                                
                                            />
                                            <CardContent className="content">
                                            <Link className="profile-links" to={`/dashboard/dashboard/profiles/${category}`}>{category}</Link>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                    
                ):(
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                        <CircularProgress />
                    </div> 
                )}
            
        </div>
     );
}
 
export default ProfileCategories;