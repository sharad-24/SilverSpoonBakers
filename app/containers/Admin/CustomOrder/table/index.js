import React, { useState, useEffect } from 'react';
import { Button, IconButton, Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import history from '../../../../utils/history';
import { Edit } from '@material-ui/icons';
import { formatCurrency, formatDate } from '../../../../helpers/helpers';
import displayStatus from '../../../../utils/displayStatus';

const columns = [
  {
    field: '',
    headerName: 'Edit',
    sortable: false,
    width: 100,
    renderCell: params => {
      const onClick = () => {
        console.log(params.row);
        return history.push('/admin/customorder/edit', { data: params.row });
      };
      return (
        <IconButton onClick={onClick}>
          <Edit />
        </IconButton>
      );
    },
  },
  {
    field: 'id',
    headerName: (
      <Typography>
        <b>ID</b>
      </Typography>
    ),
    width: 130,
  },
  {
    field: 'customerName',
    headerName: (
      <Typography>
        <b>Name</b>
      </Typography>
    ),
    width: 130,
  },
  {
    field: 'customerMobile',
    headerName: (
      <Typography>
        <b>Contact</b>
      </Typography>
    ),
    width: 130,
  },
  {
    field: 'status',
    headerName: (
      <Typography>
        <b>Status</b>
      </Typography>
    ),
    renderCell: params => {
      return <>{displayStatus(params.row.status)}</>;
    },
    width: 130,
  },
  {
    field: 'deliveryDate',
    headerName: (
      <Typography>
        <b>Deliver By</b>
      </Typography>
    ),
    renderCell: params => {
      return <>{formatDate(params.row.expectedDeliveryDate)}</>;
    },
    width: 140,
  },
  {
    field: 'isStorePickup',
    headerName: (
      <Typography>
        <b>Pickup</b>
      </Typography>
    ),
    width: 120,
  },
  {
    field: 'price',
    headerName: (
      <Typography>
        <b>Amount</b>
      </Typography>
    ),
    renderCell: params => {
      return <>{formatCurrency(params.row.price)}</>;
    },
    width: 140,
  },
];

const DataTable = ({ customOrder }) => {
  const [rows, setrows] = useState([]);

  const handleEdit = order => {
    console.log({ order });
    return history.push('/admin/customorder/edit', { data: order });
  };

  const fetchRow = customOrder => {
    let rowsArray = [];
    rowsArray = customOrder.map(customOrder => {
      if (!customOrder.isDeleted) {
        customOrder.id = customOrder.customOrderNumber;

        return customOrder;
      }
    });
    setrows(rowsArray);
  };

  useEffect(() => {
    fetchRow(customOrder);
  }, []);

  return (
    <div style={{ height: 600, width: '100%' }}>
      {console.log(rows)}
      <DataGrid
        disableSelectionOnClick={true}
        rows={rows}
        //onCellClick={params => handleEdit(params.row)}
        columns={columns}
        pageSize={10}
      />
    </div>
  );
};

export default DataTable;
