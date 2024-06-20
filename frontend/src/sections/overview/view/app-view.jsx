import { faker } from '@faker-js/faker';
import { Avatar, CircularProgress, IconButton, Tooltip, Dialog, DialogActions, 
  DialogContent, Button,
  DialogTitle, 
  InputAdornment, 
  TextField, 
  Card,
  CardContent} from '@mui/material';
import { Link } from 'react-router-dom';
import {format} from 'date-fns';
import { AssignmentRounded, HandshakeRounded, MoreVertRounded, VisibilityRounded, 
  WorkRounded, AccessTimeRounded, BookmarkAddRounded, BuildRounded, CalendarMonthRounded, 
  CardGiftcardRounded, CategoryRounded, CommentRounded, ConstructionRounded, DescriptionRounded, EmailRounded, 
  HourglassBottomRounded, LocalAtmRounded, LocationOnRounded, PhoneRounded, SchoolRounded, 
  SearchRounded,
  Title, TitleRounded, 
  InfoRounded,
  PersonRounded,
  ErrorOutlineRounded} from '@mui/icons-material';
import React, {useState, useEffect} from 'react';
import axios, { all } from 'axios';


import UseAuthContext from 'src/hooks/use-auth-context';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';



// ----------------------------------------------------------------------

export default function AppView() {
  const {user} = UseAuthContext();
  const [recentJobs, setRecentJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [allUserApplications, setAllUserApplications] = useState([])
  const [allUserInterviews, setAllUserInterviews] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [followedCompanyJobs, setFollowedCompanyJobs] = useState([]);
  // const [userProfessionJobs, setAllUserProfessionJobs] = useState([]);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [jobToView, setJobToView] = useState(null);
  const [bestApplicants, setBestApplicants] = useState([]);
  const [isViewBestApplicantsDialog, setIsViewBestApplicantsDialog] = useState(false);
  const [jobToFetchBestApplicants, setJobToFetchBestApplicants] = useState(null);

  const [followsCompanies, setFollowsCompanies] = useState(false);

  const [openBestApplicantsDialog, setOpenBestApplicantsDialog] = useState(false);

  const [companyJobs, setCompanyJobs] = useState([]);


  useEffect(()=>{
    const fetchData = async() => {
      try {
        const handleFetchRecentJobs = async() =>{
          try {
            let response;
            if (user.userCategory === 'Admin') {
                response = await axios.get('http://localhost:5550/api/jobs/');
            } else if (user.userCategory === 'Job seeker') {
                response = await axios.get(`http://localhost:5550/api/jobs/`);
            } else if (user.userCategory === 'Recruiter') {
                response = await axios.get(`http://localhost:5550/api/jobs/company/${user.company}`);
            }

            if (response.status === 200) {
                setAllJobs(response.data);
                setRecentJobs(response.data.slice(0, 5));
            }
        } catch (fetcherror) {
            console.error(fetcherror);
        }
          // const recentJobsData = await axios.get("http://localhost:5550/api/jobs/");
          // if(recentJobsData.status === 200){
          //   setAllJobs(recentJobsData.data);
          //   setRecentJobs(recentJobsData.data.slice(0, 5));
          // }
        }

        const handleFetchUserApplications = async() =>{
          try {
            let response;
            if (user.userCategory === 'Admin') {
                response = await axios.get('http://localhost:5550/api/applications/');
            } else if (user.userCategory === 'Job seeker') {
                response = await axios.get(`http://localhost:5550/api/applications/user/${user.id}`);
            } else if (user.userCategory === 'Recruiter') {
                response = await axios.get(`http://localhost:5550/api/applications/company/${user.company}`);
            }

            if (response.status === 200) {
                setAllUserApplications(response.data);
            }
        } catch (fetcherrorr) {
            console.error(fetcherrorr);
        }
          // const userAppications = await axios.get(`http://localhost:5550/api/applications/user/${user.id}`);
          // if(userAppications.status === 200){
          //   console.log(userAppications);
          //   setAllUserApplications(userAppications.data);
          // }
        }

        const handleFetchUserInterviews = async() =>{
          try {
            let response;
            if (user.userCategory === 'Admin') {
                response = await axios.get('http://localhost:5550/api/interviews/');
            } else if (user.userCategory === 'Job seeker') {
                response = await axios.get(`http://localhost:5550/api/interviews/user/${user.id}`);
            } else if (user.userCategory === 'Recruiter') {
                response = await axios.get(`http://localhost:5550/api/interviews/company/${user.company}`);
            }

            if (response.status === 200) {
                setAllUserInterviews(response.data);
            }
        } catch (fetcherrorrr) {
            console.error(fetcherrorrr);
        }

          // const userInterviews = await axios.get(`http://localhost:5550/api/interviews/user/${user.id}`);
          // if(userInterviews.status === 200){
          //   setAllUserInterviews(userInterviews.data);
          // }
        }

        const handleFetchRecommendedJobs = async() =>{
          try {
            const recommended = await axios.get(`http://localhost:5550/api/recommendations/${user.sector}`);
            if(recommended.status === 200){
              console.log(recommended.data);
              setRecommendedJobs(recommended.data);
            }
          } catch (error1) {
            console.log(error1);
          }
        }

        const handleFollowsCompaniesCheck = async() =>{
          try {
            const response = await axios.post('http://localhost:5550/api/companies/checkfollow',
              JSON.stringify({ userId : user.id }),{
                headers:{
                  'Content-Type':'application/json'
                }
              }
            );
            console.log(followsCompanies);
            if(response.status === 200){
            setFollowsCompanies(true);
            console.log(followsCompanies);
            }else{
            setFollowsCompanies(false);
            }
          } catch (error2) {
            console.log(error2);
          }
        }

        const handleFetchFollowedCompanyJobs = async() => {
          try {
            const response = await axios.post('http://localhost:5550/api/companies/company/jobs',
              JSON.stringify({ userId : user.id }),{
                headers:{
                  'Content-Type':'application/json'
                }
              }
            );
            if(response.status === 200){
            setFollowedCompanyJobs(response.data);
            }
          } catch (error3) {
            console.log(error3)
          }
        }

        const handleFetchCompanyJobs = async() => {
          try {
            const response = await axios.get(`http://localhost:5550/api/jobs/company/${user.company}`);
            if(response.status === 200){
              setCompanyJobs(response.data);
            }else{
              console.log(response.error);
            }
          } catch (error4) {
            console.log(error4);
          }
        }


      
      handleFetchRecentJobs();
      handleFetchUserApplications();
      handleFetchUserInterviews();
      if(user.sector){
        handleFetchRecommendedJobs();
      }
      await handleFollowsCompaniesCheck();
  
      if(followsCompanies === true){
        await handleFetchFollowedCompanyJobs();
      }

      if(user.userCategory === "Recruiter"){
        handleFetchCompanyJobs()
      }
    } catch (error) {
      console.log(error);
    }
    }

    fetchData();
  },[user.id, user.sector, user.isFollowingCompany, jobToFetchBestApplicants,user.company, user.userCategory, followsCompanies]);


  useEffect(()=>{
    console.log("Recommended Jobs",recommendedJobs);
    console.log("Followed company jobs",followedCompanyJobs);
  },[recommendedJobs, followedCompanyJobs]);

   // function to handle opening of the view dialog
   const handleOpenViewDialog = (job) =>{
    setJobToView(job);
    setIsViewDialogOpen(true)
  }

  const handleCloseViewDialog = () =>{
    setJobToView(null);
    setIsViewDialogOpen(false)
  }

  const handleOpenViewBestApplicantsDialog = (job) =>{
    setJobToFetchBestApplicants(job?._id);
    setIsViewBestApplicantsDialog(true);
  }

  const handleCloseViewBestApplicantsDialog = () =>{
    setJobToFetchBestApplicants(null);
    setIsViewBestApplicantsDialog(false);
  }

  const handleCloseBestApplicantsDialog = () =>{
    setOpenBestApplicantsDialog(false);
  }

  const handleFetchBestApplicants = async(jobId) =>{
    try {
      const response = await axios.get(`http://localhost:5550/api/applications/bestapplicants/${jobId}`);
      if(response.status === 200){
        setBestApplicants(response.data);
        setOpenBestApplicantsDialog(true);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi {user.firstname}, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
        {allJobs.length > 0 ? (
            <AppWidgetSummary
              title="Job postings"
              total={allJobs.length}
              icon={<WorkRounded />}
            />
          ) : (
            <Typography variant='subtitle2'>No jobs found.</Typography>
          )
        }
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          {allUserInterviews.length > 0 ? (
              <AppWidgetSummary
                  title="Interviews"
                  total={allUserInterviews.length}
                  icon={<HandshakeRounded />}
                />
                ) : (
                  <Typography>No interviews found.</Typography>
                )}
        </Grid>

        <Grid xs={12} sm={6} md={3}>
        {allUserApplications.length > 0 ? (
          <AppWidgetSummary
            title="Applications"
            total={allUserApplications.length}
            icon={<AssignmentRounded />}
          />
        ) : (
          <Typography>No applications found.</Typography>
        )}
        </Grid>

        

        <Grid xs={12} md={6} lg={8}>
          { recentJobs ? (
            <AppNewsUpdate
              title="Recently posted"
              list={recentJobs}
            />
          ):(
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                <CircularProgress />
            </div>
          ) }
        </Grid>



        {
          user.userCategory === "Job seeker" &&  (
            <Grid xs={12} md={6} lg={8}>
              { recommendedJobs.length > 0 ? (
                <AppNewsUpdate
                  title="Recommended for you"
                  list={recommendedJobs}
                />
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
                    No recommended jobs for you regarding your sector!
                  </Typography>
                </div>
              ) }
            </Grid>
          )
        }

        



        {
          user.userCategory === "Job seeker" && (
            <Grid xs={12} md={6} lg={8}>
              {followedCompanyJobs.length > 0 ? (
                <AppNewsUpdate
                  title="From the companies you follow"
                  list={followedCompanyJobs}
                />
              ) : (
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
                    No jobs from particular companies.Follow companies to get job updates from them.
                  </Typography>
                </div>
              )}
              </Grid>
          )
        }


        {
          user.userCategory === "Recruiter" && (
            <div style={{
              display: "flex",
              flexWrap: "wrap"
            }}>
              { companyJobs ? (
                companyJobs.map(job=>(
                  <Card sx={{
                    width: 400,
                    margin: '5px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                    padding: '8px',
                    backgroundColor: '#fff'
                  }}>
                    <CardContent>
                      <Typography variant='subtitle1' component='div' sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
                        { job.title }
                      </Typography>
                      <Typography variant='subtitle2' sx={{ color: '#888', marginBottom: '4px' }}>
                        <strong>Posted on:</strong> { format(new Date(job.createdAt), 'do MMMM yyyy')}
                      </Typography>
                      <Typography variant='subtitle2' sx={{ color: '#888', marginBottom: '4px' }}>
                        <strong>Application deadline:</strong> { format(new Date(job.applicationDeadline), 'do MMMM yyyy')}
                      </Typography>
                      <Typography variant='subtitle2' sx={{ marginBottom: '4px' }}>
                        <strong>Job posting status:</strong>{' '}
                        <span style={{ 
                          color: job.status === 'open' ? 'green' : 'red',
                          backgroundColor: job.status === 'closed' ? '#FFCCCC' : '#CCFFCC',
                          padding: '4px 6px',
                          borderRadius: '4px'
                          
                          }}>
                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                        </span>
                      </Typography>
                      <Typography variant='subtitle2' sx={{ color: '#888', marginBottom: '4px' }}>
                        <strong>Number of applicants:</strong> { job.numberOfApplicants }
                      </Typography>
                    </CardContent>
                    <div className="actions" style={{ textAlign: 'right', padding: '8px' }}>
                      <Button 
                        onClick={() => handleFetchBestApplicants(job._id)}
                        variant='contained' 
                        sx={{ backgroundColor: '#1976d2', color: '#fff' }}
                      > 
                        View best applicants
                      </Button>
                    </div>
                  </Card>
                ))
              ):(
                <p>Loading....</p>
              ) }
            </div>
          )
        }


      </Grid>
      {/* View Best Applicants dialog */}
        <Dialog 
          open={openBestApplicantsDialog} 
          onClose={handleCloseBestApplicantsDialog}
          PaperProps={{
            style:{
              width: '900px'
            }
          }}
          >
          <DialogTitle>Best Applicants</DialogTitle>
            <DialogContent>
              {bestApplicants.length > 0 ? (
                bestApplicants.map((applicant, index) => (
                  <div key={index} style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      
                      <PersonRounded style={{ marginRight: '10px', color: '#1976d2' }} />
                      <h5 style={{ margin: '0' }}>{applicant.applicant_firstname} {applicant.applicant_lastname}</h5>
                    </div>
                    <p style={{ margin: '5px 0 0 0' }}>{applicant.email}</p>
                    <p style={{ margin: '5px 0 0 0', fontWeight: 'bold' }}>{applicant.similarityPercentage.toFixed(2)}%</p>
                  </div>
                ))
              ) : (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <ErrorOutlineRounded style={{ marginRight: '10px', color: 'red' }} />
                  <p style={{ margin: 0 }}>No best applicants found.</p>
                </div>
              )}
          </DialogContent>
        </Dialog>

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
                  <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <CommentRounded />
                    <div style={{ marginLeft: '8px' }}>
                      <strong  >Additional information</strong> <br />
                      {jobToView?.additionalComments}
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
              {jobToView?.status === "open" && jobToView?.applyFromWithinApp === "yes" && (
                <Link 
                  className='applyLink' 
                  to={`/dashboard/dashboard/apply/${jobToView?._id}`}
                >
                  Apply
                </Link>
              )}
          </DialogActions>

        </Dialog>
    </Container>
  );
}
