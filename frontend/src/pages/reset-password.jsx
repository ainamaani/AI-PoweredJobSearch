import { Typography,TextField,Button } from "@mui/material";
import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";


const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [passwordResetCode, setPasswordResetCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [emailVerified, setEmailVerified] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [resetPasswordError, setResetPasswordError] = useState('');
    const navigate = useNavigate();

    const handleEmailConfirmation = async(e) =>{
        e.preventDefault();
        setEmailError('');
        try {
            const confirmEmail = await axios.post('http://localhost:5550/api/reset/code',
                                                JSON.stringify({ email }),{
                                                    headers:{
                                                        'Content-Type':'application/json'
                                                    }
                                                }
            )
            if(confirmEmail.status === 200){
                console.log(confirmEmail.data);
                setEmailVerified(true);
            }
        } catch (error) {
            console.log(error);
            if(error.response && error.response.data && error.response.data.error){
                setEmailError(error.response.data.error);
            }
        }

    }

    const handleResetPassword = async(e) =>{
        e.preventDefault();
        try {
            const resetpword = await axios.post('http://localhost:5550/api/reset/forgotpassword',
                                        JSON.stringify({ email, passwordResetCode, newPassword }),{
                                            headers:{
                                               'Content-Type':'application/json' 
                                            }
                                        }  
            )
            if(resetpword.status === 200){
                setEmail('');
                setPasswordResetCode('');
                setNewPassword('');
                setEmailError('');
                setResetPasswordError('');
                setEmailVerified(false);
                navigate('/login');
            }
        } catch (error) {
            if(error.response && error.response.data && error.response.data.error){
                setResetPasswordError(error.response.data.error);
            }
        }
    }
    return ( 
        <div>
            <Typography variant="h3">
                Reset forgotten password
            </Typography>
            <form onSubmit={handleResetPassword}>
            <TextField 
                    label="Enter your email"
                    variant="outlined"
                    fullWidth required
                    type="email"
                    sx={{
                        marginTop:2,
                        marginBottom:2,
                        width: 600,
                        display: 'block'
                    }}
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
            />
            <Button variant="contained" onClick={handleEmailConfirmation}
                sx={{marginTop: 2, 
                    marginBottom: 2, 
                    display: 'block'
                    
                }}
            >Confirm Email</Button>
            { emailError && <span style={{ color:"red" }}>{ emailError }</span> }
            { emailVerified && (
                <>
                    <TextField 
                        label="Enter token"
                        variant="outlined"
                        fullWidth required
                        sx={{
                            marginTop:2,
                            marginBottom:2,
                            width: 600,
                            display: 'block'
                        }}
                        value={passwordResetCode}
                        onChange={(e)=>{setPasswordResetCode(e.target.value)}}
                    />
                    <TextField 
                        label="Enter new password"
                        variant="outlined"
                        fullWidth required
                        sx={{
                            marginTop:2,
                            marginBottom:2,
                            width: 600,
                            display: 'block'
                        }}
                        value={newPassword}
                        onChange={(e)=>{setNewPassword(e.target.value)}}
                    />
                    <Button variant="contained" type="submit"
                        sx={{marginTop: 2, 
                            marginBottom: 2, 
                            display: 'block' 
                        }}
                    >Reset password</Button>
                    { resetPasswordError && <span style={{color:"red"}}>{resetPasswordError}</span> }
                </>
                )}
                
            </form>
        </div>
     );
}
 
export default ResetPassword;