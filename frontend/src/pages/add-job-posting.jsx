import { Typography,TextField,Button,RadioGroup,Radio,FormControlLabel } from "@mui/material";
import React,{useState,useEffect} from 'react';
import { styled } from "@mui/system";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { LoadingButton } from "@mui/lab";


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
    const [errors, setErrors] = useState({}); 
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        console.log(errors)
    },[errors]);

    const handleAddJobPosting = async (e) => {
        e.preventDefault();
        const jobData = { title,company,companyEmail,companyContact,description,category,skills,qualifications,
        experience,location,salaryRange,jobType,additionalBenefits,applicationDeadline,applicationInstructions }
        try {
           setLoading(true);
           const response = await axios.post('http://localhost:5550/api/jobs/newjob',
            JSON.stringify(jobData),{
                headers:{
                    'Content-Type':'application/json'
                }
            }
           ) 
           setErrors({})
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
                toast.success('Job posting added successfully',{
                    position: 'top-right'
                })
           }
        } catch (error) {
            toast.success('Job posting failed',{
                position: 'top-right'
            })
            if(error.response && error.response.data && error.response.data.errors ){
                setErrors(error.response.data.errors)
            }
        } finally{
            setLoading(false);
        }
    }

    return ( 
        <div>
            <StyledPageContent>
                <div className="add-job">
                    <Typography variant="h3" className="add-job-head">
                        Add job posting 
                    </Typography>
                    <form onSubmit={handleAddJobPosting}>
                        <StyledTextField
                            label="Job title"
                            variant="outlined"
                            required fullWidth
                            sx={{ width: 800 }}
                            error={errors.title}
                            value={title}
                            onChange={(e)=> {setTitle(e.target.value)}}   
                        />
                        { errors.title && (
                            <span style={{color:'red'}}>{errors.title}</span>
                        )}
                        <StyledTextField
                            label="Hiring company"
                            variant="outlined"
                            required fullWidth
                            value={company}
                            sx={{ width: 800 }}
                            error={errors.company}
                            onChange={(e)=> {setCompany(e.target.value)}}
                        />
                        { errors.company && (
                            <span style={{color:'red'}}>{errors.company}</span>
                        )}
                        <StyledTextField
                            label="Job description"
                            variant="outlined"
                            required fullWidth
                            value={description}
                            sx={{ width: 800 }}
                            error={errors.description}
                            onChange={(e)=> {setDescription(e.target.value)}}
                        />
                        { errors.description && (
                            <span style={{color:'red'}}>{errors.description}</span>
                        )}
                        <StyledTextField
                            label="Job location"
                            variant="outlined"
                            required fullWidth
                            value={location}
                            sx={{ width: 800 }}
                            error={errors.location}
                            onChange={(e)=> {setLocation(e.target.value)}}
                        />
                        { errors.location && (
                            <span style={{color:'red'}}>{errors.location}</span>
                        )}
                        <StyledTextField
                            label="Job category"
                            variant="outlined"
                            required fullWidth
                            value={category}
                            sx={{ width: 800 }}
                            error={errors.category}
                            onChange={(e)=> {setCategory(e.target.value)}}
                        />
                        { errors.category && (
                            <span style={{color:'red'}}>{errors.category}</span>
                        )}
                        <StyledRadioGroup value={jobType} onChange={(e)=> {setJobType(e.target.value)}} >
                            <FormControlLabel value="full-time" control={<Radio />} label="Full time" />
                            <FormControlLabel value="part-time" control={<Radio />} label="Part time" />
                            <FormControlLabel value="contract" control={<Radio />} label="Contract" />
                        </StyledRadioGroup>
                        { errors.jobType && (
                            <span style={{color:'red'}}>{errors.jobType}</span>
                        )}
                        <StyledTextField
                            label="Skills required"
                            variant="outlined"
                            required fullWidth
                            value={skills}
                            sx={{ width: 800 }}
                            error={errors.skills}
                            onChange={(e)=> {setSkills(e.target.value)}}
                        />
                        { errors.skills && (
                            <span style={{color:'red'}}>{errors.skills}</span>
                        )}
                        <StyledTextField
                            label="Qualifications"
                            variant="outlined"
                            required fullWidth
                            value={qualifications}
                            sx={{ width: 800 }}
                            error={errors.qualifications}
                            onChange={(e)=> {setQualifications(e.target.value)}}
                        />
                        { errors.qualifications && (
                            <span style={{color:'red'}}>{errors.qualifications}</span>
                        )}
                        <StyledTextField
                            label="Experience required"
                            variant="outlined"
                            required fullWidth
                            value={experience}
                            sx={{ width: 800 }}
                            error={errors.experience}
                            onChange={(e)=> {setExperience(e.target.value)}}
                        />
                        { errors.experience && (
                            <span style={{color:'red'}}>{errors.experience}</span>
                        )}
                        <StyledTextField
                            label="Salary range"
                            variant="outlined"
                            required fullWidth
                            value={salaryRange}
                            sx={{ width: 800 }}
                            error={errors.salaryRange}
                            onChange={(e)=> {setSalaryRange(e.target.value)}}
                        />
                        { errors.salaryRange && (
                            <span style={{color:'red'}}>{errors.salaryRange}</span>
                        )}
                        <StyledTextField
                            label="Additional job benefits"
                            variant="outlined"
                            required fullWidth
                            value={additionalBenefits}
                            sx={{ width: 800 }}
                            error={errors.additionalBenefits}
                            onChange={(e)=> {setAdditionalBenefits(e.target.value)}}
                        />
                        { errors.additionalBenefits && (
                            <span style={{color:'red'}}>{errors.additionalBenefits}</span>
                        )}
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
                            error={errors.applicationDeadline}
                            onChange={(e)=> {setApplicationDeadline(e.target.value)}}
                        />
                        { errors.applicationDeadline && (
                            <span style={{color:'red'}}>{errors.applicationDeadline}</span>
                        )}
                        <StyledTextField
                            label="Application instructions"
                            variant="outlined"
                            required fullWidth
                            value={applicationInstructions}
                            sx={{ width: 800 }}
                            error={errors.applicationInstructions}
                            onChange={(e)=> {setApplicationInstructions(e.target.value)}}
                        />
                        { errors.applicationInstructions && (
                            <span style={{color:'red'}}>{errors.applicationInstructions}</span>
                        )}
                        <StyledTextField
                            label="Hiring company email"
                            variant="outlined"
                            required fullWidth
                            value={companyEmail}
                            sx={{ width: 800 }}
                            error={errors.companyEmail}
                            onChange={(e)=> {setCompanyEmail(e.target.value)}}
                        />
                        { errors.companyEmail && (
                            <span style={{color:'red'}}>{errors.companyEmail}</span>
                        )}
                        <StyledTextField
                            label="Hiring company contact"
                            variant="outlined"
                            required fullWidth
                            value={companyContact}
                            sx={{ width: 800 }}
                            error={errors.companyContact}
                            onChange={(e)=> {setCompanyContact(e.target.value)}}
                        />
                        { errors.companyContact && (
                            <span style={{color:'red'}}>{errors.companyContact}</span>
                        )}
                        <LoadingButton
                            variant="contained"
                            type="submit"
                            size="large"
                            loading={loading}
                        >
                            Add job
                        </LoadingButton>
                        
                    </form>
                </div>
            </StyledPageContent>
        </div>
     );
}
 
export default AddJobPosting;