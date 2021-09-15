import React, { useState, useEffect } from 'react';
import { NavDropdown, Nav } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import CreateIcon from '@material-ui/icons/Create';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import request from '../../utils/request';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { IconButton, Grid, Badge } from '@material-ui/core';
import { makeStyles, useTheme, fade } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import List from '@material-ui/core/List';
import { useCookies, Cookies } from 'react-cookie';

import './index.css';
import { browserRedirect } from '../../helpers/helpers';
import { menu_url } from '../../config/urls';
import { urls } from '../../config/urls';
import {
  CreateOutlined,
  HomeOutlined,
  MenuBookOutlined,
} from '@material-ui/icons';

const logo = require('../../images/logo.svg');

const drawerWidth = 220;

const useStyles = makeStyles(theme => ({
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  root: {
    display: 'flex',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    color: '#ffbc2a',
  },
  searchDrawer: {
    flexShrink: 0,
    color: '#ffbc2a',
  },

  drawerPaper: {
    width: drawerWidth,
  },
  searchDrawerPaper: {
    width: 320,
  },
  cartDrawerPaper: {
    width: 320,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

const yelow = '#ffbc2a';

function MobileDrawer(props) {
  let cookie = new Cookies();
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [name, setname] = useState('');

  const [cookies, setCookie, removeCookie] = useCookies(['customertoken']);

  const checkLoginStatus = () => {
    setCookie({ customertoken: cookie.get('customertoken') || '' });
    setname(decodeURIComponent(cookie.get('name')).split(' ')[0] || '');
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const handleLogout = (event, callback) => {
    removeCookie('customertoken');
    removeCookie('name');
    removeCookie('mobile');
    cookie.remove('customertoken');
  };

  return (
    <div>
      <Drawer
        className={classes.drawer}
        anchor="left"
        open={props.open}
        classes={{
          paper: classes.drawerPaper,
        }}
        onClose={props.toggleDrawer}
      >
        <List onClick={props.toggleDrawer}>
          <ArrowBackIcon
            fontSize="medium"
            onClick={props.toggleDrawer}
            style={{
              float: 'right',
              color: 'black',
              marginRight: '4px',
              marginBottom: '20%',
            }}
          />
          <br />
          <Link to="/" className="navbarlink">
            <ListItem button>
              <ListItemIcon>
                <HomeOutlined style={{ color: 'black' }} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <a href={menu_url} target="_blank" className="navbarlink">
            <ListItem alignItem="flex-start" button>
              <ListItemIcon>
                <MenuBookOutlined style={{ color: 'black' }} />
              </ListItemIcon>
              <ListItemText primary="Menu" />
            </ListItem>
          </a>
          <Link to="/customorder" className="navbarlink">
            <ListItem button>
              <ListItemIcon>
                <CreateOutlined style={{ color: 'black' }} />
              </ListItemIcon>
              <ListItemText primary="Custom order" />
            </ListItem>
          </Link>
          <Link to="/orderhistory" className="navbarlink">
            <ListItem alignItem="flex-start" button>
              <ListItemIcon>
                <ListIcon style={{ color: 'black' }} />
              </ListItemIcon>
              <ListItemText primary="Your orders" />
            </ListItem>
          </Link>
          {cookies ? (
            cookies.customertoken ? (
              <div
                className="navbarlink"
                style={{ textDecoration: 'none' }}
                onClick={event => {
                  return handleLogout(event, browserRedirect('/'));
                }}
              >
                <ListItem title={name}>
                  <ListItemIcon>
                    <ExitToAppIcon style={{ color: 'black' }} />
                  </ListItemIcon>

                  <ListItemText primary="Logout" />
                </ListItem>
              </div>
            ) : (
              <Link to="/login" className="navbarlink">
                <ListItem button>
                  <ListItemIcon>
                    <LockOpenIcon style={{ color: 'black' }} />
                  </ListItemIcon>
                  <ListItemText primary="Login" />
                </ListItem>
              </Link>
            )
          ) : (
            <Link to="/login" className="navbarlink">
              <ListItem button>
                <ListItemIcon>
                  <LockOpenIcon style={{ color: 'black' }} />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
            </Link>
          )}

          <Grid
            item
            container
            xs={12}
            style={{
              gap: '2em 1em',
              padding: '1em',
              marginTop: `calc(100% + 60px) `,
            }}
          >
            <Grid item xs style={{ textAlign: 'right' }}>
              <a
                href="https://www.facebook.com/silverspoonbakery99"
                style={{ color: 'black' }}
              >
                <FacebookIcon fontSize="large" color="inherit" />
              </a>
            </Grid>
            <Grid item xs style={{ textAlign: 'left' }}>
              <a
                href="https://www.instagram.com/silverspoon_bakers_cafe"
                style={{ color: 'black' }}
              >
                <InstagramIcon fontSize="large" color="inherit" />
              </a>
            </Grid>

            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <small>
                © {new Date().getFullYear()} Silver Spoon Bakers & Cafe.
              </small>
            </Grid>
          </Grid>
        </List>
      </Drawer>
    </div>
  );
}

export default MobileDrawer;
