import React from 'react';
import {
  browserRedirect,
  formatCurrency,
  formatDate,
} from '../../../helpers/helpers';

import { Button, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import displayStatus from '../../../utils/displayStatus';
import './index.css';

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    color: 'black',
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: 'black',
    fontWeight: 'bold',
    paddingLeft: '10%',
  },
}));

const CustomOrderItem = ({ order }) => {
  const classes = useStyles();

  return (
    <>
      <div
        onClick={() => {
          return browserRedirect(
            `/customorderdetails/?id=${order.customOrderNumber}`,
          );
        }}
        className="p-3"
      >
        <div id="orderitem-header" className="px-3 py-2">
          <Typography variant="h5" style={{ textTransform: 'capitalize' }}>
            Order # {order.customOrderNumber || 'NA'}
          </Typography>
          <Typography variant="h6" />
          <hr />
        </div>
        <div id="orderitem-content" className="row px-4 ">
          <div className="col text-left">Status</div>
          <div className="col text-right">
            {order ? displayStatus(order.status) : null}
          </div>
        </div>
        <div id="orderitem-content" className="row px-4 py-2">
          <div className="col text-left">Payment Status</div>
          <div className="col text-right" />
        </div>
        <div id="orderitem-content" className="row px-4 py-1">
          <div className="col text-left">Amount</div>
          <div className="col text-right">{formatCurrency(order.price)}</div>
        </div>
        <div id="orderitem-content" className="row px-4 py-1">
          <div className="col text-left">Ordered on</div>
          <div className="col text-right">{formatDate(order.createdAt)}</div>
        </div>
        <div id="orderitem-content" className="row px-4 py-1">
          <div className="col text-left">Delivery date</div>
          <div className="col text-right">
            {formatDate(order.expectedDeliveryDate)}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomOrderItem;
