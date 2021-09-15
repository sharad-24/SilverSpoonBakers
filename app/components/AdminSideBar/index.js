import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { browserRedirect, checkStaff, checkAdmin } from '../../helpers/helpers';
import { Avatar, Box, Divider, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import './admin-sidebar.css';
import { BarChart } from '@material-ui/icons';
const logo = require('../../images/logo.png');

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function AdminSidebar() {
  const location = window.location.pathname;
  const name = localStorage.getItem('name');
  const type = localStorage.getItem('type');

  const links = [
    {
      name: 'Profile',
      link: '/admin/profile',
      icon: <BarChart />,
      staffAccess: true,
    },
    {
      name: 'Orders',
      link: '/admin/orders',
      icon: <BarChart />,
      staffAccess: true,
    },
    {
      name: 'Custom Order',
      link: '/admin/customorder',
      icon: <BarChart />,
      staffAccess: true,
    },
    {
      name: 'Customers',
      link: '/admin/customer',
      icon: <BarChart />,
      staffAccess: false,
    },
    {
      name: 'Flavours',
      link: '/admin/flavours',
      icon: <BarChart />,
      staffAccess: true,
    },
    {
      name: 'Products',
      link: '/admin/products',
      icon: <BarChart />,
      staffAccess: true,
    },
    {
      name: 'Banner',
      link: '/admin/banner',
      icon: <BarChart />,
      staffAccess: true,
    },
    {
      name: 'Categories',
      link: '/admin/categories',
      icon: <BarChart />,
      staffAccess: true,
    },
    {
      name: 'Promo Code',
      link: '/admin/promoCode',
      icon: <BarChart />,
      staffAccess: false,
    },

    // {
    //   name: 'Reviews',
    //   link: '/admin/reviews',
    //   staffAccess: true,
    // },
    {
      name: 'Staff',
      link: '/admin/staff',
      staffAccess: false,
    },
  ];

  return (
    <>
      <div className="admin-sidebar-container">
        <Box
          paddingBottom="50px"
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            p={2}
          >
            <Avatar
              className="avatar-user"
              style={{
                height: '5rem',
                width: '5rem',
              }}
              src={logo}
            />
            <Typography color="textPrimary" variant="h7">
              <Link to ="/admin/profile" style={{color : 'black' , textDecoration: 'none'}}>
              <b>{name}</b>
              </Link>
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {type}
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
          <List>
          {links &&
            links.map((item, index) => {
              if (
                checkStaff() === item.staffAccess ||
                checkAdmin()
              ) {
                return (
                  <>
                  
                   <div
                    key={index}
                    className={
                      'admin-sidebar-link-container ' +
                      (location === item.link ? 'active' : null)
                    }
                  >
                    <Link
                      to={item.link}
                      className="admin-sidebar-link"
                      start
                    >
                      {item.name}
                    </Link>
                  </div>
                  </>
                );
              }
            })}
            </List>
            </Box>
            <Divider/>
          <h6 style={{marginTop: "60px", textAlign: "center"}} onClick={()=>browserRedirect('/')}>Visit Main Site</h6>
        </Box>
        
      </div>
    
    </>
  );
}

export default AdminSidebar;
