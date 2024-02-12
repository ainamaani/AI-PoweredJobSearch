import axios from 'axios';
import { useState,useEffect } from 'react';
import { formatDistanceToNow, format } from 'date-fns';
import { Link } from 'react-router-dom';



import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { AccessTimeRounded, BookmarkAddRounded, BuildRounded, CalendarMonthRounded, CardGiftcardRounded, CategoryRounded, ConstructionRounded, DescriptionRounded, EmailRounded, HourglassBottomRounded, LocalAtmRounded, LocationOnRounded, PhoneRounded, SchoolRounded, Title, TitleRounded, VisibilityRounded, WorkRounded } from '@mui/icons-material';
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
                        status={job.status}
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
              width: '1400px'
            }
          }}
        >
          <DialogTitle>Job details</DialogTitle>
          <DialogContent>
            {
              
              jobToView && (
                <>
                  <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <TitleRounded />
                    <div style={{ marginLeft: '8px' }}>
                      <strong>Job title</strong> <br />
                      {jobToView.title}
                    </div>
                  </Typography>
                  <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <DescriptionRounded />
                    <div style={{ marginLeft: '8px' }}>
                      <strong >Job description</strong> <br />
                      {jobToView.description}
                    </div>
                  </Typography>
                  <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <CategoryRounded />
                    <div style={{ marginLeft: '8px' }}>
                      <strong  >Job category</strong> <br />
                      {jobToView.category}
                    </div>
                  </Typography>
                  <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <WorkRounded />
                    <div style={{ marginLeft: '8px' }}>
                      <strong  >Hiring company</strong> <br />
                      {jobToView.company}
                    </div>
                  </Typography>
                  <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <EmailRounded />
                    <div style={{ marginLeft: '8px' }}>
                      <strong  >Hiring company email</strong> <br />
                      {jobToView.companyEmail}
                    </div>
                  </Typography>
                  <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <PhoneRounded />
                    <div style={{ marginLeft: '8px' }}>
                      <strong  >Hiring company contact</strong> <br />
                      {jobToView.companyContact}
                    </div>
                  </Typography>
                  <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <LocationOnRounded />
                    <div style={{ marginLeft: '8px' }}>
                      <strong  >Location</strong> <br />
                      {jobToView.location}
                    </div>
                  </Typography>
                  <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <ConstructionRounded />
                    <div style={{ marginLeft: '8px' }}>
                      <strong  >Skills</strong> <br />
                      {jobToView.skills}
                    </div>
                  </Typography>
                  <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <SchoolRounded />
                    <div style={{ marginLeft: '8px' }}>
                      <strong  >Qualifications</strong> <br />
                      {jobToView.qualifications}
                    </div>
                  </Typography>
                  <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <HourglassBottomRounded />
                    <div style={{ marginLeft: '8px' }}>
                      <strong >Experience</strong> <br />
                      {jobToView.experience}
                    </div>
                  </Typography>
                  <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <LocalAtmRounded />
                    <div style={{ marginLeft: '8px' }}>
                      <strong  >Salary range</strong> <br />
                      {jobToView.salaryRange}
                    </div>
                  </Typography>
                  <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <AccessTimeRounded />
                    <div style={{ marginLeft: '8px' }}>
                      <strong  >Job type</strong> <br />
                      {jobToView.jobType}
                    </div>
                  </Typography>
                  <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <CardGiftcardRounded />
                    <div style={{ marginLeft: '8px' }}>
                      <strong  >Additional job benefits</strong> <br />
                      {jobToView.additionalBenefits}
                    </div>
                  </Typography>
                  <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <CalendarMonthRounded />
                    <div style={{ marginLeft: '8px' }}>
                      <strong >Application deadline</strong> <br />
                      {jobToView.applicationDeadline ? (
                        format(new Date(jobToView.applicationDeadline), 'do MMMM yyyy')
                      ) : '' }
                    </div>
                  </Typography>
                  <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <BookmarkAddRounded />
                    <div style={{ marginLeft: '8px' }}>
                      <strong  >How to apply</strong> <br />
                      {jobToView.applicationInstructions}
                    </div>
                  </Typography>
                </>
              )
            }
          </DialogContent>
          <DialogActions>
              <Button onClick={handleCloseViewDialog}  
              color='secondary' 
              size='medium' 
              variant='outlined'>
                Close
              </Button>
              <Link className='applyLink' to={`/dashboard/dashboard/apply/${jobToView?._id}`}>Apply</Link>
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

