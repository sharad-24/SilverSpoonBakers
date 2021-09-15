import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles, Typography } from '@material-ui/core';

const PageTitle = props => {
  return (
    <div className="text-center text-capitalize">
      <Typography variant="h5">{props.name}</Typography>
      <hr style={{width: "50%"}}/>
    </div>
  );
};

export default PageTitle;
