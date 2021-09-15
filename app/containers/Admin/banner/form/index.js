import React from 'react';
import TextField from '@material-ui/core/TextField';
import './index.css';
import { Button, Checkbox, FormControlLabel, Grid, Snackbar } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import axios from 'axios';
import InsertLinkIcon from '@material-ui/icons/InsertLink';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import InputAdornment from '@material-ui/core/InputAdornment';
import MuiAlert from '@material-ui/lab/Alert';
import { urls } from '../../../../config/urls';

const API_ROOT =
  process.env.REACT_APP_NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL;

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
class Form extends React.Component {
  state = {
    name: '',
    link: '',
    newBannerImage: '',
    open: false,
    isMobileBanner: false,
  };
  
  handleisMobileBanner = ()=>{
    this.setState({isMobileBanner: !this.state.isMobileBanner})
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  handleChange = event => {
    const { name } = event.target;
    console.log('name: ', name);
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();

    const formData = new FormData();
    if (!this.state.newBannerImage) {
      return;
    }
    formData.append('image', this.state.newBannerImage);
    formData.append('name', this.state.name);
    formData.append('link', this.state.link);
    formData.append("isMobileBanner", this.state.isMobileBanner)

    await axios.post(`${API_ROOT}${urls.BANNER_URL}`, formData, {
      headers: {
        Authorization: this.props.authorization,
      },
    });

    this.props.getBanner();
    this.setState({
      name: '',
      link: '',
      newBannerImage: null,
      addBannerButtonDisabled: false,
      open: true,
      isMobileBanner: false,
    });
    document.getElementById('bannerImage').value = '';
  };

  fileChangedHandler = event => {
    this.setState({ newBannerImage: event.target.files[0] });
  };

  render() {
    if (this.props.addBannerButtonDisabled) {
      return (
        <div style={{ margin: '15px' }}>
          <h4>Add Banner feature disabled.</h4>
          <p>
            You have unsaved changes. Plese save them before adding new banner.
            Press <b>save</b> button (top right corner) to save changes and
            enable add banner functionality.
          </p>
          <hr />
        </div>
      );
    }
    return (
      <div>
        <div className="formlabel">
          <h5>Add a new banner</h5>
        </div>
        <form noValidate autoComplete="off" className="form-inline">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                helperText="e.g. 'Winter_Sale'"
                id="name"
                name="name"
                color="primary"
                label="Name"
                size="medium"
                className="textfield"
                variant="outlined"
                onChange={this.handleChange}
                value={this.state.name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ViewCarouselIcon />
                    </InputAdornment>
                  ),
                }}
                                />
            </Grid>
            <br />
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                helperText="http://www.example.com"
                id="link"
                name="link"
                color="primary"
                label="Link"
                variant="outlined"
                className="textfield"
                size="medium"
                onChange={this.handleChange}
                value={this.state.link}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <InsertLinkIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                  control={
                    <Checkbox
                      //  required
                      checked={this.state.isMobileBanner}
                      onChange={this.handleisMobileBanner}
                      name="isMobileBanner"
                      value={this.state.isMobileBanner}
                      color="default"
                    />
                  }
                  label="Make this a mobile banner"
                />
            </Grid>
            <Grid item xs={6}>
              <input
                name="image"
                className="inputfile"
                accept="image/*"
                type="file"
                id="bannerImage"
                onChange={this.fileChangedHandler}
              />
            </Grid>
            <Grid item xs={12} className="mt-3">
              <Button
                id="submitButton"
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                startIcon={<CloudUploadIcon />}
                onClick={this.handleSubmit}
                disabled={this.state.addBannerButtonDisabled}
              >
                Add Banner
              </Button>
            </Grid>
          </Grid>
        </form>
        <Snackbar
          open={this.state.open}
          autoHideDuration={3000}
          onClose={this.handleClose}
        >
          <Alert onClose={this.handleClose} severity="success">
            Banner uploaded, List will be update soon!
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default Form;
