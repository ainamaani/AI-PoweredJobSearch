import PropTypes from 'prop-types';
import React,{useState, useEffect} from 'react';
import UseAuthContext from 'src/hooks/use-auth-context';
import axios from 'axios';
import NotificationsPanel from 'src/components/notifications-panel';


import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { Badge, Tooltip, Typography } from '@mui/material';
import { NotificationsActiveOutlined, NotificationsActiveRounded } from '@mui/icons-material';


import { useResponsive } from 'src/hooks/use-responsive';

import { bgBlur } from 'src/theme/css';

import Iconify from 'src/components/iconify';

import Searchbar from './common/searchbar';
import { NAV, HEADER } from './config-layout';
import AccountPopover from './common/account-popover';
import LanguagePopover from './common/language-popover';
import NotificationsPopover from './common/notifications-popover';

 

// ----------------------------------------------------------------------

export default function Header({ onOpenNav }) {
  const {user} = UseAuthContext()

  const theme = useTheme();

  // state to handle the visibility of the notifications panel
  const [showNotifications, setShowNotifications] = useState(false);
  // state to store the notifications
  const [notifications, setNotifications] = useState([]);
  // state to store unread notifications
  const [unreadNotifications, setUnreadNotifications] = useState([]);

  const lgUp = useResponsive('up', 'lg');


  useEffect(()=>{
    const handleFetchUserNotifications = async() => {
      const response = await axios.get(`http://localhost:5550/api/notifications/user/${user.id}`);
      if(response.status === 200){
        console.log(response.data);
        const data = response.data
        const unread = data.filter(notification => notification.isUnread === true );
        setNotifications(data);
        setUnreadNotifications(unread);
      }
    }
    handleFetchUserNotifications();
  },[user.id]);

  useEffect(()=>{
    console.log("All notifications", notifications);
    console.log("Unread notifications", unreadNotifications);
  },[notifications, unreadNotifications]);


  const handleNotificationsClick = async () => {
    setShowNotifications(!showNotifications);
    // change the read status of the notifications
    try {
      const changeStatus = await axios.get('http://localhost:5550/api/notifications/read');
      if (changeStatus.status === 200) {
        // Update the unread status of notifications displayed in the panel
        console.log(changeStatus.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  


  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}

      

      <Searchbar />

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" spacing={1}>
        {/* <NotificationsPopover /> */}
        { user && (
            <div style={{ display: "flex"}}>
                <Tooltip title="View notifications">
                    <IconButton color="primary" 
                        onClick={handleNotificationsClick} 
                        style={{ marginRight:"20px" }}>
                            <Badge badgeContent={unreadNotifications?.length} color="error">
                                <NotificationsActiveOutlined />
                            </Badge>
                    </IconButton>
                </Tooltip>
            </div>
        )}
        <AccountPopover />
      </Stack>
      {/* Display Notifications */}
      {showNotifications && (
          <NotificationsPanel
              notifications={notifications}
              closePanel={() => {
                setShowNotifications(false);
                window.location.reload();
              }
              }
          />
      )}
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.WIDTH + 1}px)`,
          height: HEADER.H_DESKTOP,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
