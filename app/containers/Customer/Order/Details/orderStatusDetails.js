import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import React, { useState } from 'react';
import { formatCurrency, formatDate } from '../../../../helpers/helpers';
import { makeStyles } from '@material-ui/core/styles';
import displayStatus from '../../../../utils/displayStatus';
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
}));

const orderStatusDetails = ({ orderDetails }) => {
  const [expanded, setExpanded] = useState(false);

  const classes = useStyles();

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <>
      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <div className="row container-fluid">
            <div className="col text-left">
              <Typography className={classes.heading}>Order status </Typography>
            </div>
            <div className="col text-right text-capitalize">
              <Typography className={classes.secondaryHeading}>
                {orderDetails ? displayStatus(orderDetails.status) : null}
              </Typography>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row container-fluid">
            <div className="row container-fluid">
              <div className="col text-left">
                <h6>Ordered by :</h6>
              </div>
              <div className="col text-right text-capitalize">
                <h6>
                  {orderDetails
                    ? orderDetails.customer
                      ? orderDetails.customer[0].name.toString()
                      : null
                    : 'Fetching status...'}
                </h6>
              </div>
            </div>

            <div className="row container-fluid">
              <div className="col text-left">
                <h6>Ordererd on :</h6>
              </div>
              <div className="col text-right">
                <h6>
                  {orderDetails
                    ? formatDate(orderDetails.createdAt)
                    : 'Fetching status...'}
                </h6>
              </div>
            </div>

            <div className="row container-fluid">
              <div className="col text-left">
                <h6>Delivery date :</h6>
              </div>
              <div className="col text-right text-capitalize">
                <h6>
                  {orderDetails
                    ? formatDate(orderDetails.deliveryDate)
                    : 'Fetching status...'}
                </h6>
              </div>
            </div>
            <div className="row container-fluid">
              <div className="col text-left">
                <h6>Delivery slot :</h6>
              </div>
              <div className="col text-right text-capitalize">
                <h6>
                  {orderDetails
                    ? orderDetails.deliverySlot
                      ? displayTimeFromSlot(orderDetails.deliverySlot.name)
                      : null
                    : null}
                </h6>
              </div>
            </div>
            {orderDetails ? (
              orderDetails.promocode ? (
                <div className="row container-fluid">
                  <div className="col text-left">
                    <h6>Promo code applied :</h6>
                  </div>
                  <div className="col text-right text-capitalize">
                    <>
                      <Typography variant="subtitle1">
                        {orderDetails.promocode[0].code}
                      </Typography>
                      <Typography variant="subtitle2">
                        {orderDetails.promocode[0].description}
                      </Typography>
                    </>
                  </div>
                </div>
              ) : null
            ) : null}
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default orderStatusDetails;
