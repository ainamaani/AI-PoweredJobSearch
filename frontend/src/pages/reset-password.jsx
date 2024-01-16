import { Typography,TextField,Button, IconButton, InputAdornment } from "@mui/material";
import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Iconify from "src/components/iconify";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [passwordResetCode, setPasswordResetCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [emailVerified, setEmailVerified] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [resetPasswordError, setResetPasswordError] = useState('');
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false)

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

                toast.success('Password reset successful',{
                    position: 'top-right'
                })
            }
        } catch (error) {
            if(error.response && error.response.data && error.response.data.error){
                setResetPasswordError(error.response.data.error);
            }
        }
    }
    return ( 
        <div className="content">
            <form onSubmit={handleResetPassword}>
                <Typography variant="h3" className="register-head">
                    Reset forgotten password!!
                </Typography>
                <div className="fields">
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
                    size="large"
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
                            value={newPassword}
                            onChange={(e)=>{setNewPassword(e.target.value)}}
                        />
                        <Button variant="contained" type="submit"
                            sx={{marginTop: 2, 
                                marginBottom: 2, 
                                display: 'block' 
                            }}
                            size="large"
                        >Reset password</Button>
                        { resetPasswordError && <span style={{color:"red"}}>{resetPasswordError}</span> }
                    </>
                    )}
                </div>
                
            </form>
        </div>
     );
}
 
export default ResetPassword;