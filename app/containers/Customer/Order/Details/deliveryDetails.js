import { makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { formatDate } from '../../../../helpers/helpers';
import { displayTimeFromSlot } from '../../../../utils/displaySlots';

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: 'black',
    fontWeight: 'bold',
    paddingLeft: '10%',
  },
  secondaryText: {
    fontSize: theme.typography.pxToRem(15),
    color: 'black',
  },
  rootC: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
      height: '100%',
    },
  },
}));

const deliveryDetails = ({ orderDetails }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.rootC}>
        <Paper elevation={2} className="p-3">
          <div className="row">
            <h6 className="col text-left">
              <Typography className={classes.heading}>Type:</Typography>
            </h6>
            <h6 className="col text-right">
              <Typography className={classes.secondaryText}>
                {orderDetails
                  ? orderDetails.storePickup
                    ? 'Store Pickup'
                    : 'Home Delivery'
                  : null}
              </Typography>
            </h6>
          </div>
          <div className="row">
            <h6 className="col text-left">
              <Typography className={classes.heading}>Deliver to :</Typography>
            </h6>
            <h6 className="col text-right">
              <Typography className={classes.secondaryText}>
                {orderDetails ? orderDetails.customerName : '...'}
              </Typography>
            </h6>
          </div>
          <div className="row">
            <h6 className="col text-left">
              <Typography className={classes.heading}>Contact :</Typography>
            </h6>
            <h6 className="col text-right">
              <Typography className={classes.secondaryText}>
                {orderDetails ? orderDetails.customerMobile : '...'}
              </Typography>
            </h6>
          </div>
          <div className="row">
            <h6 className="col text-left">
              <Typography className={classes.heading}>Date :</Typography>
            </h6>
            <h6 className="col text-right">
              <Typography className={classes.secondaryText}>
                {orderDetails ? formatDate(orderDetails.deliveryDate) : null}
              </Typography>
            </h6>
          </div>
          <div className="row">
            <h6 className="col text-left">
              <Typography className={classes.heading}>Time slot:</Typography>
            </h6>
            <h6 className="col text-right">
              <Typography className={classes.secondaryText}>
                {orderDetails
                  ? orderDetails.deliverySlot
                    ? displayTimeFromSlot(orderDetails.deliverySlot.name)
                    : null
                  : null}
              </Typography>
            </h6>
          </div>
          {!orderDetails.isStorePickup ? (
            <div className="row">
              <h6 className="col text-left">
                <Typography className={classes.heading}>Address :</Typography>
              </h6>
              <h6 className="col text-right">
                <Typography className={classes.secondaryText}>
                  {orderDetails
                    ? orderDetails.address.addressLine1
                      ? orderDetails.address.addressLine1.trim()
                      : null
                    : null}
                  <br />
                  {orderDetails ? (
                    orderDetails.address.addressLine2 ? (
                      <>
                        {orderDetails.address.addressLine2.trim()}
                        <br />
                      </>
                    ) : null
                  ) : null}

                  {orderDetails
                    ? orderDetails.address
                      ? orderDetails.address.area
                      : null
                    : null}
                  <br />
                  {orderDetails
                    ? orderDetails.address
                      ? orderDetails.address.city
                      : null
                    : null}
                </Typography>
              </h6>
            </div>
          ) : (
            <div className="row">
              <h6 className="col text-left">
                <Typography className={classes.heading}>
                  Store Address :
                </Typography>
              </h6>
              <h6 className="col text-right">
                <Typography className={classes.secondaryText}>
                  {orderDetails
                    ? orderDetails.address
                      ? orderDetails.address.addressLine1.trim()
                      : null
                    : null}
                  <br />
                  {orderDetails
                    ? orderDetails.address
                      ? orderDetails.address.area
                      : null
                    : null}
                  <br />
                  {orderDetails
                    ? orderDetails.address
                      ? orderDetails.address.landmark
                      : null
                    : null}
                  <br />
                  {orderDetails
                    ? orderDetails.address
                      ? orderDetails.address.city
                      : null
                    : null}
                </Typography>
              </h6>
            </div>
          )}
        </Paper>
      </div>
    </>
  );
};

export default deliveryDetails;
