import { CategoryRounded, ConstructionRounded, DescriptionRounded, HttpRounded, SsidChartRounded, TimelineRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import axios from "axios";
import React,{useState, useEffect} from 'react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const AddRoadMap = () => {
    const [profession, setProfession] = useState('');
    const [role, setRole] = useState('');
    const [description, setDescription] = useState('');
    const [step, setStep] = useState('');
    const [subStep, setSubStep] = useState('');
    const [subStepUrl, setSubStepUrl] = useState('');
    const [roleBackgroundImage, setRoleBackgroundImage] = useState(null);
    const [roleFrontImage, setRoleFrontImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleAddLearningRoadMap = async(e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("profession", profession);
        formData.append("role", role);
        formData.append("description", description);
        formData.append("step", step);
        formData.append("subStep", subStep);
        formData.append("subStepUrl", subStepUrl);
        formData.append("roleBackgroundImage", roleBackgroundImage);
        formData.append("roleFrontImage", roleFrontImage);


        try {
            setLoading(true);
            const response = await axios.post('http://localhost:5550/api/roadmaps/add',
                                formData,{
                                    headers:{
                                        'Content-Type' : 'multipart/form-data'
                                    }
                                }
            )
            setErrors({});
            if(response.status === 200){
                setProfession('');
                setRole('');
                setDescription('');
                setStep('');
                setSubStep('');
                setSubStepUrl('');
                setRoleBackgroundImage(null);
                setRoleFrontImage(null);

                toast.success("Learning roadmap added successfully",{
                    position : "top-right"
                })

                console.log("Added roadmap successfully", response.data);
            }
        } catch (error) {
            console.log(error);
            toast.error("Roadmap addition failed",{
                position : "top-right"
            });
            if(error.response && error.response.data && error.response.data.errors){
                setErrors(error.response.data.errors);
            }   
        } finally {
            setLoading(false);
        }
        
    }

    return ( 
        <div>
            <Typography variant="h4">
                Add roadmap
            </Typography>
            <form onSubmit={handleAddLearningRoadMap}>
                <TextField 
                    label="Profession"
                    variant="outlined"
                    required fullWidth
                    error={errors.profession}
                    sx={{ 
                        width: 800,
                        display: 'block',
                        marginBottom: 2,
                        marginTop: 2
                     }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <ConstructionRounded />
                            </InputAdornment>
                        )
                    }}
                    value={profession}
                    onChange={(e)=>{setProfession(e.target.value)}}
                />
                { errors.profession && (
                        <span style={{color:'red'}}>{errors.profession}</span>
                )}
                <TextField 
                    label="Role"
                    variant="outlined"
                    required fullWidth
                    error={errors.role}
                    sx={{ 
                        width: 800,
                        display: 'block',
                        marginBottom: 2,
                        marginTop: 2
                     }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <CategoryRounded />
                            </InputAdornment>
                        )
                    }}
                    value={role}
                    onChange={(e)=>{setRole(e.target.value)}}
                />
                { errors.role && (
                        <span style={{color:'red'}}>{errors.role}</span>
                    )}
                <TextField 
                    label="Description"
                    variant="outlined"
                    required fullWidth
                    error={errors.description}
                    sx={{ 
                        width: 800,
                        display: 'block',
                        marginBottom: 2,
                        marginTop: 2
                     }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <DescriptionRounded />
                            </InputAdornment>
                        )
                    }}
                    value={description}
                    onChange={(e)=>{setDescription(e.target.value)}}
                />
                { errors.description && (
                        <span style={{color:'red'}}>{errors.description}</span>
                    )}
                <TextField 
                    label="Step"
                    variant="outlined"
                    required fullWidth
                    error={errors.step}
                    sx={{ 
                        width: 800,
                        display: 'block',
                        marginBottom: 2,
                        marginTop: 2
                     }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <TimelineRounded />
                            </InputAdornment>
                        )
                    }}
                    value={step}
                    onChange={(e)=>{setStep(e.target.value)}}
                />
                { errors.step && (
                        <span style={{color:'red'}}>{errors.step}</span>
                    )}
                <TextField 
                    label="Sub step"
                    variant="outlined"
                    required fullWidth
                    error={errors.subStep}
                    sx={{ 
                        width: 800,
                        display: 'block',
                        marginBottom: 2,
                        marginTop: 2
                     }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SsidChartRounded />
                            </InputAdornment>
                        )
                    }}
                    value={subStep}
                    onChange={(e)=>{setSubStep(e.target.value)}}
                />
                { errors.subStep && (
                        <span style={{color:'red'}}>{errors.subStep}</span>
                    )}
                <TextField 
                    label="Substep url"
                    variant="outlined"
                    required fullWidth
                    error={errors.subStepUrl}
                    sx={{ 
                        width: 800,
                        display: 'block',
                        marginBottom: 2,
                        marginTop: 2
                     }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <HttpRounded />
                            </InputAdornment>
                        )
                    }}
                    value={subStepUrl}
                    onChange={(e)=>{setSubStepUrl(e.target.value)}}
                />
                { errors.subStepUrl && (
                        <span style={{color:'red'}}>{errors.subStepUrl}</span>
                    )}
                <TextField 
                    label="Background image"
                    variant="outlined"
                    type="file"
                    error={errors.roleBackgroundImage}
                    InputLabelProps={{ shrink: true }}
                    required fullWidth
                    sx={{ 
                        width: 800,
                        display: 'block',
                        marginBottom: 2,
                        marginTop: 2
                     }}
                    onChange={(e)=>{setRoleBackgroundImage(e.target.files[0])}}
                />
                { errors.roleBackgroundImage && (
                        <span style={{color:'red'}}>{errors.roleBackgroundImage}</span>
                    )}
                <TextField 
                    label="Front mini image"
                    variant="outlined"
                    required fullWidth
                    error={errors.roleFrontImage}
                    sx={{ 
                        width: 800,
                        display: 'block',
                        marginBottom: 2,
                        marginTop: 2
                     }}
                    onChange={(e)=>{setRoleFrontImage(e.target.files[0])}}
                />
                { errors.roleFrontImage && (
                        <span style={{color:'red'}}>{errors.roleFrontImage}</span>
                    )}
                <LoadingButton
                    variant="contained"
                    size="large"
                    loading={loading}
                    type="submit"
                >
                    Add Roadmap
                </LoadingButton>
            </form>
        </div>
     );
}
 
export default AddRoadMap;