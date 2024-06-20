import { Typography,TextField,Button,RadioGroup,Radio,FormControlLabel, 
    InputAdornment, IconButton, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import React,{ useState, useEffect } from 'react';
import { styled } from "@mui/system";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import Iconify from "src/components/iconify";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { LoadingButton } from "@mui/lab";
import { BusinessRounded, CategoryRounded, DescriptionRounded, EmailRounded, FactoryRounded, HttpRounded, LocationOnRounded, LockRounded, PersonRounded } from "@mui/icons-material";

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

const Register = () => {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [sector, setSector] = useState('');
    const [userCategory, setUserCategory] = useState('');
    const [company, setCompany] = useState('');
    const [companyEmail, setCompanyEmail]  = useState('');
    const [companyDescription, setCompanyDescription] = useState('');
    const [companyLogo, setCompanyLogo] = useState(null);
    const [industry, setIndustry] = useState('');
    const [location, setLocation] = useState('');
    const [companyWebsiteUrl, setCompanyWebsiteUrl] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [loading,setLoading] = useState(false);

    const [errors,setErrors] = useState({});

    const [error, setError] = useState('');

    const handleRegister = async(e) =>{
        
        e.preventDefault();
        setErrors({});
        setError('');

        const formData = new FormData();
        formData.append('firstname', firstname);
        formData.append('lastname', lastname);
        formData.append('email', email);
        formData.append('sector', sector);
        formData.append('userCategory', userCategory);
        formData.append('company', company);
        formData.append('companyEmail', companyEmail);
        formData.append('companyDescription', companyDescription);
        formData.append('companyLogo', companyLogo);
        formData.append('industry', industry);
        formData.append('location', location);
        formData.append('companyWebsiteUrl', companyWebsiteUrl);
        formData.append('password', password);
        formData.append('passwordConfirm', passwordConfirm);

        // const registerData = { 
        //     firstname,lastname,email,userCategory,company,companyEmail,password,passwordConfirm
        // }
        try {
            setLoading(true);

            const registeruser = await axios.post('http://localhost:5550/api/user/register',
                                                formData,{
                                                    headers:{
                                                        'Content-Type':'multipart/form-data'
                                                    }
                                                }
            )
            if(registeruser.status === 200){
                console.log(registeruser.data);
                setFirstname('');
                setLastname('');
                setEmail('');
                setSector('');
                setCompany('');
                setCompanyEmail('');
                setUserCategory('');
                setPassword('');
                setCompanyDescription('');
                setCompanyLogo(null);
                setIndustry('');
                setLocation('');
                setCompanyWebsiteUrl('');
                setPasswordConfirm('');
                
                navigate('/login');

                toast.success('Registration successful',{
                    position: 'top-right'
                })

            }
        } catch (err) {
            console.log(err);
            if(err.response && err.response.data && err.response.data.errors){
                setErrors(err.response.data.errors);
            }
            if(err.response && err.response.data && err.response.data.error){
                setError(err.response.data.error);
            }
            toast.error('Registration failed',{
                position: 'top-right'
            })
        } finally{
            setLoading(false);
        }
    }
    
    return ( 
        <div className="register">  
            <StyledPageContent className="content">
                <form onSubmit={handleRegister}>
                  <div className="app-logo" style={{
                    position:"relative",
                    right: "2%"
                  }}>
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/images/landing/applogo2.png`} alt="logo" 
                    />
                  </div>
                    <Typography variant="h4"  className="register-head">
                        Register for CareerConnect.
                    </Typography>
                    <div className="head-border-bottom">...</div>
                    <StyledTextField
                        label="First name"
                        variant="outlined"
                        required fullWidth
                        sx={{ width: 600 }}
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <PersonRounded />
                              </InputAdornment>
                            )
                          }}
                        error={errors.firstname}
                        value={firstname}
                        onChange={(e)=> {setFirstname(e.target.value)}}   
                    />
                    { errors.firstname && (
                            <span style={{color:'red', textAlign:"left"}}>{errors.firstname}</span>
                        )}
                    <StyledTextField
                        label="Last name"
                        variant="outlined"
                        required fullWidth
                        sx={{ width: 600 }}
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <PersonRounded />
                              </InputAdornment>
                            )
                          }}
                        error={errors.lastname}
                        value={lastname}
                        onChange={(e)=> {setLastname(e.target.value)}}   
                    />
                    { errors.lastname && (
                            <span style={{color:'red', textAlign:"left"}}>{errors.lastname}</span>
                        )}
                    <StyledTextField
                        label="Email"
                        variant="outlined"
                        required fullWidth
                        sx={{ width: 600 }}
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
                            <span style={{color:'red', textAlign:"left"}}>{errors.email}</span>
                        )}
                        
                    <FormControl fullWidth >
                        <InputLabel id="sector">Select sector</InputLabel>
                        <Select
                        value={sector}
                        fullWidth
                        id="sector"
                        label="Select a sector"
                        sx={{ width: 600 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                  <FactoryRounded />
                                </InputAdornment>
                              )
                        }}
                        onChange={(e) => setSector(e.target.value)}
                        >
                            <MenuItem value="" disabled>Select a sector</MenuItem>
                            <MenuItem value="Accounting">Accounting</MenuItem>
                            <MenuItem value="Administration">Administration</MenuItem>
                            <MenuItem value="Agriculture">Agriculture</MenuItem>
                            <MenuItem value="Analysis">Analysis</MenuItem>
                            <MenuItem value="Analytics">Analytics</MenuItem>
                            <MenuItem value="Art">Art</MenuItem>
                            <MenuItem value="Artificial Intelligence">Artificial Intelligence</MenuItem>
                            <MenuItem value="Business">Business</MenuItem>
                            <MenuItem value="Construction">Construction</MenuItem>
                            <MenuItem value="Consulting">Consulting</MenuItem>
                            <MenuItem value="Content Creation">Content Creation</MenuItem>
                            <MenuItem value="Cybersecurity">Cybersecurity</MenuItem>
                            <MenuItem value="Design">Design</MenuItem>
                            <MenuItem value="Education">Education</MenuItem>
                            <MenuItem value="Engineering">Engineering</MenuItem>
                            <MenuItem value="Executive">Executive</MenuItem>
                            <MenuItem value="Finance">Finance</MenuItem>
                            <MenuItem value="Healthcare">Healthcare</MenuItem>
                            <MenuItem value="Human Resource">Human Resource</MenuItem>
                            <MenuItem value="Information Technology">Information Technology</MenuItem>
                            <MenuItem value="Innovation">Innovation</MenuItem>
                            <MenuItem value="Journalism">Journalism</MenuItem>
                            <MenuItem value="Law">Law</MenuItem>
                            <MenuItem value="Leadership">Leadership</MenuItem>
                            <MenuItem value="Legal">Legal</MenuItem>
                            <MenuItem value="Logistics">Logistics</MenuItem>
                            <MenuItem value="Machine Learning">Machine Learning</MenuItem>
                            <MenuItem value="Management">Management</MenuItem>
                            <MenuItem value="Manufacturing">Manufacturing</MenuItem>
                            <MenuItem value="Marketing">Marketing</MenuItem>
                            <MenuItem value="Monitoring and Evaluation">Monitoring and Evaluation</MenuItem>
                            <MenuItem value="Networking">Networking</MenuItem>
                            <MenuItem value="NGO">NGO</MenuItem>
                            <MenuItem value="Nonprofit">Nonprofit</MenuItem>
                            <MenuItem value="Operations">Operations</MenuItem>
                            <MenuItem value="Product Management">Product Management</MenuItem>
                            <MenuItem value="Project Management">Project Management</MenuItem>
                            <MenuItem value="Public Relations">Public Relations</MenuItem>
                            <MenuItem value="Quality Assurance">Quality Assurance</MenuItem>
                            <MenuItem value="Real Estate">Real Estate</MenuItem>
                            <MenuItem value="Research">Research</MenuItem>
                            <MenuItem value="Sales">Sales</MenuItem>
                            <MenuItem value="Science">Science</MenuItem>
                            <MenuItem value="Social Services">Social Services</MenuItem>
                            <MenuItem value="Software Development">Software Development</MenuItem>
                            <MenuItem value="Statistics">Statistics</MenuItem>
                            <MenuItem value="Strategic Planning">Strategic Planning</MenuItem>
                            <MenuItem value="Support">Support</MenuItem>
                            <MenuItem value="Information Technology">Information Technology</MenuItem>
                            <MenuItem value="Tourism">Tourism</MenuItem>
                            <MenuItem value="Transportation">Transportation</MenuItem>
                            <MenuItem value="Writing">Writing</MenuItem>

                        </Select>
                    </FormControl>
                    { errors.sector && (
                            <span style={{color:'red', textAlign:"left"}}>{errors.sector}</span>
                    )}

                    <FormControl fullWidth style={{
                      marginTop: "18px"
                    }} >
                        <InputLabel id="user category">Select user category</InputLabel>
                        <Select
                        value={userCategory}
                        fullWidth
                        id="user category"
                        label="Select a user category"
                        sx={{ 
                          width: 600
                        }}
                        onChange={(e) => setUserCategory(e.target.value)}
                        >
                            <MenuItem value="" disabled>Select a user category</MenuItem>
                            <MenuItem value="Job seeker">Job seeker</MenuItem>
                            <MenuItem value="Recruiter">Recruiter</MenuItem>
                            
                        </Select>
                    </FormControl>
                    { errors.userCategory && (
                            <span style={{color:'red', textAlign:"left"}}>{errors.userCategory}</span>
                    )}

                    { userCategory === "Recruiter" && (
                        <>
                            <StyledTextField
                                label="Company"
                                variant="outlined"
                                required fullWidth
                                sx={{ width: 600 }}
                                error={errors.company}
                                value={company}
                                onChange={(e)=> {setCompany(e.target.value)}}   
                            />
                            { errors.company && (
                                <span style={{color:'red', textAlign:"left"}}>{errors.company}</span>
                            )}
                            <StyledTextField
                                label="Company Email"
                                variant="outlined"
                                required fullWidth
                                sx={{ width: 600 }}
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position='start'>
                                        <EmailRounded />
                                      </InputAdornment>
                                    )
                                  }}
                                error={errors.companyEmail}
                                value={companyEmail}
                                onChange={(e)=> {setCompanyEmail(e.target.value)}}   
                            />
                            { errors.companyEmail && (
                                <span style={{color:'red', textAlign:"left"}}>{errors.companyEmail}</span>
                            )}
                            <StyledTextField
                                label="Company Description"
                                variant="outlined"
                                required fullWidth
                                sx={{ width: 600 }}
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position='start'>
                                        <DescriptionRounded />
                                      </InputAdornment>
                                    )
                                  }}
                                error={errors.companyDescription}
                                value={companyDescription}
                                onChange={(e)=> {setCompanyDescription(e.target.value)}}   
                            />
                            { errors.companyDescription && (
                                <span style={{color:'red', textAlign:"left"}}>{errors.companyDescription}</span>
                            )}
                            <StyledTextField
                                label="Industry"
                                variant="outlined"
                                required fullWidth
                                sx={{ width: 600 }}
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position='start'>
                                        <CategoryRounded />
                                      </InputAdornment>
                                    )
                                  }}
                                error={errors.industry}
                                value={industry}
                                onChange={(e)=> {setIndustry(e.target.value)}}   
                            />
                            { errors.industry && (
                                <span style={{color:'red', textAlign:"left"}}>{errors.industry}</span>
                            )}
                            <StyledTextField
                                label="Company location"
                                variant="outlined"
                                required fullWidth
                                sx={{ width: 600 }}
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position='start'>
                                        <LocationOnRounded />
                                      </InputAdornment>
                                    )
                                  }}
                                error={errors.location}
                                value={location}
                                onChange={(e)=> {setLocation(e.target.value)}}   
                            />
                            { errors.location && (
                                <span style={{color:'red', textAlign:"left"}}>{errors.location}</span>
                            )}
                            <StyledTextField
                                label="Company logo"
                                variant="outlined"
                                required fullWidth
                                InputLabelProps={{ shrink: true }}
                                inputProps={{ accept: ".jpeg,.jpg,.png" }}
                                sx={{ width: 600 }}
                                type="file"
                                onChange={(e)=> {setCompanyLogo(e.target.files[0])}}   
                            />
                            { errors.companyLogo && (
                                <span style={{color:'red', textAlign:"left"}}>{errors.companyLogo}</span>
                            )}
                            <StyledTextField
                                label="Company website link"
                                variant="outlined"
                                required fullWidth
                                sx={{ width: 600 }}
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position='start'>
                                        <HttpRounded />
                                      </InputAdornment>
                                    )
                                  }}
                                error={errors.companyWebsiteUrl}
                                value={companyWebsiteUrl}
                                onChange={(e)=> {setCompanyWebsiteUrl(e.target.value)}}   
                            />
                            { errors.companyWebsiteUrl && (
                                <span style={{color:'red', textAlign:"left"}}>{errors.companyWebsiteUrl}</span>
                            )}
                        </>
                    )}
                    <StyledTextField
                        label="Password"
                        variant="outlined"
                        required fullWidth
                        sx={{ width: 600 }}
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                </IconButton>
                              </InputAdornment>
                            ),
                            startAdornment: (
                                <InputAdornment position='start'>
                                  <LockRounded />
                                </InputAdornment>
                              )
                        }}
                        error={errors.password}
                        value={password}
                        onChange={(e)=> {setPassword(e.target.value)}} 
                        
                    />
                    { errors.password && (
                            <span style={{color:'red'}}>{errors.password}</span>
                        )}  
                    <StyledTextField
                        label="Confirm password"
                        variant="outlined"
                        required fullWidth
                        sx={{ width: 600 }}
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                </IconButton>
                              </InputAdornment>
                            ),
                            startAdornment: (
                                <InputAdornment position='start'>
                                  <LockRounded />
                                </InputAdornment>
                              )
                        }}
                        error={errors.passwordConfirm}
                        value={passwordConfirm}
                        onChange={(e)=> {setPasswordConfirm(e.target.value)}}   
                    />
                    { error && <span style={{color:"red", display:"block", textAlign:"left"}}>{error}</span>  } 
                    <LoadingButton
                        size="large"
                        type="submit"
                        color="inherit"
                        variant="contained"
                        className="register-button"
                        loading={loading}
                    >
                        Register
                    </LoadingButton>
                    <div className="already-with-account">
                        <span style={{ 
                          color: 'blue'
                        }}>Already have an account? <Link to='/login'>Login</Link> </span> 
                    </div>
                </form>
            </StyledPageContent>
        </div>    
     );
}
 
export default Register;