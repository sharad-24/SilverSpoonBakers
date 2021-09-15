import React, { useState, useLayoutEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Checkbox, MenuItem, Button, Paper, Card } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { Formik, Form, Field } from 'formik';
import {
  MuiPickersUtilsProvider,
  DatePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { address } from 'ip';
import {
  formatCurrency,
  totalCostCalculator,
} from '../../../../helpers/helpers';
import { AddressFormSchema } from '../../../../config/validationSchemas';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import {
  DELIVERY_SLOTS_LOGIC,
  getDeliverySlotLogic,
} from '../../../../utils/deliverySlots';

import './addressform.css';
import {
  DELIVERY_SLOTS,
  DELIVERY_SLOTS_ARRAY,
} from '../../../../utils/constants';
import {
  AccessTime,
  AccessTimeOutlined,
  ApartmentOutlined,
  DateRange,
  DateRangeOutlined,
  HomeOutlined,
  HomeWorkOutlined,
  ImportantDevices,
  InfoOutlined,
  LocalConvenienceStoreOutlined,
  LocationCityOutlined,
  PersonAddRounded,
  PersonOutline,
  PhoneAndroid,
  PhoneAndroidOutlined,
  StreetviewOutlined,
  Timelapse,
  WarningOutlined,
} from '@material-ui/icons';
import { Timeline } from '@material-ui/lab';

const IST_OFFSET = 330;
const OFFSET_MULTIPLIER = 60000;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
    padding: theme.spacing(3),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  card: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  cardSelected: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
    padding: theme.spacing(3),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    backgroundColor: 'lightgrey',
  },
}));

export default function HomeDeliveryForm(props) {
  const classes = useStyles();

  const now = new Date();
  var futureDate = new Date();
  const maxDate = futureDate.setDate(futureDate.getDate() + 30);

  const [selectedDate, setselectedDate] = useState(now);
  const [index, setindex] = useState(0);

  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  currentDate = new Date(
    currentDate.getTime() + IST_OFFSET * OFFSET_MULTIPLIER,
  );

  const getValidDeliverySlot = (
    DELIVERY_SLOTS,
    currentDate,
    deliveryDate,
    products,
  ) => {
    try {
          const logic = getDeliverySlotLogic(products);

          let currentTimestamp = new Date();
          currentTimestamp = new Date(
            currentTimestamp.getTime() + IST_OFFSET * OFFSET_MULTIPLIER,
          );
          const nextDate = new Date(
            Date.now() + 2 * 24 * 60 * 60 * 1000,
          );
          const slotStartIndex = DELIVERY_SLOTS_LOGIC[logic](
            currentDate,
            deliveryDate,
            currentTimestamp,
          );
          //console.log('Slot beginning index', slotStartIndex);
          setindex(slotStartIndex);
          return;
        } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    getValidDeliverySlot(DELIVERY_SLOTS, now, selectedDate, props.products);
  });

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <>
        <Formik
          initialValues={{
            deliveryDate: props.address.deliveryDate,
            deliveryTime: props.address.deliveryTime,
            name: props.address.name,
            mobile: props.address.mobile,
            addressLine1: props.address.addressLine1,
            addressLine2: props.address.addressLine2,
            areaId: props.address.areaId,
            landmark: props.address.landmark,
            city: props.address.city,
            state: props.address.state,
          }}
          validationSchema={AddressFormSchema}
          onSubmit={values => {
            if (values.deliveryTime === 'NO_SLOTS') {
              return;
            }
            return props.handleAddressFormChanges(values);
          }}
        >
          {formik => (
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      disablePast
                      name="deliveryDate"
                      id="deliveryDate"
                      margin="normal"
                      maxDate={maxDate}
                      value={formik.values.deliveryDate}
                      onChange={e => {
                        setselectedDate(e);
                        return formik.setFieldValue('deliveryDate', e); // Access it from props
                      }}
                      InputProps={{
                        endAdornment: <DateRangeOutlined />,
                      }}
                      helperText="Select Date of delivery"
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* {console.log(DELIVERY_SLOTS_ARRAY)} */}
                  <TextField
                    id="deliveryTime"
                    select
                    required
                    fullWidth
                    name="deliveryTime"
                    label="Time of delivery"
                    value={formik.values.deliveryTime}
                    onChange={formik.handleChange}
                    helperText="Select time of delivery"
                  >
                    {index === 7 ? (
                      <MenuItem key={1} value="">
                        No slots available for this date
                      </MenuItem>
                    ) : (
                      DELIVERY_SLOTS_ARRAY.slice(index).map(
                        (option, index) => {
                          return (
                            <MenuItem key={option.from} value={option.name}>
                              {option.label}
                            </MenuItem>
                          );
                        },
                      )
                    )}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    name="name"
                    required
                    fullWidth
                    tyle="text"
                    id="name"
                    placeholder="Name of the person to receive the order"
                    label="Receiver's Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    InputProps={{
                      endAdornment: <PersonOutline    />,
                    }}
                    helperText={formik.touched.name && formik.errors.name}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    name="mobile"
                    required
                    fullWidth
                    type="number"
                    id="mobile"
                    placeholder="Contact no. of the person to receive the order"
                    label="Receiver's Mobile No."
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    InputProps={{
                      endAdornment: <PhoneAndroidOutlined />,
                    }}
                    helperText={formik.touched.mobile && formik.errors.mobile}
                    error={
                      formik.touched.mobile && Boolean(formik.errors.mobile)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="address"
                    name="addressLine1"
                    required
                    fullWidth
                    id="addressLine1"
                    placeholder="House no. / Soceity name"
                    label="Address line 1"
                    value={formik.values.addressLine1}
                    onChange={formik.handleChange}
                    helperText={
                      formik.touched.addressLine1 &&
                      formik.errors.addressLine1
                    }
                    InputProps={{
                      endAdornment: <HomeWorkOutlined />,
                    }}
                    error={
                      formik.touched.addressLine1 &&
                      Boolean(formik.errors.addressLine1)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="addressLine2"
                    label="Address line 2"
                    placeholder="Street name/number, area name"
                    name="addressLine2"
                    value={formik.values.addressLine2}
                    onChange={formik.handleChange}
                    InputProps={{
                      endAdornment: <ApartmentOutlined />,
                    }}
                    helperText={
                      formik.touched.addressLine2 &&
                      formik.errors.addressLine2
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="landmark"
                    label="Nearby landmark"
                    helperText="e.g. Hospital, Park"
                    name="landmark"
                    onChange={formik.handleChange}
                    InputProps={{
                      endAdornment: <LocalConvenienceStoreOutlined />,
                    }}
                    error={
                      formik.touched.landmark &&
                      Boolean(formik.errors.landmark)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="areaId"
                    select
                    required
                    fullWidth
                    name="areaId"
                    label="Area"
                    InputProps={{
                      endAdornment: <LocationCityOutlined />,
                    }}
                    value={formik.values.areaId}
                    onChange={formik.handleChange}
                    helperText={formik.touched.areaId && formik.errors.areaId}
                    error={
                      formik.touched.areaId && Boolean(formik.errors.areaId)
                    }
                  >
                    {props.areas.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option.area}
                      </MenuItem>
                    ))}
                  </TextField>
                  <div class="container">
                    <small>
                      <i>
                        If your area is not in the list, please contact us at
                        @<a href="tel:6306998580"> +91-6306998580</a>
                      </i>
                    </small>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="city"
                    name="city"
                    value={formik.values.city}
                    label="City"
                    fullWidth
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="state"
                    name="state"
                    label="state"
                    value={formik.values.state}
                    fullWidth
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} className="text-right">
                  <Button
                    type="submit"
                    variant="contained"
                    style={{
                      backgroundColor: '#ffbc2a',
                      boxShadow: 'none',
                      borderRadius: '0',
                      paddingLeft: '4rem',
                      paddingRight: '4rem',
                    }}
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </>
    </React.Fragment>
  );
}
