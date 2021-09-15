import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import React, { useState } from 'react';
import { formatCurrency } from '../../../../helpers/helpers';
import { makeStyles } from '@material-ui/core/styles';

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

const amountDetails = ({ orderDetails }) => {
  const [expanded, setExpanded] = useState(false);

  const classes = useStyles();

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <div className="row container-fluid">
            <div className="col text-left">
              <Typography className={classes.heading}>Amount </Typography>
            </div>
            <div className="col text-right text-capitalize">
              <Typography className={classes.secondaryHeading}>
                {orderDetails
                  ? formatCurrency(orderDetails.payableAmount)
                  : null}
              </Typography>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row container-fluid">
            <div className="row container-fluid">
              <div className="col text-left">
                <h6>Product total :</h6>
              </div>
              <div className="col text-right text-capitalize">
                <h6>
                  {orderDetails
                    ? formatCurrency(orderDetails.amount)
                    : 'Fetching status...'}
                </h6>
              </div>
            </div>
            <div className="row container-fluid">
              <div className="col text-left">
                <h6>Delivery charge:</h6>
              </div>
              <div className="col text-right text-capitalize">
                <h6>
                  {orderDetails
                    ? formatCurrency(orderDetails.deliveryCharges)
                    : 'Fetching status...'}
                </h6>
              </div>
            </div>

            <div className="row container-fluid">
              <div className="col text-left">
                <h6>Discount :</h6>
              </div>
              <div className="col text-right">
                <h6>
                  {orderDetails
                    ? formatCurrency(orderDetails.discount)
                    : 'Fetching status...'}
                </h6>
              </div>
            </div>

            <div className="row container-fluid">
              <div className="col text-left">
                <h6>GST (18%) :</h6>
              </div>
              <div className="col text-right text-capitalize">
                <h6>Included</h6>
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default amountDetails;
