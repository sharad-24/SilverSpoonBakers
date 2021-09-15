import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Button,
  Chip,
} from '@material-ui/core';
import { ExpandMore, HourglassEmpty, WatchLaterOutlined } from '@material-ui/icons';
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

const paymentDetails = ({ orderDetails }) => {
  const [expanded, setExpanded] = useState(false);

  const classes = useStyles();

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <>
      <Accordion
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <div className="row container-fluid">
            <div className="col text-left">
              <Typography className={classes.heading}>
                Payment status{' '}
              </Typography>
            </div>
            <div className="col text-right text-capitalize">
              <Typography className={classes.secondaryHeading}>
                {orderDetails ? (
                  orderDetails.paymentDetails ? (
                    orderDetails.paymentDetails.status == 'captured' ? (
                      <Button
                        size="small"
                        variant="outlined"
                        style={{
                          backgroundColor: 'green',
                          color: 'white',
                          boxShadow: 'none',
                          borderRadius: '0',
                        }}
                      >
                        Paid
                      </Button>
                    ) : (
                      <>
                        <Chip
                          label="Pending"
                          style={{
                            backgroundColor: '#ffbc2a',
                          }}
                          icon={<WatchLaterOutlined />}
                        />
                      </>
                    )
                  ) : null
                ) : null}
              </Typography>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row container-fluid">
            <div className="row container-fluid">
              <div className="col text-left">
                <h6>Amount due :</h6>
              </div>
              <div className="col text-right">
                <h6>
                  {orderDetails
                    ? orderDetails.paymentDetails
                      ? formatCurrency(
                          Number(orderDetails.paymentDetails.amount_due) / 100,
                        )
                      : null
                    : 'Fetching status...'}
                </h6>
              </div>
            </div>

            <div className="row container-fluid">
              <div className="col text-left">
                <h6>Amount paid :</h6>
              </div>
              <div className="col text-right text-capitalize">
                <h6>
                  {orderDetails
                    ? orderDetails.paymentDetails
                      ? formatCurrency(
                          Number(orderDetails.paymentDetails.amount_paid) / 100,
                        )
                      : null
                    : 'Fetching status...'}
                </h6>
              </div>
            </div>
            {orderDetails ? (
              orderDetails.paymentDetails ? (
                orderDetails.paymentDetails.status == 'captured' ? (
                  <>
                    <div className="row container-fluid">
                      <div className="col text-left">
                        <h6>Transaction ID :</h6>
                      </div>
                      <div className="col text-right text-capitalize">
                        <h6>
                          {orderDetails ? (
                            <Typography variant="subtitle2">
                              {orderDetails.paymentDetails.id}
                            </Typography>
                          ) : (
                            'Fetching status...'
                          )}
                        </h6>
                      </div>
                    </div>
                  </>
                ) : null
              ) : null
            ) : null}

            <div className="row container-fluid">
              <div className="col text-left">
                <h6>Receipt # :</h6>
              </div>
              <div className="col text-right text-capitalize">
                <h6>
                  {orderDetails
                    ? orderDetails.paymentDetails.receipt
                    : 'Fetching status...'}
                </h6>
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default paymentDetails;
