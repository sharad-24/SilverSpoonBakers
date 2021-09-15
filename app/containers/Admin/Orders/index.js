import React, { useState, useEffect, memo, useRef } from 'react';
import RefreshIcon from '@material-ui/icons/Refresh';
import PageTitle from '../../../components/PageTitle'
import request from '../../../utils/request';
import { urls } from '../../../config/urls.js';
import OrderList from './orderList'
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import {
  Grid,
  Button,
  TextField,
  Typography,
} from '@material-ui/core';

import AdminSidebar from '../../../components/AdminSideBar';
import TopBar from '../../../components/TopBar/TopBar';
import './admin-order.css';
import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "20%",
    marginTop: "5%",
    display: 'flex',
    alignItems: 'center',
    alignContent: "space-around",
    width: "60%"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
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
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export function AdminOrders() {

  const [Orders, setOrders] = useState({});
  const [search, setsearch] = useState({term: ""})
  const classes = useStyles();
  const [orderType, setordertype] = useState('All');
  
    const fetchOrders = async () => {
      try {
            // const header = 0;
            const response = await request(
              'GET',
              urls.ADMIN_ORDER_URL,
            );
            setOrders({ orderlist: response.data.data });
            //console.log('Orders: ', response.data.data);
          } catch (err) {
        console.log('Error', err && err.response.data.message);
      }
    };

    const getUpcomingOrders= async()=>{
      try {
        setordertype('Upcoming');
        const response = await request(
          'GET',
          `${urls.ADMIN_ORDER_URL}?status=placed`,
        );
        //console.log(response.data.data);
        setOrders({ orderlist: response.data.data });
      } catch (error) {
        console.log('error in fetching order list');
      }
    }
    const getDeliveredOrders= async ()=>{
      try {
        setordertype('Delivered');
        const response = await request(
          'GET',
          `${urls.ADMIN_ORDER_URL}?status=delivered`,
        );
        setOrders({orderlist : response.data.data});
      } catch (error) {
        console.log('error in fetching order list');
      }
    }
  
    const getCancelledOrders= async()=>{
      try {
        setordertype('Cancelled');
        const response = await request(
          'GET',
          `${urls.ADMIN_ORDER_URL}?status=cancelled`,
        );
        setOrders({ orderlist: response.data.data });
      } catch (error) {
        console.log('error in fetching cancelled order list');
      }
    }
  
    const getPaymentPendingOrders= async()=>{
      try {
        setordertype('Payment pending (customer yet to make payment)');
        const response = await request(
          'GET',
          `${urls.ADMIN_ORDER_URL}?status=payment_pending`,
        );
        setOrders({ orderlist: response.data.data });
      } catch (error) {
        console.log('error in fetching cancelled order list');
      }
    }

    const handleChange =async (event)=>{
        setsearch({term : event.target.value})
    }
    const handleSearch=async ()=>{
      try{
        const response = await request('GET', `${urls.ADMIN_ORDER_URL}?orderNumber=${search.term}`);
        setOrders({orderlist : response.data.data});
        setsearch({term : ""})
      }catch(error){
        console.log('error in fetching search');
      }
    }

  useEffect(() => {
    fetchOrders();
  }, []);


  return (
    <Grid container>
      <Grid item xs={12} style={{ marginBottom: '60px' }}>
        <TopBar />
      </Grid>
      <Grid item xs={2}>
        <AdminSidebar />
      </Grid>
      <Grid item xs={10}>
        <br />
        <div>
          <PageTitle name="Orders" />
          <div className="text-center">
            <small>
              <i>
                Total orders :{' '}
                {Orders
                  ? Orders.orderlist
                    ? Orders.orderlist.length
                    : 'fetching...'
                  : 'fetching'}
              </i>
            </small>
          </div>
          <div style={{ padding: '0% 2%' }}>
            <div style={{ textAlign: 'right' }}>
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: '10px' }}
              >
                <RefreshIcon onClick={fetchOrders} />
              </Button>
            </div>
          </div>
        </div>
        <Grid container justifyContent xs={12} sm={12}>
          <Grid item xs={12}>
          <Paper component="form" className={classes.root}>
            <IconButton className={classes.iconButton} aria-label="menu">
              <FastfoodIcon />
            </IconButton>
            <InputBase
              className={classes.input}
              placeholder="Enter order number to search"
              inputProps={{ 'aria-label': 'search orders' }}
            />
            <TextField
              type="number"
              size="small"
              fullWidth
              placeholder="Enter order number to search"
              onChange={handleChange}
              value={search.term}
            />
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton
              color="primary"
              onClick={handleSearch}
              className={classes.iconButton}
            >
              
              <SearchIcon />
            </IconButton>
          </Paper>
          </Grid>
          
          <Grid item xs={12} className="text-center my-1">
            <Typography variant="caption"><i>(Click on the <SearchIcon/>icon to begin search)</i></Typography>
            </Grid>
        </Grid>
        
        
        <>
          {Orders ? (
            <OrderList
              orderType={orderType}
              orders={Orders.orderlist}
              getCancelledOrders={getCancelledOrders}
              getDeliveredOrders={getDeliveredOrders}
              getPaymentPendingOrders={getPaymentPendingOrders}
              getUpcomingOrders={getUpcomingOrders}
            />
          ) : (
            ''
          )}
        </>
      </Grid>
    </Grid>
  );
}


export default AdminOrders