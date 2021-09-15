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
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormGroup from '@material-ui/core/FormGroup';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import HomeIcon from '@material-ui/icons/Home';
import StoreIcon from '@material-ui/icons/Store';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import './addressform.css';
import {
  DELIVERY_SLOTS_LOGIC,
  getDeliverySlotLogic,

} from '../../../../utils/deliverySlots';

import {DELIVERY_SLOTS, DELIVERY_SLOTS_ARRAY} from '../../../../utils/constants'
import {
  DateRangeOutlined,
  PersonOutlined,
  PhoneAndroidOutlined,
} from '@material-ui/icons';

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


export default function StorePickUpForm(props) {
  const classes = useStyles();
  var now = new Date();
  
  const [selectedDate, setselectedDate] = useState(now);
  const [index, setindex] = useState(0);
  
  
  
  var futureDate = new Date();
  const maxDate = futureDate.setDate(futureDate.getDate() + 30);

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
      const nextDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
      const slotStartIndex = DELIVERY_SLOTS_LOGIC[logic](
        currentDate,
        deliveryDate,
        currentTimestamp,
      );
      setindex(slotStartIndex);
      return;
    } catch (error) {
      throw error;
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
          }}
          // validationSchema={AddressFormSchema}
          onSubmit={values => {
            if (values.deliveryTime === 'NO_SLOTS') {
              return;
            }
            return props.handleStoreNext(values);
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
                      InputProps={{
                        endAdornment: <DateRangeOutlined />,
                      }}
                      value={formik.values.deliveryDate}
                      onChange={e => {
                        setselectedDate(e);
                        return formik.setFieldValue('deliveryDate', e); // Access it from props
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
                    InputProps={{
                      endAdornment: <PersonOutlined />,
                    }}
                    placeholder="Name of the person to receive the order"
                    label="Receiver's Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
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
                    InputProps={{
                      endAdornment: <PhoneAndroidOutlined />,
                    }}
                    placeholder="Contact no. of the person to receive the order"
                    label="Receiver's Mobile No."
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    helperText={formik.touched.mobile && formik.errors.mobile}
                    error={
                      formik.touched.mobile && Boolean(formik.errors.mobile)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Card
                    onClick={props.handleChangeStore}
                    className={classes.card}
                    spacing={1}
                  >
                    <Paper
                      elevation={0}
                      className={
                        !props.store ? classes.root : classes.cardSelected
                      }
                    >
                      <h5>Store 1:</h5>

                      <p>
                        267, Aishbagh Road, Opp - Bank of India Lucknow,
                        226004, Contact: 0522-4101530, +91-6306998580
                      </p>
                    </Paper>
                  </Card>
                  <Card
                    onClick={props.handleChangeStore}
                    className={classes.card}
                  >
                    <Paper
                      elevation={0}
                      className={
                        props.store ? classes.root : classes.cardSelected
                      }
                    >
                      <h5>Store 2: </h5>
                      <p>
                        82, Guru Gobind Singh Marg Near Hussainganj Metro
                        station Gate 2, Lucknow 226001 +91-7905213159
                      </p>
                    </Paper>
                  </Card>
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
