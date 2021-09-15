import './index.css';

import React from 'react';
import { Grid } from '@material-ui/core';
const Loader = () => {
  return (
    <div className="main">
      <Grid sm={12} justify="center">
        <h1 class="loader">
          <span>B</span>
          <span>A</span>
          <span>K</span>
          <span>I</span>
          <span>N</span>
          <span>G</span>
          <br   />
          <p>🎂🍰🍪</p>
        </h1>
      </Grid>
    </div>
  );
};

export default Loader;
