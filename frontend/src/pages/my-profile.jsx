import axios from "axios";
import UseAuthContext from "src/hooks/use-auth-context";
import React,{ useEffect,useState } from 'react';
import { Card, CardContent, CardHeader, CircularProgress, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {format} from "date-fns";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { CalendarMonthRounded, CategoryRounded, ConstructionRounded, DescriptionRounded, EditRounded, EmailRounded, FacebookRounded, GitHub, HttpRounded, Instagram, LinkedIn, Person, PersonRounded, PhoneRounded, PublicRounded, Twitter, WcRounded } from "@mui/icons-material";

const MyProfile = () => {
    const {user} = UseAuthContext();

    const [myProfileDetails, setMyProfileDetails] = useState({});

    useEffect(()=>{
        try {
            const fetchMyProfileDetails = async() =>{
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/profiles/profile/${user.id}`);
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
            <Typography variant="h4">
                My profile
            </Typography>
            { myProfileDetails ? (
                <div className="profile">
                    <Card>
                        <CardHeader>
                            <Typography variant="subtitle">My profile details</Typography>
                        </CardHeader>
                        <CardContent>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '2fr 2fr'
                            }}>
                                <div className="left-content">
                                    <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                        <PersonRounded />
                                        <div style={{ marginLeft: '8px' }}>
                                        <strong>First name</strong> <br />
                                        {myProfileDetails.firstname}
                                        </div>
                                    </Typography>
                                    <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                        <PersonRounded />
                                        <div style={{ marginLeft: '8px' }}>
                                        <strong>Last name</strong> <br />
                                        {myProfileDetails.lastname}
                                        </div>
                                    </Typography>
                                    <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                        <CalendarMonthRounded />
                                        <div style={{ marginLeft: '8px' }}>
                                        <strong>Date of birth</strong> <br />
                                        {myProfileDetails?.dateOfBirth ? format(new Date(myProfileDetails.dateOfBirth), 'do MMMM yyyy') : ''}
                                        </div>
                                    </Typography>
                                    <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                        <EmailRounded />
                                        <div style={{ marginLeft: '8px' }}>
                                        <strong>E-mail</strong> <br />
                                        {myProfileDetails.email}
                                        </div>
                                    </Typography>
                                    <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                        <PhoneRounded />
                                        <div style={{ marginLeft: '8px' }}>
                                        <strong>Phone contact</strong> <br />
                                        {myProfileDetails.phoneContact}
                                        </div>
                                    </Typography>
                                    <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                        <WcRounded />
                                        <div style={{ marginLeft: '8px' }}>
                                        <strong>Gender</strong> <br />
                                        {myProfileDetails.gender}
                                        </div>
                                    </Typography>
                                    <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                        <PublicRounded />
                                        <div style={{ marginLeft: '8px' }}>
                                        <strong>Nationality</strong> <br />
                                        {myProfileDetails.nationality}
                                        </div>
                                    </Typography>
                                    <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                        <ConstructionRounded />
                                        <div style={{ marginLeft: '8px' }}>
                                        <strong>Profession</strong> <br />
                                        {myProfileDetails.profession}
                                        </div>
                                    </Typography>
                                    <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                        <CategoryRounded />
                                        <div style={{ marginLeft: '8px' }}>
                                        <strong>Category</strong> <br />
                                        {myProfileDetails.category}
                                        </div>
                                    </Typography>
                                </div>
                                <div className="right-content">
                                    <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                        <DescriptionRounded />
                                        <div style={{ marginLeft: '8px' }}>
                                        <strong>Personal description</strong> <br />
                                        {myProfileDetails.personalDescription}
                                        </div>
                                    </Typography>
                                    <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                        <HttpRounded />
                                        <div style={{ marginLeft: '8px' }}>
                                        <strong>Personal website link</strong> <br />
                                        {myProfileDetails.website}
                                        </div>
                                    </Typography>
                                    <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                        <GitHub />
                                        <div style={{ marginLeft: '8px' }}>
                                        <strong>Github link</strong> <br />
                                        {myProfileDetails.github}
                                        </div>
                                    </Typography>
                                    <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                        <LinkedIn />
                                        <div style={{ marginLeft: '8px' }}>
                                        <strong>Linkedin link</strong> <br />
                                        {myProfileDetails.linkedin}
                                        </div>
                                    </Typography>
                                    <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                        <FacebookRounded />
                                        <div style={{ marginLeft: '8px' }}>
                                        <strong>Facebook username</strong> <br />
                                        {myProfileDetails.facebook}
                                        </div>
                                    </Typography>
                                    <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                        <Twitter />
                                        <div style={{ marginLeft: '8px' }}>
                                        <strong>Twitter handle</strong> <br />
                                        {myProfileDetails.twitter}
                                        </div>
                                    </Typography>
                                    <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                        <Instagram />
                                        <div style={{ marginLeft: '8px' }}>
                                        <strong>Instagram</strong> <br />
                                        {myProfileDetails.instagram}
                                        </div>
                                    </Typography>
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '10px',
                                        right: '10px',
                                        padding: '8px',
                                        background: '#f1f1f1',
                                        borderRadius: '6px'
                                    }}>
                                        <Link style={{
                                            marginRight: '5px',
                                            color: '#000'
                                        }} to={`/dashboard/dashboard/updateprofile/${user.id}`}>Update profile</Link>
                                        <EditRounded />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    
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