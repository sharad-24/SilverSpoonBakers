import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  contentText: {
    color: 'black',
  },
  root: {
    padding: '30px',
  },
});

const AlertDialog = props => {
        const classes = useStyles();
        // const [button1Status, setButton1Status] = useState(false);
        // const [button2Status, setButton2Status] = useState(false);
        const handleClickButton1 = () => {
          
          props.button1OnClick();
        };
        const handleClickButton2 = () => {
          
          props.button2OnClick();
        };

        return (
          <Dialog
            className={
              classes.root
            }
            open={
              props.open
            }
            onClose={
              props.onClose
            }
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              <b>
                {
                  props.title
                }
              </b>
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                id="alert-dialog-description"
                className={
                  classes.contentText
                }
              >
                {
                  props.message
                }
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={
                  handleClickButton1
                }
                color="primary"
                variant="contained"
                disabled={
                  !props.open
                }
              >
                {
                  props.button1
                }
              </Button>
              <Button
                onClick={
                  handleClickButton2
                }
                color="default"
                variant="contained"
                disabled={
                  !props.open
                }
              >
                {
                  props.button2
                }
              </Button>
            </DialogActions>
          </Dialog>
        );
      };

export default AlertDialog;
