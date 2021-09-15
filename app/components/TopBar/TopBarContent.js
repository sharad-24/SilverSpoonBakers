import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { browserRedirect, checkStaff, checkAdmin } from '../../helpers/helpers';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  Button,
  Modal,
  Backdrop,
  Fade,
  Divider,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import './TopBar.css';
import RefreshIcon from '@material-ui/icons/Refresh';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  avatar: {
    width: 60,
    height: 60,
  },
}));

const TopBarContent = props => {
  const classes = useStyles();
  const [notifications] = useState([]);
  const [open, setOpen] = useState(false);
  const handleLogoutOpen = () => {
    setOpen(true);
  };
  const handleLogoutClose = () => {
    setOpen(false);
  };
  const redirectHome = () => {
    browserRedirect('/admin/login');
  };
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

  if (location !== '/admin/login') {
    console.log('location: ', location);
    console.log('Disabled State in content: ', props);
    return (
      <AppBar className={clsx(classes.root)} elevation={0}>
        <Toolbar>
          <h5> SilverSpoon Bakery : Admin Panel</h5>
          <Box flexGrow={1} />
          <IconButton
            style={{ outline: 'none', boxShadow: 'none' }}
            color="inherit"
            disabled={props.open}
          >
            <RefreshIcon onClick={() => window.location.reload(false)} />
          </IconButton>

          <IconButton
            style={{ outline: 'none', boxShadow: 'none' }}
            color="inherit"
          >
            <HomeIcon onClick={redirectHome} />
          </IconButton>
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
        </Toolbar>
      </AppBar>
    );
  } else {
    return (
      <AppBar className={clsx(classes.root)} elevation={0}>
        <Toolbar>
          <h5> SilverSpoon Bakery : Admin Panel</h5>
        </Toolbar>
      </AppBar>
    );
  }
};

TopBarContent.propTypes = {
  className: PropTypes.string,
};

export default TopBarContent;
