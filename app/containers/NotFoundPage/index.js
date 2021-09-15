/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import {
  Grid,
  Container,
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core';
import Page from './page';
import { browserRedirect } from '../../helpers/helpers';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560,
  },
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Silver Spoon Bakers">
     
        <Header />
         
          <div className="m-3 p-3">
          <Typography align="center" color="default" variant="h2">
            <b>404 Error !</b>
          </Typography>
          <Typography align="center" color="default" className="p-3" variant="h6">
            If you see this, Please remind us to make a sic error page xP !
          </Typography>
          <br />
          <div className="text-center">
          <Button
            size="large"
            onClick={() => browserRedirect('/')}
            variant="contained"
            style={{
              backgroundColor : "#ffbc2a",
              boxShadow: "none",
              borderRadius : "0"
            }}
          >
            Get back to Home
          </Button>
          <br/>
          <br/>
          <Button
            
            onClick={() => browserRedirect('/contact')}
            variant="contained"
            style={{
              backgroundColor : "#ffbc2a",
              boxShadow: "none",
              borderRadius : "0"
            }}
          >
            Contact us 
          </Button>
          </div>
          </div>
          <Footer />
     
    </Page>
  );
};

export default NotFound;
