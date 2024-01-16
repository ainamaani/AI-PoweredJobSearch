import { Typography,TextField,Button } from "@mui/material";
import { styled } from "@mui/system";
import React,{ useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


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
    const { id } = useParams();

    const [resume, setResume] = useState(null);
    const [applicationLetter, setApplicationLetter] = useState(null);

    const handleJobApplication = async(e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('job', id)
        formData.append('resume', resume);
        formData.append('applicationLetter', applicationLetter);

        try {
            const jobapplication = await axios.post('http://localhost:5550/api/applications/apply',
                                            formData,{
                                                headers:{
                                                   'Content-Type':'multipart/form-data' 
                                                }
                                            }
            )
            if(jobapplication.status === 200){
                console.log(jobapplication);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return ( 
        <div>
            <Typography>
                Upload docs to apply for { id }
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
                    <StyledButton variant="contained" type="submit">Apply for the job</StyledButton>
                </form>
            </StyledPageContent>
        </div>
     );
}
 
export default JobApplication;