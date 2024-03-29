import { Button, CircularProgress, Dialog, DialogActions, DialogContent, 
    DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, 
    TableHead, TablePagination, TableRow, Tooltip, Typography,TextField } from "@mui/material";
import { styled } from "@mui/system";
import React,{useState, useEffect} from 'react';
import axios from "axios";
import { CalendarMonthRounded, CalendarTodayOutlined, VisibilityRounded } from "@mui/icons-material";

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

    const [interviewDate, setInterviewDate] = useState(null);
    const [interviewTime, setInterviewTime] = useState('');
    const [location, setLocation] = useState('');
    const [additionalNotes, setAdditionalNotes] = useState('');
    
    useEffect(()=>{
        const fetchJobApplications = async() =>{
            try {
                const response = await axios.get('http://localhost:5550/api/applications/');
                if(response.status === 200){
                    setApplications(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchJobApplications(); 
    },[]);

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

    const handleScheduleInterview = async() =>{
        const applicationId = interviewToSchedule._id;

        const interviewScheduleDetails = {
             applicationId,interviewDate,interviewTime,location,additionalNotes
        }
        try {
            const response = await axios.post("http://localhost:5550/api/interviews/schedule",
                                    JSON.stringify(interviewScheduleDetails),{
                                        headers:{
                                            'Content-Type':'application/json'
                                        }
                                    }
            )
            if(response.status === 200){
                console.log(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleResumeDownload = () =>{

    }

    const handleApplicationLetterDownload = () =>{

    }

    return ( 
        <div>
            <Typography variant="h3">Job applications</Typography>
            {
                applications ? (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Job applied for</TableCell>
                                    <TableCell>Hiring company</TableCell>
                                    <TableCell>Date of application</TableCell>
                                    <TableCell>Application status</TableCell>
                                    <TableCell>Actions</TableCell>
                                    <TableCell>Applicant</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { applications ? (
                                    applications
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((application)=>(
                                        <TableRow key={application._id}>
                                            <TableCell>{application.job.title}</TableCell>
                                            <TableCell>{application.job.company}</TableCell>
                                            <TableCell>{ new Date(application.applicationDate).toLocaleDateString() }</TableCell>
                                            <TableCell>{application.applicationStatus}</TableCell>
                                            <TableCell>
                                                <Tooltip title="View applicant details">
                                                    <IconButton color="primary" size="large"
                                                        onClick={()=>{handleOpenViewDialog(application)}}
                                                    >
                                                        <VisibilityRounded />
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
                                    ))
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
                            <Typography variant="body1">
                            <strong>Job applied for:</strong> {applicationToView.job.title}
                            </Typography>
                            <Typography variant="body1">
                            <strong>Hiring company:</strong> {applicationToView.job.company}
                            </Typography>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button color="primary" variant="contained"
                    onClick={()=> handleResumeDownload()} 
                    >Download resume</Button>
                    <Button color="primary" variant="contained"
                    onClick={()=> handleApplicationLetterDownload()} 
                    >Download Application letter</Button>
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
                                value={interviewDate}
                                type="date"
                                onChange={(e)=> {setInterviewDate(e.target.value)}}   
                            />
                            <StyledTextField
                                label="Interview time"
                                variant="outlined"
                                required fullWidth
                                sx={{ width: 500 }}
                                value={interviewTime}
                                onChange={(e)=> {setInterviewTime(e.target.value)}}   
                            />
                            <StyledTextField
                                label="Location( Provide link if online )"
                                variant="outlined"
                                required fullWidth
                                sx={{ width: 500 }}
                                value={location}
                                onChange={(e)=> {setLocation(e.target.value)}}   
                            />
                            <StyledTextField
                                label="Additional notes about the interview"
                                variant="outlined"
                                required fullWidth
                                sx={{ width: 500 }}
                                value={additionalNotes}
                                onChange={(e)=> {setAdditionalNotes(e.target.value)}}   
                            />
                            <StyledButton color="primary" variant="contained" type="submit">Schedule interview</StyledButton>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
            
        </div>
     );
}
 
export default JobApplications;