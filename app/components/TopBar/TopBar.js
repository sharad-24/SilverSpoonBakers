import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { browserRedirect, checkStaff, checkAdmin } from '../../helpers/helpers';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  FormControlLabel ,
  Box,
  Switch,
  IconButton,
  Toolbar,
  makeStyles,
  Button,
  Modal,
  Backdrop,
  Fade,
  Divider
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import './TopBar.css';
import RefreshIcon from '@material-ui/icons/Refresh';
import { CheckBox, CheckCircle, Warning, WarningOutlined } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  root: {
    width: "100%"
  },
  avatar: {
    width: 60,
    height: 60,
  },
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  const [notifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [storeState, setStoreState] = React.useState(false)

  const handleChange = (event) => {
    setStoreState(!storeState);
  };
  const handleLogoutOpen = () => {
    setOpen(true);
  };
  const handleLogoutClose = () => {
    setOpen(false);
  };
  const redirectHome =()=>{
    
    browserRedirect('/admin/login');
  }
  const handleLogout = () => {
    localStorage.removeItem('token');
    setOpen(false);
    localStorage.removeItem('name');
    localStorage.removeItem('type');
    browserRedirect('/admin/login');
  };
  const location = window.location.pathname;
  const name = localStorage.getItem('name');
  const type = localStorage.getItem('type');

  return (
    <AppBar color={`${storeState ? "secondary" : "primary"}`} className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar>
        <h5> Silverspoon Bakers & Cafe</h5>
        <Box flexGrow={1}/>
        <FormControlLabel
          control={
            <Switch
              checked={storeState}
              onChange={handleChange}
              name="storeState"
              color="default"
            />
          }
          label={`Store is ${storeState ? "offline" : "online"}`}
        />
        {storeState ? <WarningOutlined style={{color: "yellow"}}/>: <CheckCircle />}
        <Box flexGrow={1}/>
        {/* <Hidden mdDown> */}
        {/* <IconButton style={{outline: "none",boxShadow: "none"}} color="inherit">
        <RefreshIcon onClick={() => window.location.reload(false)}></RefreshIcon>
        </IconButton> */}
        
        <IconButton
          style={{ outline: 'none', boxShadow: 'none' }}
          color="inherit"
        >
          <HomeIcon onClick={redirectHome} />
        </IconButton>

        {/* <IconButton color="inherit">
          <Badge
            badgeContent={notifications.length}
            color="primary"
            variant="dot"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton> */}

        <IconButton
          color="inherit"
          style={{ outline: 'none', boxShadow: 'none' }}
        >
          <InputIcon onClick={handleLogoutOpen} />
        </IconButton>

        

        <Modal
          open={open}
          onClose={handleLogoutClose}
          aria-labelledby="logout-modal"
          aria-describedby="to-logout-admin"
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className="admin-modal">
              <h1
                style={{
                  fontSize: '1.25em',
                  fontWeight: 'bold',
                  marginTop: 0,
                }}
              >
                Logout
              </h1>
              <Divider />
              <br />
              <h4 style={{ fontSize: '1em' }}>
                Are you sure you want to logout ?
              </h4>
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={handleLogout}
              >
                Yes
              </Button>
              <Button
                variant="contained"
                style={{ marginLeft: '30px' }}
                onClick={handleLogoutClose}
              >
                No
              </Button>
            </div>
          </Fade>
        </Modal>
              
        {/* </Hidden> */}
        {/* <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden> */}
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
};

export default TopBar;
