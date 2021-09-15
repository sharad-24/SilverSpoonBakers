import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PermDeviceInformationIcon from '@material-ui/icons/PermDeviceInformation';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import request, { requestCustomer } from '../../../utils/request';
import { urls } from '../../../config/urls';
import { Chip, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useCookies } from 'react-cookie';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import history from '../../../utils/history';

import { VerifyOtp } from '../../../config/validationSchemas';
import { browserRedirect } from '../../../helpers/helpers';
import { makeSelectError } from '../../Admin/Products/selectors';
import {
  ArrowBack,
  ArrowBackIos,
  ArrowLeftSharp,
  Error,
  MobileFriendly,
  Settings,
  SettingsCell,
  VerifiedUser,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'black',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Verify(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info');
  const [cookies, setCookie] = useCookies(['token']);
  const [verifyButton, setverifyButton] = useState(false);
  let [count, setcount] = useState(0);
  const [errormessage, setErrorMessage] = useState();

  //console.log('mobile : ', props.location.state.mobile);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleSendOtp = async values => {
    if (count < 3) {
      setcount(count = count + 1);
      try { 
        if(!values){
          setErrorMessage('Enter valid mobile number');
          throw new Error("Invalid Mobile number")
        }
        setErrorMessage("");
          const header = 0
            const response = await request(
              'PATCH',
              urls.CUSTOMER_URL,
              {
                key: 'mobileVerifyStart',
                value: values,
              },
               header  
            );
            if (response.status.toString() === '200') {
              setSeverity('info');
              setOpen(true);
              setMessage("Otp sent to registered number")
              setErrorMessage("Enter otp and click on verify otp.")
            }
          } catch (error) {
        setErrorMessage(error.response.data.message);
      }
    }
    else{
      setErrorMessage("MAX NO OF OTPS SENT.");
    }
  };

  const handleVerification = async ({ otp, mobile }) => {
    event.preventDefault();
    try {
          setverifyButton(true);
          const response = await request(
            'POST',
            urls.CUSTOMER_OTP_VERIFY,
            {
              mobile: mobile,
              otp: otp,
              model: 'customer',
              otpUseCase: 'mobileVerify',
            },
            { header: 0 },
          );
          console.log(response);
          if (response.status.toString() === '200') {
            setMessage(
              'Account Verified. Redirecting to homepage...',
            );
            setSeverity('success');
            setOpen(true);
            setErrorMessage('');
            setCookie(
              'customertoken',
              response.data.data.AccessToken,
              {
                path: '/',
              },
            );
            setCookie('type', 'customer', {
              path: '/',
            });
            const data = response.data.data.customerData;
            //console.log('stringigfy data : ', data);
            setCookie('name', encodeURIComponent(data.name), {
              path: '/',
            });
            setCookie('mobile', data.mobile, {
              path: '/',
            });
            setTimeout(() => {
              browserRedirect('/');
            }, 2000);
           
          }
        } catch (err) {
      console.log(err.response.data.message);
      setErrorMessage(err.response.data.message);
    }
  };

  const preventDefault = event => event.preventDefault();
  return (
    <div>
      <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PermDeviceInformationIcon />
          </Avatar>
          <Typography component="h1" className="my-3" variant="h5">
            Verify Mobile Number
          </Typography>
          <Formik
            initialValues={{
              mobile: `${
                props.location.state ? props.location.state.mobile : ''
              }`,
              otp: '',
            }}
            validationSchema={VerifyOtp}
            onSubmit={values => {
              return handleVerification(values);
            }}
          >
            {formik => (
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <div className="error-message">
                      {errormessage ? (
                        <div className="text-center my-3">
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
                  <Grid item xs={12} sm={12}>
                    <TextField
                      name="mobile"
                      id="mobile"
                      variant="outlined"
                      value={formik.values.mobile}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.mobile && Boolean(formik.errors.mobile)
                      }
                      helperText={
                        formik.touched.mobile && formik.errors.mobile
                      }
                      label="Mobile"
                      autoFocus
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      type="text"
                      id="otp"
                      label="OTP"
                      name="otp"
                      value={formik.values.otp}
                      onChange={formik.handleChange}
                      error={formik.touched.otp && Boolean(formik.errors.otp)}
                      helperText={formik.touched.otp && formik.errors.otp}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} className="text-right">
                    {count < 3 ? (
                      <div>
                        <Button
                          onClick={() => {
                            return handleSendOtp(formik.values.mobile);
                          }}
                          startIcon={<SettingsCell />}
                        >
                          Re-send otp
                        </Button>
                      </div>
                    ) : (
                      <Button disabled>Re-send otp</Button>
                    )}
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  disabled={verifyButton}
                  variant="contained"
                  style={{
                    backgroundColor: '#ffbc2a',
                    boxShadow: 'none',
                    borderRadius: '0',
                  }}
                  className={classes.submit}
                  startIcon={<MobileFriendly />}
                >
                  Verify Otp
                </Button>
              </form>
            )}
          </Formik>
        </div>
        <Grid container justify="flex-end">
          <Grid item>
            <ArrowBackIos />
            <Link to="login" style={{ color: 'darkblue' }}>
              Back to login page
            </Link>
          </Grid>
        </Grid>
      </Container>
      <Footer />
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
