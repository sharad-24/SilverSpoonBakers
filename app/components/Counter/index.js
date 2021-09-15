import React, { Component, useState } from 'react';
import {Button, Input, TextField, ButtonGroup, IconButton} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { makeStyles } from '@material-ui/core/styles';

import './index.css';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  
}));

 function Counter (props) {
    const classes = useStyles();
      
        return (
          <>
            <ButtonGroup color="default">
              <Button
                style={{ backgroundColor: '#ddd' }}
                size="sm             a             ll"
                onClick={props.decrease}
              >
                <IconButton size="small" >
                  <RemoveIcon fontSize="small" />
                </IconButton>
              </Button>
              <Button>{props.count}</Button>
              <Button size="small"
                style={{ backgroundColor: '#ffbc2a' }}
                onClick={props.increase}
              >
                <IconButton size="small" >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Button>
            </ButtonGroup>
          </>
        );
        
      }
      
    
export default Counter;
   