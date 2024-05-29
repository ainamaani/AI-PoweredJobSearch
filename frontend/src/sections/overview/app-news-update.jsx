import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow, format } from 'date-fns';
import {
  Box,
  Link,
  Card,
  Stack,
  Button,
  Divider,
  Typography,
  CardHeader,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from '@mui/material';
import { AccessTimeRounded, BookmarkAddRounded, BuildRounded, BusinessRounded, CalendarMonthRounded, 
  CardGiftcardRounded, CategoryRounded, CommentRounded, ConstructionRounded, DescriptionRounded, DoorFrontRounded, EmailRounded, 
  HandymanRounded, 
  HourglassBottomRounded, LocalAtmRounded, LocationOnRounded, PhoneRounded, SchoolRounded, 
  SearchRounded, 
  Title, TitleRounded, VisibilityRounded, WorkRounded, Info as InfoIcon  } from '@mui/icons-material';
import { fToNow } from 'src/utils/format-time';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

// AppNewsUpdate component
export default function AppNewsUpdate({ title, subheader, list, ...other }) {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleViewAllClick = () => {
    navigate('/dashboard/dashboard/jobs');
  };

  const handleOpenDialog = (job) => {
    setSelectedJob(job);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedJob(null);
  };

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {list ? (
            list.map((job) => (
              <div key={job._id}>
                <JobItem job={job} onOpenDialog={handleOpenDialog} />
              </div>
            ))
          ) : (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
              <CircularProgress />
            </div>
          )}
        </Stack>
      </Scrollbar>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
          onClick={handleViewAllClick}
        >
          View all jobs
        </Button>
      </Box>

      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        PaperProps={{
          style:{
            width: '1400px'
          }
        }}
        >
        <DialogTitle>Job Details</DialogTitle>
        <DialogContent>
          {selectedJob && (
            <>
            <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <TitleRounded />
              <div style={{ marginLeft: '8px' }}>
                <strong>Job title</strong> <br />
                {selectedJob.title}
              </div>
            </Typography>
            <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <DescriptionRounded />
              <div style={{ marginLeft: '8px' }}>
                <strong >Job description</strong> <br />
                {selectedJob.description}
              </div>
            </Typography>
            <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <CategoryRounded />
              <div style={{ marginLeft: '8px' }}>
                <strong  >Job category</strong> <br />
                {selectedJob.category}
              </div>
            </Typography>
            <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <WorkRounded />
              <div style={{ marginLeft: '8px' }}>
                <strong  >Hiring company</strong> <br />
                {selectedJob.company}
              </div>
            </Typography>
            <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <EmailRounded />
              <div style={{ marginLeft: '8px' }}>
                <strong  >Hiring company email</strong> <br />
                {selectedJob.companyEmail}
              </div>
            </Typography>
            <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <PhoneRounded />
              <div style={{ marginLeft: '8px' }}>
                <strong  >Hiring company contact</strong> <br />
                {selectedJob.companyContact}
              </div>
            </Typography>
            <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <LocationOnRounded />
              <div style={{ marginLeft: '8px' }}>
                <strong  >Location</strong> <br />
                {selectedJob.location}
              </div>
            </Typography>
            <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <ConstructionRounded />
              <div style={{ marginLeft: '8px' }}>
                <strong  >Skills</strong> <br />
                {selectedJob.skills}
              </div>
            </Typography>
            <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <SchoolRounded />
              <div style={{ marginLeft: '8px' }}>
                <strong  >Qualifications</strong> <br />
                {selectedJob.qualifications}
              </div>
            </Typography>
            <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <HourglassBottomRounded />
              <div style={{ marginLeft: '8px' }}>
                <strong >Experience</strong> <br />
                {selectedJob.experience}
              </div>
            </Typography>
            <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <LocalAtmRounded />
              <div style={{ marginLeft: '8px' }}>
                <strong  >Salary range</strong> <br />
                {selectedJob.salaryRange}
              </div>
            </Typography>
            <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <AccessTimeRounded />
              <div style={{ marginLeft: '8px' }}>
                <strong  >Job type</strong> <br />
                {selectedJob.jobType}
              </div>
            </Typography>
            <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <CardGiftcardRounded />
              <div style={{ marginLeft: '8px' }}>
                <strong  >Additional job benefits</strong> <br />
                {selectedJob.additionalBenefits}
              </div>
            </Typography>
            <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <CalendarMonthRounded />
              <div style={{ marginLeft: '8px' }}>
                <strong >Application deadline</strong> <br />
                {selectedJob.applicationDeadline ? (
                  format(new Date(selectedJob.applicationDeadline), 'do MMMM yyyy')
                ) : '' }
              </div>
            </Typography>
            <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <BookmarkAddRounded />
              <div style={{ marginLeft: '8px' }}>
                <strong  >How to apply</strong> <br />
                {selectedJob.applicationInstructions}
              </div>
            </Typography>
            <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <CommentRounded />
              <div style={{ marginLeft: '8px' }}>
                <strong  >Additional information</strong> <br />
                {selectedJob?.additionalComments}
              </div>
            </Typography>
          </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

AppNewsUpdate.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      company: PropTypes.string,
      description: PropTypes.string,
      // Add more fields as needed to match the Job model
    })
  ),
};

// JobItem component
function JobItem({ job, onOpenDialog }) {
  const { title, company, description, createdAt } = job;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={title}
        src="https://images.unsplash.com/photo-1487528278747-ba99ed528ebc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8am9ic3xlbnwwfHwwfHx8MA%3D%3D"
        sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
      />

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
          {title}
        </Link>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {description}
        </Typography>
      </Box>

      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {fToNow(createdAt)}
      </Typography>

      <IconButton onClick={() => onOpenDialog(job)}>
        <InfoIcon />
      </IconButton>
    </Stack>
  );
}

JobItem.propTypes = {
  job: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  onOpenDialog: PropTypes.func.isRequired,
};
