import { CircularProgress, Typography, Button, Card, CardMedia, 
    CardContent, 
    IconButton,
    Tooltip,
    Popover,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions} from "@mui/material";
import React,{useEffect, useState} from 'react';
import axios from "axios";
import { format } from "date-fns";
import { saveAs } from "file-saver";
import { AccountCircleRounded, CalendarMonthRounded, ConstructionRounded, DescriptionRounded,
     DownloadOutlined, EmailRounded, FacebookRounded, FileCopy, FileDownload, GitHub, Instagram,
      LanguageRounded, LinkedIn, MoreVertRounded, Person, PersonPinCircleRounded, Phone,
       PublicRounded, Twitter, X } from "@mui/icons-material";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Allprofiles = () => {

    const [profiles, setProfiles] = useState([]);

    const [anchorEl, setAnchorEl] = useState(Array(profiles.length).fill(null));

    const [openDialog, setOpenDialog] = useState(false);

    const [selectedProfile, setSelectedProfile] = useState(null);


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


    const handleMenuOpen = (index) => (event) => {
        const newAnchorEl = [...anchorEl];
        newAnchorEl[index] = event.currentTarget;
        setAnchorEl(newAnchorEl);
    };
    
    const handleMenuClose = (index) => () => {
        const newAnchorEl = [...anchorEl];
        newAnchorEl[index] = null;
        setAnchorEl(newAnchorEl);
    };

    const handlePopoverLeave = (index) => () => {
        const newAnchorEl = [...anchorEl];
        newAnchorEl[index] = null;
        setAnchorEl(newAnchorEl);
    };

    const handleOpenDialog = (selectedprofile) =>{
        setOpenDialog(true);
        setSelectedProfile(selectedprofile);
    };

    const handleCloseDialog = () =>{
        setOpenDialog(false);
        setSelectedProfile(null);
    }

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
        <Typography variant="h3">
            All profiles
        </Typography>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            {profiles ? (
                profiles.map((profile, index)=>(
                    <div >
                        <Card
                            key={profile._id}
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
                                alt={profile.firstname}
                                height="100"
                                width="100"
                                image={`http://localhost:5550/${profile.profilePic}`}
                                style={{ objectFit: "cover", 
                                borderRadius: '50%', 
                                width: '100px', 
                                height: '100px',
                                marginTop: '10px'
                            }}
                            />
                            <CardContent style={{ textAlign: "center" }}>
                                <Typography variant="h5">{profile.firstname} {profile.lastname}</Typography>
                                <Typography variant="subtitle1">{profile.profession}</Typography>

                                <div style={{ marginTop: "16px" }}>
                                    <Typography variant="subtitle2">{profile.personalDescription}</Typography>
                                </div>
                                
                                <div style={{ display: 'flex', 
                                              justifyContent: 'space-even', 
                                              position: 'absolute',
                                              bottom: '20px',
                                              left: '40px'
                                              }}>
                                    <Tooltip title={profile.socialmedia.facebook} >
                                        <IconButton style={{ color: "#316FF6" }}>
                                            <FacebookRounded />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title={profile.socialmedia.linkedIn}>
                                        <IconButton style={{ color: "#0077b5" }} >
                                            <LinkedIn />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title={profile.socialmedia.twitter}>
                                        <IconButton style={{ color: "#1D9BF0" }} >
                                            <Twitter />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title={profile.socialmedia.instagram}>
                                        <IconButton style={{ color: "#962fbf" }} >
                                            <Instagram />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </CardContent>
                            {/* Three vertical dots icon */}
                            <IconButton
                                style={{
                                position: "absolute",
                                top: "5px",
                                right: "5px",
                                color: "#000",
                                }}
                                onMouseEnter={handleMenuOpen(index)}
                                
                            >
                                <MoreVertRounded />
                            </IconButton>
                                
                            {/* Popover */}
                            <Popover
                                open={Boolean(anchorEl[index])}
                                anchorEl={anchorEl[index]}
                                onClose={handleMenuClose(index)}
                                onMouseLeave={handlePopoverLeave(index)}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                            >
                                <MenuItem 
                                    onClick={() => handleOpenDialog(profile)}
                                >   
                                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-around' }}>
                                        <Typography variant="subtitle2" >Full profile</Typography>
                                        <PersonPinCircleRounded />
                                    </div>
                                    </MenuItem>
                                <MenuItem
                                    onClick={() =>
                                        handleDownloadProfileResume(
                                        profile._id,
                                        profile.firstname,
                                        profile.lastname
                                        )
                                }
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-around' }}>
                                        <Typography variant="subtitle2" >Download resume</Typography>
                                        <FileCopy />
                                    </div>
                                </MenuItem>
                            </Popover>
                            {/* Dialog */}
                            <Dialog
                                open={openDialog}
                                onClose={handleCloseDialog}
                                fullWidth
                                BackdropProps={{
                                    style: {
                                        backgroundColor: "rgba(0, 0, 0, 0.1)", // Set the desired background color here
                                    },
                                }}
                            >
                                <DialogTitle>{`${selectedProfile?.firstname} ${selectedProfile?.lastname}'s full profile`}</DialogTitle>
                                <DialogContent>
                                    {selectedProfile && (
                                        <>
                                            <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                                <AccountCircleRounded />
                                                <div style={{ marginLeft: '8px' }}>
                                                    <strong>Full name</strong> <br />
                                                    {selectedProfile?.firstname} {selectedProfile?.lastname}
                                                </div>
                                            </Typography>
                                            <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                                <Person />
                                                <div style={{ marginLeft: '8px' }}>
                                                    <strong>Gender</strong> <br />
                                                    {selectedProfile?.gender}
                                                </div>
                                            </Typography>
                                            <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                                <PublicRounded />
                                                <div style={{ marginLeft: '8px' }}>
                                                    <strong>Nationality</strong> <br />
                                                    {selectedProfile?.nationality}
                                                </div>
                                            </Typography>
                                            <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                                <CalendarMonthRounded />
                                                <div style={{ marginLeft: '8px' }}>
                                                    <strong>Date of birth</strong> <br />
                                                    {selectedProfile?.dateOfBirth ? format(new Date(selectedProfile.dateOfBirth), 'do MMMM yyyy') : '' }
                                                        {/* // new Date(selectedProfile.dateOfBirth)
                                                        //     .toLocaleDateString('en-GB', {day: 'numeric', month: 'long', year: 'numeric'}) : ''
                                                        // }     */}
                                                </div>
                                            </Typography>
                                            <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                                <EmailRounded />
                                                <div style={{ marginLeft: '8px' }}>
                                                    <strong>Email</strong> <br />
                                                    {selectedProfile?.email}
                                                </div>
                                            </Typography>
                                            <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                                <Phone />
                                                <div style={{ marginLeft: '8px' }}>
                                                    <strong>Contact</strong> <br />
                                                    {selectedProfile?.phoneContact}
                                                </div>
                                            </Typography>
                                            <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                                <ConstructionRounded />
                                                <div style={{ marginLeft: '8px' }}>
                                                    <strong>Profession</strong> <br />
                                                    {selectedProfile?.profession}
                                                </div>
                                            </Typography>
                                            <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                                <DescriptionRounded />
                                                <div style={{ marginLeft: '8px' }}>
                                                    <strong>Personal description</strong> <br />
                                                    {selectedProfile?.personalDescription}
                                                </div>
                                            </Typography>
                                            <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                                <LanguageRounded />
                                                <div style={{ marginLeft: '8px' }}>
                                                    <strong>Personal website link</strong> <br />
                                                    {selectedProfile?.website}
                                                </div>
                                            </Typography>
                                            <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                                <GitHub />
                                                <div style={{ marginLeft: '8px' }}>
                                                    <strong>GitHub link</strong> <br />
                                                    {selectedProfile?.github}
                                                </div>
                                            </Typography>
                                            <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                                <FacebookRounded />
                                                <div style={{ marginLeft: '8px' }}>
                                                    <strong>Facebook username</strong> <br />
                                                    {selectedProfile.socialmedia?.facebook}
                                                </div>
                                            </Typography>
                                            <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                                <LinkedIn />
                                                <div style={{ marginLeft: '8px' }}>
                                                    <strong>LinkedIn</strong> <br />
                                                    {selectedProfile.socialmedia?.linkedIn}
                                                </div>
                                            </Typography>
                                            <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                                <Twitter />
                                                <div style={{ marginLeft: '8px' }}>
                                                    <strong>Twitter</strong> <br />
                                                    {selectedProfile.socialmedia?.twitter}
                                                </div>
                                            </Typography>
                                            <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                                <Instagram />
                                                <div style={{ marginLeft: '8px' }}>
                                                    <strong>Instagram</strong> <br />
                                                    {selectedProfile.socialmedia?.instagram}
                                                </div>
                                            </Typography>
                                        </>
                                        
                                    )}
                                    
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                     onClick={handleCloseDialog}
                                     variant="outlined" 
                                     color="inherit">Close</Button>
                                </DialogActions>
                            </Dialog>
                        </Card>
                    </div>
                ))
            ):(
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                        <CircularProgress />
                </div>
            ) }
        </div>
       </div>
     );
}
 
export default Allprofiles;