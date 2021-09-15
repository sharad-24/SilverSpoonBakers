import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Accordion, Chip } from '@material-ui/core';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import request from '../../../utils/request';
import { urls } from '../../../config/urls';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import { CircularProgress } from '@material-ui/core';

import history from '../../../utils/history';
import './customerLogin.css'
import { CustomerSignupSchema } from '../../../config/validationSchemas';
import { browserRedirect } from '../../../helpers/helpers';
import { makeSelectError } from '../../Admin/Products/selectors';
import { fromLong } from 'ip';
import { Error, PersonAdd } from '@material-ui/icons';

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
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info');
  const [errormessage, setErrorMessage] = useState();
  const [loading, setloading] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const handleSignup = async ({ email, password, name, mobile }) => {
    event.preventDefault();
    try {
      setloading(true);
      const response = await request(
        'PUT',
        `${urls.CUSTOMER_URL}`,
        {
          email: email,
          password: password,
          mobile: mobile,
          name: name,
        },
        { header: 0 },
      );
      //console.log('response: ', response);
      if (response.status.toString() === '200') {
        setloading(false);
        history.push('/verify', { mobile });
        setErrorMessage('');
        setMessage('Account created !');
        setSeverity('success');
        setOpen(true);
        // browserRedirect('/');
      }
    } catch (err) {
      console.log(err.response.data.message);
      setloading(false);
      setErrorMessage(err.response.data.message);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Formik
            initialValues={{
              name: '',
              mobile: '',
              password: '',
              email: '',
            }}
            validationSchema={CustomerSignupSchema}
            onSubmit={values => {
              return handleSignup(values);
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
                          style={{ textTransform: 'capitalize' }}
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
                  <Grid item xs={12} sm={12}>
                    <TextField
                      name="name"
                      id="name"
                      variant="outlined"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.name && Boolean(formik.errors.name)
                      }
                      helperText={formik.touched.name && formik.errors.name}
                      label="Full Name"
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
                      type="number"
                      id="mobile"
                      label="Mobile No."
                      name="mobile"
                      value={formik.values.mobile}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.mobile && Boolean(formik.errors.mobile)
                      }
                      helperText={
                        formik.touched.mobile && formik.errors.mobile
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                    />
                  </Grid>

                  <div className="px-2">
                    <Accordion style={{ boxShadow: 'none', marginTop: '2%' }}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>
                          Rules for password
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <div>
                            6-20 characters & special characters allowed
                            expect <b>space</b>. Requires each of the
                            following:
                            <br />
                            <div>
                              <ul>
                                <li>Capital Letter</li>
                                <li>Small Letter</li>
                                <li>Number</li>
                              </ul>
                            </div>
                          </div>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>

                    <div className="pb-2">
                      <b />
                    </div>
                  </div>
                  <Grid container row>
                    <Grid item xs={8} className="text-left">
                      <div>
                        <Checkbox required id="terms" color="primary" />
                        <label for="terms">
                          I accept the terms and conditions.
                        </label>
                      </div>
                    </Grid>
                    <Grid item xs={4} className="text-center py-2">
                      <Link
                        to="terms"
                        style={{
                          color: 'darkblue',
                        }}
                      >
                        (Click here to view)
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
                    }}
                    className={classes.submit}
                    startIcon={<PersonAdd />}
                  >
                    Sign Up
                  </Button>
                )}
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link
                      onClick={() => {
                        console.log('etst');
                        return props.handleNav();
                      }}
                      style={{
                        color: 'darkblue',
                      }}
                    >
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </div>
      </Container>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
