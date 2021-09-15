import React, { useState, useEffect, memo, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PageTitle from '../../../../components/PageTitle';
import { image_url, urls } from '../../../../config/urls.js';
import IconButton from '@material-ui/core/IconButton';
import { browserRedirect, formatDate } from '../../../../helpers/helpers';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import { Formik, Form, Field } from 'formik';
import {
  TextField,
  Grid,
  CircularProgress,
  Typography,
  Button,
  Divider,
  Snackbar,
  MenuItem,
} from '@material-ui/core';

const key = 'admincustomOrder';

import AdminSidebar from '../../../../components/AdminSideBar';
import TopBar from '../../../../components/TopBar/TopBar';


import {
  admincustomOrderDelete,
  admincustomOrderEdit,
} from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectCustomOrder,
  makeSelectLoading,
  makeSelectError,
  makeSelectcustomOrderEdit,
  makeSelectcustomOrderDelete,
} from '../selectors';
import { CUSTOM_ORDER_STATUS_LIST } from '../../../../utils/constants';
import { ArrowBackIos, BackspaceOutlined, CropSquareSharp, ErrorOutlined, ErrorOutlineOutlined } from '@material-ui/icons';
import MuiAlert from '@material-ui/lab/Alert';
import { AdminCustomOrderEditSchema } from '../../../../config/validationSchemas';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  disabledGrid: {
    marginTop: "1rem",
    marginBottom: "2rem"
  }
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function AdminEditCustomOrder({
  loading,
  error,
  // customOrder,
  customOrderEdit,
  //customOrderDelete,
  onEditcustomOrder,
  //onDeletecustomOrder,
  location,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  //console.log(location.state.data);
  const classes = useStyles();
  const [snackbar, setSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info');
  const [newStatus, setnewStatus] = useState("");
  const [refundAmount, setrefundAmount] = useState(0)
  const [selectedDate, setSelectedDate] = React.useState(
    location.state.data.deliveryDate,
  );
  const [loader, setloader] = useState(false);
  const [customOrder, setcustomOrder] = useState(location.state.data || null);

  const handleEditcustomOrder = values => {
    try{
      let data = values;
    data.id = customOrder._id;
    setloader(true);
    // console.log({ data });
    setTimeout(() => {
      setloader(false);
    }, 10000);
    onEditcustomOrder(data, () => {
      setloader(false);
      setMessage('Order details updated !');
      setSeverity('success');
      setSnackbar(true);
      browserRedirect('/admin/customorder');
    });
  }catch(error){
      setMessage('Some error occured !');
      setSeverity('alert');
      setSnackbar(true);
      setloader(false);
  }
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar(false);
  };
  const handleRefundAmountChange = (event) => {
    setrefundAmount(event.target.value)
  }
  const renderReadOnlyTextFields = customOrder => {
    const array = [];
    Object.entries(customOrder).forEach(([key, value]) => {
      array.push({
        fieldName: key,
        fieldValue: value,
      });
    });

    return array.map(field => {
      return (
        <>
          <Grid
            sm={12}
            xs={12}
            style={{
              marginLeft: '2rem',
              marginRight: '2rem',
              marginBottom: '1.5rem',
              paddingInline: '10%',
            }}
          >
            <TextField
              fullWidth
              color="primary"
              name={field.fieldName}
              label={field.fieldName}
              variant="outlined"
              value={field.fieldValue || '---'}
            />
          </Grid>
        </>
      );
    });
  };

  // const AddProductForm = useRef(null);
  const EditcustomOrderForm = useRef(null);

  return (
    <Grid container>
      {console.log({ error })}
      <Grid item xs={12} style={{ marginBottom: '60px' }}>
        <TopBar />
      </Grid>
      <Grid item xs={2}>
        <AdminSidebar />
      </Grid>
      <Grid item xs={10}>
        <br />
        <div>
          <PageTitle name={`Edit order # ${customOrder.customOrderNumber}`} />

          <div style={{ padding: '0% 2%' }}>
            <div style={{ textAlign: 'right' }}>
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: '10px' }}
                startIcon={<ArrowBackIos />}
                onClick={() => browserRedirect('/admin/customorder')}
              >
                Back to custom order list
              </Button>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="loader">
            <CircularProgress style={{ color: '#09799C' }} />
          </div>
        ) : (
          <div className="container">
            <Formik
              enableReinitialize
              initialValues={{
                name: customOrder.customerName,
                occasion: customOrder.occasion,
                customerMobile: customOrder.customerMobile,
                customerEmail: customOrder.customerEmail,
                address: customOrder.address,
                orderDetails: customOrder.orderDetails,
                pincode: customOrder.pincode,
                quantity: customOrder.quantity,
                price: customOrder.price,
                expectedDeliveryDate: customOrder.expectedDeliveryDate,
                status: customOrder.status,
              }}
              onSubmit={values => handleEditcustomOrder(values)}
              validationSchema={AdminCustomOrderEditSchema}
            >
              {({
                errors,
                touched,
                setFieldValue,
                handleChange,
                values,
                resetForm,
                getFieldProps,
              }) => (
                <Form ref={EditcustomOrderForm}>
                  <Grid container>
                    <div className="error-message">
                      {customOrderEdit &&
                      customOrderEdit.error &&
                      customOrderEdit.error.response &&
                      customOrderEdit.error.response.data &&
                      customOrderEdit.error.response.data.message ? (
                        <p style={{ marginBottom: '30px' }}>
                          {customOrderEdit.error.response.data.message}
                        </p>
                      ) : null}
                    </div>
                    <Grid
                      className={classes.disabledGrid}
                      item
                      sx={12}
                      spacing={2}
                    >
                      <div>
                        {customOrder.status == 'cancelled' ? (
                          <Typography variant="h6">
                            <ErrorOutlined style={{ color: 'red' }} /> This
                            order was cancelled. Fields cannot be edited.
                          </Typography>
                        ) : null}
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={1}>
                        <Grid
                          item
                          sm={6}
                          xs={12}
                          style={{ marginBottom: '20px' }}
                        >
                          <TextField
                            required
                            fullWidth
                            disabled
                            id="name"
                            name="name"
                            label="Customer Name"
                            variant="outlined"
                            error={Boolean(errors.name && touched.name)}
                            helperText={
                              errors.name &&
                              touched.name &&
                              String(errors.name)
                            }
                            {...getFieldProps('name')}
                          />
                        </Grid>
                        <Grid
                          item
                          sm={6}
                          xs={12}
                          style={{ marginBottom: '20px' }}
                        >
                          <TextField
                            required
                            fullWidth
                            id="occasion"
                            name="occasion"
                            label="Occasion"
                            disabled={
                              customOrder.status == 'cancelled' ? true : false
                            }
                            variant="outlined"
                            error={Boolean(
                              errors.occasion && touched.occasion,
                            )}
                            helperText={
                              errors.occasion &&
                              touched.occasion &&
                              String(errors.occasion)
                            }
                            {...getFieldProps('occasion')}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                      <Grid
                        item
                        sm={6}
                        xs={12}
                        style={{ marginBottom: '20px' }}
                      >
                        <TextField
                          fullWidth
                          required
                          label="Customer Mobile"
                          name="customerMobile"
                          variant="outlined"
                          disabled={
                            customOrder.status == 'cancelled' ? true : false
                          }
                          {...getFieldProps('customerMobile')}
                          error={Boolean(
                            errors.customerMobile && touched.customerMobile,
                          )}
                          helperText={
                            errors.customerMobile &&
                            touched.customerMobile &&
                            String(errors.customerMobile)
                          }
                        />
                      </Grid>
                      <Grid
                        item
                        sm={6}
                        xs={12}
                        style={{ marginBottom: '20px' }}
                      >
                        <TextField
                          fullWidth
                          required
                          label="Customer Email"
                          name="customerEmail"
                          variant="outlined"
                          disabled={
                            customOrder.status == 'cancelled' ? true : false
                          }
                          {...getFieldProps('customerEmail')}
                          error={Boolean(
                            errors.customerEmail && touched.customerEmail,
                          )}
                          helperText={
                            errors.customerEmail &&
                            touched.customerEmail &&
                            String(errors.customerEmail)
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        style={{ marginBottom: '20px' }}
                      >
                        <TextField
                          fullWidth
                          required
                          multiline
                          rows={2}
                          rowsMax={20}
                          disabled={
                            customOrder.status == 'cancelled' ? true : false
                          }
                          variant="outlined"
                          label="Delivery Address"
                          name="address"
                          {...getFieldProps('address')}
                          error={Boolean(errors.address && touched.address)}
                          helperText={
                            errors.address &&
                            touched.address &&
                            String(errors.address)
                          }
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        style={{ marginBottom: '20px' }}
                      >
                        <TextField
                          fullWidth
                          required
                          multiline
                          rows={5}
                          rowsMax={100}
                          disabled={
                            customOrder.status == 'cancelled' ? true : false
                          }
                          variant="outlined"
                          label="Order Details"
                          name="orderDetails"
                          {...getFieldProps('orderDetails')}
                          error={Boolean(
                            errors.orderDetails && touched.orderDetails,
                          )}
                          placeholder="Enter the details of the order. e.g. item name, description, special requirements, etc."
                          helperText={
                            errors.orderDetails &&
                            touched.orderDetails &&
                            String(errors.orderDetails)
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid item sm={12} xs={12}>
                      <Grid container spacing={1}>
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          style={{ marginBottom: '20px' }}
                        >
                          <TextField
                            fullWidth
                            type="text"
                            required
                            name="pincode"
                            disabled={
                              customOrder.status == 'cancelled' ? true : false
                            }
                            {...getFieldProps('pincode')}
                            label="Area Pincode"
                            variant="outlined"
                            error={Boolean(errors.pincode && touched.pincode)}
                            helperText={
                              errors.pincode &&
                              touched.pincode &&
                              String(errors.pincode)
                            }
                          />
                        </Grid>

                        <Grid
                          item
                          xs={12}
                          sm={4}
                          style={{ marginBottom: '20px' }}
                        >
                          <TextField
                            fullWidth
                            required
                            type="number"
                            name="quantity"
                            disabled={
                              customOrder.status == 'cancelled' ? true : false
                            }
                            {...getFieldProps('quantity')}
                            label="Quantity"
                            variant="outlined"
                            error={Boolean(
                              errors.quantity && touched.quantity,
                            )}
                            helperText={
                              errors.quantity &&
                              touched.quantity &&
                              String(errors.quantity)
                            }
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12} style={{ marginBottom: '2rem' }}>
                      <Grid container spacing={3}>
                        <Grid item sm={4} xs={12}>
                          <TextField
                            fullWidth
                            required
                            type="number"
                            size="medium"
                            name="price"
                            disabled={
                              customOrder.status == 'cancelled' ? true : false
                            }
                            {...getFieldProps('price')}
                            label="Price"
                            variant="outlined"
                            error={Boolean(errors.price && touched.price)}
                            helperText={
                              errors.price &&
                              touched.price &&
                              String(errors.price)
                            }
                          />
                        </Grid>
                        <Grid item sm={4} xs={12}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                              name="expectedDeliveryDate"
                              id="expectedDeliveryDate"
                              disabled={
                                customOrder.status == 'cancelled'
                                  ? true
                                  : false
                              }
                              margin="normal"
                              {...getFieldProps('expectedDeliveryDate')}
                              onChange={e => {
                                setSelectedDate(e);
                                return setFieldValue(
                                  'expectedDeliveryDate',
                                  e,
                                ); // Access it from props
                              }}
                              helperText="Select Date of delivery"
                            />
                          </MuiPickersUtilsProvider>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container item xs={12} style={{ marginBottom: '2.5rem' }}>
                      <Grid
                      item
                      xs={12}
                      sm={6}
                    >
                      <TextField
                        id="status"
                        variant="outlined"
                        name="status"
                        label="Current order status"
                        value={customOrder.status}
                      >
                        {customOrder.status}
                      </TextField>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                    >
                      <TextField
                        id="status"
                        select
                        disabled={
                          customOrder.status == 'cancelled' ? true : false
                        }
                        name="status"
                        label="Order status"
                        {...getFieldProps('status')}
                        helperText="Press update button to confirm changes"
                      >
                        {CUSTOM_ORDER_STATUS_LIST.map(option => {
                          return (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          );
                        })}
                      </TextField>
                    </Grid>
                    {newStatus.orderStatus == 'cancelled' ? (
                      <Grid item xs={12} style={{ marginTop: '2%' }}>
                        <TextField
                          variant="outlined"
                          color="primary"
                          default="0"
                          label="Refund amount(₹)"
                          value={refundAmount}
                          onChange={handleRefundAmountChange}
                          helperText="Refund amount should be less than order amount "
                        />
                      </Grid>
                    ) : null}
                    <Grid xs={12} style={{ marginTop: '2%' }}>
                      {loader ? (
                        <CircularProgress
                          style={{ color: '#09799C' }}
                          size={25}
                        />
                      ) : (
                        <>
                          <Button
                            type="submit"
                            variant="contained"
                            disabled={
                              customOrder.status == 'cancelled' ? true : false
                            }
                            style={{boxShadow: "none", borderRadius: "0"}}
                            color="primary"
                          >
                            Update
                          </Button>
                          <Button
                            type="reset"
                            variant="contained"
                            style={{boxShadow: "none", borderRadius: "0", marginLeft: '30px'}}
                            disabled={
                              customOrder.status == 'cancelled' ? true : false
                            }
                            onClick={() =>
                              browserRedirect('/admin/customorder')
                            }
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                    </Grid>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </div>
        )}
        <div className="text-center">
          <Typography variant="subtitle1">
            Image provided by customer (click to open) :
          </Typography>
          <a href={image_url + customOrder.image} target="__blank">
            <img
              src={image_url + customOrder.image}
              style={{
                height: '20vh',
                weight: '25wh',
                marginTop: '1rem',
              }}
              alt={customOrder.customOrderNumber || 'NA'}
            />
          </a>
        </div>
        <div className="text-center mt-4">
          <Grid
            container
            spacing={3}
            justify="center"
            style={{ marginTop: '5rem' }}
          >
            <Divider />
            <Typography style={{ marginBottom: '2rem' }} variant="h6">
              Extra fields <br /> (read-only){' '}
            </Typography>

            {renderReadOnlyTextFields(customOrder)}
          </Grid>
        </div>
      </Grid>
      <Snackbar open={snackbar} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </Grid>
  );
}

AdminEditCustomOrder.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  customOrderEdit: PropTypes.object,
  customOrderDelete: PropTypes.object,
  onEditcustomOrder: PropTypes.func,
  onDeletecustomOrder: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  customOrder: makeSelectCustomOrder(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  customOrderEdit: makeSelectcustomOrderEdit(),
  customOrderDelete: makeSelectcustomOrderDelete(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onEditcustomOrder: (evt, closeEditcustomOrderModal) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(admincustomOrderEdit(evt, closeEditcustomOrderModal));
    },
    onDeletecustomOrder: (evt, closeDeleteModal) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(admincustomOrderDelete(evt, closeDeleteModal));
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
)(AdminEditCustomOrder);
