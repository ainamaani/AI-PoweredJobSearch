import { AddRounded, CategoryRounded, ConstructionRounded, DescriptionRounded, HttpRounded, RemoveRounded, SsidChartRounded, TimelineRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import axios from "axios";
import React,{useState, useEffect} from 'react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const AddRoadMap = () => {
    const [profession, setProfession] = useState('');
    const [role, setRole] = useState('');
    const [description, setDescription] = useState('');
    const [stepInputs, setStepInputs] = useState([{ step: '', subSteps: [{ name: '', url: '' }] }]);
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
        formData.append("roleBackgroundImage", roleBackgroundImage);
        formData.append("roleFrontImage", roleFrontImage);

        // Prepare the steps array
        const stepsArray = stepInputs.map(stepInput => ({
          title: stepInput.step,
          subSteps: stepInput.subSteps.map(subStep => ({
            name: subStep.name,
            url: subStep.url
          }))
        }));

        // Convert the steps array to a JSON string and add it to the form data
        formData.append("steps", JSON.stringify(stepsArray));

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
                setStepInputs([{ step: '', subSteps: [{ name: '', url: '' }] }]);
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

    const handleAddStep = () => {
        setStepInputs([...stepInputs, { step: '', subSteps: [{ name: '', url: '' }] }]);
    }

    const handleAddSubStep = (index) => {
        const newStepInputs = [...stepInputs];
        newStepInputs[index].subSteps.push({ name: '', url: '' });
        setStepInputs(newStepInputs);
    }

    const handleRemoveStep = (index) => {
        const newStepInputs = [...stepInputs];
        newStepInputs.splice(index, 1);
        setStepInputs(newStepInputs);
    }

    const handleRemoveSubStep = (stepIndex, subStepIndex) => {
        const newStepInputs = [...stepInputs];
        newStepInputs[stepIndex].subSteps.splice(subStepIndex, 1);
        setStepInputs(newStepInputs);
    }

    const handleStepChange = (index, event) => {
        const newStepInputs = [...stepInputs];
        newStepInputs[index].step = event.target.value;
        setStepInputs(newStepInputs);
    }
    
    const handleSubStepChange = (stepIndex, subStepIndex, event) => {
        const newStepInputs = [...stepInputs];
        newStepInputs[stepIndex].subSteps[subStepIndex].name = event.target.value;
        setStepInputs(newStepInputs);
    }
    
    const handleSubStepUrlChange = (stepIndex, subStepIndex, event) => {
        const newStepInputs = [...stepInputs];
        newStepInputs[stepIndex].subSteps[subStepIndex].url = event.target.value;
        setStepInputs(newStepInputs);
    }
    


    return ( 
        <div className="add-job">
            <Typography variant="h4" className="add-job-head">
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
                {stepInputs.map((stepInput, index) => (
                    <div key={index}>
                        <TextField 
                            label={`Step ${index + 1}`}
                            variant="outlined"
                            required fullWidth
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
                            value={stepInput.step}
                            onChange={(e)=>{handleStepChange(index, e)}}
                        />
                        <IconButton onClick={() => handleAddSubStep(index)}>
                            <AddRounded />
                        </IconButton>
                        <IconButton onClick={() => handleRemoveStep(index)}>
                            <RemoveRounded />
                        </IconButton>
                        {stepInput.subSteps.map((subStepInput, subStepIndex) => (
                            <div key={subStepIndex}>
                                <TextField 
                                    label={`Substep ${subStepIndex + 1}`}
                                    variant="outlined"
                                    required fullWidth
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
                                    value={subStepInput.name}
                                    onChange={(e)=>{handleSubStepChange(index, subStepIndex, e)}}
                                />
                                <TextField 
                                    label={`Substep ${subStepIndex + 1} URL`}
                                    variant="outlined"
                                    required fullWidth
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
                                    value={subStepInput.url}
                                    onChange={(e)=>{handleSubStepUrlChange(index, subStepIndex, e)}}
                                />
                                <IconButton onClick={() => handleRemoveSubStep(index, subStepIndex)}>
                                    <RemoveRounded />
                                </IconButton>
                            </div>
                        ))}
                    </div>
                ))}
                <Button variant="contained" onClick={handleAddStep}>
                    Add Step
                </Button>
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
                    type="file"
                    required fullWidth
                    error={errors.roleFrontImage}
                    InputLabelProps={{ shrink: true }}
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
