import React, { useState, useEffect, memo, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import RefreshIcon from '@material-ui/icons/Refresh';
import PageTitle from '../../../components/PageTitle'
import request from '../../../utils/request';
import { image_url, urls } from '../../../config/urls.js';
import TablePagination from '@material-ui/core/TablePagination';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import DeleteIcon from '@material-ui/icons/Delete';
import { AdminFlavoursSchema } from '../../../config/validationSchemas';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {adminFlavoursFetchError, adminFlavoursAdd,adminFlavoursEdit, adminFlavoursDelete, adminFlavoursRemoveError } from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectFlavours,
  makeSelectLoading,
  makeSelectError,
  makeSelectFlavoursAdd,
  makeSelectFlavoursEdit,
  makeSelectFlavoursDelete,
} from './selectors';

import {checkTokenExpiry} from '../../../helpers/helpers'


import { Formik, Form, Field } from 'formik';
import {
  TextField,
  Grid,
  Card,
  CardContent,
  Fade,
  Backdrop,
  Modal,
  CircularProgress,
  Button,
  Avatar,
  Divider,
  Snackbar,
} from '@material-ui/core';

const key = 'adminflavours';


import AdminSidebar from '../../../components/AdminSideBar';
import TopBar from '../../../components/TopBar/TopBar';
import MuiAlert from '@material-ui/lab/Alert';
import Table from '@material-ui/core/Table';
import DeleteButton from '../../../components/DeleteButton'

import './flavours.css';
const logo = require('../../../images/logo.png');
export function AdminFlavours({
    loading,
    error,
    flavoursDelete,
    flavoursAdd,
    flavoursEdit,
    onAddFlavours,
    onEditFlavours,
    onDeleteFlavours,
    onRemoveError,
}) {
     useInjectReducer({ key, reducer });
     useInjectSaga({ key, saga });

     const [addModal, setAddModal] = useState(false);
     const [editFlavoursModal, setEditFlavoursModal] = useState(false);
     const [flavours, setFlavours] = useState(null);
     const [allValues, setAllValues] = useState({
       flavours: [],
     });
     const [rowsPerPage, setRowsPerPage] = React.useState(5);
     const [page, setPage] = React.useState(0);
     const [deleteFlavours, setDeleteFlavours] = useState(null);
     const [deleteModal, setDeleteModal] = useState(false);

     const EditFlavoursForm = useRef(null);

     const handleChangePage = (event, newPage) => {
       setPage(newPage);
     };
     const handleChangeRowsPerPage = event => {
       setRowsPerPage(+event.target.value);
       setPage(0);
     };

     const fetchFlavours = async () => {
       try{
       const header = 0;
       const response = await request('GET', urls.FLAVOUR_URL, {}, header);
       setFlavours(response.data.data);
       } catch (err) {
        checkTokenExpiry(err);
       }
     };

     useEffect(() => {
       // When initial state username is not null, submit the form to load repos
       // if (username && username.trim().length > 0) onSubmitForm();
      
       fetchFlavours();
     }, []);

     const handleEditFlavoursModalOpen = async (
      id,
      name,
      price,
    ) => {
      await setAllValues({
        ...allValues,
        id: id,
        name: name,
        price: price,
      });
      setEditFlavoursModal(true);
    };
  
    const handleEditFlavoursModalClose = async () => {
      console.log("dukgii");
      await setAllValues({
        ...allValues,
        flavoursId: '',
        name: '',
        price: '',
      });
      onRemoveError();
      setEditFlavoursModal(false);
      fetchFlavours();
    };

     const handleAddModalOpen = () => {
       setAddModal(true);
     };

     const handleAddModalClose = () => {
      onRemoveError();
       setAddModal(false);
       fetchFlavours();
     };

     const handleAddFlavours = data => {
       onAddFlavours(data, handleAddModalClose);
     };

     const handleDeleteModalOpen = (name, id) => {
       setDeleteFlavours({ name, id });
       setDeleteModal(true);
     };

     const handleDeleteModalClose = () => {
      onRemoveError();
       console.log("deldete modal close")
       setDeleteModal(false);
       fetchFlavours();
     };

     const handleDeleteFlavours = () => {
       onDeleteFlavours(
         { id: deleteFlavours && deleteFlavours.id },
         handleDeleteModalClose,
       );
     };

     const handleEditFlavoursFormChange = e => {
      setAllValues({ ...allValues, [e.target.name]: e.target.value });
    };
  
    const handleEditFlavours = () => {
      let data = {};
      data = allValues;
    //  console.log('allvalus: ', allValues);
  
     // console.log('Edit product Code data ', data);
      onEditFlavours(data, handleEditFlavoursModalClose);
    };

     return (
       <Grid container>
         <Grid item xs={12} style={{ marginBottom: '60px' }}>
           <TopBar />
         </Grid>
         <Grid item xs={2}>
           <AdminSidebar />
         </Grid>
         <Grid item xs={10}>
           <br />
           <div>
             <PageTitle name="Flavours" />
             <div style={{ padding: '0% 2%' }}>
               <div style={{ textAlign: 'right' }}>
                 <Button
                   variant="contained"
                   color="primary"
                   style={{ marginRight: '10px' }}
                 >
                   <RefreshIcon onClick={fetchFlavours} />
                 </Button>
                 <Button
                   size="medium"
                   variant="contained"
                   color="primary"
                   startIcon={<AddCircleOutlineIcon />}
                   onClick={handleAddModalOpen}
                 >
                   ADD Flavours
                 </Button>
               </div>
             </div>
           </div>
           {loading ? (
             <div className="loader">
               <CircularProgress style={{ color: '#09799C' }} />
             </div>
           ) : (
             <>
               <div style={{ padding: '2%' }}>
                 {flavours ? (
                   <Table>
                     <thead>
                       <tr>
                         <th className="table-head">Name</th>
                         <th className="table-head">Price per Kg</th>
                         <th className="table-head">Delete</th>
                       </tr>
                     </thead>
                     <tbody>
                       {flavours &&
                         flavours
                           .slice(
                             page * rowsPerPage,
                             page * rowsPerPage + rowsPerPage,
                           )
                           .map((item, index) => (
                             <tr key={index}>
                               <td className="table-body"  
                               onClick={ () =>
                                 { return handleEditFlavoursModalOpen(
                                    item._id,
                                    item.name,
                                    item.price,
                                  )
                                 }
                              }><Button
                              color="default"
                              endIcon={ <BorderColorIcon fontSize='small' />}
                              >{item.name}
                              </Button></td>
                               <td className="table-body">₹ {item.price}</td>
                               <td
                                 className="table-body"
                                 style={{ cursor: 'pointer' }}
                               >
                                 <DeleteButton
                                   onClick={() =>
                                     handleDeleteModalOpen(
                                       item.name,
                                       item._id,
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
                   count={flavours != undefined ? flavours.length : 10}
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
           aria-labelledby="add-flavours-modal"
           aria-describedby="to-add-flavours"
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
               <h1 style={{ fontSize: '1.25em', marginTop: 0 }}>
                 Add Flavour
               </h1>
               <hr className="line" align="left" />
               <Formik
                 initialValues={{ name: '', price: '' }}
                 validationSchema={AdminFlavoursSchema}
                 onSubmit={handleAddFlavours}
               >
                 {({ errors, touched, handleChange, handleBlur }) => (
                   <Form>
                     <Grid container style={{ width: '300px' }}>
                       <div className="error-message">
                         {flavoursAdd &&
                         flavoursAdd.error &&
                         flavoursAdd.error.response &&
                         flavoursAdd.error.response.data &&
                         flavoursAdd.error.response.data.message ? (
                           <p style={{ marginBottom: '30px' }}>
                             {flavoursAdd.error.response.data.message}
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
                         <Field validateOnBlur validateOnChange name="price">
                           {({ field, form }) => (
                             <TextField
                               fullWidth
                               name={'price'}
                               label="Price"
                               variant="outlined"
                               error={Boolean(
                                 form.errors.price && form.touched.price,
                               )}
                               onChange={handleChange}
                               onBlur={handleBlur}
                               helperText={
                                 form.errors.price &&
                                 form.touched.price &&
                                 String(form.errors.price)
                               }
                             />
                           )}
                         </Field>
                       </Grid>
                     </Grid>
                     {flavoursAdd && flavoursAdd.loading ? (
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

         <Modal
           open={deleteModal}
           onClose={handleDeleteModalClose}
           aria-labelledby="delete-flavours-modal"
           aria-describedby="to-delete-flavours"
           closeAfterTransition
           BackdropComponent={Backdrop}
           BackdropProps={{
             timeout: 500,
           }}
         >
           <Fade in={deleteModal}>
             <div className="admin-modal">
               <h1
                 style={{
                   fontSize: '1.25em',
                   marginTop: 0,
                   fontWeight: 'bold',
                 }}
               >
                 Delete Flavour
               </h1>
               <Divider />
               <div className="error-message">
                 {flavoursDelete &&
                 flavoursDelete.error &&
                 flavoursDelete.error.response &&
                 flavoursDelete.error.response.data &&
                 flavoursDelete.error.response.data.message ? (
                   <p style={{ marginBottom: '30px' }}>
                     {flavoursDelete.error.response.data.message}
                   </p>
                 ) : null}
               </div>
               <h4 style={{ fontSize: '1em', marginTop: '10px' }}>
                 Are you sure that you want to delete flavour with name :{' '}
                 <br />
                 <br />
                 <i>"{deleteFlavours && deleteFlavours.name}"</i>
               </h4>
               <br />
               {flavoursDelete && flavoursDelete.loading ? (
                 <CircularProgress style={{ color: '#09799C' }} size={25} />
               ) : (
                 <>
                   <Button
                     color="default"
                     variant="contained"
                     size="medium"
                     onClick={handleDeleteFlavours}
                   >
                     Delete
                   </Button>{' '}
                   <Button
                     style={{ marginLeft: '10px' }}
                     variant="contained"
                     color="primary"
                     size="medium"
                     onClick={handleDeleteModalClose}
                   >
                     Cancel
                   </Button>
                 </>
               )}
             </div>
           </Fade>
         </Modal>

         <Modal
        open={editFlavoursModal}
        onClose={handleEditFlavoursModalClose}
        disableBackdropClick
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={editFlavoursModal}>
          <div className="admin-modal">
            <h1 style={{ fontSize: '24px', marginTop: 0 }}>Edit Flavours</h1>
            <hr className="line" align="left" />
            <Formik
              enableReinitialize
              initialValues={{
                name: allValues.name,
                price: allValues.price,
              }}
              // validationSchema={AdminPromoCodeSchema}
              onSubmit={handleEditFlavours}
            >
              {({ errors, touched, handleChange, handleBlur }) => (
                <Form ref={EditFlavoursForm}>
                  <Grid container style={{ width: '300px' }}>
                    <div className="error-message">
                      {flavoursEdit &&
                      flavoursEdit.error &&
                      flavoursEdit.error.response &&
                      flavoursEdit.error.response.data &&
                      flavoursEdit.error.response.data.message ? (
                        <p style={{ marginBottom: '30px' }}>
                          {flavoursEdit.error.response.data.message}
                        </p>
                      ) : null}
                    </div>
                    <Grid item xs={12}>
                      <Grid container spacing={1}>
                        <Grid item xs={12} style={{ marginBottom: '20px' }}>
                          <Field validateOnBlur validateOnChange name="code">
                            {({ field, form }) => (
                              <TextField
                                fullWidth
                                required
                                name="name"
                                label="Flavour Name"
                                variant="outlined"
                                defaultValue={allValues.name}
                                error={Boolean(
                                  form.errors.code && form.touched.code,
                                )}
                                onChange={handleEditFlavoursFormChange}
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
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={1}>
                        <Grid item xs={12} style={{ marginBottom: '20px' }}>
                          <Field validateOnBlur validateOnChange name="price">
                            {({ field, form }) => (
                              <TextField
                                fullWidth
                                name="price"
                                label="Price(₹)"
                                variant="outlined"
                                defaultValue={allValues.price}
                                error={Boolean(
                                  form.errors.discountPercentage &&
                                    form.touched.discountPercentage,
                                )}
                                onChange={handleEditFlavoursFormChange}
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
                  </Grid>
                  {flavoursEdit && flavoursEdit.loading ? (
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
                        onClick={handleEditFlavoursModalClose}
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
       </Grid>
     );
   }

AdminFlavours.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    flavoursAdd: PropTypes.object,
    flavoursEdit : PropTypes.object,
    flavoursDelete: PropTypes.object,
    onAddFlavours: PropTypes.func,
    onEditFlavours: PropTypes.func,
    onDeleteFlavours: PropTypes.func,
    onRemoveError: PropTypes.func,

  };

  const mapStateToProps = createStructuredSelector({
    flavours: makeSelectFlavours(),
    loading: makeSelectLoading(),
    error: makeSelectError(),
    flavoursAdd: makeSelectFlavoursAdd(),
    flavoursEdit: makeSelectFlavoursEdit(),
    flavoursDelete: makeSelectFlavoursDelete(),
  });

  export function mapDispatchToProps(dispatch) {
    return {
      onAddFlavours: (evt, closeAddModal) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(adminFlavoursAdd(evt, closeAddModal));
          },

      onEditFlavours: (evt, closeEditFlavoursModal) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(adminFlavoursEdit(evt, closeEditFlavoursModal));
          },
      onDeleteFlavours: (evt, closeDeleteModal) => {
        if (evt !== undefined && evt.preventDefault) evt.preventDefault();
        dispatch(adminFlavoursDelete(evt, closeDeleteModal));
      },

      onRemoveError: () => {
        dispatch(adminFlavoursRemoveError());
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
)(AdminFlavours);
