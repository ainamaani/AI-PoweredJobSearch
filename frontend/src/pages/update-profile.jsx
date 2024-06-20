import { Typography,TextField,Button,RadioGroup,MenuItem,Select,
          Radio,FormControlLabel,FormControl,InputLabel,InputAdornment } from "@mui/material";
import { CalendarMonthRounded, Category, CategoryRounded, ConstructionRounded, 
        DescriptionRounded, EmailRounded, FacebookRounded, GitHub, HttpRounded, Instagram, 
        LinkedIn, PersonRounded, PhoneRounded, PublicRounded, Twitter } from "@mui/icons-material";
import React,{ useState, useEffect } from 'react';
import axios from "axios";
import { styled } from "@mui/system";
import UseAuthContext from "src/hooks/use-auth-context";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { LoadingButton } from "@mui/lab";

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
    const { user } = UseAuthContext();
    const {id} = useParams();

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
    const [initialProfileDetails, setInitialProfileDetails] = useState({});

    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({});

    // fetch current data
    useEffect(()=>{
      const fetchInitialDetails = async() =>{
        try {
          const initialdata = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/profiles/profile/${id}`);
          if(initialdata.status === 200){
            const userdata = initialdata.data;
            setInitialProfileDetails(userdata);
            setFirstname(userdata.firstname);
            setLastname(userdata.lastname);
            setDateOfBirth(userdata.dateOfBirth);
            setEmail(userdata.email);
            setGender(userdata.gender);
            setNationality(userdata.nationality);
            setPhoneContact(userdata.phoneContact);
            setProfession(userdata.profession);
            setCategory(userdata.category);
            setPersonalDescription(userdata.personalDescription);
            setWebsite(userdata.website);
            setGithub(userdata.github);
            setLinkedIn(userdata.socialmedia.linkedIn);
            setTwitter(userdata.socialmedia.twitter);
            setFacebook(userdata.socialmedia.facebook);
            setInstagram(userdata.socialmedia.instagram);

          }
        } catch (error) {
          console.log(error);
        }
      }
      fetchInitialDetails();
    },[id]);

    const handleUpdateProfile = async(e) =>{
        e.preventDefault();

        setErrors({});

        const formData = new FormData();

        
          formData.append('firstname',firstname);
          formData.append('lastname',lastname);
          formData.append('dateOfBirth',dateOfBirth);
          formData.append('email',email);
          formData.append('gender',gender);
          formData.append('nationality',nationality);
          formData.append('phoneContact',phoneContact);
          if(profilePic !== null){
            formData.append('profilePic',profilePic);
          }
          formData.append('profession',profession);
          formData.append('category',category);
          formData.append('personalDescription',personalDescription);
          formData.append('website',website);
          formData.append('github',github);
          formData.append('linkedIn',linkedIn);
          formData.append('twitter',twitter);
          formData.append('facebook',facebook);
          formData.append('instagram',instagram);
          if(resume !== null){
            formData.append('resume',resume);
          }
          
        

        try {
            setLoading(false);

            const updatedProfile = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/api/profiles/updateprofile/${user.id}`,
                                                   formData,{
                                                    headers:{
                                                      'Content-Type':'multipart/form-data'
                                                    }
                                                  }
            )
            if(updatedProfile.status === 200){
                setInitialProfileDetails({});
                setFirstname('');
                setLastname('');
                setDateOfBirth('');
                setEmail('');
                setGender('');
                setNationality('');
                setPhoneContact('');
                setProfilePic(null);
                setProfession('');
                setCategory('');
                setPersonalDescription('');
                setWebsite('');
                setGithub('');
                setLinkedIn('');
                setTwitter('');
                setFacebook('');
                setInstagram('');
                setResume(null);

                toast.success('Profile updated successfully :)',{
                    position: 'top-right'
                })
                
            }
        } catch (error) {
            console.log(error);
            if(error.response && error.response.data && error.response.data.errors){
                setErrors(error.response.data.errors);
            }

            toast.error('Profile update failed!',{
                position: 'top-right'
            })
        } finally{
            setLoading(false);
        }
    }

    return ( 
        <div>
              <Typography variant="h2">
                Update your profile
              </Typography>
              <form onSubmit={handleUpdateProfile} noValidate>
              <StyledTextField
                  label="First name"
                  variant="outlined"
                  required fullWidth
                  sx={{ width: 800 }}
                  InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                          <PersonRounded />
                        </InputAdornment>
                      )
                }}
                  error={firstname}
                  value={firstname}
                  onChange={(e)=> {setFirstname(e.target.value)}}   
              />
              { errors.firstname && (
                        <span style={{color:'red'}}>{errors.firstname}</span>
                    )}
              
              <StyledTextField
                  label="Last name"
                  variant="outlined"
                  required fullWidth
                  sx={{ width: 800 }}
                  InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                          <PersonRounded />
                        </InputAdornment>
                      )
                }}
                  value={lastname}
                  error={lastname}
                  onChange={(e)=> {setLastname(e.target.value)}}   
              />
              { errors.lastname && (
                  <span style={{color:'red'}}>{errors.lastname}</span>
              )}
              <StyledTextField
                  label="Date of birth"
                  variant="outlined"
                  required fullWidth
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                          <CalendarMonthRounded />
                        </InputAdornment>
                      )
                }}
                  type="date"
                  sx={{ width: 800 }}
                  value={dateOfBirth}
                  error={errors.dateOfBirth}
                  onChange={(e)=> {setDateOfBirth(e.target.value)}}   
              />
              { errors.firstname && (
                        <span style={{color:'red'}}>{errors.firstname}</span>
                    )}
              <StyledRadioGroup value={gender} onChange={(e)=> {setGender(e.target.value)}} >
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
              </StyledRadioGroup>
              { errors.firstname && (
                        <span style={{color:'red'}}>{errors.firstname}</span>
                    )}
              <StyledTextField
                  label="Nationality"
                  variant="outlined"
                  required fullWidth
                  sx={{ width: 800 }}
                  InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                          <PublicRounded />
                        </InputAdornment>
                      )
                }}
                  value={nationality}
                  error={errors.nationality}
                  onChange={(e)=> {setNationality(e.target.value)}}   
              />
              { errors.nationality && (
                  <span style={{color:'red'}}>{errors.nationality}</span>
              )}
              <StyledTextField
                  label="Email"
                  variant="outlined"
                  required fullWidth
                  sx={{ width: 800 }}
                  InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                          <EmailRounded />
                        </InputAdornment>
                      )
                }}
                  error={errors.email}
                  value={email}
                  onChange={(e)=> {setEmail(e.target.value)}}   
              />
              { errors.email && (
                  <span style={{color:'red'}}>{errors.email}</span>
              )}
              <StyledTextField
                  label="Phone contact"
                  variant="outlined"
                  required fullWidth
                  sx={{ width: 800 }}
                  InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                          <PhoneRounded />
                        </InputAdornment>
                      )
                }}
                  value={phoneContact}
                  error={errors.phoneContact}
                  onChange={(e)=> {setPhoneContact(e.target.value)}}   
              />
              { errors.phoneContact && (
                  <span style={{color:'red'}}>{errors.phoneContact}</span>
              )}
              <StyledTextField
                  label="Choose new profile picture"
                  variant="outlined"
                  type="file"
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ accept: ".jpeg,.jgp,.png" }}
                  required fullWidth
                  sx={{ width: 800 }}
                  onChange={(e)=> { setProfilePic(e.target.files[0]) }}   
              />
              { errors.profilePic && (
                  <span style={{color:'red'}}>{errors.profilePic}</span>
              )}

              <FormControl fullWidth >
                  <InputLabel id="category" >Select your profession category</InputLabel>
                  <Select
                  value={category}
                  fullWidth
                  id="category"
                  label="Select a category"
                  sx={{ width: 800 }}
                  InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                          <CategoryRounded />
                        </InputAdornment>
                      )
                }}
                  onChange={(e) => setCategory(e.target.value)}
                  >
                      <MenuItem value="" disabled>Select a Category</MenuItem>
                      <MenuItem value="Accounting">Accounting</MenuItem>
                      <MenuItem value="Agriculture">Agriculture</MenuItem>
                      <MenuItem value="Architecture">Architecture</MenuItem>
                      <MenuItem value="Arts and Entertainment">Arts and Entertainment</MenuItem>
                      <MenuItem value="Business and Management">Business and Management</MenuItem>
                      <MenuItem value="Construction">Construction</MenuItem>
                      <MenuItem value="Education">Education</MenuItem>
                      <MenuItem value="Engineering">Engineering</MenuItem>
                      <MenuItem value="Finance">Finance</MenuItem>
                      <MenuItem value="Healthcare">Healthcare</MenuItem>
                      <MenuItem value="Information Technology">Information Technology</MenuItem>
                      <MenuItem value="Legal">Legal</MenuItem>
                      <MenuItem value="Manufacturing">Manufacturing</MenuItem>
                      <MenuItem value="Marketing and Sales">Marketing and Sales</MenuItem>
                      <MenuItem value="Media and Communications">Media and Communications</MenuItem>
                      <MenuItem value="Nonprofit">Nonprofit</MenuItem>
                      <MenuItem value="Real Estate">Real Estate</MenuItem>
                      <MenuItem value="Science">Science</MenuItem>
                      <MenuItem value="Social Services">Social Services</MenuItem>
                      <MenuItem value="Transportation">Transportation</MenuItem>
                      {/* Add more professions as needed */}
                  </Select>
              </FormControl>
              
              <StyledTextField
                  label="Profession"
                  variant="outlined"
                  required fullWidth
                  sx={{ width: 800 }}
                  InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                          <ConstructionRounded />
                        </InputAdornment>
                      )
                }}
                  error={errors.profession}
                  value={profession}
                  onChange={(e)=> {setProfession(e.target.value)}}   
              />
              { errors.profession && (
                  <span style={{color:'red'}}>{errors.profession}</span>
              )}
              <StyledTextField
                  label="Personal description"
                  variant="outlined"
                  required fullWidth
                  sx={{ width: 800 }}
                  InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                          <DescriptionRounded />
                        </InputAdornment>
                      )
                }}
                  error={errors.personalDescription}
                  value={personalDescription}
                  onChange={(e)=> {setPersonalDescription(e.target.value)}}   
              />
              { errors.personalDescription && (
                  <span style={{color:'red'}}>{errors.personalDescription}</span>
              )}
              <StyledTextField
                  label="Personal website link(if any)"
                  variant="outlined"
                  fullWidth
                  sx={{ width: 800 }}
                  InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                          <HttpRounded />
                        </InputAdornment>
                      )
                }}
                  error={errors.website}
                  value={website}
                  onChange={(e)=> {setWebsite(e.target.value)}}   
              />
              { errors.website && (
                  <span style={{color:'red'}}>{errors.website}</span>
              )}
              <StyledTextField
                  label="GitHub link"
                  variant="outlined"
                  fullWidth
                  sx={{ width: 800 }}
                  InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                          <GitHub />
                        </InputAdornment>
                      )
                }}
                  value={github}
                  error={errors.github}
                  onChange={(e)=> {setGithub(e.target.value)}}   
              />
              { errors.github && (
                  <span style={{color:'red'}}>{errors.github}</span>
              )}
              <StyledTextField
                  label="Upload updated Resume/Curriculum Vitae"
                  variant="outlined"
                  type="file"
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ accept: ".pdf" }}
                  required fullWidth
                  sx={{ width: 800 }}
                  onChange={(e)=> {setResume(e.target.files[0])}}   
              />
              <StyledTextField
                  label="LinkedIn Username"
                  variant="outlined"
                  fullWidth
                  sx={{ width: 800 }}
                  InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                          <LinkedIn />
                        </InputAdornment>
                      )
                }}
                  error={errors.linkedIn}
                  value={linkedIn}
                  onChange={(e)=> {setLinkedIn(e.target.value)}}   
              />
              { errors.linkedIn && (
                  <span style={{color:'red'}}>{errors.linkedIn}</span>
              )}
              <StyledTextField
                  label="Facebook Username"
                  variant="outlined"
                  fullWidth
                  sx={{ width: 800 }}
                  InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                          <FacebookRounded />
                        </InputAdornment>
                      )
                }}
                  value={facebook}
                  error={errors.facebook}
                  onChange={(e)=> {setFacebook(e.target.value)}}   
              />
              { errors.facebook && (
                  <span style={{color:'red'}}>{errors.facebook}</span>
              )}
              <StyledTextField
                  label="Twitter handle"
                  variant="outlined"
                  fullWidth
                  sx={{ width: 800 }}
                  InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                          <Twitter />
                        </InputAdornment>
                      )
                }}
                  error={errors.twitter}
                  value={twitter}
                  onChange={(e)=> {setTwitter(e.target.value)}}   
              />
              { errors.twitter && (
                  <span style={{color:'red'}}>{errors.twitter}</span>
              )}
              <StyledTextField
                  label="Instagram"
                  variant="outlined"
                  fullWidth
                  sx={{ width: 800 }}
                  InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                          <Instagram />
                        </InputAdornment>
                      )
                }}
                  error={errors.instagram}
                  value={instagram}
                  onChange={(e)=> {setInstagram(e.target.value)}}   
              />
              { errors.instagram && (
                  <span style={{color:'red'}}>{errors.instagram}</span>
              )}
              <LoadingButton
                variant="contained"
                type="submit"
                size="large"
                loading={loading}
              >
                Create profile
              </LoadingButton>
          </form>
        </div>
     );
}
 
export default UpdateProfile;