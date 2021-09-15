/*
 * Admin Login
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useState, useEffect, memo, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PageTitle from '../../../../components/PageTitle';
import {
  CircularProgress,
  Grid,
  Button,
  Box,
  Typography,
  Tabs,
  Tab,
  AppBar,
} from '@material-ui/core';

import BorderColorIcon from '@material-ui/icons/BorderColor';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import CakeIcon from '@material-ui/icons/Cake';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import request from '../../../../utils/request';
import { image_url, urls } from '../../../../config/urls.js';
import AdminSidebar from '../../../../components/AdminSideBar';
import TopBar from '../../../../components/TopBar/TopBar';

import { browserRedirect, formatDate } from '../../../../helpers/helpers';
import RefreshIcon from '@material-ui/icons/Refresh';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  adminProductsFetch,
  adminProductsAdd,
  adminAllSubcategoriesFetch,
  adminProductsRemoveError,
  adminFlavoursFetch,
} from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectProducts,
  makeSelectLoading,
  makeSelectAllSubcategories,
  makeSelectError,
  makeSelectProductsAdd,
  makeSelectFlavours,
} from '../selectors';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Cakes from './cakes';
import NotCakes from './notCakes';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const key = 'adminproducts';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

export function AdminAddProducts({
  
  loading,
  error,
  products,
  flavours,
  productsAdd,
  onFetchProducts,
  allSubcategories,
  onFetchAllSubcategories,
  onAddProducts,
  onFetchFlavours,
  onRemoveError,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const classes = useStyles();

 
  const [value, setValue] = React.useState(0);
  const [snackbar, setsnackbar] = React.useState(false);
  const [severity, setseverity] = useState('');
  const [message, setMessage] = useState('');
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // const [flavours, setFlavours] = useState(null);
  

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    // if (username && username.trim().length > 0) onSubmitForm();
    
      onFetchAllSubcategories();
      onFetchFlavours()    
  }, []);



  const handleSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setsnackbar(false);
  };

  

  return (
    <>
      <Grid container>
        {error &&
        error.response &&
        error.response.data &&
        error.response.data.statusCode === 401
          ? browserRedirect('/admin/profile')
          : null}
        <Grid item xs={12} style={{ marginBottom: '60px' }}>
          <TopBar />
        </Grid>
        <Grid item xs={2}>
          <AdminSidebar />
        </Grid>
        <Grid item xs={10}>
          <br />
          <div>
            <PageTitle name="Products" />
            <div style={{ padding: '0% 2%' }}>
              <div style={{ textAlign: 'right' }}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: "2%" }}
                  startIcon={<RefreshIcon />}
                >
                  Reset Form
                </Button>
                <Button
                  size="medium"
                  variant="contained"
                  color="primary"
                  style={{ margin: "2%" }}
                  startIcon={<ArrowBackIosIcon />}
                  onClick={() => browserRedirect('/admin/products')}
                >
                  Back to product list
                </Button>
              </div>

              <div className="container">
                <div className={classes.root}>
                  <AppBar position="static" color="default">
                    <Tabs
                      value={value}
                      variant="fullWidth"
                      onChange={handleChange}
                      scrollButtons="on"
                      indicatorColor="primary"
                      textColor="primary"
                      aria-label="scrollable force tabs example"
                    >
                      <Tab
                        label="Cakes"
                        icon={<CakeIcon />}
                        {...a11yProps(0)}
                      />
                      <Tab
                        label="Other products"
                        icon={<FastfoodIcon />}
                        {...a11yProps(1)}
                      />
                    </Tabs>
                  </AppBar>
                  <TabPanel value={value} index={0}>
                    <Cakes
                      productsAdd={productsAdd}
                      allSubcategories={allSubcategories}
                      flavours={flavours}
                      onAddProducts={onAddProducts}
                      onRemoveError={onRemoveError}
                    />
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <NotCakes
                      productsAdd={productsAdd}
                      allSubcategories={allSubcategories}
                      onAddProducts={onAddProducts}
                      onRemoveError={onRemoveError}
                    />
                  </TabPanel>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbar}
        autoHideDuration={4000}
        onClose={handleSnackBar}
      >
        <Alert onClose={handleSnackBar} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

AdminAddProducts.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  productsAdd: PropTypes.object,
  onFetchProducts: PropTypes.func,
  onFetchFlavours: PropTypes.func,
  onAddProducts: PropTypes.func,
  onRemoveError: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  products: makeSelectProducts(),
  flavours: makeSelectFlavours(),
  allSubcategories: makeSelectAllSubcategories(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  productsAdd: makeSelectProductsAdd(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onFetchProducts: () => {
      dispatch(adminProductsFetch());
    },
    onFetchFlavours: () => {
      dispatch(adminFlavoursFetch());
    },
    onFetchAllSubcategories: () => {
      dispatch(adminAllSubcategoriesFetch());
    },
    onAddProducts: (evt, closeAddModal) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(adminProductsAdd(evt, closeAddModal));
    },

    onRemoveError: () => {
      dispatch(adminProductsRemoveError());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AdminAddProducts);
