/*
 * Admin Categories
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useState, useRef, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { MDBInput, MDBCol } from 'mdbreact';
import Table from '@material-ui/core/Table';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Formik, Form, Field } from 'formik';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Files from 'react-butterfiles';
import imageCompression from 'browser-image-compression';
import {
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Tabs,
  Tab,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AdminSidebar from '../../../components/AdminSideBar';
import TopBar from '../../../components/TopBar/TopBar';
import { AdminCategorySchema, AdminSubCategorySchema } from '../../../config/validationSchemas';
import { browserRedirect } from '../../../helpers/helpers';
import { FileConfig } from '../../../config/fileconfig.js';
import { image_url } from '../../../config/urls.js';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  adminCategoryFetch,
  adminCategoryAdd,
  adminCategoryEdit,
  adminCategoryDelete,
  adminSubCategoryFetch,
  adminSubCategoryAdd,
  adminSubCategoryEdit,
  adminSubCategoryDelete,
  adminCategoryRemoveError,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core';
import {
  makeSelectCategory,
  makeSelectLoading,
  makeSelectError,
  makeSelectCategoryAdd,
  makeSelectCategoryEdit,
  makeSelectCategoryDelete,
  makeSelectSubCategory,
  makeSelectSubCategoryAdd,
  makeSelectSubCategoryEdit,
  makeSelectSubCategoryDelete,
} from './selectors';

import './admin-categories.css';
import PageTitle from '../../../components/PageTitle';

const addicon = require('../../../images/add_white.svg');
const removeicon = require('../../../images/remove_black.svg');
const deleteicon = require('../../../images/delete_white.svg');

const key = 'admincategories';

export function AdminCategories({
  loading,
  error,
  category,
  categoryAdd,
  categoryEdit,
  categoryDelete,
  subcategory,
  subcategoryAdd,
  subcategoryEdit,
  subcategoryDelete,
  onFetchCategory,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  onFetchSubCategory,
  onAddSubCategory,
  onEditSubCategory,
  onDeleteSubCategory,
  onRemoveError,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [editCategoryModal, setEditCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaFile2, setMediaFile2] = useState(null);
  const [mediaError, setMediaError] = useState(null);
  const [mediaError2, setMediaError2] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const AddCategoryForm = useRef(null);
  const EditCategoryForm = useRef(null);
  const AddSubCategoryForm = useRef(null);
  const EditSubCategoryForm = useRef(null);
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    // if (username && username.trim().length > 0) onSubmitForm();
    onFetchCategory();
    onFetchSubCategory();
  }, []);

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    // if (username && username.trim().length > 0) onSubmitForm();

    console.log('category/', category);
    if (category) {
      setCategories(
        category.filter(
          item =>
            item && item.name.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    }
  }, [search, category]);

  const handleAddCategoryModalOpen = () => {
    setAddCategoryModal(true);
  };

  const handleAddCategoryModalClose = () => {
    setMediaFile(null);
    setMediaFile2(null);
    setSelectedCategory('');
    onRemoveError();
    setAddCategoryModal(false);
  };

  const handleEditCategoryModalOpen = (id, name, image, category) => {
    setSelectedId(id);
    setSelectedName(name);
    setSelectedImage(image);
    setSelectedCategory(category);
    setEditCategoryModal(true);
  };

  const handleEditCategoryModalClose = () => {
    setMediaFile(null);
    setMediaFile2(null);
    setSelectedCategory('');
    onRemoveError();
    setEditCategoryModal(false);
  };

  const handleDeleteCategoryModalOpen = () => {
    setDeleteCategoryModal(true);
  };

  const handleDeleteCategoryModalClose = () => {
    onRemoveError();
    setDeleteCategoryModal(false);
  };

  function handleMediaFile(file, options) {
    console.log('file', file);

    var options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1280,
      useWebWorker: true,
    };

    console.log('image file', file.src.file);

    imageCompression(file.src.file, options)
      .then(function(compressedFile) {
        compressedFile = new File([compressedFile], file.src.file.name, {
          type: file.src.file.type,
        });
        console.log('file before replacing', file.src.file);
        file.src.file = compressedFile;
        console.log('file after replacing', file.src.file);
        setMediaFile(file);
      })
      .catch(function(error) {
        alert('Something went wrong.');
        console.log(error.message);
      });
    setMediaError([]);
  }

  function handleMediaFile2(file, options) {
    console.log('file', file);

    var options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1280,
      useWebWorker: true,
    };

    console.log('image file', file.src.file);

    imageCompression(file.src.file, options)
      .then(function(compressedFile) {
        compressedFile = new File([compressedFile], file.src.file.name, {
          type: file.src.file.type,
        });
        console.log('file before replacing', file.src.file);
        file.src.file = compressedFile;
        console.log('file after replacing', file.src.file);
        setMediaFile2(file);
      })
      .catch(function(error) {
        alert('Something went wrong.');
        console.log(error.message);
      });
    setMediaError2([]);
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

  const handleSelectCategory = event => {
    setSelectedCategory(event.target.value);
  };

  const handleMediaRemove = () => {
    setMediaFile(null);
  };

  const handleMediaRemove2 = () => {
    setMediaFile2(null);
  };

  const handleAddCategory = () => {
    let formData = new FormData(AddCategoryForm.current);
    formData.append('image', mediaFile.src.file);
    console.log(
      'data to be sent in form',
      formData.getAll('image'),
      formData.get('name'),
    );
    onAddCategory(formData, handleAddCategoryModalClose);
  };

  const handleEditCategory = () => {
    let formData = new FormData(EditCategoryForm.current);
    formData.append('id', selectedId);
    if (mediaFile) {
      formData.append('image', mediaFile.src.file);
    }
    console.log(
      'data to be sent in form',
      formData.get('image'),
      formData.get('name'),
      formData.get('id'),
    );
    onEditCategory(formData, handleEditCategoryModalClose);
  };

  const handleDeleteCategory = () => {
    onDeleteCategory(
      { id: selectedId },
      handleEditCategoryModalClose,
      handleDeleteCategoryModalClose,
    );
  };

  const handleAddSubCategory = () => {
    let formData = new FormData(AddSubCategoryForm.current);
    formData.append('image', mediaFile2.src.file);
    formData.append('parentCategoryId', selectedCategory);
    console.log(
      'data to be sent in form',
      formData.getAll('image'),
      formData.get('name'),
      formData.get('parentCategoryId'),
    );
    onAddSubCategory(formData, handleAddCategoryModalClose);
  };

  const handleEditSubCategory = () => {
    let formData = new FormData(EditSubCategoryForm.current);
    formData.append('id', selectedId);
    if (mediaFile) {
      formData.append('image', mediaFile.src.file);
    }
    if (selectedCategory) {
      formData.append('parentCategoryId', selectedCategory);
    }
    console.log(
      'data to be sent in form',
      formData.get('image'),
      formData.get('name'),
      formData.get('id'),
      formData.get('parentCategoryId'),
    );
    onEditSubCategory(formData, handleEditCategoryModalClose);
  };

  const handleDeleteSubCategory = () => {
    onDeleteSubCategory(
      { id: selectedId },
      handleEditCategoryModalClose,
      handleDeleteCategoryModalClose,
    );
  };

  // const categories = category.filter(item =>{
  //   return item.name.toLowerCase().include( search.toLowerCase())
  // })

  return (
    <Grid container className="body">
      {error &&
      error.response &&
      error.response.data &&
      error.response.data.statusCode === 401
        ? browserRedirect('/admin/profile')
        : null}
     
      <Grid item xs={12} style={{marginBottom: '60px'}}>
        <TopBar />
      </Grid>
      <Grid item xs={2}>
        <AdminSidebar />
      </Grid>
      <Grid item xs={10}>
        <br />
        <PageTitle name="Categories" />

        <div className="md-form mt-0">
          {/* <Input label="Search" icon="search" onChange={ e => setSearch(e.target.value)}/> */}
        </div>
        {loading ? (
          <div className="loader">
            <CircularProgress style={{ color: '#09799C' }} />
          </div>
        ) : error &&
          error.response &&
          error.response.data &&
          error.response.data.message ? (
            <div className="error-message">
              <p>{error.response.data.message}</p>
            </div>
          ) : (
          <>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6">
                  <MDBCol md="6">
                    <MDBInput
                      hint="Search"
                      type="text"
                      containerClass="mt-0"
                      onChange={e => setSearch(e.target.value)}
                    />
                  </MDBCol>
                </div>
                <div className="col-md-6">
                  <div style={{ textAlign: 'right' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginRight: '10px' }}
                    >
                      <RefreshIcon onClick={onFetchCategory} />
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleAddCategoryModalOpen}
                    >
                      ADD
                    </Button>
                  </div>
                </div>

                <div style={{ padding: '2%' }}>
                  {category ? (
                    <Grid container>
                      {categories.map((item, index) => (
                          <Grid
                            key={index}
                            item
                            xs={2}
                            style={{ marginBottom: '30px' }}
                          >
                            <Dropdown
                              as={ButtonGroup}
                              className="Dropdown-Width"
                            >
                              <Button
                                className="Dropdown"
                                onClick={() =>
                                  handleEditCategoryModalOpen(
                                    item._id,
                                    item.name,
                                    item.image,
                                  )
                                }
                              >
                                {item.name}
                              </Button>
                              <Dropdown.Toggle
                                split
                                className="Dropdown"
                                id="dropdown-split-basic"
                              />
                              <Dropdown.Menu>
                                {subcategory ? (
                                  subcategory.map((subitem, index) => {
                                    return subitem.parentCategoryId ===
                                      item._id ? (
                                      <Dropdown.Item
                                        style={{
                                          overflow:
                                            'scroll',
                                        }}
                                        onClick={() =>
                                          handleEditCategoryModalOpen(
                                            subitem._id,
                                            subitem.name,
                                            subitem.image,
                                            subitem.parentCategoryId,
                                          )
                                        }
                                      >
                                        {
                                          subitem.name
                                        }
                                      </Dropdown.Item>
                                    ) : null;
                                  })
                                ) : (
                                  <Dropdown.Item className="text-center">
                                    No Sub-Category
                                  </Dropdown.Item>
                                )}
                              </Dropdown.Menu>
                            </Dropdown>
                            {/* <h1 className="table-head" style={{ width: 'fit-content', cursor: 'pointer' }} onClick={() => handleEditCategoryModalOpen(item._id, item.name, item.image)}>{item.name}</h1> */}
                          </Grid>
                        ))}
                    </Grid>
                  ) : (
                    // <h2 className="text-center">No category</h2>
                    <div className="error-message">
                    {
                    error &&
                    error.response &&
                    error.response.data &&
                    error.response.data.message ? (
                      <p style={{ marginBottom: '30px' }}>
                        {error.response.data.message}
                      </p>
                    ) :  <CircularProgress />}
                  </div>
                  )}
                </div>
              </div>
            </div>
          </>
          )}
      </Grid>
      <Modal
        open={addCategoryModal}
        onClose={handleAddCategoryModalClose}
        aria-labelledby="add-category-modal"
        aria-describedby="to-add-category"
        disableBackdropClick
        disableEscapeKeyDown
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={addCategoryModal}>
          <div className="admin-modal">
            <Tabs
              defaultActiveKey={1}
              id="uncontrolled-tab-example"
              style={{
                flex: 1,
                justifyContent: 'space-around',
                flexDirection: 'row',
              }}
            >
              <Tab eventKey={1} title="Category" style={{ flex: 1 }}>
                <br />
                <h1 style={{ fontSize: '24px', marginTop: 0 }}>Add Category</h1>
                <hr className="line" align="left" />
                <Formik
                  initialValues={{ name: '' }}
                  validationSchema={AdminCategorySchema}
                  onSubmit={values => handleAddCategory(values)}
                >
                  {({ errors, touched, handleChange, handleBlur }) => (
                    <Form ref={AddCategoryForm}>
                      <Grid container>
                        <div className="error-message">
                          {categoryAdd &&
                          categoryAdd.error &&
                          categoryAdd.error.response &&
                          categoryAdd.error.response.data &&
                          categoryAdd.error.response.data.message ? (
                              <p style={{ marginBottom: '30px' }}>
                                {categoryAdd.error.response.data.message}
                              </p>
                            ) : null}
                        </div>
                        <Grid item xs={12} style={{ marginBottom: '20px' }}>
                          <Field validateOnBlur validateOnChange name="name">
                            {({ field, form }) => (
                              <TextField
                                fullWidth
                                name="name"
                                label="Category Name"
                                variant="outlined"
                                error={Boolean(
                                  form.errors.name && form.touched.name,
                                )}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={
                                  form.errors.name &&
                                  form.touched.name &&
                                  String(form.errors.name)
                                }
                              />
                            )}
                          </Field>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          style={{
                            marginBottom: '20px',
                            position: 'relative',
                          }}
                        >
                          <Files
                            convertToBase64
                            maxSize={FileConfig.upload_size_max}
                            accept={FileConfig.file_type}
                            onSuccess={file => handleMediaFile(file[0])}
                            onError={errors => setMediaError(errors)}
                          >
                            {({ browseFiles }) => (
                              <>
                                {mediaFile ? (
                                  <>
                                    <img
                                      src={mediaFile.src.base64}
                                      style={{
                                        width: '100px',
                                        height: '100px',
                                      }}
                                    />
                                    <br />
                                    <img
                                      src={removeicon}
                                      onClick={handleMediaRemove}
                                      className="remove-media-icon"
                                    />
                                  </>
                                ) : (
                                  <div onClick={browseFiles}>
                                    <span
                                      style={{
                                        cursor: 'pointer',
                                        color: '#09799C',
                                      }}
                                    >
                                      Add Image
                                    </span>
                                  </div>
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
                      {categoryAdd && categoryAdd.loading ? (
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
                            ADD
                          </Button>
                          <Button
                            type="button"
                            variant="contained"
                            style={{ marginLeft: '30px' }}
                            onClick={handleAddCategoryModalClose}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                    </Form>
                  )}
                </Formik>
              </Tab>
              <Tab eventKey={2} title="Sub Category" style={{ flex: 1 }}>
                <br />
                <h1 style={{ fontSize: '24px', marginTop: 0 }}>
                  Add Sub Category
                </h1>
                <hr className="line" align="left" />
                <Formik
                  initialValues={{ name: '' }}
                  validationSchema={AdminSubCategorySchema}
                  onSubmit={values => handleAddSubCategory(values)}
                >
                  {({ errors, touched, handleChange, handleBlur }) => (
                    <Form ref={AddSubCategoryForm}>
                      <Grid container>
                        <div className="error-message">
                          {subcategoryAdd &&
                          subcategoryAdd.error &&
                          subcategoryAdd.error.response &&
                          subcategoryAdd.error.response.data &&
                          subcategoryAdd.error.response.data.message ? (
                              <p style={{ marginBottom: '30px' }}>
                                {subcategoryAdd.error.response.data.message}
                              </p>
                            ) : null}
                        </div>
                        <Grid item xs={12} style={{ marginBottom: '20px' }}>
                          <FormControl variant="outlined" fullWidth>
                            <InputLabel id="select-category-label">
                              Category
                            </InputLabel>
                            <Select
                              required
                              labelId="select-category-label"
                              id="select-category"
                              label="Category"
                              value={selectedCategory}
                              onChange={handleSelectCategory}
                            >
                              {category &&
                                category.map((item, index) => (
                                  <MenuItem key={index} value={item._id}>
                                    <ListItemText primary={item.name} />
                                  </MenuItem>
                                ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} style={{ marginBottom: '20px' }}>
                          <Field validateOnBlur validateOnChange name="name">
                            {({ field, form }) => (
                              <TextField
                                fullWidth
                                name="name"
                                label="Sub Category Name"
                                variant="outlined"
                                error={Boolean(
                                  form.errors.name && form.touched.name,
                                )}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={
                                  form.errors.name &&
                                  form.touched.name &&
                                  String(form.errors.name)
                                }
                              />
                            )}
                          </Field>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          style={{
                            marginBottom: '20px',
                            position: 'relative',
                          }}
                        >
                          <Files
                            convertToBase64
                            maxSize={FileConfig.upload_size_max}
                            accept={FileConfig.file_type}
                            onSuccess={file => handleMediaFile2(file[0])}
                            onError={errors => setMediaError2(errors)}
                          >
                            {({ browseFiles }) => (
                              <>
                                {mediaFile2 ? (
                                  <>
                                    <img
                                      src={mediaFile2.src.base64}
                                      style={{
                                        width: '100px',
                                        height: '100px',
                                      }}
                                    />
                                    <br />
                                    <img
                                      src={removeicon}
                                      onClick={handleMediaRemove}
                                      className="remove-media-icon"
                                    />
                                  </>
                                ) : (
                                  <div onClick={browseFiles}>
                                    <span
                                      style={{
                                        cursor: 'pointer',
                                        color: '#09799C',
                                      }}
                                    >
                                      Add Image
                                    </span>
                                  </div>
                                )}
                                {mediaError2 &&
                                  Object.keys(mediaError2).length > 0 &&
                                  mediaError2.map(error => (
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
                      {subcategoryAdd && subcategoryAdd.loading ? (
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
                            disabled={!mediaFile2}
                          >
                            Add
                          </Button>
                          <Button
                            type="button"
                            variant="contained"
                            style={{ marginLeft: '30px' }}
                            onClick={handleAddCategoryModalClose}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                    </Form>
                  )}
                </Formik>
              </Tab>
            </Tabs>
          </div>
        </Fade>
      </Modal>
      <Modal
        open={editCategoryModal}
        onClose={handleEditCategoryModalClose}
        aria-labelledby="edit-category-modal"
        aria-describedby="to-edit-category"
        disableBackdropClick
        disableEscapeKeyDown
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={editCategoryModal}>
          {selectedCategory ? (
            <div className="admin-modal">
              <Button
                variant="contained"
                color="primary"
                style={{ float: 'right' }}
                onClick={() =>
                  handleDeleteCategoryModalOpen(selectedName, selectedId)
                }
              >
                DELETE
              </Button>
              <h1 style={{ fontSize: '24px', marginTop: 0 }}>
                Edit Sub Category
              </h1>
              <hr className="line" align="left" />
              <Formik
                enableReinitialize
                initialValues={{ name: selectedName }}
                validationSchema={AdminSubCategorySchema}
                onSubmit={values => handleEditSubCategory(values)}
              >
                {({ errors, touched, handleChange, handleBlur }) => (
                  <Form ref={EditSubCategoryForm}>
                    <Grid container style={{ width: '300px' }}>
                      <div className="error-message">
                        {subcategoryEdit &&
                        subcategoryEdit.error &&
                        subcategoryEdit.error.response &&
                        subcategoryEdit.error.response.data &&
                        subcategoryEdit.error.response.data.message ? (
                            <p style={{ marginBottom: '30px' }}>
                              {subcategoryEdit.error.response.data.message}
                            </p>
                          ) : null}
                      </div>
                      {/* <Grid item xs={12} style={{ marginBottom: '20px' }}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel id="select-category-label">Category</InputLabel>
                        <Select
                          required
                          labelId="select-category-label"
                          id="select-category"
                          label="Category"
                          value={selectedCategory}
                          onChange={handleSelectCategory}
                        >
                          {category && category.map((item, index) => (
                            <MenuItem key={index} value={item._id}>
                              <ListItemText primary={item.name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: '20px' }}>
                      <Field
                        validateOnBlur
                        validateOnChange
                        name="name"
                      >
                        {({ field, form }) => (
                          <TextField
                            fullWidth
                            name={"name"}
                            label="Name"
                            defaultValue={selectedName}
                            variant="outlined"
                            error={
                              Boolean(form.errors.name && form.touched.name)
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              form.errors.name &&
                              form.touched.name &&
                              String(form.errors.name)
                            }
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: '20px' }}>
                      <div style={{ float: 'left' }}>
                        <p>Current Image</p>
                        <img
                          src={image_url + selectedImage}
                          style={{ width: '100px', height: '100px' }}
                        />
                      </div> */}
                      <Grid item xs={12} style={{ marginBottom: '20px' }}>
                        <FormControl variant="outlined" fullWidth>
                          <InputLabel id="select-category-label">
                            Category
                          </InputLabel>
                          <Select
                            required
                            labelId="select-category-label"
                            id="select-category"
                            label="Category"
                            value={selectedCategory}
                            onChange={handleSelectCategory}
                          >
                            {category.map((item, index) => (
                              <MenuItem key={index} value={item._id}>
                                <ListItemText primary={item.name} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} style={{ marginBottom: '20px' }}>
                        <Field validateOnBlur validateOnChange name="name">
                          {({ field, form }) => (
                            <TextField
                              fullWidth
                              name="name"
                              label="Name"
                              defaultValue={selectedName}
                              variant="outlined"
                              error={Boolean(
                                form.errors.name && form.touched.name,
                              )}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              helperText={
                                form.errors.name &&
                                form.touched.name &&
                                String(form.errors.name)
                              }
                            />
                          )}
                        </Field>
                      </Grid>
                      <Grid item xs={12} style={{ marginBottom: '20px' }}>
                        <div style={{ float: 'left' }}>
                          <p>Current Image</p>
                          <img
                            src={image_url + selectedImage}
                            style={{ width: '100px', height: '100px' }}
                          />
                        </div>
                        <div style={{ float: 'left', marginLeft: '20px' }}>
                          <Files
                            convertToBase64
                            maxSize={FileConfig.upload_size_max}
                            accept={FileConfig.file_type}
                            onSuccess={file => handleMediaFile(file[0])}
                            onError={errors => setMediaError(errors)}
                          >
                            {({ browseFiles }) => (
                              <>
                                {mediaFile ? (
                                  <>
                                    <p>New Image</p>
                                    <div style={{ position: 'relative' }}>
                                      <img
                                        src={mediaFile.src.base64}
                                        style={{
                                          width: '100px',
                                          height: '100px',
                                        }}
                                      />
                                      <br />
                                      <img
                                        src={removeicon}
                                        onClick={handleMediaRemove}
                                        className="remove-media-icon"
                                      />
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <p style={{ visibility: 'hidden' }}>
                                      New Image
                                    </p>
                                    <div
                                      className="update-image"
                                      onClick={browseFiles}
                                    >
                                      <p style={{ margin: '22px' }}>
                                        Update <br />
                                        Image
                                      </p>
                                    </div>
                                  </>
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
                        </div>
                      </Grid>
                      {/* </Grid> */}
                      {subcategoryEdit && subcategoryEdit.loading ? (
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
                            type="button"
                            variant="contained"
                            style={{ marginLeft: '30px' }}
                            onClick={handleEditCategoryModalClose}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                    </Grid>
                  </Form>
                )}
              </Formik>
            </div>
          ) : (
            <div className="admin-modal">
              <Button
                variant="contained"
                color="primary"
                style={{ float: 'right' }}
                onClick={() =>
                  handleDeleteCategoryModalOpen(selectedName, selectedId)
                }
              >
                DELETE
              </Button>
              <h1 style={{ fontSize: '24px', marginTop: 0 }}>Edit Category</h1>
              <hr className="line" align="left" />
              <Formik
                enableReinitialize
                initialValues={{ name: selectedName }}
                validationSchema={AdminCategorySchema}
                onSubmit={values => handleEditCategory(values)}
              >
                {({ errors, touched, handleChange, handleBlur }) => (
                  <Form ref={EditCategoryForm}>
                    <Grid container style={{ width: '300px' }}>
                      <div className="error-message">
                        {categoryEdit &&
                        categoryEdit.error &&
                        categoryEdit.error.response &&
                        categoryEdit.error.response.data &&
                        categoryEdit.error.response.data.message ? (
                            <p style={{ marginBottom: '30px' }}>
                              {categoryEdit.error.response.data.message}
                            </p>
                          ) : null}
                      </div>
                      <Grid item xs={12} style={{ marginBottom: '20px' }}>
                        <Field validateOnBlur validateOnChange name="name">
                          {({ field, form }) => (
                            <TextField
                              fullWidth
                              name="name"
                              label="Name"
                              defaultValue={selectedName}
                              variant="outlined"
                              error={Boolean(
                                form.errors.name && form.touched.name,
                              )}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              helperText={
                                form.errors.name &&
                                form.touched.name &&
                                String(form.errors.name)
                              }
                            />
                          )}
                        </Field>
                      </Grid>
                      <Grid item xs={12} style={{ marginBottom: '20px' }}>
                        <div style={{ float: 'left' }}>
                          <p>Current Image</p>
                          <img
                            src={image_url + selectedImage}
                            style={{ width: '100px', height: '100px' }}
                          />
                        </div>
                        <div style={{ float: 'left', marginLeft: '20px' }}>
                          <Files
                            convertToBase64
                            maxSize={FileConfig.upload_size_max}
                            accept={FileConfig.file_type}
                            onSuccess={file => handleMediaFile(file[0])}
                            onError={errors => setMediaError(errors)}
                          >
                            {({ browseFiles }) => (
                              <>
                                {mediaFile ? (
                                  <>
                                    <p>New Image</p>
                                    <div style={{ position: 'relative' }}>
                                      <img
                                        src={mediaFile.src.base64}
                                        style={{
                                          width: '100px',
                                          height: '100px',
                                        }}
                                      />
                                      <br />
                                      <img
                                        src={removeicon}
                                        onClick={handleMediaRemove}
                                        className="remove-media-icon"
                                      />
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <p style={{ visibility: 'hidden' }}>
                                      New Image
                                    </p>
                                    <div
                                      className="update-image"
                                      onClick={browseFiles}
                                    >
                                      <p style={{ margin: '22px' }}>
                                        Update <br />
                                        Image
                                      </p>
                                    </div>
                                  </>
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
                        </div>
                      </Grid>
                    </Grid>
                    {categoryEdit && categoryEdit.loading ? (
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
                          type="button"
                          style={{ marginLeft: '30px' }}
                          variant="contained"
                          onClick={handleEditCategoryModalClose}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </Form>
                )}
              </Formik>
            </div>
          )}
        </Fade>
      </Modal>
      <Modal
        open={deleteCategoryModal}
        onClose={handleDeleteCategoryModalClose}
        aria-labelledby="delete-category-modal"
        aria-describedby="to-delete-category"
        disableBackdropClick
        disableEscapeKeyDown
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={deleteCategoryModal}>
          {selectedCategory ? (
            <div className="admin-modal">
              <h1 style={{ fontSize: '24px', marginTop: 0 }}>
                Delete Sub Category
              </h1>
              <hr className="line" align="left" />
              <div className="error-message">
                {subcategoryDelete &&
                subcategoryDelete.error &&
                subcategoryDelete.error.response &&
                subcategoryDelete.error.response.data &&
                subcategoryDelete.error.response.data.message ? (
                    <p style={{ marginBottom: '30px' }}>
                      {subcategoryDelete.error.response.data.message}
                    </p>
                  ) : null}
              </div>
              <h4 style={{ fontSize: '20px', color: 'red' }}>
                By deleting the sub category, its products will be automatically
                deleted.
              </h4>
              <h4 style={{ fontSize: '20px' }}>
                Are you sure that you want to delete <i>{selectedName}</i> ?
              </h4>
              {subcategoryDelete && subcategoryDelete.loading ? (
                <CircularProgress style={{ color: '#09799C' }} size={25} />
              ) : (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDeleteSubCategory}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    style={{ marginLeft: '30px' }}
                    onClick={handleDeleteCategoryModalClose}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
          ) : (
            <div className="admin-modal">
              <h1 style={{ fontSize: '24px', marginTop: 0 }}>
                Delete Category
              </h1>
              <hr className="line" align="left" />
              <div className="error-message">
                {categoryDelete &&
                categoryDelete.error &&
                categoryDelete.error.response &&
                categoryDelete.error.response.data &&
                categoryDelete.error.response.data.message ? (
                    <p style={{ marginBottom: '30px' }}>
                      {categoryDelete.error.response.data.message}
                    </p>
                  ) : null}
              </div>
              <h4 style={{ fontSize: '20px', color: 'red' }}>
                By deleting the category, its subcategories and its products
                will be automatically deleted.
              </h4>
              <h4 style={{ fontSize: '20px' }}>
                Are you sure that you want to delete <i>{selectedName}</i> ?
              </h4>
              {categoryDelete && categoryDelete.loading ? (
                <CircularProgress style={{ color: '#09799C' }} size={25} />
              ) : (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDeleteCategory}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    style={{ marginLeft: '30px' }}
                    onClick={handleDeleteCategoryModalClose}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
          )}
        </Fade>
      </Modal>
    </Grid>
  );
}

AdminCategories.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // category: PropTypes.oneOfType([PropTypes.object]),
  categoryAdd: PropTypes.object,
  categoryEdit: PropTypes.object,
  categoryDelete: PropTypes.object,
  // subcategory: PropTypes.oneOfType([PropTypes.object]),
  subcategoryAdd: PropTypes.object,
  subcategoryEdit: PropTypes.object,
  subcategoryDelete: PropTypes.object,
  onFetchCategory: PropTypes.func,
  onAddCategory: PropTypes.func,
  onEditCategory: PropTypes.func,
  onDeleteCategory: PropTypes.func,
  onFetchSubCategory: PropTypes.func,
  onAddSubCategory: PropTypes.func,
  onEditSubCategory: PropTypes.func,
  onDeleteSubCategory: PropTypes.func,
  onRemoveError: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  category: makeSelectCategory(),
  subcategory: makeSelectSubCategory(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  categoryAdd: makeSelectCategoryAdd(),
  categoryEdit: makeSelectCategoryEdit(),
  categoryDelete: makeSelectCategoryDelete(),
  subcategoryAdd: makeSelectSubCategoryAdd(),
  subcategoryEdit: makeSelectSubCategoryEdit(),
  subcategoryDelete: makeSelectSubCategoryDelete(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onFetchCategory: () => {
      dispatch(adminCategoryFetch());
    },
    onAddCategory: (evt, closeAddCategoryModal) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(adminCategoryAdd(evt, closeAddCategoryModal));
    },
    onEditCategory: (evt, closeEditCategoryModal) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(adminCategoryEdit(evt, closeEditCategoryModal));
    },
    onDeleteCategory: (
      evt,
      closeEditCategoryModal,
      closeDeleteCategoryModal,
    ) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(
        adminCategoryDelete(
          evt,
          closeEditCategoryModal,
          closeDeleteCategoryModal,
        ),
      );
    },
    onFetchSubCategory: () => {
      dispatch(adminSubCategoryFetch());
    },
    onAddSubCategory: (evt, closeAddCategoryModal) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(adminSubCategoryAdd(evt, closeAddCategoryModal));
    },
    onEditSubCategory: (evt, closeEditSubCategoryModal) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(adminSubCategoryEdit(evt, closeEditSubCategoryModal));
    },
    onDeleteSubCategory: (
      evt,
      closeEditSubCategoryModal,
      closeDeleteSubCategoryModal,
    ) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(
        adminSubCategoryDelete(
          evt,
          closeEditSubCategoryModal,
          closeDeleteSubCategoryModal,
        ),
      );
    },
    onRemoveError: () => {
      dispatch(adminCategoryRemoveError());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AdminCategories);
