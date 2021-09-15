/*
 * Admin Login
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useState, useRef, useEffect } from 'react';
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
import { image_url, urls } from '../../../../config/urls.js';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import MuiAlert from '@material-ui/lab/Alert';
import request from '../../../../utils/request';
import Files from 'react-butterfiles';
import { FileConfig } from '../../../../config/fileconfig.js';

import {
  AdminAddOtherProductSchema,
  AdminAddCakeProductSchema,
} from '../../../../config/validationSchemas';
import { browserRedirect, formatDate } from '../../../../helpers/helpers';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Cakes = ({
  productsEdit,
  allSubcategories,
  flavours,
  onEditProducts,
  onRemoveError,
  productsImageEdit,
  onProductsImageEdit,
  product,
  defaultSubcategoryindex,
  defaultflavoursindex
}) => {
        const autocomplete = useRef('');
        const flavourAutoComplete = useRef('');
        const [value, setValue] = React.useState(0);

        const [snackbar, setsnackbar] = React.useState(false);
        const [severity, setseverity] = useState('');
        const [message, setMessage] = useState('');
        const [selectedIsEgg, setselectedIsEgg] = useState(
          product.hasEgg,
        );
        
        const [defaultFlavours, setdefaultFlavours] = useState(null)
        
        const [hasAllFlavours, sethasAllFlavours] = useState(
          product.hasAllFlavour,
        );
        const [mediaError, setMediaError] = useState(null);
        const [mediaFile, setMediaFile] = useState([]);
        const [subcategoryId, setsubcategoryId] = useState('');
        const [selectedFlavours, setSelectedFlavours] = useState([]);
        const [flavourListDisabled, setflavourListDisabled] = useState(
          true,
        );
        const [isBestSeller, setisBestSeller] = useState(
          product.isBestSeller || false,
        );
        const [productImages, setproductImages] = useState({
          images: product.images || [],
        });

        const [mediaFileEdit, setMediaFileEdit] = useState({
          images: [],
        });

        const AddProductForm = useRef(null);

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

        const handlehasAllFlavours = () => {
          sethasAllFlavours(!hasAllFlavours);
          setflavourListDisabled(!flavourListDisabled);
        };

        const handleMediaRemoveEdit = index => {
          const newImageArray = mediaFileEdit.images;
          const x = newImageArray.splice(index, 1);
          //console.log("new array : ",newImageArray)
          setMediaFileEdit({ images: newImageArray });
          //console.log("dfhb",mediaFileEdit)
        };
        function handleMediaFileEdit(files) {
          files.map(file => {
            mediaFileEdit.images.push(file);
          });

          setMediaError([]);
        }
        const handleIsEggChange = () => {
          setselectedIsEgg(!selectedIsEgg);
        };

        const handleSnackBar = (event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
          setsnackbar(false);
        };

        const handleEditProduct = (values, onSubmitProps) => {
          try {
            console.log('values', values);

            var payload = values;
            payload.parentSubcategoryId = values.subcategory;
            payload.productId = product._id;
            payload.hasEgg = selectedIsEgg;
            payload.isBestSeller = isBestSeller;
            payload.isCake = true;

            payload.minWeight = values.minWeight;
            payload.maxWeight = values.maxWeight;
            payload.maxQuantity = values.maxQuantity;

            payload.hasAllFlavour = hasAllFlavours;
            if (!hasAllFlavours) {
              if (selectedFlavours.length > 0) {
                payload.flavours = selectedFlavours;
              } else {
                payload.flavours = product.flavours;
              }
            } else {
              payload.flavours = null;
            }
            //console.log('payload:', payload);

            setMessage('Updating product details...');
            setseverity('success');
            setsnackbar(true);

            onEditProducts(payload, () => {
              browserRedirect('/admin/products');
            });
            setValue(Value => Value + 1);
          } catch (error) {
            setMessage(error.message);
            setseverity('error');
            setsnackbar(true);
          }
        };

        const handleProductImageUpdate = () => {
          event.preventDefault();
          onRemoveError();
          console.log('image update invsoked');
          console.log('piu', productImages.images);
          const exisitingImagesArray = Array(productImages.images);
          console.log('exisitng Images: ', exisitingImagesArray);
          let formData = new FormData();
          formData.append('productId', product._id);

          formData.append('existingImages', exisitingImagesArray);
          if (mediaFileEdit) {
            mediaFileEdit.images.map((image, index) => {
              return formData.append(`image${index}`, image.src.file);
            });
          }

          setMessage('Updating product images...');
          setseverity('success');
          setsnackbar(true);

          onProductsImageEdit(formData, () => {
            browserRedirect('/admin/products');
          });
          onRemoveError();
        };

        const handleProductImageRemove = index => {
          console.log('remove product image');
          console.log('prodcut image array: ', productImages.images);
          const newImageArray = productImages.images;
          const x = newImageArray.splice(index, 1);
          // console.log("new array : ",newImageArray)
          setproductImages({ images: newImageArray });
        };

        const handleFlavourAutoComplete = async e => {
          console.log('invoked', e);
          const newFlavoursArray = e.map(flavour => {
            return flavour._id;
          });
          console.log('new array: ', newFlavoursArray);
          setSelectedFlavours(newFlavoursArray);
        };

        const handleFormReset = () => {
          console.log('reseting form');
          onRemoveError();
          setValue(value => value + 1);
          setMediaFile([]);
          //this.refs[`autocomplete`].setsubcategoryId('');
          autocomplete.current
            .getElementsByClassName('MuiAutocomplete-clearIndicator')[0]
            .click();
          if (!hasAllFlavours) {
            flavourAutoComplete.current
              .getElementsByClassName('MuiAutocomplete-clearIndicator')[0]
              .click();
          }
          document.activeElement.blur();
        };

        useEffect(() => {
                          onRemoveError();
                          // setdefaultFlavours(
                          //   defaultflavoursindex.map(index => flavours[index]),
                          // );
                        }, []);

        return (
          <>
            <Formik
              enableReinitialize
              initialValues={{
                name: product.name,
                description: product.description,
                minWeight: product.minWeight,
                maxWeight: product.maxWeight,
                maxQuantity: product.maxQuantity,
                price: product.price,
                displayPrice: product.displayPrice,
                subcategory: allSubcategories[defaultSubcategoryindex],
                flavours: product.flavours,
              }}
              onSubmit={handleEditProduct}
              validationSchema={AdminAddCakeProductSchema}
            >
              {({
                errors,
                touched,
                setFieldValue,
                handleChange,
                values,
                resetForm,
                getFieldProps,
              }) => (
                <Form ref={AddProductForm}>
                  <Grid container>
                    <div className="error-message">
                      {productsEdit &&
                      productsEdit.error &&
                      productsEdit.error.response &&
                      productsEdit.error.response.data &&
                      productsEdit.error.response.data.message ? (
                        <p style={{ marginBottom: '30px' }}>
                          {productsEdit.error.response.data.message}
                        </p>
                      ) : null}
                    </div>
                    {allSubcategories && flavours ? null : (
                      <div className="text-center row container">
                        <CircularProgress />
                      </div>
                    )}
                    <Grid item xs={12}>
                      <Grid container spacing={1}>
                        <Grid
                          item
                          sm={6}
                          xs={12}
                          style={{ marginBottom: '20px' }}
                        >
                          <TextField
                            required
                            fullWidth
                            id="name"
                            name="name"
                            label="Product Name"
                            variant="outlined"
                            error={Boolean(errors.code && touched.code)}
                            helperText={
                              errors.code &&
                              touched.code &&
                              String(errors.code)
                            }
                            {...getFieldProps('name')}
                          />
                        </Grid>
                        <Grid
                          item
                          sm={3}
                          xs={12}
                          style={{ marginBottom: '20px' }}
                        >
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
                        <Grid item xs={12} sm={3}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={hasAllFlavours}
                                onChange={handlehasAllFlavours}
                                // name="hasAllFlavour"
                                color="default"
                              />
                            }
                            label="All flavours"
                            style={{ margin: '5px 0px' }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      sm={12}
                      xs={12}
                      style={{ marginBottom: '20px' }}
                    >
                      <TextField
                        fullWidth
                        required
                        label="Description"
                        name="description"
                        variant="outlined"
                        {...getFieldProps('description')}
                        error={Boolean(
                          errors.description && touched.description,
                        )}
                        helperText={
                          errors.description &&
                          touched.description &&
                          String(errors.description)
                        }
                      />
                    </Grid>

                    <Grid item sm={12} xs={12}>
                      <Grid container spacing={1}>
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          style={{ marginBottom: '20px' }}
                        >
                          <TextField
                            fullWidth
                            required
                            variant="outlined"
                            label="Min Weight"
                            name="minWeight"
                            {...getFieldProps('minWeight')}
                            error={Boolean(
                              errors.minWeight && touched.minWeight,
                            )}
                            helperText={
                              errors.minWeight &&
                              touched.minWeight &&
                              String(errors.minWeight)
                            }
                          />
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          style={{ marginBottom: '20px' }}
                        >
                          <TextField
                            fullWidth
                            type="text"
                            required
                            name="maxWeight"
                            {...getFieldProps('maxWeight')}
                            label="Max Weight"
                            variant="outlined"
                            error={
                              Boolean(
                              errors.maxWeight && touched.maxWeight,
                            )}
                            helperText={
                              errors.maxWeight &&
                              touched.maxWeight &&
                              String(errors.maxWeight)
                            }
                          />
                        </Grid>

                        <Grid
                          item
                          xs={12}
                          sm={4}
                          style={{ marginBottom: '20px' }}
                        >
                          <TextField
                            fullWidth
                            required
                            type="number"
                            name="maxQuantity"
                            {...getFieldProps('maxQuantity')}
                            label="Max Quantity"
                            variant="outlined"
                            error={Boolean(
                              errors.maxQuantity && touched.maxQuantity,
                            )}
                            helperText={
                              errors.maxQuantity &&
                              touched.maxQuantity &&
                              String(errors.maxQuantity)
                            }
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <Grid container spacing={1}>
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          style={{ marginBottom: '20px' }}
                        >
                          {allSubcategories ? (
                            defaultSubcategoryindex >= 0 ? (
                              <>
                                {console.log(
                                  'defsubc',
                                  defaultSubcategoryindex,
                                )}
                                <Autocomplete
                                  ref={autocomplete}
                                  disabled={!allSubcategories}
                                  defaultValue={
                                    allSubcategories[
                                      defaultSubcategoryindex
                                    ]
                                  }
                                  id="sub-category"
                                  name="subcategory"
                                  onChange={(event, value) => {
                                    if (value) {
                                      const id = value._id;
                                      setFieldValue('subcategory', id);
                                    }
                                  }}
                                  options={
                                    allSubcategories
                                      ? allSubcategories
                                      : ''
                                  }
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
                                        errors.subcategory &&
                                          touched.subcategory,
                                      )}
                                      helperText={
                                        errors.subcategory &&
                                        touched.subcategory &&
                                        String(errors.subcategory)
                                      }
                                    />
                                  )}
                                />
                              </>
                            ) : null
                          ) : null}
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          style={{ marginBottom: '20px' }}
                        >
                          {defaultflavoursindex ? (
                            <>
                              {console.log(
                                'flavours default: ',
                                defaultflavoursindex.map(
                                  index => flavours[index],
                                ),
                              )}
                              <Autocomplete
                                ref={flavourAutoComplete}
                                disabled={hasAllFlavours}
                                defaultValue={defaultflavoursindex.map(
                                  index => flavours[index],
                                )}
                                id="flavour"
                                multiple
                                name="flavours"
                                onChange={(event, value) => {
                                  handleFlavourAutoComplete(value);
                                }}
                                options={flavours}
                                getOptionLabel={option => option.name}
                                filterSelectedOptions
                                renderInput={params => (
                                  <TextField
                                    {...params}
                                    variant="outlined"
                                    name="flavours"
                                    label="Flavours"
                                    placeholder="choose from list"
                                    error={Boolean(
                                      errors.flavours && touched.flavours,
                                    )}
                                    helperText={
                                      errors.flavours &&
                                      touched.flavours &&
                                      String(errors.flavours)
                                    }
                                  />
                                )}
                              />
                            </>
                          ) : (
                            <Autocomplete
                              ref={flavourAutoComplete}
                              disabled={hasAllFlavours}
                              id="flavour"
                              multiple
                              name="flavours"
                              onChange={(event, value) => {
                                handleFlavourAutoComplete(value);
                              }}
                              options={flavours}
                              getOptionLabel={option => option.name}
                              filterSelectedOptions
                              renderInput={params => (
                                <TextField
                                  {...params}
                                  variant="outlined"
                                  name="flavours"
                                  label="Flavours"
                                  placeholder="choose from list"
                                  error={Boolean(
                                    errors.flavours && touched.flavours,
                                  )}
                                  helperText={
                                    errors.flavours &&
                                    touched.flavours &&
                                    String(errors.flavours)
                                  }
                                />
                              )}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={1}>
                        <Grid item sm={6} xs={12}>
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
                              errors.price &&
                              touched.price &&
                              String(errors.price)
                            }
                          />
                        </Grid>
                        <Grid item sm={3} xs={12}>
                          <TextField
                            required
                            fullWidth
                            type="number"
                            id="displayPrice"
                            name="displayPrice"
                            {...getFieldProps('displayPrice')}
                            label="Display Price"
                            variant="outlined"
                            error={Boolean(
                              errors.displayPrice && touched.displayPrice,
                            )}
                            helperText={
                              errors.displayPrice &&
                              touched.displayPrice &&
                              String(errors.displayPrice)
                            }
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
                    <Grid xs={12} style={{ marginTop: '2%' }}>
                      {productsEdit && productsEdit.loading ? (
                        <CircularProgress
                          style={{ color: '#09799C' }}
                          size={25}
                        />
                      ) : (
                        <>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                          >
                            Update
                          </Button>
                          <Button
                            type="reset"
                            variant="contained"
                            style={{ marginLeft: '30px' }}
                            onClick={({ resetForm }) =>
                              handleFormReset(resetForm)
                            }
                          >
                            Reset Form
                          </Button>
                        </>
                      )}
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>

            <Grid item xs={12} spacing={2}>
              <hr />
              {console.log('pi', productImages.images)}
              <h5 style={{ fontSize: '1.25rem', marginTop: 0 }}>
                Edit Images
                <hr align="left" style={{ width: '20%' }} />
              </h5>
              <form onSubmit={handleProductImageUpdate}>
                <Grid container className="mb-4">
                  <Grid item xs={12}>
                    <div className="error-message">
                      {productsImageEdit &&
                      productsImageEdit.error &&
                      productsImageEdit.error.response &&
                      productsImageEdit.error.response.data &&
                      productsImageEdit.error.response.data.message ? (
                        <p style={{ marginBottom: '30px' }}>
                          {productsImageEdit.error.response.data.message}
                        </p>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid item>
                      <p>Existing product images</p>
                    </Grid>
                    <Grid item xs={12} container>
                      {productImages
                        ? productImages.images
                          ? productImages.images.map((image, index) => {
                              return (
                                <Grid item>
                                  <>
                                    <div style={{}}>
                                      <img
                                        src={image_url + image}
                                        style={{
                                          width: '80px',
                                          height: '80px',
                                        }}
                                      />
                                      <IconButton
                                        onClick={() =>
                                          handleProductImageRemove(index)
                                        }
                                      >
                                        <HighlightOffIcon />
                                      </IconButton>
                                    </div>
                                  </>
                                </Grid>
                              );
                            })
                          : null
                        : null}
                    </Grid>
                  </Grid>

                  <Grid item container xs={12}>
                    <Grid item xs={12}>
                      <hr />
                      <p className="mt-3">New product images</p>
                    </Grid>
                    <Grid item xs={12} container>
                      <Files
                        required
                        multiple
                        convertToBase64
                        maxSize={FileConfig.upload_size_max}
                        accept={FileConfig.file_type}
                        onSuccess={file => handleMediaFileEdit(file)}
                        onError={errors => setMediaError(errors)}
                      >
                        {({ browseFiles }) => (
                          <>
                            {mediaFileEdit.images.length > 0 ? (
                              <>
                                {mediaFileEdit.images.map(
                                  (image, index) => {
                                    return (
                                      <Grid item xs={3}>
                                        <div
                                          style={{
                                            position: 'relative',
                                          }}
                                        >
                                          <img
                                            src={image.src.base64}
                                            style={{
                                              width: '80px',
                                              height: '80px',
                                            }}
                                          />
                                          <IconButton
                                            onClick={() =>
                                              handleMediaRemoveEdit(index)
                                            }
                                          >
                                            <HighlightOffIcon />
                                          </IconButton>
                                        </div>
                                      </Grid>
                                    );
                                  },
                                )}
                                <Grid item xs={3} className="pt-3">
                                  <Button
                                    variant="outlined"
                                    onClick={browseFiles}
                                    startIcon={<AddAPhotoIcon />}
                                  >
                                    Add Image
                                  </Button>
                                </Grid>
                              </>
                            ) : (
                              <Grid item xs={3} className="pt-3">
                                <Button
                                  variant="outlined"
                                  onClick={browseFiles}
                                  startIcon={<AddAPhotoIcon />}
                                >
                                  Add Image
                                </Button>
                              </Grid>
                            )}
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
                </Grid>

                <Grid item xs={12}>
                  {productsEdit && productsEdit.loading ? (
                    <CircularProgress
                      style={{ color: '#09799C' }}
                      size={25}
                    />
                  ) : (
                    <div className="text-left">
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Update all images
                      </Button>
                    </div>
                  )}
                </Grid>
              </form>
            </Grid>

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
