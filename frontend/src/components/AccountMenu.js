import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Delete from '@mui/icons-material/Delete';
import {Link} from 'react-router-dom';
import crud from '../services/crud';
import {toastError, toastSuccess} from '../constantes/toastConfig'


export default function AccountMenu() {

  // handle Menu Click
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // handle Logout

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  }

  // handle Delete Account

  const handleDeleteAccount = async () => {
    try {
      const response = await crud.deleteStuff(`user/delete/${userId}`);
      handleLogout();
      toastSuccess(response.message);
    } catch (error) {
      const errorMessage = error.response.data.error;
      toastError(errorMessage);
    }
  }

  // Display User Info

  const [user, setUser] = React.useState([]);
  
  const userId = localStorage.getItem('User');

  React.useEffect(()=>{
    if (userId) {
      const fetchUser = async () => {
        try {
          const userinfo = await crud.findStuff(`user/${userId}`);
          setUser(userinfo[0]);
  
        }catch(error){
          console.log(error);
        }
      }
    fetchUser();
    }  
  }, [userId])
  
  return (
    <>
    {userId && (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar src={`${user.user_pp}`} alt="Profil"/>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Typography>
            {`${user.user_firstname} ${user.user_name}`}
          </Typography>
        </MenuItem>
        <Divider/>
        <MenuItem>
        <Link to="profile">
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Modifier le profil
        </Link>
        </MenuItem>
        <MenuItem
        onClick={handleDeleteAccount}>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          Supprimer le profil
        </MenuItem>
        <MenuItem
        onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          D??connexion
        </MenuItem>
      </Menu>
    </React.Fragment>)}
    </>
  );
}