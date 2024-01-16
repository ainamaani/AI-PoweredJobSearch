import React, { useEffect, useState } from 'react';
import { Paper, List, ListItem, ListItemText, Button, Typography } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { AccessTimeOutlined } from '@mui/icons-material';


const NotificationsPanel = ({ notifications , closePanel }) => {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(()=>{
    const timer = setInterval(()=>{
      setNow(new Date());
    }, 6000); // update every minute

    return () => {
      clearInterval(timer);
    }
  },[]);

  

  return (
    <Paper style={{ position: 'absolute', top: '65px', right: '10px', maxHeight: '350px', maxWidth: '350px', overflowY: 'auto'}}>
      <List>
        {notifications.map((notification) => (
          <ListItem key={notification._id} style={{display:'block'}}>
            <ListItemText >
              <Typography variant='subtitle2'>{notification.notificationType}</Typography>
            </ListItemText>
            <ListItemText >
              <Typography variant='body1'>{notification.notificationContent}</Typography>
            </ListItemText>
            <ListItemText >
              <Typography variant='caption' color='textSecondary'>
                <div style={{display: 'inline'}}>
                  <AccessTimeOutlined style={{ marginRight: '4px', fontSize: '18px' }} />
                  Sent {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true, includeSeconds: true })}
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

export default NotificationsPanel;
