import { Typography,TextField,Button } from "@mui/material";
import { styled } from "@mui/system";
import React,{ useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { LoadingButton } from "@mui/lab";
import UseAuthContext from "src/hooks/use-auth-context";


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

const StyledPageContent = styled('div')({
    padding: '30px'
})

const JobApplication = () => {
    const { _id } = useParams();

    const { user } = UseAuthContext();

    console.log(user);

    const [resume, setResume] = useState(null);
    const [applicationLetter, setApplicationLetter] = useState(null);
    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({})

    const handleJobApplication = async(e) =>{
        setErrors({});
        e.preventDefault();
        const formData = new FormData();
        formData.append('applicant', user.id)
        formData.append('job', _id)
        formData.append('resume', resume);
        formData.append('applicationLetter', applicationLetter);

        try {
            setLoading(true);
            const jobapplication = await axios.post('http://localhost:5550/api/applications/apply',
                                            formData,{
                                                headers:{
                                                   'Content-Type':'multipart/form-data' 
                                                }
                                            }
            )
            if(jobapplication.status === 200){
                console.log(jobapplication);
                toast.success('Job application successful :)',{
                    position : 'top-right'
                })
            }
        } catch (error) {
            if(error.response && error.response.data && error.response.data.errors){
                setErrors(error.response.data.errors);
            }
            console.log(error)
            toast.error('Application failed',{
                position : 'top-right'
            })
        } finally{
            setLoading(false)
        }
    }

    return ( 
        <div>
            <Typography variant="h3">
                Upload docs to apply for { _id }
            </Typography>
            <StyledPageContent>
                <form onSubmit={handleJobApplication}>
                    <StyledTextField
                        label="Upload your resume in pdf"
                        variant="outlined"
                        required fullWidth
                        sx={{ width: 800 }}
                        InputLabelProps={{ shrink: true }}
                        type="file"
                        inputProps={{ accept: ".pdf" }}
                        onChange={(e)=> {setResume(e.target.files[0])}}      
                    />
                    { errors.resume && (
                            <span style={{color:'red', textAlign:"left"}}>{errors.resume}</span>
                        )}
                    <StyledTextField
                        label="Upload your application letter in pdf"
                        variant="outlined"
                        required fullWidth
                        sx={{ width: 800 }}
                        InputLabelProps={{ shrink: true }}
                        type="file"
                        inputProps={{ accept: ".pdf" }}
                        onChange={(e)=> {setApplicationLetter(e.target.files[0])}}   
                    />
                    { errors.applicationLetter && (
                            <span style={{color:'red', textAlign:"left"}}>{errors.applicationLetter}</span>
                        )}
                    <LoadingButton
                        variant="contained"
                        type="submit"
                        loading={loading}
                        size="large"
                    >
                        Apply for the job
                    </LoadingButton>
                    
                </form>
            </StyledPageContent>
        </div>
     );
}
 
export default JobApplication;