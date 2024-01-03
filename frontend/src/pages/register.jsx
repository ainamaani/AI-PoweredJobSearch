import { Typography } from "@mui/material";
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

const Register = () => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [userCategory, setUserCategory] = useState('');
    const [company, setCompany] = useState('');
    const [companyEmail, setCompanyEmail]  = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const handleRegister = async(e) =>{
        e.preventDefault();
        const registerData = { 
            firstname,lastname,email,userCategory,company,companyEmail,password,passwordConfirm
        }
        try {
            const registeruser = await axios.post('http://localhost:5550/api/user/register',
                                                JSON.stringify(registerData),{
                                                    headers:{
                                                        'Content-Type':'application/json'
                                                    }
                                                }
            )
            if(registeruser.status === 200){
                console.log(registeruser.data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    return ( 
        <div>
            <Typography variant="h3">
                Register for CareerConnect
            </Typography>
            <StyledPageContent>
                <form onSubmit={handleRegister}>
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
                        value={password}
                        onChange={(e)=> {setPassword(e.target.value)}}   
                    />
                    <StyledTextField
                        label="Confirm password"
                        variant="outlined"
                        required fullWidth
                        sx={{ width: 800 }}
                        value={passwordConfirm}
                        onChange={(e)=> {setPasswordConfirm(e.target.value)}}   
                    />
                    <StyledButton variant="contained" type="submit">Register</StyledButton>
                </form>
            </StyledPageContent>
        </div>    
     );
}
 
export default Register;