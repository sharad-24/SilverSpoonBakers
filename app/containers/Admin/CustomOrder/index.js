import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import RefreshIcon from '@material-ui/icons/Refresh';
import PageTitle from '../../../components/PageTitle'
import request from '../../../utils/request';
import { urls } from '../../../config/urls.js';
import {
  Grid,
  Fade,
  Backdrop,
  Modal,
  CircularProgress,
  Button,
  Divider,
  Snackbar,
} from '@material-ui/core';

const key = 'customOrder';

import DataTable from './table'
import AdminSidebar from '../../../components/AdminSideBar';
import TopBar from '../../../components/TopBar/TopBar';
import {checkTokenExpiry} from '../../../helpers/helpers';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  adminCustomOrderFetch,
  admincustomOrderDelete,
  admincustomOrderEdit,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectCustomOrder,
  makeSelectLoading,
  makeSelectError,
  makeSelectcustomOrderEdit,
  makeSelectcustomOrderDelete,
} from './selectors';

import './customOrder.css';
export function AdmincustomOrder({
  loading,
  error,
  customOrder,
  customOrderEdit,
  customOrderDelete,
  onEditcustomOrder,
  onDeletecustomOrder,
  onFetchCustomOrder,
}) {
     useInjectReducer({ key, reducer });
     useInjectSaga({ key, saga });

     const [deleteModal, setDeleteModal] = useState(false);
     const [deletecustomOrder, setDeletecustomOrder] = useState(null);
    //  const [customOrder, setcustomOrder] = useState(null);
    //  const [allValues, setAllValues] = useState({});

     const handleDeleteModalClose = () => {
       setDeleteModal(false);
     };
     const handleDeletecustomOrder = () => {
       onDeletecustomOrder(
         { id: deletecustomOrder && deletecustomOrder.id },
         handleDeleteModalClose,
       );
     };

     useEffect(() => {
      onFetchCustomOrder()
     }, []);

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
             <PageTitle name="Custom Orders" />
             <div style={{ padding: '0% 2%' }}>
               <div style={{ textAlign: 'right' }}>
                 <Button
                   variant="contained"
                   color="primary"
                   style={{ marginRight: '10px' }}
                 >
                   <RefreshIcon onClick={onFetchCustomOrder} />
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
                 {customOrder ? (
                   <DataTable customOrder={customOrder} />
                 ) : (
                   <div className="error-message">
                     {error &&
                     error.response &&
                     error.response.data &&
                     error.response.data.message ? (
                       <p style={{ marginBottom: '30px' }}>
                         {error.response.data.message}
                       </p>
                     ) : (
                       <CircularProgress />
                     )}
                   </div>
                 )}
               </div>
             </>
           )}
         </Grid>

         <Modal
           open={deleteModal}
           onClose={handleDeleteModalClose}
           aria-labelledby="delete-customOrder-modal"
           aria-describedby="to-delete-customOrder"
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
                 Delete Custom Order
               </h1>
               <Divider />
               <div className="error-message">
                 {customOrderDelete &&
                 customOrderDelete.error &&
                 customOrderDelete.error.response &&
                 customOrderDelete.error.response.data &&
                 customOrderDelete.error.response.data.message ? (
                   <p style={{ marginBottom: '30px' }}>
                     {customOrderDelete.error.response.data.message}
                   </p>
                 ) : null}
               </div>
               <h4 style={{ fontSize: '1em', marginTop: '10px' }}>
                 Are you sure that you want to delete Custom Order with name
                 : <br />
                 <br />
                 <i>"{deletecustomOrder && deletecustomOrder.name}"</i>
               </h4>
               <br />
               {customOrderDelete && customOrderDelete.loading ? (
                 <CircularProgress style={{ color: '#09799C' }} size={25} />
               ) : (
                 <>
                   <Button
                     color="default"
                     variant="contained"
                     size="medium"
                     onClick={handleDeletecustomOrder}
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
       </Grid>
     );
   }

AdmincustomOrder.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onFetchCustomOrder: PropTypes.func,
  customOrderEdit: PropTypes.object,
  customOrderDelete: PropTypes.object,
  onEditcustomOrder: PropTypes.func,
  onDeletecustomOrder: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  customOrder: makeSelectCustomOrder(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  customOrderEdit: makeSelectcustomOrderEdit(),
  customOrderDelete: makeSelectcustomOrderDelete(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onEditcustomOrder: (evt, closeEditcustomOrderModal) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(admincustomOrderEdit(evt, closeEditcustomOrderModal));
    },
    onDeletecustomOrder: (evt, closeDeleteModal) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(admincustomOrderDelete(evt, closeDeleteModal));
    },
    onFetchCustomOrder: () => {
      dispatch(adminCustomOrderFetch());
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
)(AdmincustomOrder);
