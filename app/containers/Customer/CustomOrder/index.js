import React, { useState, useLayoutEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {
  FormControlLabel,
  FormControl,
  Backdrop,
  ListItemIcon,
  Paper,
  TextareaAutosize,
  Divider,
  FormGroup,
  MenuItem,
  Chip,
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import request, { requestCustomer } from '../../../utils/request';
import { urls } from '../../../config/urls';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import { CircularProgress } from '@material-ui/core';
import Files from 'react-butterfiles';
import imageCompression from 'browser-image-compression';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ReactPlayer from 'react-player';

import history from '../../../utils/history';
import { FileConfig } from '../../../config/fileconfig.js';
import { CustomOrderSchema } from '../../../config/validationSchemas';
import { browserRedirect, formatDate } from '../../../helpers/helpers';
import { makeSelectError } from '../../Admin/Products/selectors';
import {
  AddPhotoAlternateOutlined,
  BookmarksOutlined,
  CakeOutlined,
  CheckCircle,
  DateRangeOutlined,
  Description,
  Error,
  Home,
  HomeOutlined,
  HomeRounded,
  LineWeightOutlined,
  ListAlt,
  NotesOutlined,
  PhoneCallbackOutlined,
  PlusOneOutlined,
  RoomOutlined,
  StarBorderOutlined,
  StorefrontOutlined,
  StorefrontTwoTone,
} from '@material-ui/icons';

const removeicon = require('../../../images/remove_black.svg');

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  image: {
    // backgroundImage: 'url(https://source.unsplash.com/random)',
    // backgroundRepeat: 'no-repeat',
    height: '110vh',
    
  },
  container: {
    marginTop: theme.spacing(6),
    maxWidth: '100vw',
    // marginLeft: '-50px'
  },
  avatar: {
    // margin: theme.spacing(1),
    backgroundColor: 'black',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#ffbc2a',
    boxShadow: 'none',
    borderRadius: '0',
    padding: theme.spacing(3),
    fontWeight: "600"
  },
}));

export default function CustomOrder(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info');
  const [errormessage, setErrorMessage] = useState();
  const [loading, setloading] = useState(false);

  const [backdrop, setbackdrop] = React.useState(false);
  // const handleClose = () => {
  //   setOpen(false);
  // };
  const handleToggle = () => {
    setbackdrop(!open);
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const [mediaFile, setMediaFile] = useState([]);
  const [mediaError, setMediaError] = useState(null);
  const [isCake, setisCake] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [homeDelivery, sethomeDelivery] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const handleCustomOrder = async values => {
    try {
      console.log({ values });
      //setErrorMessage(null);
      if (mediaFile.length > 0) {
        setloading(true);
        console.log("here")
        const formData = new FormData();
        const payload = {
          occasion: values.occasion,
          image: mediaFile[0].name,
          expectedDeliveryDate: values.expectedDeliveryDate,
          pincode: values.pincode,
          weight: values.weight,
          isStorePickup: !homeDelivery,
          isCake: isCake,
          flavour: values.flavour,
          quantity: values.quantity,
          orderDetails: values.orderDetails,
        };
        if   (!homeDelivery)   {
          payload.store = values.store
          payload.address = null
        }   else   {
          payload.address = values.address
        }

        for (var key in payload) {
          formData.append(key, payload[key]);
        }
        formData.append('image', mediaFile[0].src.file);
        const timerId = setTimeout(() => {
          setMessage('Order failed. Please try again or contact us !');
          setSeverity('error');
          setOpen(true);
          setloading(false);
        }, 15000);

        const response = await requestCustomer(
          'POST',
          `${urls.CUSTOM_ORDER_URL}`,
         formData,
        );
        console.log({ formData });
        console.log({ response });

        if (response.status.toString() === '200') {
          setErrorMessage('');
          setMessage('Order Placed !');
          setSeverity('success');
          setOpen(true);
          setloading(false);
          setConfirm(true);
          // setTimeout(() => {
          //   history.push("/orderhistory")
          // }, 2500);
          clearTimeout(timerId);
          // browserRedirect('/');
        } else {
          setMessage('Order failed !');
          setSeverity('error');
          setOpen(true);
          setloading(false);
          setErrorMessage(err.response.data.message);
          setloading(false);
        }
      }else{
          setMessage('Please add a sample image');
          setErrorMessage('Please add a sample image')
          setSeverity('error');
          setOpen(true);
          setloading(false);
          setloading(false);
        // throw new Error('Please add a sample image');
      }
    
      
      setloading(false);
    } catch (err) {
      setloading(false);
      setMessage(err.message);
      setSeverity('error');
      setOpen(true);
      setErrorMessage(err.message ? err.message : err.response.data.message);
      console.log(err.message);
    }
  };

  async function handleMediaFile(file, options) {
      const { maxSizeMB, maxWidthOrHeight, useWebWorker } = options;

      console.log(
        'image file',
        file.map(file => {
          return file.src.file;
        }),
      );
      file.map(file => {
        mediaFile.push(file);
      });

      setMediaError([]);
    }

  function renderError(type) {
    switch (type) {
      case 'unsupportedFileType':
        return 'Invalid File Type';
      case 'maxSizeExceeded':
        return `Maximum File Size Exceeded, limit is ${
          FileConfig.upload_size_max
        }`;
    }
  }

  const handleMediaRemove = () => {
    setMediaFile([]);
  };

  const handleChange = () => {
    setisCake(!isCake)
  };

  const handleDeliveryLocation = () => {
    sethomeDelivery(!homeDelivery);
  };


  return (
    <>
      <Header />
      <Container>
        <Grid container className={classes.container}>
          <CssBaseline />
          {confirm ? (
            <Grid item xs={12}>
              <div className={classes.paper}>
                <div className="container-fluid text-center">
                  <Typography variant="h5">
                    Order submitted successfully{' '}
                    <CheckCircle style={{ color: 'green' }} />
                  </Typography>
                  <br />
                  <Typography variant="h6">
                    Thank you for placing order with us.
                  </Typography>
                  <br />
                  <Typography variant="subtitle1">
                    We will contact you shortly.
                  </Typography>
                  <br />
                  <Divider />
                  <br />
                  <Typography variant="subtitle2">
                    In case of any queries, you can reach out to us @{' '}
                    <a href="tel:6306 998 580">+91 6306 998 580</a>
                  </Typography>
                </div>
              </div>
              <div className="mt-3">
                <Button
                  onClick={() => browserRedirect('/')}
                  fullWidth
                  variant="contained"
                  style={{
                    backgroundColor: '#ffbc2a',
                    boxShadow: 'none',
                    borderRadius: '0',
                    padding: '0.5rem',
                  }}
                  startIcon={<Home />}
                >
                  <Typography>
                    <b> Go to homepage</b>
                  </Typography>
                </Button>
              </div>
            </Grid>
          ) : (
            <>
              <Grid item xs={12} sm={6}>
                <ReactPlayer
                  width="100%"
                  height="100%"
                  controls={true}
                  playing={true}
                  muted={true}
                  url="https://d3cdk6ze8xnmmd.cloudfront.net/custom_order.mp4"
                />
              </Grid>
              <Grid item xs={12} sm={1} />
              <Grid item xs={12} sm={5}>
                <div className={classes.paper}>
                  <div className="container-fluid text-center">
                    <div className="row-12">
                      <Typography component="h3" variant="h5">
                        <ListAlt /> Customized Order
                      </Typography>
                    </div>
                    <hr />
                    <Paper
                      className={classes.paper}
                      style={{
                        backgroundColor: '#0000',
                        border: '1px solid black',
                      }}
                    >
                      <Typography align="justify" variant="subtitle2">
                        <li>Order a customized cake for any occassion</li>
                        <li>Gift hampers and desert options available</li>
                        <li>Themed flower bouquets available</li>
                      </Typography>
                      <br />
                      <small>
                        <PhoneCallbackOutlined /> Share your details below and
                        our team will connect with you{' '}
                      </small>
                    </Paper>
                    <br />
                    <hr />
                  </div>
                  <Formik
                    initialValues={{
                      name: 'test',
                      occasion: 'test',
                      image: [],
                      expectedDeliveryDate: new Date(),
                      address: 'test',
                      pincode: '656565',
                      weight: '5',
                      isCake: false,
                      quantity: '5',
                      flavour: 'test',
                      orderDetails: 'test',
                    }}
                    validationSchema={CustomOrderSchema}
                    onSubmit={values => {
                      return handleCustomOrder(values);
                    }}
                  >
                    {formik => (
                      <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <div className="error-message">
                              {errormessage ? (
                                <div
                                  className="text-center my-3"
                                >
                                  <Chip
                                    style={{ color: 'red' }}
                                    variant="outlined"
                                    label={`${errormessage}`}
                                    icon={<Error style={{ color: 'red' }} />}
                                  />
                                </div>
                              ) : null}
                            </div>
                          </Grid>
                          <Grid item xs={12}>
                            <FormGroup row>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={homeDelivery}
                                    onChange={handleDeliveryLocation}
                                    icon={<HomeOutlined />}
                                    checkedIcon={
                                      <HomeRounded color="primary" />
                                    }
                                    name="homedelivery"
                                  />
                                }
                                label="Home Delivery"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={!homeDelivery}
                                    onChange={handleDeliveryLocation}
                                    icon={<StorefrontOutlined />}
                                    checkedIcon={
                                      <StorefrontTwoTone color="primary" />
                                    }
                                    name="storepickup"
                                  />
                                }
                                label="Pick up at store"
                              />
                            </FormGroup>
                          </Grid>

                          <Grid item xs={12} sm={12}>
                            <TextField
                              name="occasion"
                              id="occasion"
                              variant="outlined"
                              value={formik.values.occasion}
                              onChange={formik.handleChange}
                              error={
                                formik.touched.occasion &&
                                Boolean(formik.errors.occasion)
                              }
                              helperText={
                                formik.touched.occasion &&
                                formik.errors.occasion
                              }
                              InputProps={{
                                endAdornment: <CakeOutlined />,
                              }}
                              label="Occasion"
                              required
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              variant="outlined"
                              required
                              fullWidth
                              type="fraction"
                              id="weight"
                              label="Weight (in kg)"
                              name="weight"
                              value={formik.values.weight}
                              onChange={formik.handleChange}
                              error={
                                formik.touched.weight &&
                                Boolean(formik.errors.weight)
                              }
                              InputProps={{
                                endAdornment: <LineWeightOutlined />,
                              }}
                              helperText={
                                formik.touched.weight && formik.errors.weight
                              }
                            />
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <TextField
                              variant="outlined"
                              required
                              fullWidth
                              type="number"
                              id="quantity"
                              label="Quantity"
                              name="quantity"
                              value={formik.values.quantity}
                              onChange={formik.handleChange}
                              error={
                                formik.touched.quantity &&
                                Boolean(formik.errors.quantity)
                              }
                              InputProps={{
                                endAdornment: <PlusOneOutlined />,
                              }}
                              helperText={
                                formik.touched.quantity &&
                                formik.errors.quantity
                              }
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              variant="outlined"
                              required
                              fullWidth
                              type="number"
                              id="pincode"
                              label="Pincode"
                              name="pincode"
                              value={formik.values.pincode}
                              onChange={formik.handleChange}
                              error={
                                formik.touched.pincode &&
                                Boolean(formik.errors.pincode)
                              }
                              InputProps={{
                                endAdornment: <RoomOutlined />,
                              }}
                              helperText={
                                formik.touched.pincode &&
                                formik.errors.pincode
                              }
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              id="store"
                              disabled={homeDelivery}
                              select
                              fullWidth
                              name="store"
                              label="Pickup location"
                              value={homeDelivery ? "": formik.values.store}
                              onChange={formik.handleChange}
                              helperText="Select store location for pickup"
                            >
                              <MenuItem key={1} value="STORE_1">
                                Store 1: 267, Aishbagh Road, Opp- Bank of
                                India Lucknow
                              </MenuItem>
                              <MenuItem key={2} value="STORE_2">
                                Store 2: 82, Guru Gobind Singh Marg, Near
                                Hussainganj Metro station Gate 2
                              </MenuItem>
                            </TextField>
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <TextField
                              name="address"
                              id="address"
                              multiline
                              row={3}
                              rowsMax={8}
                              disabled={!homeDelivery}
                              variant="outlined"
                              value={!homeDelivery ? "" : formik.values.address}
                              onChange={formik.handleChange}
                              error={
                                formik.touched.address &&
                                Boolean(formik.errors.address)
                              }
                              helperText={
                                formik.touched.address &&
                                formik.errors.address
                              }
                              InputProps={{
                                endAdornment: <HomeOutlined />,
                              }}
                              label="Address"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <TextField
                              name="orderDetails"
                              id="orderDetails"
                              multiline
                              rows={2}
                              rowsMax={200}
                              variant="outlined"
                              value={formik.values.orderDetails}
                              onChange={formik.handleChange}
                              error={
                                formik.touched.orderDetails &&
                                Boolean(formik.errors.orderDetails)
                              }
                              helperText={
                                formik.touched.orderDetails &&
                                formik.errors.orderDetails
                              }
                              InputProps={{
                                endAdornment: <NotesOutlined />,
                              }}
                              label="Please describe your requirements here"
                              required
                              fullWidth
                            />
                          </Grid>

                          <Grid
                            item
                            xs={12}
                            sm={4}
                            style={{ paddingLeft: '1rem' }}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={isCake}
                                  onChange={handleChange}
                                  name="isCake"
                                  color="primary"
                                />
                              }
                              label="Cake"
                            />
                          </Grid>
                          <Grid item xs={12} sm={8}>
                            <TextField
                              name="flavour"
                              id="flavour"
                              variant="outlined"
                              value={formik.values.flavour}
                              onChange={formik.handleChange}
                              error={
                                formik.touched.flavour &&
                                Boolean(formik.errors.flavour)
                              }
                              helperText={
                                formik.touched.flavour &&
                                formik.errors.flavour
                              }
                              InputProps={{
                                endAdornment: <StarBorderOutlined />,
                              }}
                              label="Enter flavour"
                              required
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <DatePicker
                                disablePast
                                name="expectedDeliveryDate"
                                id="expectedDeliveryDate"
                                margin="normal"
                                value={formik.values.expectedDeliveryDate}
                                onChange={e => {
                                  console.log(e);
                                  return formik.setFieldValue(
                                    'expectedDeliveryDate',
                                    e,
                                  ); // Access it from props
                                }}
                                InputProps={{
                                  endAdornment: <DateRangeOutlined />,
                                }}
                                helperText="When do you want this delivered?"
                              />
                            </MuiPickersUtilsProvider>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            style={{
                              marginBottom: '20px',
                              position: 'relative',
                            }}
                          >
                            <Files
                              required
                              multiple
                              convertToBase64
                              maxSize={FileConfig.upload_size_max}
                              accept={FileConfig.file_type}
                              onSuccess={file =>
                                handleMediaFile(file, {
                                  maxSizeMB: 1,
                                  maxWidthOrHeight: 1280,
                                  useWebWorker: true,
                                })
                              }
                              onError={errors => setMediaError(errors)}
                            >
                              {({ browseFiles }) => (
                                <>
                                  <div className="container-fluid">
                                    <div className="row">
                                      {mediaFile.length > 0 ? (
                                        mediaFile.map((file, index) => {
                                          return (
                                            <div className="col-md-3">
                                              <img
                                                key={index}
                                                src={file.src.base64}
                                                style={{
                                                  width: '100px',
                                                  height: '100px',
                                                }}
                                              />
                                              <br />
                                              <img
                                                src={removeicon}
                                                onClick={handleMediaRemove}
                                                className="remove-media-icon"
                                              />
                                            </div>
                                          );
                                        })
                                      ) : (
                                        <div onClick={browseFiles} required>
                                          <span
                                            required
                                            style={{
                                              cursor: 'pointer',
                                              color: '#09799C',
                                            }}
                                          >
                                            <AddPhotoAlternateOutlined /> Add
                                            Image (<i> for reference only </i>
                                            )
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {mediaError &&
                                    Object.keys(mediaError).length > 0 &&
                                    mediaError.map(error => (
                                      <li
                                        key={error.id}
                                        style={{
                                          fontSize: '14px',
                                          color: 'red',
                                        }}
                                      >
                                        {renderError(error.type)}
                                      </li>
                                    ))}
                                </>
                              )}
                            </Files>
                          </Grid>
                          <Grid container row>
                            <Grid item xs={8} className="text-left">
                              <div>
                                <Checkbox
                                  required
                                  id="terms"
                                  color="primary"
                                />
                                <label for="terms">
                                  <Typography
                                    className="pl-3"
                                    variant="subtitle2"
                                  >
                                    I accept the terms and conditions.
                                  </Typography>
                                </label>
                              </div>
                            </Grid>
                            <Grid item xs={4} className="text-center py-2">
                              <Link
                                onClick={() => {
                                  return browserRedirect('/terms');
                                }}
                                style={{ textDecoration: 'none' }}
                              >
                                <Description /> (Click to view)
                              </Link>
                            </Grid>
                          </Grid>
                        </Grid>
                        {loading ? (
                          <CircularProgress className="spinner" />
                        ) : (
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            style={{
                              backgroundColor: '#ffbc2a',
                              boxShadow: 'none',
                              borderRadius: '0',
                              padding: '0.5rem',
                            }}
                            className={classes.submit}
                            startIcon={<BookmarksOutlined />}
                          >
                            <Typography>
                              <b> Submit order</b>
                            </Typography>
                          </Button>
                        )}
                      </form>
                    )}
                  </Formik>
                </div>
              </Grid>
            </>
          )}
        </Grid>
      </Container>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>

      <Backdrop className={classes.backdrop} open={backdrop}>
        <div className="container-fluid text-center">
          <div>
            <CircularProgress color="inherit" />
          </div>
          <br />
          <div>
            Order placed successfully.
            <br />
            <br /> Redirecting you to order history page
          </div>
        </div>
      </Backdrop>
      <Footer />
    </>
  );
}
