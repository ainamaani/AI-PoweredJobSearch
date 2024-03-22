import { faker } from '@faker-js/faker';
import { Avatar, CircularProgress, IconButton, Tooltip, Dialog, DialogActions, 
  DialogContent, Button,
  DialogTitle, 
  InputAdornment, 
  TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import {format} from 'date-fns';
import { AssignmentRounded, HandshakeRounded, MoreVertRounded, VisibilityRounded, 
  WorkRounded, AccessTimeRounded, BookmarkAddRounded, BuildRounded, CalendarMonthRounded, 
  CardGiftcardRounded, CategoryRounded, CommentRounded, ConstructionRounded, DescriptionRounded, EmailRounded, 
  HourglassBottomRounded, LocalAtmRounded, LocationOnRounded, PhoneRounded, SchoolRounded, 
  SearchRounded, 
  Title, TitleRounded } from '@mui/icons-material';
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
  // const [userProfessionJobs, setAllUserProfessionJobs] = useState([]);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [jobToView, setJobToView] = useState(null);


  useEffect(()=>{
    try {
        const handleFetchRecentJobs = async() =>{
          const recentJobsData = await axios.get("http://localhost:5550/api/jobs/");
          if(recentJobsData.status === 200){
            setAllJobs(recentJobsData.data);
            setRecentJobs(recentJobsData.data.slice(0, 5));
          }
        }

        const handleFetchUserApplications = async() =>{
          const userAppications = await axios.get(`http://localhost:5550/api/applications/${user.id}`);
          if(userAppications.status === 200){
            console.log(userAppications);
            setAllUserApplications(userAppications.data);
          }
        }

        const handleFetchUserInterviews = async() =>{
          const userInterviews = await axios.get(`http://localhost:5550/api/interviews/user/${user.id}`);
          if(userInterviews.status === 200){
            setAllUserInterviews(userInterviews.data);
          }
        }

        const handleFetchRecommendedJobs = async() =>{
          const recommended = await axios.get(`http://localhost:5550/api/recommendations/${user.sector}`);
          if(recommended.status === 200){
            console.log(recommended.data);
            setRecommendedJobs(recommended.data);
          }
        }

      
      handleFetchRecentJobs();
      handleFetchUserApplications();
      handleFetchUserInterviews();
      if(user?.sector){
        handleFetchRecommendedJobs();
      }
      // handleFetchUserProfessionJobs();

    } catch (error) {
      console.log(error);
    }
  },[user.id, user.sector]);

   // function to handle opening of the view dialog
   const handleOpenViewDialog = (job) =>{
    setJobToView(job);
    setIsViewDialogOpen(true)
  }

  const handleCloseViewDialog = () =>{
    setJobToView(null);
    setIsViewDialogOpen(false)
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
          )}
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



        <Grid xs={12} md={6} lg={8}>
          { recommendedJobs ? (
            <AppNewsUpdate
              title="Recommended for you"
              list={recommendedJobs}
            />
          ):(
            <div>
                <Typography variant='h4'>No job recommendations</Typography>
            </div>
          ) }
        </Grid>

      </Grid>
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
