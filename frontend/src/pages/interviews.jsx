import axios from "axios";
import React,{useState, useEffect} from 'react';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, 
    TablePagination, 
    TableRow, TextField, Tooltip, Typography } from "@mui/material";
import { format } from "date-fns";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { CalendarMonthRounded, CancelRounded, CheckCircleRounded, EditCalendarRounded, PersonRounded, WorkRounded } from "@mui/icons-material";
import UseAuthContext from "src/hooks/use-auth-context";


const InterviewsScheduled = () => {
    const [interviews, setInterviews] = useState([]);
    const [page,setPage] = useState(0); // current page
    const [rowsPerPage,setRowsPerPage] = useState(5); // Rows per page

    const [isCancelInterviewDialog, setIsCancelInterviewDialog] = useState(false);
    const [interviewToCancel, setInterviewToCancel] = useState(null);

    const [isDoneInterviewDialog, setIsDoneInterviewDialog] = useState(false);
    const [interviewDone, setInterviewDone] = useState(null);

    const [isRescheduleInterviewDialog, setIsRescheduleInterviewDialog] = useState(false);
    const [interviewToReschedule, setInterviewToReschedule] = useState(null);

    const [newInterviewDate, setNewInterviewDate] = useState(null);
    const [newInterviewTime, setNewInterviewTime] = useState();
    const [initialInterviewDetails, setInitialInterviewDetails] = useState({});

    const {user} = UseAuthContext();

    useEffect(()=>{
        const fetchScheduledInterviews = async() =>{
            try {
                let response;
                if (user.userCategory === 'Admin') {
                    response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/interviews/`);
                } else if (user.userCategory === 'Job seeker') {
                    response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/interviews/user/${user.id}`);
                } else if (user.userCategory === 'Recruiter') {
                    response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/interviews/company/${user.company}`);
                }

                if (response.status === 200) {
                    setInterviews(response.data);
                }
            } catch (fetcherror) {
                console.error(fetcherror);
            }
        }
        fetchScheduledInterviews()
    },[user.company, user.id, user.userCategory]);

    // pagination code
    const handlePageChange = (event, newPage) =>{
        setPage(newPage);
    }

    const handleChangeRowsPage = (event) =>{
        setPage(0); // Reset to the first page when changing rows per page
        setRowsPerPage(parseInt(event.target.value, 10));
        
    }

    // handle cancel interview scheduled
    const handleOpenRejectInterviewDialog = (interview) =>{
        setInterviewToCancel(interview);
        setIsCancelInterviewDialog(true);
    }

    const handleCloseRejectInterviewDialog = () =>{
        setInterviewToCancel(null);
        setIsCancelInterviewDialog(false);
    }

    // function to handle cancel interview
    const handleCancelInterview = async() =>{
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/interviews/cancel/${interviewToCancel._id}`)
            if(response.status === 200){
                handleCloseRejectInterviewDialog();
                // reload the page to capture changes
                window.location.reload();
                
            }
        } catch (error) {
            console.log(error);
        }
    }

    // handle cancel interview scheduled
    const handleOpenInterviewDoneDialog = (interview) =>{
        setInterviewDone(interview);
        setIsDoneInterviewDialog(true);
    }

    const handleCloseInterviewDoneDialog = () =>{
        setInterviewDone(null);
        setIsDoneInterviewDialog(false);
    }

    // function to handle done interview
    const handleDoneInterview = async() => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/interviews/done/${interviewDone._id}`)
            if(response.status === 200){
                handleCloseInterviewDoneDialog();
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }

    // handle cancel interview scheduled
    const handleOpenRescheduleInterviewDialog = async(interview) =>{
        setInterviewToReschedule(interview);
        setIsRescheduleInterviewDialog(true);

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/interviews/${interview._id}`);
            if(response.status === 200){
                setInitialInterviewDetails(response.data);
                setNewInterviewDate(response.data.interviewDate);
                setNewInterviewTime(response.data.interviewTime);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleCloseRescheduleInterviewDialog = () =>{
        setInterviewToReschedule(null);
        setIsRescheduleInterviewDialog(false);
        
    }

    // function to handle rescheduling interview
    const handleRescheduleInterview = async(e) =>{
        e.preventDefault();
        const changedFields = {}

        if(newInterviewDate !== initialInterviewDetails.interviewDate){
            changedFields.interviewDate = newInterviewDate;
        }
        if(newInterviewTime!== initialInterviewDetails.interviewTime){
            changedFields.interviewTime = newInterviewTime;
        }
        try {
            const response = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/api/interviews/reschedule/${interviewToReschedule._id}`,
                                    JSON.stringify(changedFields),{
                                        headers:{
                                            'Content-Type':'application/json'
                                        }
                                    } );

            if(response.status === 200){
                setInitialInterviewDetails({})
                setNewInterviewDate(null);
                setNewInterviewTime('');
                handleCloseRescheduleInterviewDialog();
                window.location.reload()
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    return ( 
        <div>
            <Typography variant="h4">
                Scheduled Interviews
            </Typography>
            { interviews? (
                
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Job</TableCell>
                                <TableCell>Applicant</TableCell>
                                <TableCell>Interview date</TableCell>
                                <TableCell>Interview time</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Interview status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { interviews ? (
                                interviews
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((interview)=>{
                                        let color = "inherit";
                                        let fontWeight = "normal";
                                
                                        if (interview.interviewStatus === "Scheduled") {
                                            color = "orange";
                                            fontWeight = "bold";
                                        } else if (interview.interviewStatus === "Cancelled") {
                                            color = "red";
                                            fontWeight = "bold";
                                        } else if (interview.interviewStatus === "Completed") {
                                            color = "green";
                                            fontWeight = "bold";
                                        }else if (interview.interviewStatus === "Due") {
                                            color = "gray";
                                            fontWeight = "bold";
                                        }
                                    return (
                                        <TableRow key={interview._id}>
                                            <TableCell>{interview.job?.title}</TableCell>
                                            <TableCell>{interview.applicant?.firstname} {interview.applicant?.lastname}</TableCell>
                                            <TableCell>{ format(new Date(interview.interviewDate), 'do MMMM yyyy') }</TableCell>
                                            <TableCell>{interview.interviewTime.toUpperCase()}</TableCell>
                                            <TableCell>{interview.location}</TableCell>
                                            <TableCell
                                                style={{
                                                    color,
                                                    fontWeight,
                                                }}
                                            >{interview.interviewStatus}</TableCell>
                                            <TableCell>
                                                <Tooltip title="Reshedule interview">
                                                    <IconButton 
                                                        onClick={()=>handleOpenRescheduleInterviewDialog(interview)}
                                                        color="secondary">
                                                        <EditCalendarRounded />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Cancel interview">
                                                    <IconButton 
                                                        onClick={()=>handleOpenRejectInterviewDialog(interview)}
                                                        color="error">
                                                        <CancelRounded />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Mark as done">
                                                    <IconButton 
                                                        onClick={()=>handleOpenInterviewDoneDialog(interview)}
                                                        color="success">
                                                        <CheckCircleRounded />
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
                        count={interviews.length}
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
            )}
            {/* Reschedule interview dialog */}
            <Dialog
                open={isRescheduleInterviewDialog}
                onClose={handleCloseRescheduleInterviewDialog}
            >
                <DialogTitle>
                    <Typography variant="subtitle">
                        Reshedule interview for { interviewToReschedule?.job?.title }
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleRescheduleInterview}>
                        <TextField 
                            label="New interview date"
                            type="date"
                            variant="outlined"
                            required fullWidth
                            value={newInterviewDate}
                            onChange={(e)=>{setNewInterviewDate(e.target.value)}}
                            sx={{ 
                                width: 500,
                                marginTop: 2,
                                marginBottom: 2,
                                display: 'block',
                             }}
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField 
                            label="New interview time"
                            variant="outlined"
                            required fullWidth
                            value={newInterviewTime}
                            onChange={(e)=>{setNewInterviewTime(e.target.value)}}
                            sx={{ 
                                width: 500,
                                marginTop: 2,
                                marginBottom: 2,
                                display: 'block',
                             }}
                            InputLabelProps={{ shrink: true }}
                        />
                        <Button type="submit" variant="contained" size="medium">Reschedule</Button>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Reject interview dialog */}
            <Dialog
                open={isCancelInterviewDialog}
                onClose={handleCloseRejectInterviewDialog}
            >
                <DialogTitle>
                    <Typography variant="subtitle">Confirmation</Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to cancel the interview?</Typography>
                    <Typography style={{ display: "flex", alignItems: "center", marginBottom: "15px"  }}>
                        <WorkRounded />
                        <div style={{ marginLeft: '8px' }}>
                            <strong>Job position scheduled</strong><br />
                            {interviewToCancel?.job?.title}
                        </div>
                    </Typography>
                    <Typography style={{ display: "flex", alignItems: "center", marginBottom: "15px"  }}>
                        <PersonRounded />
                        <div style={{ marginLeft: '8px' }}>
                            <strong>Applicant</strong><br />
                            {interviewToCancel?.applicant?.firstname} {interviewToCancel?.applicant?.lastname}
                        </div>
                    </Typography>
                    { interviewToCancel?.interviewDate && (
                        <Typography style={{ display: "flex", alignItems: "center", marginBottom: "15px"  }}>
                            <CalendarMonthRounded />
                            <div style={{ marginLeft: '8px' }}>
                                <strong>Scheduled</strong><br />
                                { format(new Date(interviewToCancel?.interviewDate), 'do MMMM yyyy')} at {interviewToCancel?.interviewTime.toUpperCase()}
                            </div>
                        </Typography>
                    ) }
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={handleCancelInterview}
                        variant="text" color="error">Cancel Interview</Button>
                    <Button 
                        onClick={handleCloseRejectInterviewDialog}
                        variant="outlined" color="secondary">Close</Button>
                </DialogActions>
            </Dialog>

            {/* Done interview dialog */}
            <Dialog
                open={isDoneInterviewDialog}
                onClose={handleCloseInterviewDoneDialog}
            >
                <DialogTitle>
                    <Typography variant="subtitle">Confirmation</Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to mark the interview as done?</Typography>
                    <Typography style={{ display: "flex", alignItems: "center", marginBottom: "15px"  }}>
                        <WorkRounded />
                        <div style={{ marginLeft: '8px' }}>
                            <strong>Job position scheduled</strong><br />
                            {interviewDone?.job?.title}
                        </div>
                    </Typography>
                    <Typography style={{ display: "flex", alignItems: "center", marginBottom: "15px"  }}>
                        <PersonRounded />
                        <div style={{ marginLeft: '8px' }}>
                            <strong>Applicant</strong><br />
                            {interviewDone?.applicant?.firstname} {interviewDone?.applicant?.lastname}
                        </div>
                    </Typography>
                    { interviewDone?.interviewDate && (
                        <Typography style={{ display: "flex", alignItems: "center", marginBottom: "15px"  }}>
                            <CalendarMonthRounded />
                            <div style={{ marginLeft: '8px' }}>
                                <strong>Scheduled</strong><br />
                                { format(new Date(interviewDone?.interviewDate), 'do MMMM yyyy')} at {interviewDone?.interviewTime.toUpperCase()}
                            </div>
                        </Typography>
                    ) }
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={handleDoneInterview}
                        variant="text" color="success">Done</Button>
                    <Button 
                        onClick={handleCloseInterviewDoneDialog}
                        variant="outlined" color="secondary">Close</Button>
                </DialogActions>
            </Dialog>
        </div>
     );
}
 
export default InterviewsScheduled;