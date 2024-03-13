import { Button, CircularProgress, Dialog, DialogActions, DialogContent, 
    DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, 
    TableHead, TablePagination, TableRow, Tooltip, Typography,TextField, Popover, MenuItem, 
    InputAdornment } from "@mui/material";
import { styled } from "@mui/system";
import React,{useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArticleRounded, BusinessRounded, CalendarMonthRounded, CalendarTodayOutlined, Cancel, 
    CancelRounded, Description, DescriptionRounded, DownloadForOfflineRounded, EmailRounded, 
    FileCopy, LocalAtmRounded, PersonRounded, TimerRounded, Title, VisibilityRounded, Work } from "@mui/icons-material";
import { saveAs } from "file-saver";
import {format} from "date-fns"
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

const JobApplications = () => {

    const [applications, setApplications] = useState([]);
    const [page,setPage] = useState(0); // current page
    const [rowsPerPage,setRowsPerPage] = useState(5); // Rows per page
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [applicationToView, setApplicationToView] = useState(null);
    const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
    const [interviewToSchedule, setInterviewToSchedule] = useState(false);

    const [isDeclineDialogOpen, setIsDeclineDialogOpen] = useState(false);
    const [applicationToDecline, setApplicationToDecline] = useState(null);

    const [interviewDate, setInterviewDate] = useState(null);
    const [interviewTime, setInterviewTime] = useState('');
    const [location, setLocation] = useState('');
    const [additionalNotes, setAdditionalNotes] = useState('');

    const [errors, setErrors] = useState({});

    const [error, setError] = useState('');

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(Array(applications.length).fill(null));

    

   
    
    useEffect(()=>{
        const fetchJobApplications = async() =>{
            try {
                const response = await axios.get('http://localhost:5550/api/applications/');
                if(response.status === 200){
                    setApplications(response.data);
                }
            } catch (errorrr) {
                console.log(errorrr);
            }
        }
        fetchJobApplications(); 
    },[]);


    // menu and pop over code
    const handleMenuOpen = (index) => (event) => {
        const newAnchorEl = [...anchorEl];
        newAnchorEl[index] = event.currentTarget;
        setAnchorEl(newAnchorEl);
    };
    
    const handleMenuClose = (index) => () => {
        const newAnchorEl = [...anchorEl];
        newAnchorEl[index] = null;
        setAnchorEl(newAnchorEl);
    };

    const handlePopoverLeave = (index) => () => {
        const newAnchorEl = [...anchorEl];
        newAnchorEl[index] = null;
        setAnchorEl(newAnchorEl);
    };

    
    // pagination code
    const handlePageChange = (newPage) =>{
        setPage(newPage);
    }

    const handleChangeRowsPage = (e) =>{
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0); // Reset to the first page when changing rows per page
    }

    const handleOpenViewDialog = (application) =>{
        setApplicationToView(application);
        setIsViewDialogOpen(true);
    }

    const handleCloseViewDialog = () =>{
        setApplicationToView(null);
        setIsViewDialogOpen(false);
    }

    const handleOpenScheduleDialog = (application) =>{
        setInterviewToSchedule(application);
        setIsScheduleDialogOpen(true);
    }

    const handleCloseScheduleDialog = () =>{
        setInterviewToSchedule(null);
        setIsScheduleDialogOpen(false);
    }
    // decline application applications
    const handleOpenDeclineDialog = (application) =>{
        setApplicationToDecline(application);
        setIsDeclineDialogOpen(true);
    }

    const handleCloseDeclineDialog = () =>{
        setApplicationToDecline(null);
        setIsDeclineDialogOpen(false);
    }


    const handleDeclineApplication = async() =>{
        try {
            const response = await axios.get(`http://localhost:5550/api/applications/decline/${applicationToDecline._id}`)
            if(response.status === 200){
                console.log("Rejected successfully", response.data);
                handleCloseDeclineDialog();
                // Refresh the page
                window.location.reload();
                 
            }
        } catch (responseError) {
            console.log(responseError);
            handleCloseDeclineDialog();
            toast.error("Application decline failed",{
                position: "top-right"
            });
        }
    }


    const handleScheduleInterview = async(event) =>{
        event.preventDefault();

        const applicationId = interviewToSchedule._id;

        const interviewScheduleDetails = {
             applicationId,interviewDate,interviewTime,location,additionalNotes
        }
        try {
            setErrors({});
            setError('');
            const response = await axios.post("http://localhost:5550/api/interviews/schedule",
                                    JSON.stringify(interviewScheduleDetails),{
                                        headers:{
                                            'Content-Type':'application/json'
                                        }
                                    }
            )
            if(response.status === 200){
                console.log(response.data);
                handleCloseScheduleDialog();
                navigate('/dashboard/dashboard/interviews');
                // const user = applicationToView.applicant;
                // const subject = 'Interview scheduled';
                // const message = 'Interview for the job applied scheduled for tomorrow';
                // const type = 'interview'
                // const notificationData = {user,subject,message,type };
                // const notification = await axios.post("http://localhost:5550/api/notifications/create",
                //                                 JSON.stringify(notificationData),{
                //                                     headers:{
                //                                         'Content-Type':'application/json'
                //                                     }
                //                                 }
                // )
                // if(notification.status === 200){
                //     console.log('Notification created successfully', notification.data);
                // }
                // console.log(response.data);
            }
        } catch (errorr) {
            if(errorr.response && errorr.response.data && errorr.response.data.errors){
                setErrors(errorr.response.data.errors);
            }
            if(errorr.response && errorr.response.data && errorr.response.data.error){
                setError(errorr.response.data.error);
            }
            toast.error("Interview schedule failed",{
                position: "top-right"
            });
        }
    }

    const handleResumeDownload = async(applicationId,applicantFirstName,applicantLastName,jobAppliedFor) =>{
        try {
            const downloadresume = await axios.get(`http://localhost:5550/api/applications/downloadresume/${applicationId}`,{responseType: 'blob'})
            if(downloadresume.status === 200){
                const blob = new Blob([downloadresume.data],{type: 'application.pdf'});
                saveAs(blob, `${applicantFirstName} ${applicantLastName} applicant for ${jobAppliedFor} resume.pdf`)
            }
        } catch (downloadError) {
            console.log(downloadError);
        }
    }

    const handleApplicationLetterDownload = async(applicationId,applicantFirstName,applicantLastName,jobAppliedFor) =>{
        try {
            const downloadapplicationletter = await axios.get(`http://localhost:5550/api/applications/downloadapplicationletter/${applicationId}`,{responseType: 'blob'})
            if(downloadapplicationletter.status === 200){
                const blob = new Blob([downloadapplicationletter.data],{type: 'application.pdf'});
                saveAs(blob, `${applicantFirstName} ${applicantLastName} ${jobAppliedFor} application letter.pdf`)
            }
        } catch (applicationLetterDownloadError) {
            console.log(applicationLetterDownloadError);
        }
    }

    return ( 
        <div>
            <Typography variant="h4">Job applications</Typography>
            {
                applications ? (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Job applied for</TableCell>
                                    <TableCell>Applicant</TableCell>
                                    <TableCell>Hiring company</TableCell>
                                    <TableCell>Date of application</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Actions</TableCell>
                                    
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                
                                { applications ? (
                                    applications
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((application, index)=>{

                                        let color = "inherit";
                                        let fontWeight = "normal";
                                
                                        if (application.applicationStatus === "Pending") {
                                            color = "orange";
                                            fontWeight = "bold";
                                        } else if (application.applicationStatus === "Declined") {
                                            color = "red";
                                            fontWeight = "bold";
                                        } else if (application.applicationStatus === "Accepted") {
                                            color = "green";
                                            fontWeight = "bold";
                                        }
                                    return (    
                                        <TableRow key={application._id}>
                                            <TableCell>{application.job.title}</TableCell>
                                            <TableCell>{application.applicant?.firstname} {application.applicant?.lastname}</TableCell>
                                            <TableCell>{application.job.company}</TableCell>
                                            <TableCell>{ format(new Date(application.applicationDate), 'do MMMM yyyy') }</TableCell>
                                            <TableCell
                                            style={{
                                                color,
                                                fontWeight,
                                            }}
                                        >
                                            {application.applicationStatus}
                                        </TableCell>
                                            <TableCell>
                                                <Tooltip title="Download attachments">
                                                    <IconButton size="large"
                                                        onClick={handleMenuOpen(index)}
                                                    >
                                                        <DownloadForOfflineRounded />
                                                    </IconButton>
                                                </Tooltip>
                                                {/* Popover */}
                                                <Popover
                                                    open={Boolean(anchorEl[index])}
                                                    anchorEl={anchorEl[index]}
                                                    onClose={handleMenuClose(index)}
                                                    onMouseLeave={handlePopoverLeave(index)}
                                                    anchorOrigin={{
                                                        vertical: "bottom",
                                                        horizontal: "right",
                                                    }}
                                                    transformOrigin={{
                                                        vertical: "top",
                                                        horizontal: "right",
                                                    }}
                                                >
                                                    <MenuItem 
                                                        
                                                        onClick={()=> handleResumeDownload(
                                                            application._id,
                                                            application.applicant?.firstname,
                                                            application.applicant?.lastname,
                                                            application.job?.title
                                                            )}
                                                    >   
                                                        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-around' }}>
                                                            <Typography variant="subtitle2" >Download Resume</Typography>
                                                            <DescriptionRounded color="primary" />
                                                        </div>
                                                    </MenuItem>
                                                    <MenuItem
                                                    onClick={()=> handleApplicationLetterDownload(
                                                        application._id,
                                                        application.applicant?.firstname,
                                                        application.applicant?.lastname,
                                                        application.job?.title
                                                        )} 

                                                    //     onClick={() =>
                                                    //         handleDownloadProfileResume(
                                                    //         profile._id,
                                                    //         profile.firstname,
                                                    //         profile.lastname
                                                    //         )
                                                    // }
                                                    >
                                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-around' }}>
                                                            <Typography variant="subtitle2" >Download Application letter</Typography>
                                                            <ArticleRounded color="primary" />
                                                        </div>
                                                    </MenuItem>
                                                </Popover>

                                                <Tooltip title="View applicant details">
                                                    <IconButton color="primary" size="large"
                                                        onClick={()=>{handleOpenViewDialog(application)}}
                                                    >
                                                        <VisibilityRounded />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Decline application">
                                                    <IconButton color="error" size="large"
                                                        onClick={()=>{handleOpenDeclineDialog(application)}}
                                                    >
                                                        <CancelRounded />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Schedule interview">
                                                    <IconButton color="secondary" size="large"
                                                        onClick={()=>{handleOpenScheduleDialog(application)}}
                                                    >
                                                        <CalendarMonthRounded />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                            
                                        </TableRow>
                                     )
                                    })
                                ):(
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                                        <CircularProgress />
                                    </div>
                                ) }
                            </TableBody>
                        </Table>
                        <TablePagination 
                            rowsPerPageOptions={[5,10,20]}
                            component="div"
                            count={applications.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleChangeRowsPage}
                        />
                    </TableContainer>
                ):(
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                        <CircularProgress />
                    </div>
                )
            }  
             {/* View application details dialog  */}
            <Dialog
                open={isViewDialogOpen}
                onClose={handleCloseViewDialog}
            >
                <DialogTitle>Application details</DialogTitle>
                <DialogContent>
                    {applicationToView && (
                        <>  
                            <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                <Work />
                                <div style={{ marginLeft: '8px' }}>
                                    <strong>Job applied for</strong> <br />
                                    {applicationToView.job.title}
                                </div>
                            </Typography>
                            <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                <BusinessRounded />
                                <div style={{ marginLeft: '8px' }}>
                                    <strong>Hiring company</strong> <br />
                                    {applicationToView.job.company}
                                </div>
                            </Typography> 
                            <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                <Description />
                                <div style={{ marginLeft: '8px' }}>
                                    <strong>Job description</strong> <br />
                                    {applicationToView.job.description}
                                </div>
                            </Typography>
                            <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                <LocalAtmRounded />
                                <div style={{ marginLeft: '8px' }}>
                                    <strong>Job salary range</strong> <br />
                                    {applicationToView.job.salaryRange}
                                </div>
                            </Typography>
                            <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                <PersonRounded />
                                <div style={{ marginLeft: '8px' }}>
                                    <strong>Applicant name</strong> <br />
                                    {applicationToView.applicant.firstname} {applicationToView.applicant.lastname}
                                </div>
                            </Typography>
                            <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                <EmailRounded />
                                <div style={{ marginLeft: '8px' }}>
                                    <strong>Applicant E-mail</strong> <br />
                                    {applicationToView.applicant.email}
                                </div>
                            </Typography>

                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Tooltip title="Close">
                        <IconButton 
                            style={{
                                position: 'absolute',
                                top: '5px',
                                right: '5px',
                                color: 'red',
                            }}
                            size="large"
                            onClick={handleCloseViewDialog}
                            >
                            <Cancel />
                        </IconButton>
                    </Tooltip>
                </DialogActions>
            </Dialog>
            {/* Decline application dialog */}
            <Dialog
                open={isDeclineDialogOpen}
                onClose={handleCloseDeclineDialog}
            >
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    <Typography variant="subtitle1">Are you sure you want to reject the application?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={handleDeclineApplication}
                        variant="text" color="error">Confirm decline</Button>
                    <Button 
                        onClick={handleCloseDeclineDialog}
                        variant="outlined" color="secondary"
                    >Close</Button>
                </DialogActions>
            </Dialog>
            {/* Schedule interview dialog */}
            <Dialog
                open={isScheduleDialogOpen}
                onClose={handleCloseScheduleDialog}
            >
                <DialogTitle>Schedule interview</DialogTitle>
                <DialogContent>
                    <div className="schedule-interview">
                        <form onSubmit={handleScheduleInterview}>
                            <StyledTextField
                                label="Interview date"
                                variant="outlined"
                                required fullWidth
                                sx={{ width: 500 }}
                                InputLabelProps={{ shrink: true }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                          <CalendarMonthRounded />
                                        </InputAdornment>
                                      )
                                }}
                                value={interviewDate}
                                type="date"
                                error={errors.interviewDate}
                                onChange={(e)=> {setInterviewDate(e.target.value)}}   
                            />
                            { errors.interviewDate && <span style={{ color:"red", textAlign:"left" }}>{errors.interviewDate}</span> }
                            <StyledTextField
                                label="Interview time"
                                variant="outlined"
                                required fullWidth
                                sx={{ width: 500 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                          <TimerRounded />
                                        </InputAdornment>
                                      )
                                }}
                                value={interviewTime}
                                error={errors.interviewTime}
                                onChange={(e)=> {setInterviewTime(e.target.value)}}   
                            />
                            { errors.interviewTime && <span style={{ color:"red", textAlign:"left" }}>{errors.interviewTime}</span> }
                            <StyledTextField
                                label="Location( Provide link if online )"
                                variant="outlined"
                                required fullWidth
                                sx={{ width: 500 }}
                                value={location}
                                error={errors.location}
                                onChange={(e)=> {setLocation(e.target.value)}}   
                            />
                            { errors.location && <span style={{ color:"red", textAlign:"left" }}>{errors.location}</span> }
                            <StyledTextField
                                label="Additional notes about the interview"
                                variant="outlined"
                                required fullWidth
                                sx={{ width: 500 }}
                                value={additionalNotes}
                                error={errors.additionalNotes}
                                onChange={(e)=> {setAdditionalNotes(e.target.value)}}   
                            />
                            { errors.additionalNotes && <span style={{ color:"red", textAlign:"left" }}>{errors.additionalNotes}</span> }
                            { error && <span style={{ color:"red", marginTop:"8px", marginBottom:"6px" }}>{error}</span> }
                            <StyledButton color="primary" variant="contained" type="submit">Schedule interview</StyledButton>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
            
        </div>
     );
}
 
export default JobApplications;