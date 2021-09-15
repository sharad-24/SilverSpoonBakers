import React, { useState, useEffect } from 'react';
import { NavDropdown, Nav } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import request from '../../utils/request';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { IconButton, Grid, Badge } from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';

import { useCookies, Cookies } from 'react-cookie';

import './index.css';
import { browserRedirect } from '../../helpers/helpers';
import { urls } from '../../config/urls';
import MobileDrawer from './mobileDrawer'
import DesktopDrawer from './desktopDrawer'

const logo = require('../../images/logo.svg');

const drawerWidth = 220;

const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  cartDrawer: {
    width: drawerWidth,
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

const yelow = "#ffbc2a"

function Header() {
   
  let cookie = new Cookies();
  
  const [open, setOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [show, setShow] = useState(false)
  const [showLoginDrop, setShowLoginDrop] = useState(false)
  const [name, setname] = useState('');
  const [categoryDataForProduct, setcategoryDataForProduct] = useState(null);
  const [cartCount, setcartCount] = useState(0)
  
  const [cookies, setCookie, removeCookie] = useCookies(['customertoken']);
  const checkLoginStatus = () => {
    setCookie({ customertoken: cookie.get('customertoken') || '' });
    setname(decodeURIComponent(cookie.get('name')).split(' ')[0] || '');
  };
  
  const toggleDrawer = event => {
    setOpen((open) => {return !open});
  };
  const toggleSearchDrawer = event => {
    setSearchOpen((searchOpen) => {return !searchOpen});
  };

  useEffect(() => {
    async function fetchDataForProduct() {
      const categoryUrl= "/category/";
      const response= await request('get',
        urls.ADMIN_CATEGORY_URL, {}, { header: 0 }
       )
       let categoryData2 = response.data.data.map((each) =>
       {
         each["url"] = (null);
         each["url"] = categoryUrl + each._id;
         return(each)
       }
       )
       setcategoryDataForProduct(categoryData2);
      }
      fetchDataForProduct();
    checkLoginStatus();
    fetchCartCounter()
  }, []);

  const fetchCartCounter=()=>{
    if(JSON.parse(localStorage.getItem('cart'))){
      setcartCount(JSON.parse(localStorage.getItem('cart')).length)
    }
  }
  const showDropdown = (e)=>{
      setShow(!show);
  }
  const hideDropdown = e => {
      setShow(false);
  }
  const showLoginDropdown = (e)=>{
    setShowLoginDrop(!show);
  }
  const hideLoginDropdown = e => {
    setShowLoginDrop(false);
  }
 

  const handleDrawerOpen = () => {
    setOpen(true);
  };


  const handleSearchDrawerOpen = () => {
    setSearchOpen(true);
  };

  const handleLogout = (event, callback) => {
    removeCookie('customertoken');
    removeCookie(
      'name',
    );
    removeCookie('mobile');
    cookie.remove(
      'customertoken',
    );
  };

  return (
    <div>
      <AppBar position="relative" color="default">
        {/* desktop header */}
        <div id="content-desktop">
          <CssBaseline />

          <Nav activeKey="1" fill justify>
            <Nav.Item style={{ marginTop: '2em' }}>
              <IconButton
                size="medium"
                onClick={handleSearchDrawerOpen}
                style={{ textDecoration: 'none', outline: 'none' }}
              >
                <MenuIcon style={{ color: 'black' }} fontSize="large" />
              </IconButton>
            </Nav.Item>

            <Nav.Item style={{ marginTop: '3em' }}>
              <Link eventKey="2" to="/">
                Home
              </Link>
            </Nav.Item>

            <NavDropdown
              title="Categories"
              id="nav-dropdown"
              show={show}
              onMouseEnter={showDropdown}
              onMouseLeave={hideDropdown}
            >
              {categoryDataForProduct
                ? categoryDataForProduct.map((card, index) => (
                    <NavDropdown.Item eventKey="4.1">
                      <Link to={card.url}>{card.name}</Link>
                    </NavDropdown.Item>
                  ))
                : 'No Products'}
            </NavDropdown>

            <Nav.Item>
              <Link to="/">
                <img src={logo} className="company-logo" />
              </Link>
            </Nav.Item>

            <Nav.Item style={{ marginTop: '3em' }}>
              <Link
                eventKey="2"
                to={{
                  pathname: '/customorder',
                  data: 'customorder',
                }}
              >
                Custom order
              </Link>
            </Nav.Item>

            {cookies ? (
              cookies.customertoken ? (
                <NavDropdown
                  title={name}
                  id="nav-dropdown"
                  show={showLoginDrop}
                  onMouseEnter={showLoginDropdown}
                  onMouseLeave={hideLoginDropdown}
                >
                  <NavDropdown.Item eventKey="2.1">
                    <Link to="/orderhistory">Your orders</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="2.2">
                    <Link to="/customorderhistory">Custom orders</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="2.3">
                    <Link
                      onClick={event => {
                        return handleLogout(event, browserRedirect('/'));
                      }}
                    >
                      Logout
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Item style={{ marginTop: '3em' }}>
                  <Link eventKey="2" to="/login">
                    Login
                  </Link>
                </Nav.Item>
              )
            ) : (
              <Nav.Item style={{ marginTop: '3em' }}>
                <Link eventKey="2" to="/login">
                  Login
                </Link>
              </Nav.Item>
            )}

            <Nav.Item style={{ marginTop: '2em' }}>
              <IconButton
                size="medium"
                onClick={() => browserRedirect('/cart')}
                style={{ textDecoration: 'none', outline: 'none' }}
              >
                <Badge color="primary" badgeContent={cartCount}>
                  <ShoppingCartIcon
                    style={{ color: 'black' }}
                    fontSize="large"
                  />
                </Badge>
              </IconButton>
            </Nav.Item>
          </Nav>
        </div>

        {/* mobile header */}
        <div className="mobileNav" id="content-mobile">
          <div style={{ padding: '2%' }}>
            <Grid container>
              <Grid
                item
                xs={4}
                style={{ margin: 'auto', fontWeight: 'bold' }}
                className="navbar-item-text"
              >
                <IconButton
                  size="medium"
                  onClick={handleDrawerOpen}
                  style={{ textDecoration: 'none', outline: 'none' }}
                >
                  <MenuIcon style={{ color: 'black' }} fontSize="large" />
                </IconButton>
              </Grid>
              <Grid item xs={4} style={{ margin: 'auto' }}>
                <Link to="/">
                  <img src={logo} className="company-logo" />
                </Link>
              </Grid>
              <Grid
                item
                xs={4}
                style={{ margin: 'auto', fontWeight: 'bold' }}
                className="navbar-item-text"
              >
                <IconButton
                  size="medium"
                  onClick={() => browserRedirect('/cart')}
                  style={{
                    textDecoration: 'none',
                    outline: 'none',
                    textAlign: 'center',
                  }}
                >
                  <Badge color="primary" badgeContent={cartCount}>
                    <ShoppingCartIcon
                      style={{ color: 'black' }}
                      fontSize="large"
                    />
                  </Badge>
                </IconButton>
              </Grid>
            </Grid>
          </div>
        </div>
        <MobileDrawer open={open} toggleDrawer={toggleDrawer} />
        <DesktopDrawer open={searchOpen} toggleDrawer={toggleSearchDrawer} />
        <div />
      </AppBar>
    </div>
  );
}

export default Header;
