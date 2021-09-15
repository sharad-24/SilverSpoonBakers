import React from 'react';
import { browserRedirect, formatDate } from '../../../helpers/helpers';

import { Button, Chip, Typography } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import HomeIcon from '@material-ui/icons/Home';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import BlockIcon from '@material-ui/icons/Block';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import ErrorIcon from '@material-ui/icons/Error';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import displayStatus from '../../../utils/displayStatus';
import './index.css'
import { WatchLater, WatchLaterOutlined } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    color: "black",
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: "black",
    fontWeight : "bold",
    paddingLeft: "10%"
  },
}));

const OrderItem = props => {
  const classes = useStyles();
 
  return (
    <>
      <div
        onClick={() => {
          return browserRedirect(`/order/?id=${props.order.orderNumber}`);
        }}
        className="p-3"
      >
        <div id="orderitem-header" className="px-3 py-2">
          <h3>Order # {props.order.orderNumber}</h3>
          <hr />
        </div>
        <div id="orderitem-content" className="row px-4 ">
          <div className="col text-left">Order status</div>
          <div className="col text-right">
            {props.order ? displayStatus(props.order.status) : ''}
          </div>
        </div>
        <div id="orderitem-content" className="row px-4 py-2">
          <div className="col text-left">Payment status</div>
          <div className="col text-right">
            {props.order ? (
              props.order.paymentDetails.status == 'captured' ? (
                <Chip
                  label="Paid"
                  icon={
                    <CheckCircleIcon
                      style={{
                        color: 'green',
                      }}
                    />
                  }
                />
              ) : (
                <Chip
                  label="Pending"
                  style={{
                    backgroundColor: '#ffbc2a',
                  }}
                  icon={
                    <WatchLaterOutlined
                      
                    />
                  }
                />
                  
              )
            ) : (
              ''
            )}
          </div>
        </div>
        <div id="orderitem-content" className="row px-4 py-1">
          <div className="col text-left">Amount</div>
          <div className="col text-right">{props.order.amount}</div>
        </div>
        <div id="orderitem-content" className="row px-4 py-1">
          <div className="col text-left">Ordered on</div>
          <div className="col text-right">
            {formatDate(props.order.createdAt)}
          </div>
        </div>
        <div id="orderitem-content" className="row px-4 py-1">
          <div className="col text-left">Delivery date</div>
          <div className="col text-right">
            {formatDate(props.order.deliveryDate)}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderItem;
