import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Paper, List, ListItem, ListItemText, Button, Typography } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { AccessTimeOutlined } from '@mui/icons-material';


const NotificationsPanel = ({ notifications , closePanel }) => {
  const [now, setNow] = useState(new Date());

  useEffect(()=>{
    const timer = setInterval(()=>{
      setNow(new Date());
    }, 6000); // update every minute

    return () => {
      clearInterval(timer);
    }
  },[setNow]);

  

  return (
    <Paper style={{ position: 'absolute', top: '65px', right: '10px', maxHeight: '350px', maxWidth: '350px', overflowY: 'auto'}}>
      <List>
        {notifications?.map((notification) => (
          <ListItem key={notification?._id} style={{display:'block'}}>
            <ListItemText >
              <Typography variant='subtitle2'>{notification?.subject}</Typography>
            </ListItemText>
            <ListItemText >
              <Typography variant='body1'>{notification?.message}</Typography>
            </ListItemText>
            <ListItemText >
              <Typography variant='caption' color='textSecondary'>
                <div style={{display: 'inline'}}>
                  <AccessTimeOutlined style={{ marginRight: '4px', fontSize: '18px' }} />
                  Sent {formatDistanceToNow(new Date(notification?.createdAt), { addSuffix: true, includeSeconds: true })}
                </div>
              </Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
      <Button variant='outlined'
      onClick={closePanel}
      style={{ position: 'relative', left: '120px' }}
      >Close</Button>
    </Paper>
  );
};

// Prop types validation
NotificationsPanel.propTypes = {
    notifications: PropTypes.array.isRequired, // Validate notifications prop as an array
    closePanel: PropTypes.func.isRequired, // Validate closePanel prop as a function
};

export default NotificationsPanel;
