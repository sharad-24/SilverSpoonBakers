import React, { useLayoutEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Checkbox } from '@material-ui/core';

import FormGroup from '@material-ui/core/FormGroup';
import HomeIcon from '@material-ui/icons/Home';
import StoreIcon from '@material-ui/icons/Store';
import { makeStyles } from '@material-ui/core/styles';
import HomeDeliveryForm from './HomeDeliveryForm';
import StorePickUpForm from './storePickUpForm';

import './addressform.css';
import {
  CheckBox,
  HomeOutlined,
  StorefrontOutlined,
  StoreOutlined,
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

export default function CheckOutForms(props) {
  const classes = useStyles();

  var now = new Date();
  now.setDate(now.getDate() + 30);

  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  currentDate = new Date(
    currentDate.getTime() + IST_OFFSET * OFFSET_MULTIPLIER,
  );

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <div className="container">
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={props.homedelivery}
                onChange={props.handleDeliveryLocation}
                icon={<HomeOutlined />}
                checkedIcon={<HomeIcon color="primary" />}
                name="homedelivery"
              />
            }
            label="Home Delivery"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!props.homedelivery}
                onChange={props.handleDeliveryLocation}
                icon={<StoreOutlined />}
                checkedIcon={<StoreIcon color="primary" />}
                name="storepickup"
              />
            }
            label="Pick up at store"
          />
        </FormGroup>
      </div>
      {props.homedelivery ? (
        <HomeDeliveryForm
          selectedDate={props.selectedDate}
          handleDateChange={props.handleDateChange}
          handleAddressFormChanges={props.handleAddressFormChanges}
          address={props.address}
          products={props.products}
          areas={props.areas}
        />
      ) : (
        <StorePickUpForm
          selectedDate={props.selectedDate}
          handleDateChange={props.handleDateChange}
          address={props.address}
          areas={props.areas}
          products={props.products}
          store={props.store}
          handleChangeStore={props.handleChangeStore}
          handleStoreNext={props.handleStoreNext}
        />
      )}
    </React.Fragment>
  );
}
