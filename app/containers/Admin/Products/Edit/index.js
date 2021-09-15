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
  Grid,
  Button,
  Box,
  Typography,
} from '@material-ui/core';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import AdminSidebar from '../../../../components/AdminSideBar';
import TopBar from '../../../../components/TopBar/TopBar';

import { browserRedirect, formatDate } from '../../../../helpers/helpers';
import RefreshIcon from '@material-ui/icons/Refresh';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  adminProductsFetch,
  adminFlavoursFetch,
  adminProductsAdd,
  adminAllSubcategoriesFetch,
  adminProductsEdit,
  adminProductsImageEdit,
  adminProductsRemoveError,
} from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectProducts,
  makeSelectLoading,
  makeSelectAllSubcategories,
  makeSelectError,
  makeSelectProductsAdd,
  makeSelectProductsImageEdit,
  makeSelectProductsEdit,
  makeSelectProductsDelete,
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

export function AdminEditProducts({
  loading,
  error,
  flavours,
  products,
  productsAdd,
  productsEdit,
  productsDelete,
  productsImageEdit,
  onFetchProducts,
  allSubcategories,
  onFetchAllSubcategories,
  onFetchFlavours,
  onEditProducts,
  onProductsImageEdit,
  onAddProducts,
  onRemoveError,
  location,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  const [snackbar, setsnackbar] = React.useState(false);
  const [severity, setseverity] = useState('');
  const [message, setMessage] = useState('');
  const [product, setProduct] = useState(location.state.data || '');
  const [defaultSubcategoryindex, setdefaultSubcategoryIndex] = useState({
    default: null,
  });
  const [defaultflavoursindex, setdefaultFlavoursIndex] = useState({
    default: null,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //const [flavours, setFlavours] = useState(null);

  const fetchData = () => {
    try {
      onFetchFlavours();
      onFetchAllSubcategories();
      calculateDefaultSubcategory();
      calculateDefaultFlavours();
    } catch (error) {
      console.log(error);
      setMessage(error.message);
      setseverity('error');
      setsnackbar(true);
    }
  };
  useEffect(() => {
    fetchData();
  }, [defaultSubcategoryindex.default]);

  const handleSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setsnackbar(false);
  };
  const calculateDefaultSubcategory = () => {
    if (allSubcategories) {
      const indexc = allSubcategories
        .map(subc => subc._id)
        .indexOf(product.parentSubcategoryId);
      console.log('index of subc: ', indexc);
      setdefaultSubcategoryIndex({ default: indexc });
    }
  };
  const calculateDefaultFlavours = () => {
    if (product.isCake) {
      if (!product.hasAllFlavour) {
        if (flavours) {
          const etc = product.flavours.map(flavourP => {
            return flavours.map(flav => flav._id).indexOf(flavourP);
          });
          console.log('flavours etc: ', etc);
          setdefaultFlavoursIndex({ default: etc });
        }
      }
    }
  };

  console.log({ location });
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
            <PageTitle name="Edit Product" />
            <div style={{ padding: '0% 2%' }}>
              <div style={{ textAlign: 'right' }}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: '2%' }}
                  startIcon={<RefreshIcon />}
                >
                  Reset Form
                </Button>
                <Button
                  size="medium"
                  variant="contained"
                  color="primary"
                  style={{ margin: '2%' }}
                  startIcon={<ArrowBackIosIcon />}
                  onClick={() => browserRedirect('/admin/products')}
                >
                  Back to product list
                </Button>
              </div>

              <div className="container">
                <div className={classes.root}>
                  {product.isCake ? (
                    flavours ? (
                      allSubcategories ? (
                        defaultSubcategoryindex.default >= 0 ? (
                          defaultflavoursindex.default ? (
                            <Cakes
                              defaultSubcategoryindex={
                                defaultSubcategoryindex.default
                              }
                              defaultflavoursindex={
                                defaultflavoursindex.default
                              }
                              productsEdit={productsEdit}
                              productsImageEdit={productsImageEdit}
                              allSubcategories={allSubcategories}
                              flavours={flavours}
                              product={product}
                              onEditProducts={onEditProducts}
                              onProductsImageEdit={onProductsImageEdit}
                              onRemoveError={onRemoveError}
                            />
                          ) : (
                            <Cakes
                              defaultSubcategoryindex={
                                defaultSubcategoryindex.default
                              }
                              productsEdit={productsEdit}
                              productsImageEdit={productsImageEdit}
                              allSubcategories={allSubcategories}
                              flavours={flavours}
                              product={product}
                              onEditProducts={onEditProducts}
                              onProductsImageEdit={onProductsImageEdit}
                              onRemoveError={onRemoveError}
                            />
                          )
                        ) : (
                          'Window was reloaded.Please go back to product list'
                        )
                      ) : null
                    ) : null
                  ) : allSubcategories ? (
                    defaultSubcategoryindex ? (
                      <NotCakes
                        defaultSubcategoryindex={
                          defaultSubcategoryindex.default
                        }
                        productsEdit={productsEdit}
                        product={product}
                        allSubcategories={allSubcategories}
                        onEditProducts={onEditProducts}
                        productsImageEdit={productsImageEdit}
                        onProductsImageEdit={onProductsImageEdit}
                        onRemoveError={onRemoveError}
                      />
                    ) : null
                  ) : null}
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

AdminEditProducts.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  productsEdit: PropTypes.object,
  productsImageEdit: PropTypes.object,
  productsDelete: PropTypes.object,
  onFetchProducts: PropTypes.func,
  onFetchFlavours: PropTypes.func,
  onAddProducts: PropTypes.func,
  onProductsImageEdit: PropTypes.func,
  onImageEditProducts: PropTypes.func,
  onDeleteProducts: PropTypes.func,
  onRemoveError: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  products: makeSelectProducts(),
  flavours: makeSelectFlavours(),
  allSubcategories: makeSelectAllSubcategories(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  productsEdit: makeSelectProductsEdit(),
  productsImageEdit: makeSelectProductsImageEdit(),
  productsDelete: makeSelectProductsDelete(),
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
    onEditProducts: (evt, closeEditProductModal) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(adminProductsEdit(evt, closeEditProductModal));
    },
    onProductsImageEdit: (evt, closeEditProductModal) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(adminProductsImageEdit(evt, closeEditProductModal));
    },
    onDeleteProducts: (evt, closeDeleteModal) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(adminProductsDelete(evt, closeDeleteModal));
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
)(AdminEditProducts);
