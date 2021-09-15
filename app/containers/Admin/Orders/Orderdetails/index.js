import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import history from '../../../../utils/history'
import Grid from '@material-ui/core/Grid';
import {
  Chip,
  Paper,
  TextField,
} from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import InfoIcon from '@material-ui/icons/Info';
import ErrorIcon from '@material-ui/icons/Error';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RefreshIcon from '@material-ui/icons/Refresh';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import MuiAlert from '@material-ui/lab/Alert';
import { urls, image_url } from '../../../../config/urls';
import  request, { requestCustomer } from '../../../../utils/request';
import {
  browserRedirect,
  formatDate,
  formatCurrency,
} from '../../../../helpers/helpers';
import OrderDetails from './orderdetails';

import {  Cookies } from 'react-cookie';

import PageTitle from '../../../../components/PageTitle';
import TopBar from '../../../../components/TopBar/TopBar';
import AdminSidebar from '../../../../components/AdminSideBar';
import displayStatus from '../../../../utils/displayStatus';
import { ArrowBackIosOutlined, InfoOutlined } from '@material-ui/icons';
import {displayTimeFromSlot} from '../../../../utils/displaySlots'

const GKEY =
  process.env.REACT_APP_NODE_ENV === 'production'
    ? process.env.RAZORPAY_PROD_KEY
    : process.env.RAZORPAY_DEV_KEY;

function Alert(props) {
 // console.log('snackbar');
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '80%',
  },
  paper:{
    display: "flex",
    width: "95%",
    marginTop : theme.spacing(2),
    paddingTop : theme.spacing(4),
    paddingBottom: theme.spacing(4),
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
  FormControl: {
    width: "100%"
  },
}));


export default function Order(routerProps) {
  const classes = useStyles();
  const [orderDetails, setorderDetails] = useState('');
  const [expanded, setExpanded] = React.useState(false);
  let [refundAmount, setRefundAmount] = useState(0);
  const [status, setstatus] = useState({ orderStatus: '' });
  const [newStatus, setnewStatus] = useState({ orderStatus: '' });
  const [loading, setloading] = useState(false)
  const [open, setOpen] = React.useState(false);
  const [cancelReason, setcancelReason] = useState(null);
const [errorMessage, seterrorMessage] = useState("")

  const handleClose = () => {
    setOpen(false);
  };
 
  const handleRefundAmountChange = (event) => {
    //console.log(event.target.value)
    setRefundAmount(event.target.value)
  }
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  async function fetchOrder() {
    setloading(true)
    const response = await request(
      'GET',
      `${urls.ADMIN_ORDER_URL}?orderNumber=${routerProps.match.params.ordernumber}`,
    );
    setorderDetails(response.data.data[0]);
    setstatus({orderStatus : response.data.data[0].status})
    setloading(false)
  }

  const handleStatusChange=(event)=>{
     // console.log(event.target.value)
      if (status.orderStatus == 'cancelled') {
        return;
      }
      setnewStatus({orderStatus : event.target.value})
  }
  const handleCancelReasonChange =(event)=>{
    setcancelReason(event.target.value)
  }

  const handleUpdateStatus = async () => {
    try {
      // setloading(true);
      seterrorMessage('');
      const staffName = localStorage.getItem('name');
      const currentDateAndTime = new Date();
      if(newStatus.orderStatus == "cancelled"){
        if(!cancelReason){
          throw new Error("Please provide a cancellation reason")
        }
      }
      const response = await request('PUT', urls.ADMIN_ORDER_URL, {
        id: orderDetails._id,
        status: newStatus.orderStatus,
        refundAmount: refundAmount,
        cancelledBy: staffName,
        cancelledAt: currentDateAndTime,
        cancelReason: cancelReason,
      });
      if (response.status.toString() == '200') {
        setloading(false);
        fetchOrder();
      } 
      setloading(false);
    } catch (error) {
      seterrorMessage(error.message ? error.message : error.response.data.message);
      // console.log("error: ", error.response.data.message)
    }
    setloading(false)
  }


  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <>
      <Grid container>
        <Grid item xs={12} style={{ marginBottom: '60px' }}>
          <TopBar />
        </Grid>
        <Grid item xs={2}>
          <AdminSidebar />
        </Grid>
        <Grid item xs={10}>
          <div>
            {/* <PageTitle name="Orders details" /> */}

            <div className="container">
              <div style={{ textAlign: 'left' }}>
                <Button
                  onClick={() => {
                    return history.goBack();
                  }}
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: '0', boxShadow: 'none' }}
                  startIcon={<ArrowBackIosOutlined />}
                >
                  View all orders
                </Button>
              </div>
              <div className="row-md-12 row-sm-12 text-center">
                <Typography variant="h4">
                  <b>
                    Order #{' '}
                    {orderDetails
                      ? orderDetails.orderNumber
                      : 'Fetching details...'}
                  </b>
                </Typography>
                <div className="mt-1">
                  <Chip label="Please ask this number from customer" />
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={fetchOrder}
                  style={{ borderRadius: '0', boxShadow: 'none' }}
                  startIcon={<RefreshIcon />}
                >
                  Refresh
                </Button>
              </div>
            </div>
          </div>
          {loading ? (
            <div className="loader">
              <CircularProgress style={{ color: '#09799C' }} />
            </div>
          ) : (
            <>
              <div className="container">
                <div className="col container-fluid">
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
                                <Typography
                                  className={classes.secondaryHeading}
                                >
                                  {orderDetails
                                    ? orderDetails.payableAmount.toLocaleString(
                                        'en-IN',
                                        {
                                          style: 'currency',
                                          currency: 'INR',
                                        },
                                      )
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
                                      ? formatCurrency(orderDetails.amount)
                                      : 'Fetching status...'}
                                  </h6>
                                </div>
                              </div>
                              <div className="row container-fluid">
                                <div className="col text-left">
                                  <h6>Delivery charge:</h6>
                                </div>
                                <div className="col text-right text-capitalize">
                                  <h6>
                                    {orderDetails
                                      ? formatCurrency(
                                          orderDetails.deliveryCharges,
                                        )
                                      : 'Fetching status...'}
                                  </h6>
                                </div>
                              </div>

                              <div className="row container-fluid">
                                <div className="col text-left">
                                  <h6>Discount :</h6>
                                </div>
                                <div className="col text-right">
                                  <h6>
                                    {orderDetails
                                      ? formatCurrency(orderDetails.discount)
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
                                <Typography
                                  className={classes.secondaryHeading}
                                >
                                  {orderDetails
                                    ? displayStatus(orderDetails.status)
                                    : null}
                                </Typography>
                              </div>
                            </div>
                          </AccordionSummary>
                          <AccordionDetails>
                            <div className="row container-fluid">
                              {orderDetails.status == 'cancelled' ? (
                                <>
                                  <div className="row container-fluid">
                                    <div className="col text-left">
                                      <h6>Cancelled by :</h6>
                                    </div>
                                    <div className="col text-right text-capitalize">
                                      <h6>
                                        {orderDetails
                                          ? orderDetails.cancelledBy
                                          : null}
                                      </h6>
                                    </div>
                                  </div>

                                  <div className="row container-fluid">
                                    <div className="col text-left">
                                      <h6>Cancelled At :</h6>
                                    </div>
                                    <div className="col text-right text-capitalize">
                                      <h6>
                                        {orderDetails
                                          ? <>{formatDate(orderDetails.cancelledAt)}</>
                                          : null}
                                      </h6>
                                    </div>
                                  </div>
                                  <div className="row container-fluid">
                                    <div className="col text-left">
                                      <h6>Cancellation Reason: </h6>
                                    </div>
                                    <div className="col text-right text-capitalize">
                                      <h6>
                                        {orderDetails
                                          ? orderDetails.cancelReason
                                          : null}
                                      </h6>
                                    </div>
                                  </div>
                                </>
                              ) : null}
                              <div className="row container-fluid">
                                <div className="col text-left">
                                  <h6>Ordered by :</h6>
                                </div>
                                <div className="col text-right text-capitalize">
                                  <h6>
                                    {orderDetails
                                      ? orderDetails.customer
                                        ? orderDetails.customer[0].name.toString()
                                        : ''
                                      : 'Fetching status...'}
                                  </h6>
                                </div>
                              </div>

                              <div className="row container-fluid">
                                <div className="col text-left">
                                  <h6>Ordererd on :</h6>
                                </div>
                                <div className="col text-right">
                                  <h6>
                                    {orderDetails
                                      ? formatDate(orderDetails.createdAt)
                                      : 'Fetching status...'}
                                  </h6>
                                </div>
                              </div>

                              <div className="row container-fluid">
                                <div className="col text-left">
                                  <h6>Delivery date :</h6>
                                </div>
                                <div className="col text-right text-capitalize">
                                  <h6>
                                    {orderDetails
                                      ? formatDate(orderDetails.deliveryDate)
                                      : 'Fetching status...'}
                                  </h6>
                                </div>
                              </div>
                              <div className="row container-fluid">
                                <div className="col text-left">
                                  <h6>Delivery slot :</h6>
                                </div>
                                <div className="col text-right text-capitalize">
                                  <h6>
                                    {orderDetails
                                      ? orderDetails.deliverySlot
                                        ? displayTimeFromSlot(
                                            orderDetails.deliverySlot.name,
                                          )
                                        : ''
                                      : ''}
                                  </h6>
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
                                <Typography
                                  className={classes.secondaryHeading}
                                >
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
                                  <h6>Total Amount :</h6>
                                </div>
                                <div className="col text-right text-capitalize">
                                  <h6>
                                    {orderDetails
                                      ? orderDetails.paymentDetails
                                        ? formatCurrency(
                                            Number(
                                              orderDetails.paymentDetails
                                                .amount,
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
                                      ? orderDetails.paymentDetails.receipt
                                      : 'Fetching status...'}
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 text-center mt-5">
                    <Typography variant="subtitle1">
                      Order status :{' '}
                    </Typography>
                    <Typography variant="caption">
                      (change order status from here)
                    </Typography>
                  </div>
                  <div>
                    {errorMessage ? (
                      <div className="text-center my-3">
                        <Chip
                          style={{ color: 'red' }}
                          variant="outlined"
                          label={`${errorMessage}`}
                          icon={<ErrorIcon style={{ color: 'red' }} />}
                        />
                      </div>
                    ) : null}
                  </div>
                  <div className="row text-center mt-1 mb-3">
                    <Paper elevation={2} className={classes.paper}>
                      <div className="col">
                        <TextField
                          variant="outlined"
                          label="Current Status"
                          value={`${status.orderStatus}`}
                        />
                      </div>
                      <div className="col">
                        <FormControl className={classes.FormControl}>
                          <InputLabel id="order-status">
                            New status
                          </InputLabel>
                          <Select
                            id="order-status"
                            disabled={
                              status.orderStatus == 'cancelled' ? true : false
                            }
                            // value={status.orderStatus}
                            onChange={value => {
                              return handleStatusChange(value);
                            }}
                            fullWidth
                          >
                            <MenuItem value="payment_pending">
                              <em>Payment Pending</em>
                            </MenuItem>
                            <MenuItem
                              value="placed"
                              style={{ backgroundColor: 'lightyellow' }}
                            >
                              Placed by customer
                            </MenuItem>
                            <MenuItem
                              value="accepted"
                              style={{ backgroundColor: 'lightgreen' }}
                            >
                              Accepted by store
                            </MenuItem>
                            <MenuItem
                              value="cancelled"
                              style={{ backgroundColor: 'orange' }}
                            >
                              Cancelled by store
                            </MenuItem>
                            <MenuItem
                              value="delivered"
                              style={{ backgroundColor: 'lightblue' }}
                            >
                              Delivered to customer
                            </MenuItem>
                          </Select>
                          <FormHelperText>(Click to select)</FormHelperText>
                        </FormControl>
                      </div>
                      {newStatus.orderStatus == 'cancelled' ? (
                        <div className="col">
                          <TextField
                            variant="outlined"
                            color="primary"
                            default="0"
                            label="Refund amount(₹)"
                            value={refundAmount}
                            onChange={handleRefundAmountChange}
                            helperText="Refund amount should be less than order amount "
                          />
                          <TextField
                            style={{ marginTop: '1em' }}
                            variant="outlined"
                            required
                            color="primary"
                            label="Cancellation Reason"
                            value={cancelReason}
                            onChange={handleCancelReasonChange}
                            helperText="Provide a reason for cancellation"
                          />
                        </div>
                      ) : null}
                      <div className="col">
                        {loading ? (
                          <div>
                            <CircularProgress />
                          </div>
                        ) : (
                          <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            style={{ borderRadius: '0', boxShadow: 'none' }}
                            startIcon={<InfoOutlined />}
                            onClick={handleUpdateStatus}
                          >
                            Update
                          </Button>
                        )}
                      </div>
                    </Paper>
                    <div className="text-center col-sm-12 my-3">
                      <Typography variant="subtitle2">
                        <InfoIcon /> Order status will update only after
                        "Update" button is pressed{' '}
                      </Typography>
                    </div>
                  </div>
                  <div className="col-md-12 col-sm-12 text-center mt-5 mb-3">
                    <Typography variant="h5">Delivery details</Typography>
                    <Typography variant="caption">
                      (please ensure the details are correct)
                    </Typography>
                  </div>
                  <div className="col-md-12 col-sm-12">
                    <div className={classes.rootC}>
                      <Paper elevation={0} className="p-3">
                        <div className="row">
                          <h6 className="col text-left">
                            <Typography className={classes.heading}>
                              Deliver to :
                            </Typography>
                          </h6>
                          <h6 className="col text-right">
                            <Typography className={classes.secondaryText}>
                              {orderDetails
                                ? orderDetails.customerName
                                : '...'}
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
                              {orderDetails
                                ? orderDetails.customerMobile
                                : '...'}
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
                                ? formatDate(orderDetails.deliveryDate)
                                : '...'}
                            </Typography>
                          </h6>
                        </div>
                        <div className="row">
                          <h6 className="col text-left">
                            <Typography className={classes.heading}>
                              Time slot:
                            </Typography>
                          </h6>
                          <h6 className="col text-right">
                            <Typography className={classes.secondaryText}>
                              {orderDetails
                                ? orderDetails.deliverySlot
                                  ? displayTimeFromSlot(
                                      orderDetails.deliverySlot.name,
                                    )
                                  : ''
                                : '...'}
                            </Typography>
                          </h6>
                        </div>
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
                                  ? orderDetails.address.addressLine1
                                  : null
                                : null}
                              <br />
                              {orderDetails
                                ? orderDetails.address
                                  ? orderDetails.address.addressLine2
                                  : null
                                : null}
                              <br />
                              {orderDetails
                                ? orderDetails.address
                                  ? orderDetails.address.area
                                  : null
                                : null}
                              <br />
                              {orderDetails
                                ? orderDetails.address
                                  ? orderDetails.address.city
                                  : null
                                : null}
                            </Typography>
                          </h6>
                        </div>
                      </Paper>
                    </div>
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
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
}
