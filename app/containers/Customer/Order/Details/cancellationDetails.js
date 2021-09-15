import {
  Accordion,
  AccordionSummary,
  Button,
  AccordionDetails,
} from '@material-ui/core';
import { ExpandMore, More, MoreHorizOutlined } from '@material-ui/icons';
import React, { useState } from 'react';
import { formatCurrency, formatDate } from '../../../../helpers/helpers';
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

const CancellationDetails = ({ orderDetails }) => {
  const [expanded, setExpanded] = useState(false);

  const classes = useStyles();

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <>
      <Accordion
        expanded={expanded === 'panel4'}
        onChange={handleChange('panel4')}
      >
        <AccordionSummary
          expandIcon={<MoreHorizOutlined />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          More details
        </AccordionSummary>
        <AccordionDetails>
          <div className="row ">
            <div className="row container-fluid">
              <div className="col text-left">
                <h6>Cancelled By :</h6>
              </div>
              <div className="col text-right">
                <h6>
                  {orderDetails
                    ? orderDetails.paymentDetails
                      ? orderDetails.cancelledBy
                      : null
                    : null}
                </h6>
              </div>
            </div>

            <div className="row container-fluid">
              <div className="col text-left">
                <h6>Cancelled At :</h6>
              </div>
              <div className="col text-right text-capitalize">
                <h6>
                  {orderDetails
                    ? orderDetails.paymentDetails
                      ? formatDate(orderDetails.cancelledAt)
                      : null
                    : null}
                </h6>
              </div>
            </div>

            <div className="row container-fluid">
              <div className="col text-left">
                <h6>Cancellation Reason :</h6>
              </div>
              <div className="col text-right text-capitalize">
                <h6>{orderDetails ? orderDetails.cancelReason : null}</h6>
              </div>
            </div>
            <div className="row container-fluid">
              <div className="col text-left">
                <h6>Amount Refunded :</h6>
              </div>
              <div className="col text-right text-capitalize">
                <h6>
                  {orderDetails
                    ? formatCurrency(orderDetails.refundAmount)
                    : null}
                </h6>
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default CancellationDetails;
