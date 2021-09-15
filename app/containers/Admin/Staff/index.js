/*
 * Admin Login
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import DeleteIcon from '@material-ui/icons/Delete';
import { Grid, Divider } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Formik, Form, Field } from 'formik';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TablePagination from '@material-ui/core/TablePagination';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import AdminSidebar from '../../../components/AdminSideBar';
import { AdminStaffSchema } from '../../../config/validationSchemas';
import { browserRedirect } from '../../../helpers/helpers';
import RefreshIcon from '@material-ui/icons/Refresh';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { adminStaffFetch, adminStaffAdd, adminStaffDelete, adminStaffRemoveError } from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectStaff,
  makeSelectLoading,
  makeSelectError,
  makeSelectStaffAdd,
  makeSelectStaffDelete,
} from './selectors';

import PageTitle from '../../../components/PageTitle';
import DeleteButton from '../../../components/DeleteButton';
import AlertDialog from '../../../components/Dialog';
import TopBar from '../../../components/TopBar';
import './admin-staff.css';

const key = 'adminstaff';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

<<<<<<< HEAD
export function AdminStaff(
  {
    loading,
    error,
    staff,
    staffAdd,
    staffDelete,
    onFetchStaff,
    onAddStaff,
    onDeleteStaff,
  },
  props,
) {
=======


export function AdminStaff({
  loading,
  error,
  staff,
  staffAdd,
  staffDelete,
  onFetchStaff,
  onAddStaff,
  onDeleteStaff,
  onRemoveError,
}) {
>>>>>>> 067e8913bf32a4fcab18a8f2a17e20123869132f
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

  const [addModal, setAddModal] = useState(false);
  const [deleteStaff, setDeleteStaff] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    //if (username && username.trim().length > 0) onSubmitForm();
    onFetchStaff();
  }, []);

  const handleAddModalOpen = () => {
    setAddModal(true);
  };

  const handleAddModalClose = () => {
    onRemoveError();
    setAddModal(false);
  };

  const handleDeleteModalOpen = (name, id) => {
    setDeleteStaff({ name, id });
    setDeleteModal(true);
  };

  const handleDeleteModalClose = () => {
    onRemoveError();
    setDeleteModal(false);
  };

  const handleAddStaff = data => {
    onAddStaff(data, handleAddModalClose);
  };

  const handleDeleteStaff = () => {
    onDeleteStaff(
      { id: deleteStaff && deleteStaff.id },
      handleDeleteModalClose,
    );
  };
 
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
        <div>
          <PageTitle name="Staff" />
          <div style={{ padding: '0% 2%' }}>
            <div style={{ textAlign: 'right' }}>
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: '10px' }}
              >
                <RefreshIcon onClick={onFetchStaff} />
              </Button>
              <Button
                size="medium"
                variant="contained"
                color="primary"
                startIcon={<AddCircleOutlineIcon />}
                onClick={handleAddModalOpen}
              >
                ADD STAFF
              </Button>
            </div>
          </div>
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
            <div style={{ padding: '2%' }}>
              {staff ? (
                <Table>
                  <thead>
                    <tr>
                      <th className="table-head">Name</th>
                      <th className="table-head">Email</th>
                      <th className="table-head">Mobile</th>
                      <th className="table-head">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staff &&
                      staff
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage,
                        )
                        .map((item, index) => (
                          <tr key={index}>
                            <td className="table-body">{item.name}</td>
                            <td className="table-body">{item.email}</td>
                            <td className="table-body">{item.mobile}</td>
                            <td
                              className="table-body"
                              style={{ cursor: 'pointer' }}
                            >
                              <DeleteButton
                                onClick={() =>
                                  handleDeleteModalOpen(item.name, item._id)
                                }
                              />
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </Table>
              ) : (
                <h2 className="text-center">No staff</h2>
              )}
              <TablePagination
                rowsPerPageOptions={[5, 10, 20, 30, 40]}
                component="div"
                count={staff != undefined ? staff.length : 10}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </div>
          </>
        )}
      </Grid>

      <Modal
        open={addModal}
        onClose={handleAddModalClose}
        aria-labelledby="add-staff-modal"
        aria-describedby="to-add-staff"
        disableBackdropClick
        disableEscapeKeyDown
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={addModal}>
          <div className="admin-modal">
            <h1 style={{ fontSize: '1.25em', marginTop: 0 }}>Add Staff</h1>
            <hr className="line" align="left" />
            <Formik
              initialValues={{ name: '', email: '', mobile: '' }}
              validationSchema={AdminStaffSchema}
              onSubmit={handleAddStaff}
            >
              {({ errors, touched, handleChange, handleBlur }) => (
                <Form>
                  <Grid container style={{ width: '300px' }}>
                    <div className="error-message">
                      {staffAdd &&
                      staffAdd.error &&
                      staffAdd.error.response &&
                      staffAdd.error.response.data &&
                      staffAdd.error.response.data.message ? (
                        <p style={{ marginBottom: '30px' }}>
                          {staffAdd.error.response.data.message}
                        </p>
                      ) : null}
                    </div>
                    <Grid item xs={12} style={{ marginBottom: '20px' }}>
                      <Field validateOnBlur validateOnChange name="name">
                        {({ field, form }) => (
                          <TextField
                            fullWidth
                            name={'name'}
                            label="Name"
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
                      <Field validateOnBlur validateOnChange name="email">
                        {({ field, form }) => (
                          <TextField
                            fullWidth
                            name={'email'}
                            label="Email Address"
                            variant="outlined"
                            error={Boolean(
                              form.errors.email && form.touched.email,
                            )}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              form.errors.email &&
                              form.touched.email &&
                              String(form.errors.email)
                            }
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: '20px' }}>
                      <Field validateOnBlur validateOnChange name="mobile">
                        {({ field, form }) => (
                          <TextField
                            fullWidth
                            name={'mobile'}
                            label="Mobile Number"
                            variant="outlined"
                            error={Boolean(
                              form.errors.mobile && form.touched.mobile,
                            )}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              form.errors.mobile &&
                              form.touched.mobile &&
                              String(form.errors.mobile)
                            }
                          />
                        )}
                      </Field>
                    </Grid>
                  </Grid>
                  {staffAdd && staffAdd.loading ? (
                    <CircularProgress
               
                            style={{ color: '#09799C' }}
         
                                  size={25}
                   
                    />
                  ) : (
                    <>
                      <Button type="submit" variant="contained" color="primary">
                        ADD
                      </Button>
                      <Button
                        type="button"
                        variant="contained"
                        style={{ marginLeft: '30px' }}
                        onClick={handleAddModalClose}
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

      <AlertDialog
        open={deleteModal}
        onClose={handleDeleteModalClose}
        title={'Delete Staff'}
        message={`Are you sure that you want to delete user with name : "${deleteStaff &&
          deleteStaff.name}"`}
        button1="Delete"
        button1OnClick={handleDeleteStaff}
        button2="Cancel"
        button2OnClick={handleDeleteModalClose}
      />
    </Grid>
  );
}

AdminStaff.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // staff: PropTypes.oneOfType([PropTypes.object]),
  staffAdd: PropTypes.object,
  staffDelete: PropTypes.object,
  onFetchStaff: PropTypes.func,
  onAddStaff: PropTypes.func,
  onDeleteStaff: PropTypes.func,
  onRemoveError: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  staff: makeSelectStaff(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  staffAdd: makeSelectStaffAdd(),
  staffDelete: makeSelectStaffDelete(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onFetchStaff: () => {
      dispatch(adminStaffFetch());
    },
    onAddStaff: (evt, closeAddModal) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(adminStaffAdd(evt, closeAddModal));
    },
    onDeleteStaff: (evt, closeDeleteModal) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(adminStaffDelete(evt, closeDeleteModal));
    },

    onRemoveError: () => {
      dispatch(adminStaffRemoveError());
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
)(AdminStaff);
