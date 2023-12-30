import axios from 'axios';
import { useState,useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';


import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { VisibilityRounded } from '@mui/icons-material';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';


import { users } from 'src/_mock/user';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';





// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('title');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [jobs, setJobs] = useState(null);

  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const [jobToView, setJobToView] = useState(null)


  useEffect(()=>{
    const fetchJobs = async() =>{
      try {
        const jobList = await axios.get('http://localhost:5550/api/jobs/')
        if(jobList.status === 200){
          setJobs(jobList.data);
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchJobs()
  },[])

  useEffect(()=>{
    console.log(jobs);
  })

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = jobs.map((n) => n.title);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, title) => {
    const selectedIndex = selected.indexOf(title);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, title);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  // function to handle opening of the view dialog
  const handleOpenViewDialog = (job) =>{
    setJobToView(job);
    setIsViewDialogOpen(true)
  }

  const handleCloseViewDialog = () =>{
    setJobToView(null);
    setIsViewDialogOpen(false)
  }

  const handleApplyForJob = () =>{

  }

  const dataFiltered = jobs
  ? applyFilter({
      inputData: jobs,
      comparator: getComparator(order, orderBy),
      filterName,
    })
  : [];


  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Job postings</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New job
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          { jobs ? (
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <UserTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={jobs.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'title', label: 'Title' },
                    { id: 'company', label: 'Company' },
                    { id: 'location', label: 'Location' },
                    { id: 'datePosted', label: 'Date posted', align: 'center' },
                    { id: 'status', label: 'Status' },
                    { id: 'actions', label: 'Actions' },
                    { id: '' },
                  ]}
                />
                <TableBody>
                {dataFiltered && dataFiltered.length > 0 ? (
                  dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((job) => (
                      <UserTableRow
                        key={job.id}
                        title={job.title}
                        company={job.company}
                        location={job.location}
                        datePosted={formatDistanceToNow( new Date(job.createdAt),{addSuffix:true , includeSeconds:true} )}
                        selected={selected.indexOf(job.title) !== -1}
                        handleClick={(event) => handleClick(event, job.title)}
                        handleOpenViewDialog={() => handleOpenViewDialog(job)}
                      />
                    ))
                ) : (
                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, jobs.length)}
                  />
                )}
                    


                  {notFound && <TableNoData query={filterName} />}
                </TableBody>
              </Table>
            </TableContainer>
          ):(
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                    <CircularProgress/>
                </div>
          )}

        <Dialog
          open={isViewDialogOpen}
          onClose={handleCloseViewDialog}
          PaperProps={{
            style:{
              width: '800px'
            }
          }}
        >
          <DialogTitle>Job details</DialogTitle>
          <DialogContent>
            {
              jobToView && (
                <>
                  <Typography variant="body1">
                  <strong>Job title:</strong> {jobToView.title}
                  </Typography>
                  <Typography variant="body1">
                  <strong>Job description:</strong> {jobToView.description}
                  </Typography>
                  <Typography variant="body1">
                  <strong>Hiring company:</strong> {jobToView.company}
                  </Typography>
                  <Typography variant="body1">
                  <strong>Location:</strong> {jobToView.location}
                  </Typography>
                  <Typography variant="body1">
                  <strong>Skills:</strong> {jobToView.skills}
                  </Typography>
                  <Typography variant="body1">
                  <strong>Qualifications:</strong> {jobToView.qualifications}
                  </Typography>
                  <Typography variant="body1">
                  <strong>Experience:</strong> {jobToView.experience}
                  </Typography>
                  <Typography variant="body1">
                  <strong>Salary range:</strong> {jobToView.salaryRange}
                  </Typography>
                </>
              )
            }
          </DialogContent>
          <DialogActions>
              <Button onClick={handleCloseViewDialog} color='primary' variant='contained'>
                Close
              </Button>
              <Button onClick={handleApplyForJob} color='secondary' variant='contained'>
                Apply
              </Button>
              <Link to={`/apply/${jobToView?._id}`}>Apply</Link>
          </DialogActions>

        </Dialog>
          
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={jobs?.length || 0}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
 
}

