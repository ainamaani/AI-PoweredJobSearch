import { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import UseAuthContext from 'src/hooks/use-auth-context';
import axios from 'axios';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { EmailRounded, LockRounded, PasswordRounded } from '@mui/icons-material';


// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();

  const navigate = useNavigate();

  const { dispatch } = UseAuthContext();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  const handleLogin = async(e) => {
    try {
      // set the loading action to true when the login action starts
      setLoading(true);
      setError('');

      const loginData = { email,password }

      const loginuser = await axios.post('http://localhost:5550/api/user/login',
                              JSON.stringify(loginData),{
                                headers:{
                                  'Content-Type':'application/json'
                                }
                              }
      );
      if(loginuser.status === 200){
        // save the user in local storage
        localStorage.setItem('user', JSON.stringify(loginuser.data));
        // update the auth api context.
        dispatch({ type: 'LOGIN', payload: loginuser.data });
        // navigate to the dashboard after login successfully.
        navigate('/dashboard');
        // display success toast
        toast.success('Log in successful',{
          position: 'top-right'
        })
      }
    } catch (err) {
      console.log(err);
      if(err && err.response && err.response.data && err.response.data.error){
        setError(err.response.data.error);
      
      }
      toast.error('Login failed!',{
        position: 'top-right'
      })
    }finally{
      // set the loading back to false when the login action has completed.
      setLoading(false); 
    }
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField 
          name="email" 
          label="Email address" 
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <EmailRounded style={{ fontSize: "20px" }} />
              </InputAdornment>
            )
          }}
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
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
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
        />
      </Stack>

      { error && <span style={{ color:"red", marginTop:"8px" }}>{error}</span> }

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link className='get-started-link' to='/resetpassword'>Forgot password?</Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleLogin}
        loading={loading}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in to CareerConnect</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link to='/register' variant="subtitle2" sx={{ ml: 0.5 }} className='get-started-link'>
              Get started
            </Link>
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
