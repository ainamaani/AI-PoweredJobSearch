import { FavoriteRounded, RemoveCircleRounded, SearchRounded } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { CircularProgress, Typography, Card, CardMedia, CardContent, CardActions, Button, TextField, InputAdornment } from '@mui/material';
import axios from 'axios';
import React,{useState, useEffect} from 'react';
import UseAuthContext from 'src/hooks/use-auth-context';

const Companies = () => {

    const {user} = UseAuthContext();
    const [companies, setCompanies] = useState([]);
    const [followedCompanies, setFollowedCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchInput, setSearchInput] = useState('');

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

        const loadFollowedCompanies = () => {
            const savedFollowedCompanies = JSON.parse(localStorage.getItem(`followedCompanies_${user.id}`));
            if (savedFollowedCompanies) {
                setFollowedCompanies(savedFollowedCompanies);
            }
        }

        fetchCompanies();
        loadFollowedCompanies();
    },[user.id]);

    const handleFollowToggle = async (companyId) => {
        try {
            if (isCompanyFollowed(companyId)) {
                await handleUnfollowCompany(companyId);
            } else {
                await handleFollowCompany(companyId);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleFollowCompany = async(companyId) =>{
        try {
            setLoading(true);
            const response = await axios.post(`http://localhost:5550/api/companies/follow/${companyId}`,
                                    JSON.stringify({userId: user.id}),{
                                        headers:{
                                            'Content-Type':'application/json'
                                        }
                                    } 
            )
            if(response.status === 200){
                console.log("Company follow successfully");
                const updatedFollowedCompanies = [...followedCompanies, companyId];
                setFollowedCompanies(updatedFollowedCompanies);
                localStorage.setItem(`followedCompanies_${user.id}`, JSON.stringify(updatedFollowedCompanies));

            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    const handleUnfollowCompany = async(companyId) => {
        try {
            setLoading(true);
            const response = await axios.post(`http://localhost:5550/api/companies/unfollow/${companyId}`,
                                    JSON.stringify({ userId : user.id}),{
                                        headers:{
                                            'Content-Type':'application/json'
                                        }
                                    }
            )
            if (response.status === 200) {
                console.log("Company unfollowed successfully");
                const updatedFollowedCompanies = followedCompanies.filter(id => id !== companyId);
                setFollowedCompanies(updatedFollowedCompanies);
                localStorage.setItem(`followedCompanies_${user.id}`, JSON.stringify(updatedFollowedCompanies));
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    // Functions to handle input change
    const handleSearchInputChange = (event) =>{
        setSearchInput(event.target.value);
    }

     // Filter the jobs based on the search input value
    const filteredCompanies = companies?.filter(company => 
        company.industry.toLowerCase().includes(searchInput.toLowerCase())
    );


    // const isCompanyFollowed = (companyId) => {
    //     return followedCompanies.includes(companyId);
    // }

    const isCompanyFollowed = companyId => followedCompanies.includes(companyId);


    return ( 
        <div>
            <Typography variant="h4">Company list</Typography>
                <TextField  
                    label="Search by industry.."
                    variant="filled"
                    value={searchInput}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchRounded />
                        </InputAdornment>
                      )
                    }}
                    onChange={handleSearchInputChange}
                    style={{ marginBottom: '20px' }}
                  />
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                { 
                filteredCompanies ? (
                    filteredCompanies.map((company)=>(
                        <div >
                            <Card
                                key={company._id}
                                style={{ 
                                    margin: "20px", 
                                    width: "250px", 
                                    height: "350px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Add shadow
                                    borderRadius: '10px', // Add border radius
                                    overflow: 'hidden' // Hide overflowing content
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
                                <LoadingButton
                                    variant='contained'
                                    startIcon={ isCompanyFollowed(company._id) ? <RemoveCircleRounded /> : <FavoriteRounded /> }
                                    style={{
                                        backgroundColor: isCompanyFollowed(company._id) ? '#f44336' : '#3f51b5', // Change button background color
                                        color: 'white', 
                                        borderRadius: '14px', 
                                        padding: '8px 16px', 
                                        transition: 'background-color 0.3s',
                                        position: 'absolute',
                                        bottom: '30px',
                                        right: '80px',
                                    }}
                                    loading={loading}
                                    onClick={() => { handleFollowToggle(company._id) }}
                                >
                                    {isCompanyFollowed(company._id) ? 'Following' : 'Follow'}
                                </LoadingButton>
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