import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { FormControlLabel, FormControl } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { Snackbar } from '@material-ui/core';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MuiAlert from '@material-ui/lab/Alert';
import { Tab, Tabs } from 'react-bootstrap';
import { urls } from '../../../config/urls';
import request from '../../../utils/request';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import { browserRedirect } from '../../../helpers/helpers';
import SignUp from './signup';
import Login from './login';
import { useCookies, Cookies } from 'react-cookie';
import { Home } from '@material-ui/icons';

const API_ROOT =
  process.env.REACT_APP_NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL;

function Alert(props) {
  console.log('snackbar');
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(6),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  
  let cookie = new Cookies();
  const classes = useStyles();
  const [loginOpen, setLoginOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info');
  const [key, setKey] = useState('login');
  const [data, setdata] = useState(props.location.data);

  const [cookies, setCookie, removeCookie] = useCookies({
    customertoken: cookie.get('customertoken') || ""
  });
  const handleNav = () => {
    if (key === 'signup') {
      setKey('login');
    } else {
      setKey('signup');
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setLoginOpen(false);
  };
  if(cookies.customertoken){
    return (
      <>
        <Header />
        <CssBaseline />
        <Tabs
          style={{ marginTop: '2em' }}
          className="justify-content-center"
          activeKey={key}
          onSelect={k => setKey(k)}
        >
          <Tab eventKey="login" title="Login">
            <div className="col">
              <div className="row-md-12 row-sm-12 my-5 text-center">
                <h5>You are already logged in.</h5>
              </div>
              <div className="row-md-12 row-sm-12 my-5 text-center">
                <Button
                  variant="contained"
                  style={{ borderRadius: '0', boxShadow: 'none' }}
                  onClick={() => {
                    return browserRedirect('/');
                  }}
                  startIcon={<Home />}
                >
                  Go to homepage
                </Button>
              </div>
            </div>
          </Tab>
        </Tabs>

        <Footer />
        <Snackbar
          open={loginOpen}
          autoHideDuration={5000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
      </>
    );
  }

  return (
    <>
      <Header />
      <CssBaseline />
      <Tabs
        style={{ marginTop: '2em' }}
        className="justify-content-center"
        activeKey={key}
        onSelect={k => setKey(k)}
      >
        <Tab eventKey="login" title="Login">
          <Login data={data} handleNav={handleNav}  />
        </Tab>
        <Tab eventKey="signup" title="Signup">
          <SignUp props={props} handleNav={handleNav} data={data} />
        </Tab>
      </Tabs>

      <Footer />
      <Snackbar
        open={loginOpen}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
