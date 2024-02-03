import { CircularProgress, Typography, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import axios from 'axios';
import React,{useState, useEffect} from 'react';
import UseAuthContext from 'src/hooks/use-auth-context';

const Companies = () => {

    const {user} = UseAuthContext();
    const [companies, setCompanies] = useState([]);

    useEffect(()=>{
        const fetchCompanies = async() =>{
            try {
                const response = await axios.get('http://localhost:5550/api/companies/');
                if(response.status === 200){
                    setCompanies(response.data);
                }

            } catch (error) {
                console.log(error);
            }
        }
        fetchCompanies();
    },[]);

    const handleFollowCompany = async(companyId) =>{
        try {
            const response = await axios.post(`http://localhost:5550/api/companies/follow/${companyId}`,
                                    JSON.stringify({userId: user.id}),{
                                        headers:{
                                            'Content-Type':'application/json'
                                        }
                                    } 
            )
            if(response.status === 200){
                console.log("Company follow successfully");
            }

        } catch (error) {
            console.log(error)
        }
    }

    return ( 
        <div>
            <Typography variant='h3'>
                Company list
            </Typography>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                { 
                companies ? (
                    companies.map((company)=>(
                        <div >
                            <Card
                            key={company._id}
                            style={{ 
                                margin: "20px", 
                                width: "250px", 
                                height: "350px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                            }}
                        >
                            <CardMedia 
                                component='img'
                                alt={company.company}
                                height="100"
                                width="100"
                                image={`http://localhost:5550/${company.companyLogo}`}
                                style={{ objectFit: "cover", 
                                borderRadius: '50%', 
                                width: '100px', 
                                height: '100px',
                                marginTop: '10px'
                            }}
                            />
                            <CardContent style={{ textAlign: "center" }}>
                                <Typography variant="h5">{company.company}</Typography>
                                <Typography variant="subtitle1">{company.location}</Typography>

                                <div style={{ marginTop: "16px" }}>
                                    <Typography variant="subtitle2">{company.companyDescription}</Typography>
                                </div>
                                
                            </CardContent>
                            <CardActions>
                                <Button variant='contained'
                                    onClick={() => {handleFollowCompany(company._id)}}
                                >follow</Button>
                            </CardActions>
            
                        </Card>
                        </div>
                    ))
                ):(
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                        <CircularProgress />
                    </div>
                )
            }
            </div>
            
        </div>
     );
}
 
export default Companies;