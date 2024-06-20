import { Typography,TextField,Button, InputAdornment } from "@mui/material";
import { styled } from "@mui/system";
import React,{ useEffect, useState } from 'react';
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { LoadingButton } from "@mui/lab";
import UseAuthContext from "src/hooks/use-auth-context";
import { ArticleRounded, DescriptionRounded, Handyman } from "@mui/icons-material";


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


    const [resume, setResume] = useState(null);
    const [applicationLetter, setApplicationLetter] = useState(null);
    const [applicantSkills, setApplicantSkills] = useState('');
    const [jobBeingAppliedFor, setJobBeingAppliedFor] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [errors, setErrors] = useState({})

    useEffect(()=>{
        try {
            const fetchJobBeingAppliedFor = async() =>{
                const response = await axios.get(`http://localhost:5550/api/jobs/${_id}`);
                if(response.status === 200){
                    setJobBeingAppliedFor(response.data);
                }
            }
            fetchJobBeingAppliedFor();
        } catch (err) {
            console.log(err);
        }
    },[_id]);

    const handleJobApplication = async(e) =>{
        setErrors({});
        e.preventDefault();
        const formData = new FormData();
        formData.append('applicant', user.id)
        formData.append('job', _id)
        formData.append('resume', resume);
        formData.append('applicationLetter', applicationLetter);
        formData.append('applicantSkills', applicantSkills);

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
                navigate('/dashboard/dashboard/jobs');
                toast.success('Job application successful :)',{
                    position : 'top-right'
                })
            }
        } catch (er) {
            if(er.response && er.response.data && er.response.data.error){
                setError(er.response.data.error);
                toast.error("You have already applied for this job" ,{
                    position : 'top-center'
                })
                navigate('/dashboard/dashboard/jobs');
            }
            
        } finally{
            setLoading(false)
        }
    }

    return ( 
        <div style={{
            background: "#fff",
            borderRadius: "8px",
            padding: "20px"
        }}>
            <Typography variant="h4">
                Apply for {jobBeingAppliedFor.title} at {jobBeingAppliedFor.company}
            </Typography>
            <Typography variant="subtitle1">
                Please scan all other relevant documents(if any) and attach them to the resume.
            </Typography>
            <StyledPageContent>
                <div >
                    <form onSubmit={handleJobApplication}>
                        <StyledTextField
                            label="Upload your resume in pdf"
                            variant="outlined"
                            required fullWidth
                            sx={{ width: 500 }}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                    <DescriptionRounded />
                                    </InputAdornment>
                                )
                            }}
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
                            sx={{ width: 500 }}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                    <ArticleRounded />
                                    </InputAdornment>
                                )
                            }}
                            type="file"
                            inputProps={{ accept: ".pdf" }}
                            onChange={(e)=> {setApplicationLetter(e.target.files[0])}}   
                        />
                        { errors.applicationLetter && (
                                <span style={{color:'red', textAlign:"left"}}>{errors.applicationLetter}</span>
                            )}

                        <StyledTextField
                            label="Your skills that makes you suitable for the job"
                            variant="outlined"
                            required fullWidth
                            sx={{ width: 500 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                    <Handyman />
                                    </InputAdornment>
                                )
                            }}
                            onChange={(e)=> {setApplicantSkills(e.target.value)}}   
                        />
                        <LoadingButton
                            variant="contained"
                            type="submit"
                            loading={loading}
                            size="large"
                        >
                            Apply for the job
                        </LoadingButton>
                        
                    </form>
                </div>
            </StyledPageContent>
        </div>
     );
}
 
export default JobApplication;