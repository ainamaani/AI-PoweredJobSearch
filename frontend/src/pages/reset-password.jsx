import { Typography,TextField,Button, IconButton, InputAdornment } from "@mui/material";
import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Iconify from "src/components/iconify";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { LoadingButton } from "@mui/lab";
import { EmailRounded, KeyRounded, LockRounded } from "@mui/icons-material";


const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [passwordResetCode, setPasswordResetCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [emailVerified, setEmailVerified] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [resetPasswordError, setResetPasswordError] = useState('');
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [emailLoading, setEmailLoading] = useState(false);
    const [resetLoading, setResetLoading] = useState(false);

    const handleEmailConfirmation = async(e) =>{
        e.preventDefault();
        setEmailError('');
        try {
            setEmailLoading(true);
            const confirmEmail = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/reset/code`,
                                                JSON.stringify({ email }),{
                                                    headers:{
                                                        'Content-Type':'application/json'
                                                    }
                                                }
            )
            if(confirmEmail.status === 200){
                console.log(confirmEmail.data);
                setEmailVerified(true);
                toast.success('Email successful verified :)',{
                    position: 'top-right'
                })
            }
        } catch (error) {
            console.log(error);
            toast.error('Email verification failed',{
                position: 'top-right'
            })
            if(error.response && error.response.data && error.response.data.error){
                setEmailError(error.response.data.error);
            }
        } finally{
            setEmailLoading(false);
        }

    }


    const handleResetPassword = async(e) =>{
        e.preventDefault();
        try {
            setResetLoading(true);
            const resetpword = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/reset/forgotpassword`,
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

                toast.success('Password reset successful :)',{
                    position: 'top-right'
                })
            }
        } catch (error) {
            toast.error('Password reset failed',{
                position: 'top-right'
            })
            if(error.response && error.response.data && error.response.data.error){
                setResetPasswordError(error.response.data.error);
            }
        } finally{
            setResetLoading(false);
        }
    }
    return ( 
        <div className="content" >
            <div className="reset">
            <form onSubmit={handleResetPassword}>
                <Typography variant="h3" className="register-head">
                    Reset forgotten password.
                </Typography>
                <div className="head-border-bottom">...</div>
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
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                  <EmailRounded />
                                </InputAdornment>
                              )
                        }}
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                />
                <LoadingButton
                    sx={{marginTop: 2, 
                        marginBottom: 2, 
                        display: 'block'
                        
                    }}
                    size="large"
                    variant="contained"
                    onClick={handleEmailConfirmation}
                    loading={emailLoading}
                >
                    Confirm Email
                </LoadingButton>
    
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
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                      <KeyRounded />
                                    </InputAdornment>
                                  )
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
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <LockRounded />
                                    </InputAdornment>
                                    )
                                
                            }}
                            value={newPassword}
                            onChange={(e)=>{setNewPassword(e.target.value)}}
                        />
                        <LoadingButton
                            sx={{marginTop: 2, 
                                marginBottom: 2, 
                                display: 'block' 
                            }}
                            variant="contained"
                            type="submit"
                            size="large"
                            loading={resetLoading}
                        >
                            Reset password
                        </LoadingButton>
                        { resetPasswordError && <span style={{color:"red"}}>{resetPasswordError}</span> }
                    </>
                    )}
                    </div>
                
                </form>
            </div>
        </div>
     );
}
 
export default ResetPassword;