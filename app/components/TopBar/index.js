import React, { useState } from 'react';
import TopBarContent from './TopBarContent';
import { useLocation } from 'react-router-dom';

const TopBar = props => {
  console.log('Disabled State: ', props.open);
  return <TopBarContent open={props.open} />;
};

export default TopBar;
