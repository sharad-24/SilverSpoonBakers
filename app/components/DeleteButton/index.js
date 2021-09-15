import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const DeleteButton = props => {
  return (
    <IconButton
      onClick={props.onClick}
      style={{ outline: 'none', boxShadow: 'none' }}
    >
      <DeleteIcon fontSize="large" />
    </IconButton>
  );
};

export default DeleteButton;
