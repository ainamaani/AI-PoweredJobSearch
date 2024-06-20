import { KeyRounded, LockRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import axios from "axios";
import React,{ useState, useEffect } from 'react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Iconify from "src/components/iconify";
import UseAuthContext from "src/hooks/use-auth-context";


const ChangeUserDetails = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { user } = UseAuthContext();

    const handleChangePassword = async(event) =>{
        event.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(`http://localhost:5550/api/user/changepassword/${user.id}`,
                                    JSON.stringify({ currentPassword, newPassword }),{
                                        headers:{
                                            'Content-Type':'application/json'
                                        }
                                    }
            );
            if(response.status === 200){
                setCurrentPassword('');
                setNewPassword('');
                toast.success("Password changed successfully",{
                    position : "top-right"
                });
            }
            
        } catch (err) {
            if(err.response && err.response.data && err.response.data.error){
                setError(err.response.data.error);
            }
            toast.error("Password change failed", {
                position : "top-right"
            });
        } finally {
            setLoading(false);
        }
    }

    return ( 
        <div style={{
            background:"#fff",
            padding: "20px",
            borderRadius: "8px"
        }}>
            <form onSubmit={handleChangePassword}>
                <Typography variant="h4">Change password</Typography>
                    <TextField 
                            label="Enter current password"
                            variant="outlined"
                            fullWidth required
                            type={showPassword ? 'text' : 'password'}
                            sx={{
                                marginTop:2,
                                marginBottom:2,
                                width: 600,
                                display: 'block'
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                      <LockRounded />
                                    </InputAdornment>
                                  ),
                                endAdornment: (
                                    
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            value={currentPassword}
                            onChange={(e)=>{setCurrentPassword(e.target.value)}}
                    />
                    <TextField 
                            label="Enter new password"
                            variant="outlined"
                            fullWidth required
                            type={showPassword ? 'text' : 'password'}
                            sx={{
                                marginTop:2,
                                marginBottom:2,
                                width: 600,
                                display: 'block'
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                      < KeyRounded />
                                    </InputAdornment>
                                  ),
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
                    { error && <span style={{ color:"red" }}>{error}</span> }
                    <LoadingButton
                            sx={{marginTop: 2, 
                                marginBottom: 2, 
                                display: 'block' 
                            }}
                            variant="contained"
                            type="submit"
                            size="large"
                            loading={loading}
                        >
                            Change password
                    </LoadingButton>
                    
            </form>
        </div>
     );
}
 
export default ChangeUserDetails;