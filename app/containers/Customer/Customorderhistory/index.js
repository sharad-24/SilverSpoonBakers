import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';

import {
  Tab,
  Divider,
  Container,
  Breadcrumbs,
  Typography,
} from '@material-ui/core';
import MoodIcon from '@material-ui/icons/Mood';
import Header from '../../../components/Header';

import Footer from '../../../components/Footer';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import { browserRedirect } from '../../../helpers/helpers';
import { requestCustomer } from '../../../utils/request';
import './index.css';

import OrderItem from './customorderItem';
import { urls } from '../../../config/urls';
import fetchUserDataFromCookie from '../../../utils/fetchUserDataFromCookie';

export default function CustomOrderHistory() {
 
  const [orders, setorders] = useState(null);
  
 

  
  const fetchOrders = async () => {
    try {
      const response = await requestCustomer(
        'GET',
        `${urls.ORDER_URL}?isCustomOrder=true`,
      );
      console.log(response.data.data);
      setorders(response.data.data);
    } catch (error) {
      console.log('error in fetching order list');
    }
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleOrderDetailNavigation = async () => {
    try {
      const response = await requestCustomer(
        'GET',
        `${urls.ORDER_URL}?isCustomOrder=true&id=${customOrderNumber}`,
          
      );
      console.log(response.data.data);
      
    } catch (error) {
      console.log('error in fetching order list');
    }
  }

  return (
    <>
      <Header />
      <Container>
        <div className="container">
          <div className="col">
            <div className="row my-1">
              <Breadcrumbs aria-label="breadcrumb">
                <Link style={{ color: 'black' }} href="/">
                  Home
                </Link>
                <h> {fetchUserDataFromCookie().name}</h>
                <Typography color="textPrimary">Custom orders</Typography>
              </Breadcrumbs>
            </div>
            <div className="row my-3">
              <h4>
                <b>Your Orders</b>
              </h4>
            </div>
            <div className="row my-3">
              <h6>
                Total orders :{' '}
                {orders ? (
                  <>
                    {orders.length} so far <MoodIcon />
                  </>
                ) : null}
              </h6>
            </div>
            <div className="row my-3">
              <Button
                variant="contained"
                color="primary"
                onClick={() => browserRedirect('/orderhistory')}
              >
                Go to orders
              </Button>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {orders ? (
              orders.length > 0 ? (
                orders.map((order, index) => {
                  return (
                    <div className="col-md-4 col-sm-12 my-3">
                      <Card
                        className="cardOrder"
                        style={{ borderRadius: '20px' }}
                      >
                        <OrderItem index={index} key={index} order={order} />
                      </Card>
                    </div>
                  );
                })
              ) : (
                <div className="row text-center text-muted">
                  No orders yet! <br />
                </div>
              )
            ) : (
              <div className="row text-center text-muted">
                Fetching Orders... <br />
              </div>
            )}
          </div>
        </div>
        <Divider />
        <div className="row" style={{ textAlign: 'center', padding: '5%' }}>
          <div className="col-md-6 col-sm-12 mt-3">
            <Button
              className="shadow-none rounded-0"
              fullwidth
              size="large"
              variant="contained"
              style={{ backgroundColor: '#d6d6d6' }}
              onClick={() => browserRedirect('/')}
            >
              <KeyboardArrowLeftIcon />
              <b>Continue Shopping</b>
            </Button>
          </div>
          <div className="col-md-6 col-sm-12 mt-3">
            <div>
              <Button
                className="shadow-none rounded-0"
                fullwidth
                size="large"
                variant="contained"
                style={{ backgroundColor: '#ffbc2a' }}
                onClick={() => browserRedirect('/contact')}
              >
                <b>Provide Feedback</b>
                <KeyboardArrowRightIcon />
              </Button>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}
