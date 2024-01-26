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

    const handleRegister = async(e) =>{
        
        e.preventDefault();
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
        } catch (error) {
            console.log(error);
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
                        value={firstname}
                        onChange={(e)=> {setFirstname(e.target.value)}}   
                    />
                    <StyledTextField
                        label="Last name"
                        variant="outlined"
                        required fullWidth
                        sx={{ width: 800 }}
                        value={lastname}
                        onChange={(e)=> {setLastname(e.target.value)}}   
                    />
                    <StyledTextField
                        label="Email"
                        variant="outlined"
                        required fullWidth
                        sx={{ width: 800 }}
                        value={email}
                        onChange={(e)=> {setEmail(e.target.value)}}   
                    />
                    <StyledRadioGroup value={userCategory} onChange={(e)=> {setUserCategory(e.target.value)}} >
                        <FormControlLabel value="Job seeker" control={<Radio />} label="Job seeker" />
                        <FormControlLabel value="Recruiter" control={<Radio />} label="Recruiter" />
                    </StyledRadioGroup>
                    { userCategory === "Recruiter" && (
                        <>
                            <StyledTextField
                                label="Company"
                                variant="outlined"
                                required fullWidth
                                sx={{ width: 800 }}
                                value={company}
                                onChange={(e)=> {setCompany(e.target.value)}}   
                            />
                            <StyledTextField
                                label="Company Email"
                                variant="outlined"
                                required fullWidth
                                sx={{ width: 800 }}
                                value={companyEmail}
                                onChange={(e)=> {setCompanyEmail(e.target.value)}}   
                            />
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
                        value={password}
                        onChange={(e)=> {setPassword(e.target.value)}}   
                    />
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
                        value={passwordConfirm}
                        onChange={(e)=> {setPasswordConfirm(e.target.value)}}   
                    />
                    {/* <LoadingButton
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="inherit"
                        onClick={handleLogin}
                        loading={loading}
                    >
                        Login
                    </LoadingButton> */}
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