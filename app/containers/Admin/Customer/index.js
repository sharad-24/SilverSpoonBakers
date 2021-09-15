/*
 * Admin Customer
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';

import {
  Table, 
  TablePagination, 
  Grid,
  CircularProgress,
} from '@material-ui/core';

import PageTitle from '../../../components/PageTitle'

import AdminSidebar from '../../../components/AdminSideBar';
import TopBar from '../../../components/TopBar/TopBar';
import { browserRedirect, formatDate } from '../../../helpers/helpers';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { adminCustomerFetch } from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectCustomer,
  makeSelectLoading,
  makeSelectError,
} from './selectors';

import './admin-customer.css';

const key = 'admincustomer';


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
   container: {
    maxHeight: "100%",
  },
});



export function AdminCustomer({
  loading,
  error,
  customer,
  onFetchCustomer,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    console.log(event);
    setPage(0);
  };


 

  useEffect( () => {
    // When initial state username is not null, submit the form to load repos
    //if (username && username.trim().length > 0) onSubmitForm();
     onFetchCustomer();
  }, []);

  
  return (
    <Grid container>
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
        <PageTitle name="Customer"/>
        
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
                    <div className="col-md-12">
                      <div style={{ textAlign: 'right' }}>
                        <Button variant="contained" color="primary" style={{ marginRight: '10px' }}><RefreshIcon onClick={onFetchCustomer}></RefreshIcon></Button>
                      </div>
                    </div>
                  </div>
                </div>
            <div style={{ padding: '2%', overflowX:"auto" }}>
              {customer ? (
                
                
                  <Table style={{tableLayout: "auto"}}>
                    <thead>
                      <tr>
                        <th  className="table-head">Name</th>
                        <th  className="table-head">Mobile</th>
                        <th  className="table-head">Email</th>
                        <th  className="table-head">Email Verified</th>
                        <th  className="table-head">Mobile Verified</th>
                        <th  className="table-head">Orders</th>
                        <th  className="table-head">Promocode Used</th>
                        <th  className="table-head">Reviews</th>
                        <th  className="table-head">Joined</th>
                        <th  className="table-head">Address</th> 
                       
                      </tr>
                    </thead>
                    <tbody>
                      {customer &&
                        customer
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage,
                          )
                          .map((item, index) => (
                            <tr key={index}>
                              <td  className="table-body">{item.name}</td>
                              <td  className="table-body">{item.mobile}</td>
                              <td  className="table-body">{item.email}</td>
                              <td  className="table-body">{item.isEmailVerified ? "Yes" : "No"}</td>
                              <td  className="table-body">{item.isMobileVerified ? "Yes" : "No"}</td>
                              <td  className="table-body">{item.orders.length >0 ? item.orders : "-"}</td>
                              <td  className="table-body">{item.promoCodeUsed.length > 0 ? item.promoCodeUsed : "-"}</td>
                              <td  className="table-body">{item.reviews.length> 0 ? item.reviews : "-"}</td>
                              <td  className="table-body">{formatDate(item.createdAt)}</td>
                              <td  className="table-body">{item.address.length> 0 ? item.address : "-"}</td>
                           </tr>
                          ))}
                    </tbody>
                  </Table>
                
               
              ) : (
                <h4 className="text-center">No Customer Data found</h4>
              )}
              
            </div>
            <TablePagination
                rowsPerPageOptions={[5, 10, 20, 30, 40]}
                component="div"
                count={customer!=undefined ? customer.length : 10}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
          </>
        )}
      </Grid>
    </Grid>
  );
}

AdminCustomer.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // Customer: PropTypes.oneOfType([PropTypes.object]),
  onFetchCustomer: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  customer: makeSelectCustomer(),
  loading: makeSelectLoading(),
  error: makeSelectError(),

});

export function mapDispatchToProps(dispatch) {
  return {
    onFetchCustomer: () => {
      dispatch(adminCustomerFetch());
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
)(AdminCustomer);