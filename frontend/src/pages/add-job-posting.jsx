import { Typography,TextField,Button,RadioGroup,Radio,FormControlLabel } from "@mui/material";
import React,{useState} from 'react';
import { styled } from "@mui/system";
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


const AddJobPosting = () => {
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');
    const [companyContact, setCompanyContact] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [skills, setSkills] = useState('');
    const [qualifications, setQualifications] = useState('');
    const [experience, setExperience] = useState('');
    const [location, setLocation] = useState('');
    const [salaryRange, setSalaryRange] = useState('');
    const [jobType, setJobType] = useState('');
    const [additionalBenefits, setAdditionalBenefits] = useState('');
    const [applicationDeadline, setApplicationDeadline] = useState(null);
    const [applicationInstructions, setApplicationInstructions] = useState('');

    const handleAddJobPosting = async (e) => {
        e.preventDefault();
        const jobData = { title,company,companyEmail,companyContact,description,category,skills,qualifications,
        experience,location,salaryRange,jobType,additionalBenefits,applicationDeadline,applicationInstructions }
        try {
           const response = await axios.post('http://localhost:5550/api/jobs/newjob',
            JSON.stringify(jobData),{
                headers:{
                    'Content-Type':'application/json'
                }
            }
           ) 
           if(response.status === 200){
                console.log(response.data);
                setTitle('');
                setCompany('');
                setCompanyContact('');
                setCompanyEmail('');
                setLocation('');
                setSalaryRange('');
                setSkills('');
                setExperience('');
                setQualifications('');
                setCategory('');
                setDescription('');
                setJobType('');
                setAdditionalBenefits('');
                setApplicationDeadline(null);
                setApplicationInstructions('');
           }
        } catch (error) {
            console.log(error)
        }
    }

    return ( 
        <div>
            <StyledPageContent>
                <Typography variant="h3">
                    Add job posting 
                </Typography>
                <form onSubmit={handleAddJobPosting}>
                    <StyledTextField
                        label="Job title"
                        variant="outlined"
                        required fullWidth
                        sx={{ width: 800 }}
                        value={title}
                        onChange={(e)=> {setTitle(e.target.value)}}
                        
                    />
                    <StyledTextField
                        label="Hiring company"
                        variant="outlined"
                        required fullWidth
                        value={company}
                        sx={{ width: 800 }}
                        onChange={(e)=> {setCompany(e.target.value)}}
                    />
                    <StyledTextField
                        label="Job description"
                        variant="outlined"
                        required fullWidth
                        value={description}
                        sx={{ width: 800 }}
                        onChange={(e)=> {setDescription(e.target.value)}}
                    />
                    <StyledTextField
                        label="Job location"
                        variant="outlined"
                        required fullWidth
                        value={location}
                        sx={{ width: 800 }}
                        onChange={(e)=> {setLocation(e.target.value)}}
                    />
                    <StyledTextField
                        label="Job category"
                        variant="outlined"
                        required fullWidth
                        value={category}
                        sx={{ width: 800 }}
                        onChange={(e)=> {setCategory(e.target.value)}}
                    />
                    <StyledRadioGroup value={jobType} onChange={(e)=> {setJobType(e.target.value)}} >
                        <FormControlLabel value="full-time" control={<Radio />} label="Full time" />
                        <FormControlLabel value="part-time" control={<Radio />} label="Part time" />
                        <FormControlLabel value="contract" control={<Radio />} label="Contract" />
                    </StyledRadioGroup>
                    <StyledTextField
                        label="Skills required"
                        variant="outlined"
                        required fullWidth
                        value={skills}
                        sx={{ width: 800 }}
                        onChange={(e)=> {setSkills(e.target.value)}}
                    />
                    <StyledTextField
                        label="Qualifications"
                        variant="outlined"
                        required fullWidth
                        value={qualifications}
                        sx={{ width: 800 }}
                        onChange={(e)=> {setQualifications(e.target.value)}}
                    />
                    <StyledTextField
                        label="Experience required"
                        variant="outlined"
                        required fullWidth
                        value={experience}
                        sx={{ width: 800 }}
                        onChange={(e)=> {setExperience(e.target.value)}}
                    />
                    <StyledTextField
                        label="Salary range"
                        variant="outlined"
                        required fullWidth
                        value={salaryRange}
                        sx={{ width: 800 }}
                        onChange={(e)=> {setSalaryRange(e.target.value)}}
                    />
                    <StyledTextField
                        label="Additional job benefits"
                        variant="outlined"
                        required fullWidth
                        value={additionalBenefits}
                        sx={{ width: 800 }}
                        onChange={(e)=> {setAdditionalBenefits(e.target.value)}}
                    />
                    <StyledTextField
                        label="Application deadline"
                        variant="outlined"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required fullWidth
                        value={applicationDeadline}
                        sx={{ width: 800 }}
                        onChange={(e)=> {setApplicationDeadline(e.target.value)}}
                    />
                    <StyledTextField
                        label="Application instructions"
                        variant="outlined"
                        required fullWidth
                        value={applicationInstructions}
                        sx={{ width: 800 }}
                        onChange={(e)=> {setApplicationInstructions(e.target.value)}}
                    />
                    <StyledTextField
                        label="Hiring company email"
                        variant="outlined"
                        required fullWidth
                        value={companyEmail}
                        sx={{ width: 800 }}
                        onChange={(e)=> {setCompanyEmail(e.target.value)}}
                    />
                    <StyledTextField
                        label="Hiring company contact"
                        variant="outlined"
                        required fullWidth
                        value={companyContact}
                        sx={{ width: 800 }}
                        onChange={(e)=> {setCompanyContact(e.target.value)}}
                    />
                    <StyledButton variant="contained" type="submit">Add job</StyledButton>
                    
                </form>
            </StyledPageContent>
        </div>
     );
}
 
export default AddJobPosting;