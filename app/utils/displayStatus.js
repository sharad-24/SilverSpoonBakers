import React from 'react';

import {
  Block,
  Cancel,
  CancelOutlined,
  CheckCircle,
  CheckCircleOutlined,
  Error,
  ErrorOutlined,
  HelpOutline,
  Home,
  HourglassEmpty,
  LocalDining,
} from '@material-ui/icons';
import { Chip } from '@material-ui/core';

const displayStatus = status => {
  switch (status) {
    case 'received':
      return (
        <>
          <Chip
            label="Received"
            style={{ backgroundColor: '#ffbc2a' }}
            icon={<CheckCircle />}
          />
        </>
      );
    case 'placed':
      return (
        <>
          <Chip
            label="Placed"
            icon={<CheckCircle style={{ color: 'green' }} />}
          />
        </>
      );
    case 'payment_pending':
      return (
        <>
          <Chip
            label="Pending"
            icon={<HourglassEmpty style={{ color: '#ffbc2a' }} />}
          />
        </>
      );
    case 'accepted':
      return (
        <>
          <Chip
            label="Accepted"
            icon={<CheckCircle style={{ color: '#ffbc2a' }} />}
          />
        </>
      );
    case 'prepared':
      return (
        <>
          <Chip
            label="Prepared"
            icon={<LocalDining style={{ color: 'black' }} />}
          />
        </>
      );
    case 'delivered':
      return (
        <>
          <Chip
            label="Delivered"
            icon={<Home style={{ color: 'green' }} />}
          />
        </>
      );
    case 'failed':
      return (
        <>
          <Chip
            label="Failed"
            icon={<ErrorOutlined style={{ color: 'red' }} />}
          />
        </>
      );
    case 'rejected':
      return (
        <>
          <Chip
            label="Rejected"
            icon={<Block style={{ color: 'red' }} />}
          />
        </>
      );
    case 'cancelled':
      return (
        <>
          <Chip
            label="Cancelled"
            icon={<Cancel style={{ color: 'red' }} />}
          />
        </>
      );
    default:
      return (
        <>
          <Chip
            label="Status unknown "
            icon={<HelpOutline style={{ color: '#ffbc2a' }} />}
          />
        </>
      );
  }
};

export default displayStatus;
