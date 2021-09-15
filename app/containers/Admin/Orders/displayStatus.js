import React from 'react';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HomeIcon from '@material-ui/icons/Home';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import BlockIcon from '@material-ui/icons/Block';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import CancelIcon from '@material-ui/icons/Cancel';
import ErrorIcon from '@material-ui/icons/Error';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

export const displayStatus = status => {
  switch (status) {
    case 'placed':
      return (
        <>
          Placed <CheckCircleIcon style={{ color: 'green' }} />{' '}
        </>
      );
    case 'payment_pending':
      return (
        <>
          Pending <HourglassEmptyIcon style={{ color: '#ffbc2a' }} />
        </>
      );
    case 'accepted':
      return (
        <>
          Accepted <CheckCircleIcon style={{ color: '#ffbc2a' }} />
        </>
      );
    case 'prepared':
      return (
        <>
          Prepared <LocalDiningIcon style={{ color: 'black' }} />
        </>
      );
    case 'delivered':
      return (
        <>
          Delivered <HomeIcon style={{ color: 'green' }} />
        </>
      );
    case 'failed':
      return (
        <>
          Failed <ErrorIcon style={{ color: 'red' }} />
        </>
      );
    case 'rejected':
      return (
        <>
          Rejected <BlockIcon style={{ color: 'red' }} />
        </>
      );
    case 'cancelled':
      return (
        <>
          Cancelled <CancelIcon style={{ color: 'red' }} />
        </>
      );
    default:
      return (
        <>
          Status unknown <HelpOutlineIcon style={{ color: '#ffbc2a' }} />
        </>
      );
  }
};
