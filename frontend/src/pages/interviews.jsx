import axios from "axios";
import React,{useState, useEffect} from 'react';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, 
    TablePagination, 
    TableRow, Typography } from "@mui/material";



const InterviewsScheduled = () => {
    const [interviews, setInterviews] = useState([]);
    const [page,setPage] = useState(0); // current page
    const [rowsPerPage,setRowsPerPage] = useState(5); // Rows per page

    useEffect(()=>{
        const fetchScheduledInterviews = async() =>{
            try {
                const response = await axios.get('http://localhost:5550/api/interviews');
                if(response.status === 200){
                    setInterviews(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchScheduledInterviews()
    },[])

    const handlePageChange = (newPage) =>{
        setPage(newPage);
    }

    const handleChangeRowsPage = (e) =>{
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0); // Reset to the first page when changing rows per page
    }

    return ( 
        <div>
            <Typography variant="h3">
                Scheduled Interviews
            </Typography>
            { interviews? (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Job</TableCell>
                                <TableCell>Interviewee</TableCell>
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
                                    .map((interview)=>(
                                        <TableRow key={interview._id}>
                                            <TableCell>{interview.job?.title}</TableCell>
                                            <TableCell>Dr.Ainamaani Isaac</TableCell>
                                            <TableCell>{ new Date(interview.interviewDate).toLocaleDateString()}</TableCell>
                                            <TableCell>{interview.interviewTime.toUpperCase()}</TableCell>
                                            <TableCell>{interview.location}</TableCell>
                                            <TableCell>{interview.interviewStatus}</TableCell>
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
            ) }
        </div>
     );
}
 
export default InterviewsScheduled;