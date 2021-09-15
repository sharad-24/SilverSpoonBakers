import React, { useState, useEffect, useLayoutEffect } from 'react';
import Button from '@material-ui/core/Button';

import Link from '@material-ui/core/Link';
import {
  Snackbar,
  Paper,
  Breadcrumbs,
} from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import InfoIcon from '@material-ui/icons/Info';
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import MuiAlert from '@material-ui/lab/Alert';
import { urls, image_url } from '../../../config/urls';
import { requestCustomer } from '../../../utils/request';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import { browserRedirect, formatDate, formatCurrency } from '../../../helpers/helpers';
import OrderDetails from './orderDetails';
import {  Payment } from '@material-ui/icons';
import AmountDetails from './Details/amountDetails';
import OrderStatusDetails from './Details/orderStatusDetails';
import PaymentDetails from './Details/paymentDetails';
import CancellationDetails from './Details/cancellationDetails';
import DeliveryDetails from './Details/deliveryDetails';
import fetchUserDataFromCookie from '../../../utils/fetchUserDataFromCookie';

const GKEY =
process.env.REACT_APP_NODE_ENV === 'production'
? process.env.RAZORPAY_PROD_KEY
: process.env.RAZORPAY_DEV_KEY;

function Alert(props) {
  //console.log('snackbar');
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: "black",
    fontWeight : "bold",
    paddingLeft: "10%"
  },
  secondaryText: {
    fontSize: theme.typography.pxToRem(15),
    color: "black",
  },
  rootC: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: "100%",
      height: "100%",
    },
  },
}));

function loadScript(src) {
  return new Promise(resolve => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}


export default function Order(routerProps) {
  const classes = useStyles();
  const [snackbar, setsnackbar] = React.useState(false);
  const [severity, setseverity] = useState('');
  const [message, setMessage] = useState('');
  const [orderDetails, setorderDetails] = useState('');
  let [options, setOptions] = useState({});
  const [paynowbutton, setpaynowbutton] = useState(false)
  const [open, setOpen] = React.useState(false);

  
 
  
  
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

 

  const fetchPaymentStatus = response => {
   // console.log(response);
    handleToggle()
    return setTimeout(() => {
      handleClose()
      browserRedirect(`/order/${routerProps.location.search}`)
    }, 2000);
  };

  
  async function displayRazorpay() {
    try{
         setpaynowbutton(true)
         const res = await loadScript(
           'https://checkout.razorpay.com/v1/checkout.js',
         );
         if (!res) {
           alert('Razorpay SDK failed to load.');
           return;
         }

         var paymentObject = new window.Razorpay(options);
         paymentObject.open();

         paymentObject.on('payment.captured', function(response) {
            browserRedirect(
              `/order/${
                routerProps
                  .location
                  .search
              }`,
            );
          });
         paymentObject.on('payment.failed', function(response) {
           console.log(response.error.code);
           console.log(response.error.description);
           console.log(response.error.source);
           console.log(response.error.step);
           console.log(response.error.reason);
           console.log(response.error.metadata.order_id);
           console.log(response.error.metadata.payment_id);
         });
       }catch(error){
      console.log(error)
    }
  }

  async function fetchOrder() {
    //console.log('reponsesdv: ', routerProps);
    const response = await requestCustomer(
      'GET',
      `${urls.ORDER_URL}${routerProps.location.search}`,
    );
    setorderDetails(response.data.data[0]);
    setOptions(
      {
        key: GKEY, // Enter the Key ID generated from the Dashboard
        amount: response.data.data[0].paymentDetails.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: 'INR',
        name: 'Silverspoon Bakers',
        description: 'Complete the payment to place the order.',
        image: `${image_url}logo.png`,
        order_id: response.data.data[0].paymentDetails.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: response => {
          return fetchPaymentStatus(response);
        },
        prefill: {
          name: response.data.data[0].customerName,
          email: '',
          contact: response.data.data[0].customerMobile,
        },
        notes: {
          address: 'Lucknow, UP',
        },
        theme: {
          color: '#ffbc2a',
        },
    })
    ;
  }

   const handleSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setsnackbar(false)
  };


  if (!routerProps.location.search) {
    browserRedirect('/');
    };

    useEffect(() => {
      fetchOrder();
     
    }, []);

    try{

    
    return (
      <>
        <Header />
        <div className="container">
          <div className="col container-fluid">
            <div className="row">
              <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="/">
                  Home
                </Link>
                <h> {fetchUserDataFromCookie().firstName}</h>
                <Link color="inherit" href="/orderhistory">
                  Orders
                </Link>
                <Typography color="textPrimary">
                  {orderDetails ? orderDetails.orderNumber : null}
                </Typography>
              </Breadcrumbs>
            </div>
            <div className="row-md-12 row-sm-12 text-center my-4">
              <h4>
                <b>
                  Order # {' '}
                  {orderDetails
                    ? orderDetails.orderNumber
                    : null}
                </b>
              </h4>
              <small>
                <i>(provide us this number for reference)</i>
              </small>
            </div>

            <div className="row-md-12 row-sm-12 conatiner">
              <div className="row my-3">
                <div>
                  <AmountDetails orderDetails={orderDetails}/>
                  <OrderStatusDetails  orderDetails={orderDetails}/>
                  <PaymentDetails orderDetails={orderDetails}/>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-sm-12 text-center mt-5 mb-3">
              {orderDetails ? (
                orderDetails.status == 'cancelled' ? (
                  <div>
                    <Button
                      size="large"
                      fullWidth
                      disabled="true"
                      variant="contained"
                      startIcon={<InfoIcon />}
                      style={{
                        backgroundColor: 'red',
                        color: 'white',
                        boxShadow: 'none',
                        borderRadius: '0',
                      }}
                    >
                      Order is cancelled
                    </Button>
                    <div>
                      <CancellationDetails orderDetails={orderDetails}/>
                    </div>
                  </div>
                ) : orderDetails.paymentDetails.status == 'captured' ? (
                  <div>
                    <Button
                      size="large"
                      fullWidth
                      disabled="true"
                      variant="contained"
                      startIcon={<CheckCircleIcon />}
                      style={{
                        backgroundColor: '#ffbc2a',
                        color: 'black',
                        boxShadow: 'none',
                        borderRadius: '0',
                      }}
                    >
                      Payment Complete
                    </Button>
                  </div>
                ) : (
                  <>
                    {paynowbutton ? (
                      <>
                        <Button
                          size="large"
                          disabled
                          variant="contained"
                          style={{
                            backgroundColor: '#1fbf1d',
                            color: 'white',
                            boxShadow: 'none',
                            borderRadius: '0',
                          }}
                          onClick={displayRazorpay}
                        >
                          <InfoIcon />
                          Payment Initiated.
                          <br />
                          Please refresh this page to get the status.
                        </Button>
                      </>
                    ) : (
                      <Button
                        size="large"
                        variant="contained"
                        style={{
                          backgroundColor: '#1fbf1d',
                          color: 'white',
                          boxShadow: 'none',
                          borderRadius: '0',
                        }}
                        startIcon={<Payment />}
                        onClick={displayRazorpay}
                      >
                        <Typography>Pay Now</Typography>
                      </Button>
                    )}
                  </>
                )
              ) : null}
            </div>
            <div className="col-md-12 col-sm-12 text-center mt-5 mb-3">
              <h4>Delivery details</h4>
              <small>
                <i>(please ensure the details are correct)</i>
              </small>
            </div>
            <div className="col-md-12 col-sm-12">
              <DeliveryDetails orderDetails={orderDetails}/>
            </div>
            <div className="col-md-12 col-sm-12 text-center mt-4 mb-2">
              <h4>Product list</h4>
              <small>
                <i>(list of items in this order)</i>
              </small>
            </div>
            <div className="col-md-12 col-sm-12">
              <h6>
                {orderDetails
                  ? orderDetails.products
                    ? orderDetails.products.map((product, index) => {
                        return (
                          <OrderDetails
                            key={index}
                            index={index}
                            product={product}
                          />
                        );
                      })
                    : null
                  : null}
              </h6>
            </div>
          </div>
        </div>
    
        <Backdrop
          className={classes.backdrop}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Footer />
      </>
    );

  }catch(error){
    console.log(error)
    setMessage(error.message);
    setseverity('alert');
    setsnackbar(true);
  }
  
  <Snackbar
        open={snackbar}
        autoHideDuration={1500}
        onClose={handleSnackBar}
      >
        <Alert onClose={handleSnackBar} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
}
