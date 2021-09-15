import React, { useState, useEffect, useLayoutEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import Link from '@material-ui/core/Link';
import {
  Snackbar,
  Paper,
  IconButton,
  InputBase,
  Divider,
  Breadcrumbs,
  Checkbox,
} from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import InfoIcon from '@material-ui/icons/Info';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { CheckCircle } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import MuiAlert from '@material-ui/lab/Alert';
import { Tab, Tabs } from 'react-bootstrap';
import { urls, image_url } from '../../../config/urls';
import request, { requestCustomer } from '../../../utils/request';
import displayStatus from '../../../utils/displayStatus' 
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import {
  browserRedirect,
  formatDate,
  formatCurrency,
} from '../../../helpers/helpers';

import userData from '../../../utils/fetchUserDataFromCookie'


function Alert(props) {
  console.log('snackbar');
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '80%',
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
  rootA: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: 'black',
    fontWeight: 'bold',
    paddingLeft: '10%',
  },
  secondaryText: {
    fontSize: theme.typography.pxToRem(15),
    color: 'black',
  },
  rootC: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
      height: '100%',
    },
  },
  paper:{
    marginTop : theme.spacing(2),
    paddingTop : theme.spacing(4),
    paddingBottom: theme.spacing(4),
    backgroundColor: "lightgrey"
  },
  deliverydetails: {
    marginTop : theme.spacing(2),
    padding: theme.spacing(4),
    backgroundColor: "#00000"
  }
}));



export default function CustomOrderView(routerProps) {
  const classes = useStyles();
  const [snackbar, setsnackbar] = React.useState(false);
  const [severity, setseverity] = useState('');
  const [message, setMessage] = useState('');
  const [orderDetails, setorderDetails] = useState('');
  const [expanded, setExpanded] = React.useState(false);
  let [options, setOptions] = useState({});
  const [paynowbutton, setpaynowbutton] = useState(false);
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


  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  
  async function fetchOrder() {
    const response = await requestCustomer(
      'GET',
      `${urls.ORDER_URL}${
        routerProps.location.search
      }&isCustomOrder=true`,
    );
    setorderDetails(response.data.data[0]);
    
    //console.log('reponse: ', response.data.data[0]);
  }

  
  const displayStore = store => {
    switch (store) {
      case 'STORE_1':
        return <>
        Silverspoon Bakers & Cafe, <br/>
        267, Aishbagh Road,<br/>
        Opp- Bank of India,<br/>
        Lucknow, 226004 <br/>
        0522-4101530 <br/>
        +91-6306998580
        </>;
      case 'STORE_2':
        return <>
        Silverspoon Bakers & Cafe, <br/>
        82, Guru Gobind Singh Marg,
        <br/>
        Near Hussainganj Metro station,
        Gate 2,<br/> 
        Lucknow, 226001<br/>
        +91-7905213159</>;
      default:
        return 'INVALID_SLOT';
    }
  };

  
  const handleSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setsnackbar(false);
  };

  if (!routerProps.location.search) {
    browserRedirect('/');
  }

  useEffect(() => {
    fetchOrder();
  }, []);

 
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
                <Typography variant="subtitle1"> {userData().firstName}</Typography>
                <Link color="inherit" href="/customorderhistory">
                  Custom orders
                </Link>
                <Typography color="textPrimary">
                  {orderDetails
                    ? orderDetails.customOrderNumber
                    : 'Fetching details...'}
                </Typography>
              </Breadcrumbs>
            </div>
            <div className="row-md-12 row-sm-12 text-center my-4">
              <Typography variant="h5">
                <b>
                  Order id :{' '}
                  {orderDetails
                    ? orderDetails.customOrderNumber
                    : 'Fetching details...'}
                </b>
              </Typography>
              <small>
                <i>(provide us this number for reference)</i>
              </small>
            </div>

            <div className="row-md-12 row-sm-12 conatiner">
              <div className="row my-3">
                <div>
                  <Accordion
                    expanded={expanded === 'panel1'}
                    onChange={handleChange('panel1')}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <div className="row container-fluid">
                        <div className="col text-left">
                          <Typography className={classes.heading}>
                            Amount{' '}
                          </Typography>
                        </div>
                        <div className="col text-right text-capitalize">
                          <Typography className={classes.secondaryHeading}>
                            {orderDetails
                              ? formatCurrency(orderDetails.price)
                              : null}
                          </Typography>
                        </div>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="row container-fluid">
                        <div className="row container-fluid">
                          <div className="col text-left">
                            <h6>Product total :</h6>
                          </div>
                          <div className="col text-right text-capitalize">
                            <h6>
                              {orderDetails
                                ? formatCurrency(orderDetails.price)
                                : 'Fetching status...'}
                            </h6>
                          </div>
                        </div>

                        <div className="row container-fluid">
                          <div className="col text-left">
                            <h6>GST (18%) :</h6>
                          </div>
                          <div className="col text-right text-capitalize">
                            <h6>Included</h6>
                          </div>
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion
                    expanded={expanded === 'panel2'}
                    onChange={handleChange('panel2')}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2bh-content"
                      id="panel2bh-header"
                    >
                      <div className="row container-fluid">
                        <div className="col text-left">
                          <Typography className={classes.heading}>
                            Order status{' '}
                          </Typography>
                        </div>
                        <div className="col text-right text-capitalize">
                          <Typography className={classes.secondaryHeading}>
                            {orderDetails
                              ? displayStatus(orderDetails.status)
                              : null}
                          </Typography>
                        </div>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="row container-fluid">
                        <div className="row container-fluid">
                          <div className="col text-left">
                            <Typography variant="subtitle2">
                              Ordered by :
                            </Typography>
                          </div>
                          <div className="col text-right text-capitalize">
                            <Typography variant="subtitle2">
                              {orderDetails
                                ? orderDetails.customerName.toString()
                                : null}
                            </Typography>
                          </div>
                        </div>
                        <div className="row container-fluid">
                          <div className="col text-left">
                            <Typography variant="subtitle2">
                              Ordered by :
                            </Typography>
                          </div>
                          <div className="col text-right text-capitalize">
                            <Typography variant="subtitle2">
                              {orderDetails
                                ? orderDetails.customerEmail
                                : null}
                            </Typography>
                          </div>
                        </div>
                        <div className="row container-fluid">
                          <div className="col text-left">
                            <Typography variant="subtitle2">
                              Ordered by :
                            </Typography>
                          </div>
                          <div className="col text-right text-capitalize">
                            <Typography variant="subtitle2">
                              {orderDetails
                                ? orderDetails.customerMobile
                                : null}
                            </Typography>
                          </div>
                        </div>

                        <div className="row container-fluid">
                          <div className="col text-left">
                            <Typography variant="subtitle2">
                              Ordererd on :
                            </Typography>
                          </div>
                          <div className="col text-right">
                            <Typography variant="subtitle2">
                              {orderDetails
                                ? formatDate(orderDetails.createdAt)
                                : 'Fetching status...'}
                            </Typography>
                          </div>
                        </div>

                        <div className="row container-fluid">
                          <div className="col text-left">
                            <Typography variant="subtitle2">
                              Expected delivery date :
                            </Typography>
                          </div>
                          <div className="col text-right text-capitalize">
                            <Typography variant="subtitle2">
                              {orderDetails
                                ? formatDate(
                                    orderDetails.expectedDeliveryDate,
                                  )
                                : 'Fetching status...'}
                            </Typography>
                          </div>
                        </div>
                        <div className="row container-fluid">
                          <div className="col text-left">
                            <Typography variant="subtitle2">
                              Delivery slot :
                            </Typography>
                          </div>
                          <div className="col text-right text-capitalize">
                            <Typography variant="subtitle2">
                              {orderDetails
                                ? orderDetails.deliveryTime
                                : null}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === 'panel3'}
                    onChange={handleChange('panel3')}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel3bh-content"
                      id="panel3bh-header"
                    >
                      <div className="row container-fluid">
                        <div className="col text-left">
                          <Typography className={classes.heading}>
                            Payment status{' '}
                          </Typography>
                        </div>
                        <div className="col text-right text-capitalize">
                          <Typography className={classes.secondaryHeading}>
                            {orderDetails ? (
                              orderDetails.paymentDetails ? (
                                orderDetails.paymentDetails.status ==
                                'captured' ? (
                                  <Button
                                    size="small"
                                    variant="outlined"
                                    style={{
                                      backgroundColor: 'green',
                                      color: 'white',
                                      boxShadow: 'none',
                                      borderRadius: '0',
                                    }}
                                  >
                                    Paid
                                  </Button>
                                ) : (
                                  <>
                                    <Button
                                      size="small"
                                      variant="contained"
                                      style={{
                                        backgroundColor: '#ffbc2a',
                                        color: 'white',
                                        boxShadow: 'none',
                                        borderRadius: '0',
                                      }}
                                    >
                                      Pending
                                    </Button>
                                  </>
                                )
                              ) : null
                            ) : null}
                          </Typography>
                        </div>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="row container-fluid">
                        <div className="row container-fluid">
                          <div className="col text-left">
                            <h6>Amount :</h6>
                          </div>
                          <div className="col text-right text-capitalize">
                            <h6>
                              {orderDetails
                                ? orderDetails.paymentDetails
                                  ? formatCurrency(
                                      Number(
                                        orderDetails.paymentDetails.amount,
                                      ) / 100,
                                    )
                                  : null
                                : 'Fetching status...'}
                            </h6>
                          </div>
                        </div>

                        <div className="row container-fluid">
                          <div className="col text-left">
                            <h6>Amount due :</h6>
                          </div>
                          <div className="col text-right">
                            <h6>
                              {orderDetails
                                ? orderDetails.paymentDetails
                                  ? formatCurrency(
                                      Number(
                                        orderDetails.paymentDetails
                                          .amount_due,
                                      ) / 100,
                                    )
                                  : null
                                : 'Fetching status...'}
                            </h6>
                          </div>
                        </div>

                        <div className="row container-fluid">
                          <div className="col text-left">
                            <h6>Amount paid :</h6>
                          </div>
                          <div className="col text-right text-capitalize">
                            <h6>
                              {orderDetails
                                ? orderDetails.paymentDetails
                                  ? formatCurrency(
                                      Number(
                                        orderDetails.paymentDetails
                                          .amount_paid,
                                      ) / 100,
                                    )
                                  : null
                                : 'Fetching status...'}
                            </h6>
                          </div>
                        </div>
                        <div className="row container-fluid">
                          <div className="col text-left">
                            <h6>Receipt no :</h6>
                          </div>
                          <div className="col text-right text-capitalize">
                            <h6>
                              {orderDetails
                                ? orderDetails.paymentDetails
                                  ? orderDetails.paymentDetails.receipt
                                  : 'Fetching status...'
                                : null}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
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
                  </div>
                ) : orderDetails.paymentDetails ? (
                  orderDetails.status == 'placed' ? (
                    <div>
                      <Button
                        size="large"
                        fullWidth
                        disabled="true"
                        variant="contained"
                        startIcon={<CheckCircle />}
                        style={{
                          backgroundColor: '#1fbf1d',
                          color: 'white',
                          boxShadow: 'none',
                          borderRadius: '0',
                        }}
                      >
                        Payment Complete
                      </Button>
                    </div>
                  ) : null
                ) : (
                  <Button
                    size="large"
                    disabled={paynowbutton}
                    variant="contained"
                    style={{
                      backgroundColor: '#ffbc2a',
                      boxShadow: 'none',
                      borderRadius: '0',
                    }}
                    // onClick={displayRazorpay}
                  >
                    For payment please contact us
                  </Button>
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
              <div className={classes.rootC}>
                <Paper elevation={2} className={classes.deliverydetails}>
                  <div className="row">
                    <h6 className="col text-left">
                      <Typography className={classes.heading}>
                        Type:
                      </Typography>
                    </h6>
                    <h6 className="col text-right">
                      <Typography className={classes.secondaryText}>
                        {orderDetails
                          ? orderDetails.isStorePickup
                            ? 'Store Pickup'
                            : 'Home Delivery'
                          : null}
                      </Typography>
                    </h6>
                  </div>
                  <div className="row">
                    <h6 className="col text-left">
                      <Typography className={classes.heading}>
                        Deliver to :
                      </Typography>
                    </h6>
                    <h6 className="col text-right">
                      <Typography className={classes.secondaryText}>
                        {orderDetails ? orderDetails.customerName : '...'}
                      </Typography>
                    </h6>
                  </div>
                  <div className="row">
                    <h6 className="col text-left">
                      <Typography className={classes.heading}>
                        Contact :
                      </Typography>
                    </h6>
                    <h6 className="col text-right">
                      <Typography className={classes.secondaryText}>
                        {orderDetails ? orderDetails.customerMobile : '...'}
                      </Typography>
                    </h6>
                  </div>
                  <div className="row">
                    <h6 className="col text-left">
                      <Typography className={classes.heading}>
                        Date :
                      </Typography>
                    </h6>
                    <h6 className="col text-right">
                      <Typography className={classes.secondaryText}>
                        {orderDetails
                          ? formatDate(orderDetails.expectedDeliveryDate)
                          : null}
                      </Typography>
                    </h6>
                  </div>

                  {!orderDetails.isStorePickup ? (
                    <div className="row">
                      <h6 className="col text-left">
                        <Typography className={classes.heading}>
                          Address :
                        </Typography>
                      </h6>
                      <h6 className="col text-right">
                        <Typography className={classes.secondaryText}>
                          {orderDetails
                            ? orderDetails.address
                              ? orderDetails.address.trim()
                              : null
                            : null}
                          <br />
                        </Typography>
                      </h6>
                    </div>
                  ) : (
                    <div className="row">
                      <h6 className="col text-left">
                        <Typography className={classes.heading}>
                          Store Address :
                        </Typography>
                      </h6>
                      <h6 className="col text-right">
                        <Typography className={classes.secondaryText}>
                          {orderDetails
                            ? displayStore(orderDetails.store)
                            : null}
                          <br />
                        </Typography>
                      </h6>
                    </div>
                  )}
                </Paper>
              </div>
            </div>
            <div className="col-md-12 col-sm-12 text-center my-3">
              <Typography variant="h6">Order details</Typography>
              <Paper elevation={2} className={classes.paper}>
                <Typography variant="subtitle1">
                  {orderDetails.orderDetails}
                </Typography>{' '}
              </Paper>
            </div>
            <hr />
            <div className="col-md-12 col-sm-12 text-center my-3">
              <Typography variant="subtitle2">
                Image provided by you:{' '}
              </Typography>
              <img
                src={image_url + orderDetails.image}
                style={{
                  height: '20vh',
                  weight: '25wh',
                  marginTop: '1rem',
                }}
                alt={orderDetails.customOrderNumber || 'NA'}
              />
            </div>
          </div>
        </div>
        {/* <Button variant="outlined" color="primary" onClick={handleToggle}>
       
        </Button> */}
        <Backdrop
          className={classes.backdrop}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Footer />
        <Snackbar
          open={snackbar}
          autoHideDuration={1500}
          onClose={handleSnackBar}
        >
          <Alert onClose={handleSnackBar} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
        ;
      </>
    );

 
}
