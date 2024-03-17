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

        // const handleFetchUserProfessionJobs = async() =>{
        //   const allUserProfessionJobs = await axios.get(`http://localhost:5550/api/jobs/${user.sector}`);
        //   if(allUserProfessionJobs.status === 200){
        //     setAllUserProfessionJobs(allUserProfessionJobs.data);
        //   }
        // }

      
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

        {/* <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Developer jobs"
            total={96}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid> */}

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
              {/* <AppWidgetSummary
            title="Interviews"
            total={allUserInterviews ? allUserInterviews.length : 0}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          /> */}
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
          {/* <AppWidgetSummary
            title="Applications"
            total={allUserApplications ? allUserApplications.length : "Zero"}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          /> */}
        </Grid>

        {/* <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Website Visits"
            subheader="(+43%) than last year"
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ],
            }}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Current Visits"
            chart={{
              series: [
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ],
            }}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Conversion Rates"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ],
            }}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid> */}

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

        {/* <div>
          { recommendedJobs ? (
            recommendedJobs?.map(recjob => (
              <h5>{recjob.title}</h5>
            ))
          ):(
            <h5>Loading....</h5>
          ) }
        </div> */}

        {/* <div style={{ display:"flex", gap:"6px" }}>
          { recommendedJobs ? (
            recommendedJobs.map(job => (
              <div className="recommended-card"
            style={{ 
              background: "#fff",
              padding: "10px",
              borderRadius: "8px",
              display: "grid",
              gridTemplateColumns: "1fr 3fr",
              maxWidth: "150px"
             }}
          > 
                <div>
                  <div className="recommended-left">
                  <Avatar alt="company-pic" 
                    src='https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29tcGFueXxlbnwwfHwwfHx8MA%3D%3D'
                  />
                </div>
                <div className="recommended-right">
                  <Typography variant='h5'>Accountant</Typography>
                  <Typography variant='subtitle2'>Hiring company is Pahappa</Typography>
                  <Tooltip title="View">
                    <IconButton color='primary'
                      handleOpenViewDialog={() => handleOpenViewDialog(job)}
                    >
                      <VisibilityRounded />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
               
            
          </div>
            ))
          ):(
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                <CircularProgress />
            </div>
          ) }
          
        </div> */}


        <Grid xs={12} md={6} lg={8}>
          { recommendedJobs ? (
            <AppNewsUpdate
              title="Recommended for you"
              list={recommendedJobs}
            />
          ):(
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                <CircularProgress />
            </div>
          ) }
        </Grid>


        {/* <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid> */}
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
