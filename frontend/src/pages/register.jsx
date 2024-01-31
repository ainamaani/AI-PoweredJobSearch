import { Typography,TextField,Button,RadioGroup,Radio,FormControlLabel, 
    InputAdornment, IconButton } from "@mui/material";
import React,{ useState, useEffect } from 'react';
import { styled } from "@mui/system";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import Iconify from "src/components/iconify";
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

const Register = () => {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [userCategory, setUserCategory] = useState('');
    const [company, setCompany] = useState('');
    const [companyEmail, setCompanyEmail]  = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [loading,setLoading] = useState(false);

    const [errors,setErrors] = useState({});

    const [error, setError] = useState('');

    const handleRegister = async(e) =>{
        
        e.preventDefault();
        setErrors({});
        setError('');

        const registerData = { 
            firstname,lastname,email,userCategory,company,companyEmail,password,passwordConfirm
        }
        try {
            setLoading(true);

            const registeruser = await axios.post('http://localhost:5550/api/user/register',
                                                JSON.stringify(registerData),{
                                                    headers:{
                                                        'Content-Type':'application/json'
                                                    }
                                                }
            )
            if(registeruser.status === 200){
                console.log(registeruser.data);
                setFirstname('');
                setLastname('');
                setEmail('');
                setCompany('');
                setCompanyEmail('');
                setUserCategory('');
                setPassword('');
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
                    <Typography variant="h3" className="register-head">
                        Register for CareerConnect.
                    </Typography>
                    <div className="head-border-bottom">...</div>
                    <StyledTextField
                        label="First name"
                        variant="outlined"
                        required fullWidth
                        sx={{ width: 800 }}
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
                        sx={{ width: 800 }}
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
                        sx={{ width: 800 }}
                        error={errors.email}
                        value={email}
                        onChange={(e)=> {setEmail(e.target.value)}}   
                    />
                    { errors.email && (
                            <span style={{color:'red', textAlign:"left"}}>{errors.email}</span>
                        )}
                {/* <StyledRadioGroup value={jobType} onChange={(e)=> {setJobType(e.target.value)}} >
                    <FormControlLabel value="full-time" control={<Radio />} label="Full time" />
                    <FormControlLabel value="part-time" control={<Radio />} label="Part time" />
                    <FormControlLabel value="contract" control={<Radio />} label="Contract" />
                </StyledRadioGroup>
                { errors.jobType && (
                    <span style={{color:'red'}}>{errors.jobType}</span>
                )} */}
                    <StyledRadioGroup value={userCategory} onChange={(e)=> {setUserCategory(e.target.value)}} >
                        <FormControlLabel value="Job seeker" control={<Radio />} label="Job seeker" />
                        <FormControlLabel value="Recruiter" control={<Radio />} label="Recruiter" />
                    </StyledRadioGroup>
                    { errors.userCategory && (
                            <span style={{color:'red', textAlign:"left"}}>{errors.userCategory}</span>
                        )}
                    { userCategory === "Recruiter" && (
                        <>
                            <StyledTextField
                                label="Company"
                                variant="outlined"
                                required fullWidth
                                sx={{ width: 800 }}
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
                                sx={{ width: 800 }}
                                error={errors.companyEmail}
                                value={companyEmail}
                                onChange={(e)=> {setCompanyEmail(e.target.value)}}   
                            />
                            { errors.companyEmail && (
                                <span style={{color:'red', textAlign:"left"}}>{errors.companyEmail}</span>
                            )}
                        </>
                    )}
                    <StyledTextField
                        label="Password"
                        variant="outlined"
                        required fullWidth
                        sx={{ width: 800 }}
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                </IconButton>
                              </InputAdornment>
                            ),
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
                        sx={{ width: 800 }}
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                </IconButton>
                              </InputAdornment>
                            ),
                        }}
                        error={errors.passwordConfirm}
                        value={passwordConfirm}
                        onChange={(e)=> {setPasswordConfirm(e.target.value)}}   
                    />
                    { error && <span style={{color:"red", display:"block", textAlign:"left"}}>{error}</span>  } 
                    <LoadingButton
                        size="large"
                        type="submit"
                        variant="contained"
                        className="register-button"
                        loading={loading}
                    >
                        Register
                    </LoadingButton>
                    <div className="already-with-account">
                        <p>Already have an account? <Link to='/login'>Login</Link> </p> 
                    </div>
                </form>
            </StyledPageContent>
        </div>    
     );
}
 
export default Register;