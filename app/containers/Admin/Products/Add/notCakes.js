/*
 * Admin Login
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useState, useRef } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Formik, Form, Field } from 'formik';
import {
  CircularProgress,
  Grid,
  Divider,
  Button,
  Backdrop,
  TextField,
  Paper,
  Collapse,
  Box,
  Typography,
  IconButton,
} from '@material-ui/core';
import {
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuProps,
} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import MuiAlert from '@material-ui/lab/Alert';
import request from '../../../../utils/request';
import Files from 'react-butterfiles';
import { FileConfig } from '../../../../config/fileconfig.js';

import {
  AdminAddOtherProductSchema,
} from '../../../../config/validationSchemas';
import { browserRedirect, formatDate } from '../../../../helpers/helpers';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import { adminProductsAdd, adminProductsRemoveError } from '../actions';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
const Cakes = ({ productsAdd, allSubcategories, flavours, onAddProducts, onRemoveError}) => {
  const autocomplete = useRef('')
  const flavourAutoComplete = useRef("")
  const [value, setValue] = React.useState(0);

  const [snackbar, setsnackbar] = React.useState(false);
  const [severity, setseverity] = useState('');
  const [message, setMessage] = useState('');
  const [selectedIsEgg, setselectedIsEgg] = useState(false);
  const [hasAllFlavours, sethasAllFlavours] = useState(true);
  const [mediaError, setMediaError] = useState(null);
  const [mediaFile, setMediaFile] = useState([]);
  const [subcategoryId, setsubcategoryId] = useState("")
  const [selectedFlavours, setSelectedFlavours] = useState([]);
  const [flavourListDisabled, setflavourListDisabled] = useState(true);
  const [isBestSeller, setisBestSeller] = useState(false);

  const AddProductForm = useRef(null);

  async function handleMediaFile(file, options) {
    const { maxSizeMB, maxWidthOrHeight, useWebWorker } = options;

    console.log(
      'image file',
      file.map(file => {
        return file.src.file;
      }),
    );
    file.map(file => {
      mediaFile.push(file);
    });
    setMediaError([]);
  }

  function renderError(type) {
    switch (type) {
      case 'unsupportedFileType':
        return 'Invalid File Type';
      case 'maxSizeExceeded':
        return `Maximum File Size Exceeded, limit is ${
          FileConfig.upload_size_max
        }`;
    }
  }

  const handleisBestSeller = () => {
    setisBestSeller(!isBestSeller);
  };

  const handleMediaRemove = () => {
    setMediaFile([]);
  };

  const handleIsEggChange = () => {
    setselectedIsEgg(!selectedIsEgg);
  };
  

  const handleSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setsnackbar(false);
  };


  const handleAddProduct = (values, onSubmitProps) => {
    try {
          console.log('values', values);
          var formData = new FormData(AddProductForm.current);
          if (!mediaFile.length > 0) {
            throw new Error('Add a product image');
          }
          mediaFile.map((image, index) => {
            return formData.append(`image${index}`, image.src.file);
          });
          formData.append('parentSubcategoryId', values.subcategory);

          formData.append('flavours', null);
          formData.append('hasEgg', selectedIsEgg);
          formData.append('isCake', false);
          formData.append('isBestSeller', isBestSeller);
          formData.append('hasAllFlavour', false);
          for (var pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
          }
          onAddProducts(formData, () => {
            setMessage('Product Added');
            setseverity('success');
            setsnackbar(true);
          });
          onSubmitProps.resetForm();
          handleFormReset();
        }catch(error){
        setMessage(error.message);
        setseverity('error');
        setsnackbar(true);
    }
  };
  
  const handleFormReset = () => {
    console.log('reseting form');
    onRemoveError()
    setValue(value => value+ 1)
    //this.refs[`autocomplete`].setsubcategoryId('');
    autocomplete.current.getElementsByClassName('MuiAutocomplete-clearIndicator')[0].click()
    document.activeElement.blur();
    setMediaFile([]);
  };

  return (
    <>
      <Formik
       enableReinitialize
        initialValues={{
            name: "",
            description: "",
            maxQuantity: "",
            price: "",
            subcategory: "",
        }}
        onSubmit={handleAddProduct}
        validationSchema={AdminAddOtherProductSchema}
      >
        {({ errors, touched, setFieldValue, handleChange, values, resetForm, getFieldProps }) => (
          <Form ref={AddProductForm}>
            <Grid container>
              <div className="error-message">
                {productsAdd &&
                productsAdd.error &&
                productsAdd.error.response &&
                productsAdd.error.response.data &&
                productsAdd.error.response.data.message ? (
                  <p style={{ marginBottom: '30px' }}>
                    {productsAdd.error.response.data.message}
                  </p>
                ) : null}
              </div>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item sm={12} xs={12} style={{ marginBottom: '20px' }}>
                    <TextField
                      required
                      fullWidth
                      id="name"
                      name="name"
                      label="Product Name"
                      variant="outlined"
                      error={Boolean(errors.code && touched.code)}
                      helperText={
                        errors.code && touched.code && String(errors.code)
                      }
                      {...getFieldProps('name')}
                    />
                  </Grid>
                  
                </Grid>
              </Grid>
              <Grid item sm={12} xs={12} style={{ marginBottom: '20px' }}>
                <TextField
                  fullWidth
                  required
                  label="Description"
                  name="description"
                  variant="outlined"
                  {...getFieldProps('description')}
                  error={Boolean(errors.description && touched.description)}
                  helperText={
                    errors.description &&
                    touched.description &&
                    String(errors.description)
                  }
                />
              </Grid>

              <Grid item sm={12} xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6} style={{ marginBottom: '20px' }}>
                    <TextField
                      fullWidth
                      required
                      type="number"
                      name="maxQuantity"
                      {...getFieldProps('maxQuantity')}
                      label="Max Quantity"
                      variant="outlined"
                      error={Boolean(errors.maxQuantity && touched.maxQuantity)}
                      helperText={
                        errors.maxQuantity &&
                        touched.maxQuantity &&
                        String(errors.maxQuantity)
                      }
                    />
                  </Grid>
                  <Grid item sm={6} xs={12} style={{ marginBottom: '20px' }}>
                    <TextField
                      fullWidth
                      required
                      type="number"
                      size="medium"
                      name="price"
                      {...getFieldProps('price')}
                      label="Price"
                      variant="outlined"
                      error={Boolean(errors.price && touched.price)}
                      helperText={
                        errors.price && touched.price && String(errors.price)
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6} style={{ marginBottom: '20px' }}>
                    <Autocomplete
                      ref={autocomplete}
                      id="sub-category"
                      name="subcategory"
                      onChange={(event, value) => {
                        if(value){
                        const id = value._id;
                        setFieldValue('subcategory', id)
                       }
                      }}
                      
                      options={allSubcategories ? allSubcategories : ''}
                      getOptionLabel={option => option.name}
                      filterSelectedOptions
                      renderInput={params => (
                        <TextField
                          {...params}
                          required
                          name="subcategory"
                          variant="outlined"
                          label="subcategory"
                          placeholder="choose from list"
                          error={Boolean(
                            errors.subcategory && touched.subcategory,
                          )}
                          helperText={
                            errors.subcategory &&
                            touched.subcategory &&
                            String(errors.subcategory)
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item sm={3} xs={12} style={{ marginBottom: '20px' }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          //  required
                          checked={selectedIsEgg}
                          onChange={handleIsEggChange}
                          name="hasEgg"
                          value={selectedIsEgg}
                          color="default"
                        />
                      }
                      label="Egg"
                      style={{ margin: '5px 0px' }}
                    />
                  </Grid>
                  <Grid item sm={3} xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isBestSeller}
                          onChange={handleisBestSeller}
                          name="isBestSeller"
                          color="default"
                          value={isBestSeller}
                        />
                      }
                      label="Best Seller"
                      style={{ margin: '5px 0px' }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              
              <Grid
                item
                xs={12}
                style={{
                  marginBottom: '20px',
                  position: 'relative',
                }}
              >
                <hr />
                <Files
                  required
                  multiple
                  convertToBase64
                  maxSize={FileConfig.upload_size_max}
                  accept={FileConfig.file_type}
                  onSuccess={file =>
                    handleMediaFile(file, {
                      maxSizeMB: 1,
                      maxWidthOrHeight: 1280,
                      useWebWorker: true,
                    })
                  }
                  onError={errors => setMediaError(errors)}
                >
                  {({ browseFiles }) => (
                    <>
                      <div className="container-fluid">
                        <div className="row">
                          {mediaFile.length > 0 ? (
                            mediaFile.map((file, index) => {
                              return (
                                <div className="col-md-3">
                                  <img
                                    key={index}
                                    src={file.src.base64}
                                    style={{
                                      width: '100px',
                                      height: '100px',
                                    }}
                                  />
                                  <br />
                                  <IconButton
                                    onClick={handleMediaRemove}
                                    className="remove-media-icon"
                                  >
                                    <HighlightOffIcon />
                                  </IconButton>
                                </div>
                              );
                            })
                          ) : (
                            <div onClick={browseFiles} required>
                              <span
                                required
                                style={{
                                  cursor: 'pointer',
                                  color: '#09799C',
                                }}
                                
                              ><Button variant="outlined" startIcon={<AddAPhotoIcon/>}>
                                Add Image (select one or more image(s) to
                                Upload)</Button>
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {mediaError &&
                        Object.keys(mediaError).length > 0 &&
                        mediaError.map(error => (
                          <li
                            key={error.id}
                            style={{
                              fontSize: '14px',
                              color: 'red',
                            }}
                          >
                            {renderError(error.type)}
                          </li>
                        ))}
                    </>
                  )}
                </Files>
              </Grid>
            </Grid>
            {productsAdd && productsAdd.loading ? (
              <CircularProgress style={{ color: '#09799C' }} size={25} />
            ) : (
              <>
                <Button type="submit" variant="contained" color="primary">
                  Add
                </Button>
                <Button
                  type="reset"
                  variant="contained"
                  style={{ marginLeft: '30px' }}
                  onClick={({resetForm})=> handleFormReset(resetForm)}
                >
                  Reset
                </Button>
              </>
            )}
          </Form>
        )}
      </Formik>
      <Snackbar
        open={snackbar}
        autoHideDuration={4000}
        onClose={handleSnackBar}
      >
        <Alert onClose={handleSnackBar} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Cakes;
