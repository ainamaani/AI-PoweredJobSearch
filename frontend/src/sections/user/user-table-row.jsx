import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { VisibilityRounded } from '@mui/icons-material';

// ----------------------------------------------------------------------

export default function UserTableRow({
  // selected,
  title,
  company,
  location,
  datePosted,
  status,
  handleClick,
  handleOpenViewDialog
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} >
      {/* role="checkbox" selected={selected}  should be inside the above line of code */}
        {/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell> */}

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {title}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{company}</TableCell>

        <TableCell>{location}</TableCell>

        <TableCell align="center">{datePosted}</TableCell>

        <TableCell>
          <Label color={(status === 'closed' && 'error') || 'success'}>{status}</Label>
        </TableCell>

        <TableCell>
          <Tooltip title="View job details" >
            <IconButton color='primary' size='large'
              onClick={handleOpenViewDialog}
            >
              <VisibilityRounded />
            </IconButton>
          </Tooltip>
        </TableCell>

        {/* <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell> */}
      </TableRow>

      {/* <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover> */}
    </>
  );
}

UserTableRow.propTypes = {
  company: PropTypes.any,
  handleClick: PropTypes.func,
  handleOpenViewDialog: PropTypes.func,
  datePosted: PropTypes.any,
  title: PropTypes.any,
  location: PropTypes.any,
  // selected: PropTypes.any,
  status: PropTypes.string,
};
