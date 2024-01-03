import { Typography, TextField, Button, RadioGroup, } from "@mui/material";
import React,{ useState, useEffect } from 'react';
import axios from "axios";


// Define a styled TextField component
const StyledTextField = styled(TextField)({
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
  });

  const StyledButton = styled(Button)({
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
})

// Define a styled RadioGroup component
const StyledRadioGroup = styled(RadioGroup)({
  marginTop: 20,
  marginBottom: 20,
  
});

const StyledPageContent = styled('div')({
    padding: '30px'
})


const UpdateProfile = () => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [nationality, setNationality] = useState('');
    const [phoneContact, setPhoneContact] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [profession, setProfession] = useState('');
    const [category, setCategory] = useState('');
    const [personalDescription, setPersonalDescription] = useState('');
    const [website, setWebsite] = useState('');
    const [github, setGithub] = useState('');
    const [linkedIn, setLinkedIn] = useState('');
    const [twitter, setTwitter] = useState('');
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [resume, setResume] = useState(null);
    const [initialProfileDetails, setInitialProfileDetails] = useState([]);

    // fetch current data
    useEffect(()=>{
      const fetchInitialDetails = async() =>{
        try {
          const initialdata = await axios.get()
        } catch (error) {
          console.log(error);
        }
      }
      fetchInitialDetails();
    })

    return ( 
        <Typography variant="h2">
            Update your profile
        </Typography>
        
     );
}
 
export default UpdateProfile;