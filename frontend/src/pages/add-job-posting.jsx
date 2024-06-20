import UseAuthContext from "src/hooks/use-auth-context";
import { Typography,TextField,Button,RadioGroup,Radio,FormControlLabel, InputAdornment, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import React,{useState,useEffect} from 'react';
import { styled } from "@mui/system";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { LoadingButton } from "@mui/lab";
import { AddCircleRounded, BookmarkAddRounded, BusinessRounded, CalendarMonthRounded, 
    CardGiftcardOutlined, CardGiftcardRounded, CategoryRounded, CommentRounded, 
    ConstructionRounded, DescriptionRounded, EmailRounded, HourglassBottomRounded, 
    InfoOutlined, LocalAtmRounded, LocationOnRounded, PhoneRounded, SchoolRounded, 
    TitleRounded, WorkRounded, InfoRounded } from "@mui/icons-material";


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
    const {user} = UseAuthContext();

    const [title, setTitle] = useState('');
    const [company, setCompany] = useState(user.company);
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
    const [applyFromWithinApp, setApplyFromWithinApp] = useState('');
    const [applicationInstructions, setApplicationInstructions] = useState('');
    const [additionalComments, setAdditionalComments] = useState('');
    const [errors, setErrors] = useState({}); 
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        console.log(errors)
    },[errors]);

    const handleAddJobPosting = async (e) => {
        e.preventDefault();
        const jobData = { title,company,companyEmail,companyContact,description,category,skills,qualifications,
        experience,location,salaryRange,jobType,additionalBenefits,applyFromWithinApp,
        applicationDeadline,applicationInstructions,additionalComments }
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
                setApplyFromWithinApp('');
                setApplicationDeadline(null);
                setApplicationInstructions('');
                setAdditionalComments('');
                toast.success('Job posting added successfully',{
                    position: 'top-right'
                })
           }
        } catch (error) {
            toast.error('Job posting failed',{
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
            { user.userCategory !== "Job seeker" ? (
                <StyledPageContent>
                <div className="add-job">
                    <div className="head">
                        <div className="heading-title" style={{
                            marginTop: "45px"
                        }}>
                        <div className="app-logo" style={{
                            position:"relative",
                            left:"40%"
                        }}>
                            <img
                            src={`${process.env.PUBLIC_URL}/assets/images/landing/applogo2.png`} alt="logo" 
                            />
                        </div>
                            <Typography variant="h4" className="add-job-head">
                                Add job posting 
                            </Typography>
                        </div>
                        {/* <div className="icon">
                            <AddCircleRounded color="success"/>
                        </div> */}
                    </div>
                    <form onSubmit={handleAddJobPosting}>
                        <StyledTextField
                            label="Job title"
                            variant="outlined"
                            required fullWidth
                            sx={{ width: 700 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                      <WorkRounded />
                                    </InputAdornment>
                                  )
                            }}
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
                            disabled
                            value={user.company}
                            sx={{ width: 700 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                      <BusinessRounded />
                                    </InputAdornment>
                                  )
                            }}
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
                            sx={{ width: 700 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                      <DescriptionRounded />
                                    </InputAdornment>
                                  )
                            }}
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
                            sx={{ width: 700 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                      <LocationOnRounded />
                                    </InputAdornment>
                                  )
                            }}
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
                            sx={{ width: 700 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                      <CategoryRounded />
                                    </InputAdornment>
                                  )
                            }}
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
                            sx={{ width: 700 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                      <ConstructionRounded />
                                    </InputAdornment>
                                  )
                            }}
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
                            sx={{ width: 700 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                      <SchoolRounded />
                                    </InputAdornment>
                                  )
                            }}
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
                            sx={{ width: 700 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                      <HourglassBottomRounded />
                                    </InputAdornment>
                                  )
                            }}
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
                            sx={{ width: 700 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                      <LocalAtmRounded />
                                    </InputAdornment>
                                  )
                            }}
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
                            sx={{ width: 700 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                      <CardGiftcardRounded />
                                    </InputAdornment>
                                  )
                            }}
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
                            sx={{ width: 700 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                      <CalendarMonthRounded />
                                    </InputAdornment>
                                  )
                            }}
                            error={errors.applicationDeadline}
                            onChange={(e)=> {setApplicationDeadline(e.target.value)}}
                        />
                        { errors.applicationDeadline && (
                            <span style={{color:'red'}}>{errors.applicationDeadline}</span>
                        )}
                    
                        <FormControl fullWidth >
                            <InputLabel id="applyFromWithinApp" >Allow application from this app</InputLabel>
                            <Select
                                value={applyFromWithinApp}
                                fullWidth required
                                id="category"
                                label="Allow applications from this app"
                                sx={{ width: 700 }}
                                onChange={(e) => setApplyFromWithinApp(e.target.value)}
                            >
                                <MenuItem value="" disabled>Select one</MenuItem>
                                <MenuItem value="yes">Yes</MenuItem>
                                <MenuItem value="no">No</MenuItem>
                                
                            </Select>
                        </FormControl>
                        <StyledTextField
                            label="Application instructions"
                            variant="outlined"
                            required fullWidth
                            value={applicationInstructions}
                            sx={{ width: 700 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                      <BookmarkAddRounded />
                                    </InputAdornment>
                                  )
                            }}
                            error={errors.applicationInstructions}
                            onChange={(e)=> {setApplicationInstructions(e.target.value)}}
                        />
                        { errors.applicationInstructions && (
                            <span style={{color:'red'}}>{errors.applicationInstructions}</span>
                        )}
                        <StyledTextField
                            label="Any additional information"
                            variant="outlined"
                            required fullWidth
                            value={additionalComments}
                            sx={{ width: 700 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                      <CommentRounded />
                                    </InputAdornment>
                                  )
                            }}
                            error={errors.additionalComments}
                            onChange={(e)=> {setAdditionalComments(e.target.value)}}
                        />
                        { errors.additionalComments && (
                            <span style={{color:'red'}}>{errors.additionalComments}</span>
                        )}
                        <StyledTextField
                            label="Hiring company email"
                            variant="outlined"
                            required fullWidth
                            value={companyEmail}
                            sx={{ width: 700 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                      <EmailRounded />
                                    </InputAdornment>
                                  )
                            }}
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
                            sx={{ width: 700 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                      <PhoneRounded />
                                    </InputAdornment>
                                  )
                            }}
                            error={errors.companyContact}
                            onChange={(e)=> {setCompanyContact(e.target.value)}}
                        />
                        { errors.companyContact && (
                            <span style={{color:'red', display:'block'}}>{errors.companyContact}</span>
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
            ):(
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '200px',
                    backgroundColor: '#fff',
                    borderRadius: '10px',
                    padding: '20px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
                  }}>
                    <InfoRounded style={{
                      fontSize: '50px',
                      color: '#ff1a1a',
                      marginBottom: '10px'
                    }} />
                    
                    <Typography variant='h4' style={{
                      textAlign: 'center',
                      color: '#333'
                    }}>
                      Ooops!! Register as a recruiter to be able to add job postings. Thank you!
                    </Typography>
                  </div>
                  
            ) }
        </div>
     );
}
 
export default AddJobPosting;