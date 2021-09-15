/*
 * Admin Promo Code
 *
 * This is the first thing users see of our App, at the '/' route
 */
import 'date-fns';
import React, { useState, useRef, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import TablePagination from '@material-ui/core/TablePagination';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Formik, Form, Field } from 'formik';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import {Fade, IconButton} from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import RefreshIcon from '@material-ui/icons/Refresh';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import BorderColorIcon from '@material-ui/icons/BorderColor';

import { useInjectReducer } from 'utils/injectReducer';
import AdminSidebar from '../../../components/AdminSideBar';
import TopBar from '../../../components/TopBar/TopBar';
import { AdminPromoCodeSchema } from '../../../config/validationSchemas';
import { browserRedirect, formatDate } from '../../../helpers/helpers';

import { useInjectSaga } from 'utils/injectSaga';
import {
  adminPromoCodeFetch,
  adminAllSubcategoriesFetch,
  adminPromoCodeAdd,
  adminPromoCodeEdit,
  adminPromoCodeDelete,
  adminPromoCodeRemoveError,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectPromoCode,
  makeSelectAllSubcategories,
  makeSelectLoading,
  makeSelectError,
  makeSelectPromoCodeAdd,
  makeSelectPromoCodeEdit,
  makeSelectPromoCodeDelete,
} from './selectors';

import './admin-promo-code.css';
import PageTitle from '../../../components/PageTitle';
import DeleteButton from '../../../components/DeleteButton';
import Autocomplete from '@material-ui/lab/Autocomplete';

const key = 'adminpromocode';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export function AdminPromoCode({
  loading,
  error,
  promoCode,
  allSubcategories,
  promoCodeAdd,
  promoCodeEdit,
  promoCodeDelete,
  onFetchPromoCode,
  onFetchAllSubcategories,
  onAddPromoCode,
  onEditPromoCode,
  onDeletePromoCode,
  onRemoveError,
  
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    console.log(event);
    setPage(0);
  };

  const [addPromoCodeModal, setAddPromoCodeModal] = useState(false);
  const [editPromoCodeModal, setEditPromoCodeModal] = useState(false);
  const [deletePromoCodeModal, setDeletePromoCodeModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedCode, setSelectedCode] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [selectedMaxDiscount, setSelectedMaxDiscount] = useState(null);
  const [selectedMinPurchase, setSelectedMinPurchase] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState(null);
  const [selectedIsEnabled, setSelectedIsEnabled] = useState(false);
  const [selectedIsInfluencer, setSelectedIsInfluencer] = useState(false);
  const [isAddStartDateOpen, setIsAddStartDateOpen] = useState(false);
  const [isAddEndDateOpen, setIsAddEndDateOpen] = useState(false);
  const [isEditStartDateOpen, setIsEditStartDateOpen] = useState(false);
  const [isEditEndDateOpen, setIsEditEndDateOpen] = useState(false);

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    // if (username && username.trim().length > 0) onSubmitForm();
    onFetchAllSubcategories();
    onFetchPromoCode();
  }, []);

  const handleAddPromoCodeModalOpen = () => {
    setAddPromoCodeModal(true);
  };

  const handleAddPromoCodeModalClose = () => {
    onRemoveError();
    setSelectedSubCategory([]);
    setAddPromoCodeModal(false);
  };

  const handleEditPromoCodeModalOpen = (
    id,
    code,
    subCategory,
    discount,
    maxDiscount,
    minPurchase,
    startDate,
    endDate,
    description,
    isEnabled,
    isInfluencer,
  ) => {
    console.log({subCategory})
    let selectedSubCategories = []
    for(let id of subCategory){
      const temp = allSubcategories.filter((subcategory, index) => subcategory._id == id)
      if(temp){
        selectedSubCategories.push(temp[0])
      }
    }
    console.log({selectedSubCategories})
    setSelectedId(id);
    setSelectedCode(code);
    setSelectedSubCategory({...selectedSubCategory, id: selectedSubCategories});
    setSelectedDiscount(discount);
    setSelectedMaxDiscount(maxDiscount);
    setSelectedMinPurchase(minPurchase);
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
    setSelectedDescription(description);
    setSelectedIsEnabled(isEnabled);
    setSelectedIsInfluencer(isInfluencer);
    setEditPromoCodeModal(true);
  };

  const handleEditPromoCodeModalClose = () => {
    setSelectedId(null);
    setSelectedCode(null);
    setSelectedDiscount(null);
    setSelectedMaxDiscount(null);
    setSelectedMinPurchase(null);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setSelectedDescription(null);
    setSelectedIsEnabled(false);
    setSelectedIsInfluencer(false);
    setEditPromoCodeModal(false);
  };

  const handleDeletePromoCodeModalOpen = (id, code) => {
    setSelectedId(id);
    setSelectedCode(code);
    setDeletePromoCodeModal(true);
  };

  const handleDeletePromoCodeModalClose = () => {
    onRemoveError();
    setSelectedId(null);
    setSelectedCode(null);
    setDeletePromoCodeModal(false);
  };

  const handleAddPromoCode = data => {
    data.subcategoryList = selectedSubCategory;
    data.isInfluencerBased = selectedIsInfluencer;
    data.validFrom = selectedStartDate.toISOString();
    data.validTo = selectedEndDate.toISOString();
    console.log('Add Promo Code data ', data);
    onAddPromoCode(data, handleAddPromoCodeModalClose);
  };

  const handleEditPromoCode = data => {
    
    data.id = selectedId;
    data.subcategoryList = selectedSubCategory;
    data.isEnabled = selectedIsEnabled;
    data.isInfluencerBased = selectedIsInfluencer;
    data.validFrom = new Date(selectedStartDate).toISOString();
    data.validTo = new Date(selectedEndDate).toISOString();
    console.log('Edit Promo Code data ', data);
    onEditPromoCode(data, handleEditPromoCodeModalClose);
  };

  const handleDeletePromoCode = () => {
    onDeletePromoCode({ id: selectedId }, handleDeletePromoCodeModalClose);
  };

  const handleEnableDisable = (
    id,
    code,
    subCategory,
    discount,
    maxDiscount,
    minPurchase,
    startDate,
    endDate,
    description,
    isInfluencer,
    value,
  ) => {
    setSelectedId(id);
    let obj = {};
    obj.id = id;
    obj.code = code;
    obj.subcategoryList = {};
    obj.subcategoryList.id = subCategory;
    obj.discountPercentage = discount;
    obj.maxDiscount = maxDiscount;
    obj.minPurchase = minPurchase;
    obj.validFrom = startDate;
    obj.validTo = endDate;
    obj.description = description;
    obj.isInfluencerBased = isInfluencer;
    obj.isEnabled = !value;
    onEditPromoCode(obj);
  };

  const handleSubCategoriesChange = async e => {
    let ids = e.map(subcategory => subcategory._id)
    await setSelectedSubCategory({...selectedSubCategory, id: ids});
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleStartDateChange = date => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = date => {
    setSelectedEndDate(date);
  };

  const handleIsInfluencerChange = event => {
    setSelectedIsInfluencer(event.target.checked);
  };

  function TextFieldWrap(props) {
    return (
      <TextField
        fullWidth
        required
        type="text"
        id={props.id}
        name={props.name}
        label={props.label}
        variant="outlined"
        value={props.value}
        onClick={props.onClick}
      />
    );
  }
  //console.log('subcategory: ', allSubcategories);
  return (
    <Grid container>
      {error &&
      error.response &&
      error.response.data &&
      error.response.data.statusCode === 401
        ? browserRedirect('/admin/profile')
        : null}
      <Grid item xs={12} style={{ marginBottom: '60px' }}>
        <TopBar />
      </Grid>
      <Grid item xs={2}>
        <AdminSidebar />
      </Grid>
      <Grid item xs={10}>
        <br />
        <PageTitle name="Promo Codes" />
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
            <div style={{ padding: '0% 2%' }}>
              <div style={{ textAlign: 'right' }}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginRight: '10px' }}
                >
                  <RefreshIcon onClick={onFetchPromoCode} />
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddPromoCodeModalOpen}
                >
                  ADD
                </Button>
              </div>
            </div>
            <div style={{ padding: '2%', overflowX: 'auto' }}>
              {promoCode ? (
                <Table>
                  <thead>
                    <tr>
                      <th className="table-head">
                        Code
                      </th>
                      <th className="table-head">Status</th>
                      <th className="table-head">Expiry Date</th>
                      <th className="table-head">Influencer Code</th>
                      <th className="table-head">Used By</th>
                      <th className="table-head">Enable</th>
                      <th className="table-head">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {promoCode &&
                      promoCode
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage,
                        )
                        .map((item, index) => (
                          <tr key={index}>
                            <td
                              className="table-body"
                              style={{ cursor: 'pointer' }}
                              onClick={() =>
                                handleEditPromoCodeModalOpen(
                                  item._id,
                                  item.code,
                                  item.subcategoryList,
                                  item.discountPercentage,
                                  item.maxDiscount,
                                  item.minPurchase,
                                  item.validFrom,
                                  item.validTo,
                                  item.description,
                                  item.isEnabled,
                                  item.isInfluencerBased,
                                )
                              }
                            >
                              <Button
                              color="default"
                              endIcon={ <BorderColorIcon fontSize='small' />}
                              >{item.code}
                              </Button>
                            </td>
                            <td className="table-body">
                              {new Date(item.validFrom) > new Date()
                                ? 'Yet to Live'
                                : new Date(item.validTo) >= new Date()
                                ? 'Active'
                                : 'Expired'}
                            </td>
                            <td className="table-body">
                              {formatDate(item.validTo)}
                            </td>
                            <td className="table-body">
                              {item.isInfluencerBased ? 'Yes' : 'No'}
                            </td>
                            <td className="table-body">
                              {item.usedByList.length}
                            </td>
                            <td className="table-body">
                              {selectedId == item._id &&
                              promoCodeEdit &&
                              promoCodeEdit.loading ? (
                                <CircularProgress
                                  style={{ color: '#09799C' }}
                                  size={25}
                                />
                              ) : (
                                <Switch
                                  disabled={
                                    new Date(item.validTo) < new Date()
                                  }
                                  checked={item.isEnabled}
                                  onChange={() =>
                                    handleEnableDisable(
                                      item._id,
                                      item.code,
                                      item.subcategoryList,
                                      item.discountPercentage,
                                      item.maxDiscount,
                                      item.minPurchase,
                                      item.validFrom,
                                      item.validTo,
                                      item.description,
                                      item.isInfluencerBased,
                                      item.isEnabled,
                                    )
                                  }
                                  color="default"
                                />
                              )}
                            </td>
                            <td className="table-body">
                              <DeleteButton
                                onClick={() =>
                                  handleDeletePromoCodeModalOpen(
                                    item._id,
                                    item.code,
                                  )
                                }
                              />
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </Table>
              ) : (
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
              <TablePagination
                rowsPerPageOptions={[5, 10, 20, 30, 40]}
                component="div"
                count={promoCode != undefined ? promoCode.length : 10}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </div>
          </>
        )}
      </Grid>

      {/* add promo code modal */}
      <Modal
        open={addPromoCodeModal}
        onClose={handleAddPromoCodeModalClose}
        aria-labelledby="add-promo-code-modal"
        aria-describedby="to-add-promo-code"
        disableBackdropClick
        disableEscapeKeyDown
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={addPromoCodeModal}>
          <div className="admin-modal">
            <h1 style={{ fontSize: '24px', marginTop: 0 }}>Add Promo Code</h1>
            <hr className="line" align="left" />
            <Formik
              initialValues={{
                code: '',
                discountPercentage: '',
                maxDiscount: '',
                minPurchase: '',
                description: '',
              }}
              validationSchema={AdminPromoCodeSchema}
              onSubmit={values => handleAddPromoCode(values)}
            >
              {({ errors, touched, handleChange, handleBlur }) => (
                <Form>
                  <Grid container style={{ width: '600px' }}>
                    <div className="error-message">
                      {promoCodeAdd &&
                      promoCodeAdd.error &&
                      promoCodeAdd.error.response &&
                      promoCodeAdd.error.response.data &&
                      promoCodeAdd.error.response.data.message ? (
                        <p style={{ marginBottom: '30px' }}>
                          {promoCodeAdd.error.response.data.message}
                        </p>
                      ) : null}
                    </div>
                    <Grid item xs={12}>
                      <Grid container spacing={1}>
                        <Grid item xs={6} style={{ marginBottom: '20px' }}>
                          <Field validateOnBlur validateOnChange name="code">
                            {({ field, form }) => (
                              <TextField
                                fullWidth
                                name="code"
                                label="Code"
                                variant="outlined"
                                error={Boolean(
                                  form.errors.code && form.touched.code,
                                )}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={
                                  form.errors.code &&
                                  form.touched.code &&
                                  String(form.errors.code)
                                }
                              />
                            )}
                          </Field>
                        </Grid>
                        <Grid item xs={6} style={{ marginBottom: '20px' }}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={selectedIsInfluencer}
                                onChange={handleIsInfluencerChange}
                                name="checkedB"
                                color="default"
                              />
                            }
                            label="Influencer Code"
                            style={{ margin: '5px 0px' }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={1}>
                        <Grid item xs={6} style={{ marginBottom: '20px' }}>
                          <FormControl variant="outlined" fullWidth>
                            <Autocomplete
                              id="tags-outlined"
                              multiple
                              onChange={(event, value) =>
                                handleSubCategoriesChange(value)
                              }
                              options={
                                allSubcategories ? allSubcategories : ''
                              }
                              filterSelectedOptions
                              getOptionLabel={option => option.name}
                              renderInput={params => (
                                <TextField
                                  {...params}
                                  variant="outlined"
                                  label="Sub Category"
                                  placeholder="choose from list"
                                />
                              )}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={6} style={{ marginBottom: '20px' }}>
                          <Field
                            validateOnBlur
                            validateOnChange
                            name="discountPercentage"
                          >
                            {({ field, form }) => (
                              <TextField
                                fullWidth
                                name="discountPercentage"
                                label="Discount(%)"
                                variant="outlined"
                                error={Boolean(
                                  form.errors.discountPercentage &&
                                    form.touched.discountPercentage,
                                )}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={
                                  form.errors.discountPercentage &&
                                  form.touched.discountPercentage &&
                                  String(form.errors.discountPercentage)
                                }
                              />
                            )}
                          </Field>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={1}>
                        <Grid item xs={6} style={{ marginBottom: '20px' }}>
                          <Field
                            validateOnBlur
                            validateOnChange
                            name="maxDiscount"
                          >
                            {({ field, form }) => (
                              <TextField
                                fullWidth
                                type="number"
                                name="maxDiscount"
                                label="Max Discount"
                                variant="outlined"
                                error={Boolean(
                                  form.errors.maxDiscount &&
                                    form.touched.maxDiscount,
                                )}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={
                                  form.errors.maxDiscount &&
                                  form.touched.maxDiscount &&
                                  String(form.errors.maxDiscount)
                                }
                              />
                            )}
                          </Field>
                        </Grid>
                        <Grid item xs={6} style={{ marginBottom: '20px' }}>
                          <Field
                            validateOnBlur
                            validateOnChange
                            name="minPurchase"
                          >
                            {({ field, form }) => (
                              <TextField
                                fullWidth
                                type="number"
                                name="minPurchase"
                                label="Min Purchase"
                                variant="outlined"
                                error={Boolean(
                                  form.errors.minPurchase &&
                                    form.touched.minPurchase,
                                )}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={
                                  form.errors.minPurchase &&
                                  form.touched.minPurchase &&
                                  String(form.errors.minPurchase)
                                }
                              />
                            )}
                          </Field>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={1}>
                        <Grid item xs={6} style={{ marginBottom: '20px' }}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                              disablePast
                              id="start-date-picker-dialog"
                              name="validFrom"
                              label="Start Date"
                              open={isAddStartDateOpen}
                              onOpen={() => setIsAddStartDateOpen(true)}
                              onClose={() => setIsAddStartDateOpen(false)}
                              format="MMM dd yyyy"
                              value={selectedStartDate || null}
                              onChange={handleStartDateChange}
                              TextFieldComponent={props =>
                                TextFieldWrap(props)
                              }
                            />
                          </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={6} style={{ marginBottom: '20px' }}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                              disablePast
                              id="end-date-picker-dialog"
                              name="validTo"
                              label="End Date"
                              open={isAddEndDateOpen}
                              onOpen={() => setIsAddEndDateOpen(true)}
                              onClose={() => setIsAddEndDateOpen(false)}
                              format="MMM dd yyyy"
                              value={selectedEndDate || null}
                              onChange={handleEndDateChange}
                              TextFieldComponent={props =>
                                TextFieldWrap(props)
                              }
                            />
                          </MuiPickersUtilsProvider>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: '20px' }}>
                      <Field
                        validateOnBlur
                        validateOnChange
                        name="description"
                      >
                        {({ field, form }) => (
                          <TextField
                            fullWidth
                            name="description"
                            label="Description"
                            variant="outlined"
                            error={Boolean(
                              form.errors.description &&
                                form.touched.description,
                            )}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              form.errors.description &&
                              form.touched.description &&
                              String(form.errors.description)
                            }
                          />
                        )}
                      </Field>
                    </Grid>
                  </Grid>
                  {promoCodeAdd && promoCodeAdd.loading ? (
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
                        Add
                      </Button>
                      <Button
                        type="button"
                        variant="contained"
                        style={{ marginLeft: '30px' }}
                        onClick={handleAddPromoCodeModalClose}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </Fade>
      </Modal>

      {/* Edit promo code modal */}
      <Modal
        open={editPromoCodeModal}
        onClose={handleEditPromoCodeModalClose}
        aria-labelledby="edit-promo-code-modal"
        aria-describedby="to-edit-promo-code"
        disableBackdropClick
        disableEscapeKeyDown
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={editPromoCodeModal}>
          <div className="admin-modal">
            <h1 style={{ fontSize: '24px', marginTop: 0 }}>
              Edit Promo Code
            </h1>
            <hr className="line" align="left" />
            <Formik
              enableReinitialize
              initialValues={{
                code: selectedCode,
                discountPercentage: selectedDiscount,
                maxDiscount: selectedMaxDiscount,
                minPurchase: selectedMinPurchase,
                description: selectedDescription,
              }}
              validationSchema={AdminPromoCodeSchema}
              onSubmit={values => handleEditPromoCode(values)}
            >
              {({ errors, touched, handleChange, handleBlur }) => (
                <Form>
                  <Grid container style={{ width: '600px' }}>
                    <div className="error-message">
                      {promoCodeEdit &&
                      promoCodeEdit.error &&
                      promoCodeEdit.error.response &&
                      promoCodeEdit.error.response.data &&
                      promoCodeEdit.error.response.data.message ? (
                        <p style={{ marginBottom: '30px' }}>
                          {promoCodeEdit.error.response.data.message}
                        </p>
                      ) : null}
                    </div>
                    <Grid item xs={12}>
                      <Grid container spacing={1}>
                        <Grid item xs={6} style={{ marginBottom: '20px' }}>
                          <Field validateOnBlur validateOnChange name="code">
                            {({ field, form }) => (
                              <TextField
                                fullWidth
                                name="code"
                                label="Code"
                                variant="outlined"
                                defaultValue={selectedCode}
                                error={Boolean(
                                  form.errors.code && form.touched.code,
                                )}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={
                                  form.errors.code &&
                                  form.touched.code &&
                                  String(form.errors.code)
                                }
                              />
                            )}
                          </Field>
                        </Grid>
                        <Grid item xs={6} style={{ marginBottom: '20px' }}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={selectedIsInfluencer}
                                onChange={handleIsInfluencerChange}
                                name="checkedB"
                                color="default"
                              />
                            }
                            label="Influencer Code"
                            style={{ margin: '5px 0px' }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={1}>
                        <Grid item xs={6} style={{ marginBottom: '20px' }}>
                            {/* {console.log(selectedSubCategory.id)}
                            {console.log({allSubcategories})} */}
                            {allSubcategories ? 
                            <Autocomplete
                              id="editmodalsubcategoryautocomplete"
                              multiple
                              defaultValue={selectedSubCategory.id}
                              onChange={(event, value) =>
                                handleSubCategoriesChange(value)
                              }
                              options={allSubcategories}
                              filterSelectedOptions
                              getOptionLabel={option => option.name}
                              renderInput={params => (
                                <TextField
                                  {...params}
                                  variant="outlined"
                                  label="Sub Category"
                                  placeholder="choose from list"
                                />
                              )}
                            /> : null}
                        </Grid>
                        <Grid item xs={6} style={{ marginBottom: '20px' }}>
                          <Field
                            validateOnBlur
                            validateOnChange
                            name="discountPercentage"
                          >
                            {({ field, form }) => (
                              <TextField
                                fullWidth
                                name="discountPercentage"
                                label="Discount(%)"
                                variant="outlined"
                                defaultValue={selectedDiscount}
                                error={Boolean(
                                  form.errors.discountPercentage &&
                                    form.touched.discountPercentage,
                                )}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={
                                  form.errors.discountPercentage &&
                                  form.touched.discountPercentage &&
                                  String(form.errors.discountPercentage)
                                }
                              />
                            )}
                          </Field>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={1}>
                        <Grid item xs={6} style={{ marginBottom: '20px' }}>
                          <Field
                            validateOnBlur
                            validateOnChange
                            name="maxDiscount"
                          >
                            {({ field, form }) => (
                              <TextField
                                fullWidth
                                type="number"
                                name="maxDiscount"
                                label="Max Discount"
                                variant="outlined"
                                defaultValue={selectedMaxDiscount}
                                error={Boolean(
                                  form.errors.maxDiscount &&
                                    form.touched.maxDiscount,
                                )}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={
                                  form.errors.maxDiscount &&
                                  form.touched.maxDiscount &&
                                  String(form.errors.maxDiscount)
                                }
                              />
                            )}
                          </Field>
                        </Grid>
                        <Grid item xs={6} style={{ marginBottom: '20px' }}>
                          <Field
                            validateOnBlur
                            validateOnChange
                            name="minPurchase"
                          >
                            {({ field, form }) => (
                              <TextField
                                fullWidth
                                type="number"
                                name="minPurchase"
                                label="Min Purchase"
                                variant="outlined"
                                defaultValue={selectedMinPurchase}
                                error={Boolean(
                                  form.errors.minPurchase &&
                                    form.touched.minPurchase,
                                )}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={
                                  form.errors.minPurchase &&
                                  form.touched.minPurchase &&
                                  String(form.errors.minPurchase)
                                }
                              />
                            )}
                          </Field>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={1}>
                        <Grid item xs={6} style={{ marginBottom: '20px' }}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                              disablePast
                              id="edit-start-date-picker-dialog"
                              name="validFrom"
                              label="Start Date"
                              open={isEditStartDateOpen}
                              onOpen={() => setIsEditStartDateOpen(true)}
                              onClose={() => setIsEditStartDateOpen(false)}
                              format="MMM dd yyyy"
                              value={selectedStartDate || null}
                              onChange={handleStartDateChange}
                              TextFieldComponent={props =>
                                TextFieldWrap(props)
                              }
                            />
                          </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={6} style={{ marginBottom: '20px' }}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                              disablePast
                              id="edit-end-date-picker-dialog"
                              name="validTo"
                              label="End Date"
                              open={isEditEndDateOpen}
                              onOpen={() => setIsEditEndDateOpen(true)}
                              onClose={() => setIsEditEndDateOpen(false)}
                              format="MMM dd yyyy"
                              value={selectedEndDate || null}
                              onChange={handleEndDateChange}
                              TextFieldComponent={props =>
                                TextFieldWrap(props)
                              }
                            />
                          </MuiPickersUtilsProvider>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: '20px' }}>
                      <Field
                        validateOnBlur
                        validateOnChange
                        name="description"
                      >
                        {({ field, form }) => (
                          <TextField
                            fullWidth
                            name="description"
                            label="Description"
                            variant="outlined"
                            defaultValue={selectedDescription}
                            error={Boolean(
                              form.errors.description &&
                                form.touched.description,
                            )}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              form.errors.description &&
                              form.touched.description &&
                              String(form.errors.description)
                            }
                          />
                        )}
                      </Field>
                    </Grid>
                  </Grid>
                  {promoCodeEdit && promoCodeEdit.loading ? (
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
                        onClick={handleEditPromoCodeModalClose}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </Fade>
      </Modal>

      {/* delete Promo code modal */}
      <Modal
        open={deletePromoCodeModal}
        onClose={handleDeletePromoCodeModalClose}
        aria-labelledby="delete-promo-code-modal"
        aria-describedby="to-delete-promo-code"
        disableBackdropClick
        disableEscapeKeyDown
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={deletePromoCodeModal}>
          <div className="admin-modal">
            <h1 style={{ fontSize: '24px', marginTop: 0 }}>
              Delete Promo Code
            </h1>
            <hr className="line" align="left" />
            <div className="error-message">
              {promoCodeDelete &&
              promoCodeDelete.error &&
              promoCodeDelete.error.response &&
              promoCodeDelete.error.response.data &&
              promoCodeDelete.error.response.data.message ? (
                <p style={{ marginBottom: '30px' }}>
                  {promoCodeDelete.error.response.data.message}
                </p>
              ) : null}
            </div>
            <h4 style={{ fontSize: '20px' }}>
              Are you sure that you want to delete <i>{selectedCode}</i> ?
            </h4>
            {promoCodeDelete && promoCodeDelete.loading ? (
              <CircularProgress style={{ color: '#09799C' }} size={25} />
            ) : (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleDeletePromoCode}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  style={{ marginLeft: '30px' }}
                  onClick={handleDeletePromoCodeModalClose}
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        </Fade>
      </Modal>
    </Grid>
  );
}

AdminPromoCode.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // promoCode: PropTypes.oneOfType([PropTypes.object]),
  // allSubcategories: PropTypes.oneOfType([PropTypes.object]),
  promoCodeAdd: PropTypes.object,
  promoCodeEdit: PropTypes.object,
  promoCodeDelete: PropTypes.object,
  onFetchPromoCode: PropTypes.func,
  onAddPromoCode: PropTypes.func,
  onEditPromoCode: PropTypes.func,
  onDeletePromoCode: PropTypes.func,
  onRemoveError: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  promoCode: makeSelectPromoCode(),
  allSubcategories: makeSelectAllSubcategories(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  promoCodeEdit: makeSelectPromoCodeEdit(),
  promoCodeAdd: makeSelectPromoCodeAdd(),
  promoCodeDelete: makeSelectPromoCodeDelete(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onFetchPromoCode: () => {
      dispatch(adminPromoCodeFetch());
    },
    onFetchAllSubcategories: () => {
      dispatch(adminAllSubcategoriesFetch());
    },
    onAddPromoCode: (evt, closeAddPromoCodeModal) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(adminPromoCodeAdd(evt, closeAddPromoCodeModal));
    },
    onEditPromoCode: (evt, closeEditPromoCodeModal) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(adminPromoCodeEdit(evt, closeEditPromoCodeModal));
    },
    onDeletePromoCode: (evt, closeDeletePromoCodeModal) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(adminPromoCodeDelete(evt, closeDeletePromoCodeModal));
    },

    onRemoveError: () => {
      dispatch(adminPromoCodeRemoveError());
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
)(AdminPromoCode);
