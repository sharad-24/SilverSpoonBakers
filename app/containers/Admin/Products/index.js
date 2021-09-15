/*
 * Admin Login
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  CircularProgress,
  Grid,
  Divider,
  Button,
  Fade,
  Table,
  TablePagination,
  Modal,
  Backdrop,
  TextField,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  TableSortLabel,
  Paper,
  Collapse,
  Box,
  Typography,
} from '@material-ui/core';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { image_url, urls } from '../../../config/urls.js';
import AdminSidebar from '../../../components/AdminSideBar';
import TopBar from '../../../components/TopBar/TopBar';
import { browserRedirect, formatDate } from '../../../helpers/helpers';
import RefreshIcon from '@material-ui/icons/Refresh';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  adminProductsFetch,
  adminFlavoursFetch,
  adminProductsAdd,
  adminProductsDelete,
  adminProductsEdit,
  adminProductsImageEdit,
  adminAllSubcategoriesFetch,
  adminProductsRemoveError,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectProducts,
  makeSelectFlavours,
  makeSelectLoading,
  makeSelectAllSubcategories,
  makeSelectError,
  makeSelectProductsAdd,
  makeSelectProductsImageEdit,
  makeSelectProductsEdit,
  makeSelectProductsDelete,
} from './selectors';

import history from '../../../utils/history';
import PageTitle from '../../../components/PageTitle'
import DeleteButton from '../../../components/DeleteButton'
import AlertDialog from '../../../components/Dialog';
import './admin-product.css';

const key = 'adminproducts';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  const { product, subcategories, flavours } = props;
  const [open, setOpen] = React.useState(false);
  const [selectedFlavours, setSelectedFlavours] = useState([])
  const classes = useRowStyles();
<<<<<<< HEAD
  console.log("props in row: ",props)
=======
  
  function sortFlavours(){
    if(product.flavours && flavours){
      for(let flavourid of product.flavours){
        for(let flavour of flavours ){
        
        if(flavour._id == flavourid){
          setSelectedFlavours(selectedFlavours => [...selectedFlavours, flavour.name])
        }
      }
    }}
      
  }
  useEffect(() => {
    sortFlavours()
  }, [])

  const handleEdit=(product)=>{
    console.log({ product });
    return history.push('/admin/edit/product', { data: product })
  }

>>>>>>> 067e8913bf32a4fcab18a8f2a17e20123869132f
  return (
    <>
      <TableRow className={classes.root}>
        <TableCell className="table-body" style={{ width: '2rem' }}>
          <IconButton
            size="small"
            onClick={() => setOpen(!open)}
            style={{ outline: 'none', boxShadow: 'none' }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
<<<<<<< HEAD
        <td className="table-body" component="th" scope="row">
          {product.name}
        </td>
        <td className="table-body">{product.description}</td>
        <td className="table-body">{product.parentSubcategoryId}</td>
        <td className="table-body">{product.price}</td>
        <td className="table-body">
          <DeleteButton
            onClick={() => props.handleDeleteModalOpen(product.name, product._id)}
=======
        <td
          className="table-body"
          component="th"
          scope="row"
          onClick={()=> handleEdit(product)}
          style={{ cursor: 'pointer' }}
        >
          <Button
            color="default"
            className={classes.button}
            endIcon={<BorderColorIcon fontSize="small" />}
          >
            {product.name}
          </Button>
        </td>
        <td className="table-body">{product.description}</td>
        <td className="table-body">
          {/* diplay the subcategory name from subcategory Id */}
          {subcategories &&
          subcategories.find(
            subcategory => subcategory._id === product.parentSubcategoryId,
          )
            ? subcategories.find(
                subcategory =>
                  subcategory._id === product.parentSubcategoryId,
              ).name
            : product.parentSubcategoryId}
        </td>
        <td className="table-body">{product.price}</td>
        <td className="table-body">
          <DeleteButton
            onClick={() =>
              props.handleDeleteModalOpen(product.name, product._id)
            }
>>>>>>> 067e8913bf32a4fcab18a8f2a17e20123869132f
          />
        </td>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                More Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
<<<<<<< HEAD
                    <TableCell className="table-head">Flavours</TableCell>
                    <TableCell className="table-head">
                      Min Weight (Kg)
                    </TableCell>
                    <TableCell className="table-head">
                      Max Weight (Kg)
                    </TableCell>
                    <TableCell className="table-head">Max Quantity</TableCell>
                    <TableCell className="table-head">Images</TableCell>
                    <TableCell className="table-head">Egg</TableCell>
                    <TableCell className="table-head">Flavours</TableCell>
                    <TableCell className="table-head">Type</TableCell>
                    <TableCell className="table-head">Created At</TableCell>
                    <TableCell className="table-head">Updated At</TableCell>
=======
                    {product.isCake ? (
                      <td className="table-head">Flavour list</td>
                    ) : null}
                    {product.isCake ? (
                      <td className="table-head">Min Weight (Kg)</td>
                    ) : null}
                    {product.isCake ? (
                      <td className="table-head">Max Weight (Kg)</td>
                    ) : null}
                    {product.isCake ? (
                      <td className="table-head">Flavours</td>
                    ) : null}
                    <td className="table-head">Max Quantity</td>
                    <td className="table-head">Images</td>
                    <td className="table-head">Egg</td>
                    <td className="table-head">Best Seller</td>

                    <td className="table-head">Type</td>
                    <td className="table-head">Created At</td>
                    <td className="table-head">Updated At</td>
>>>>>>> 067e8913bf32a4fcab18a8f2a17e20123869132f
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
<<<<<<< HEAD
                    <TableCell className="table-body" align="right">
                      {product.flavours}
                    </TableCell>
                    <TableCell className="table-body" align="right">
                      {product.minWeight}
                    </TableCell>
                    <TableCell className="table-body" align="right">
                      {product.maxWeight}
                    </TableCell>
                    <TableCell className="table-body" align="right">
                      {product.maxQuantity}
                    </TableCell>
                    <TableCell className="table-body" align="right">
                      {product.images.image1}
                    </TableCell>
                    <TableCell className="table-body" align="right">
                      {product.hasEgg ? 'Egg' : 'Eggless'}
                    </TableCell>
                    <TableCell className="table-body" align="right">
                      {product.hasAllFlavour ? 'All' : 'Limited'}
                    </TableCell>
                    <TableCell className="table-body" align="right">
                      {product.isCake ? 'Cake' : 'Other'}
                    </TableCell>
                    <TableCell className="table-body" align="right">
                      {formatDate(product.createdAt)}
                    </TableCell>
                    <TableCell className="table-body" align="right">
                      {formatDate(product.updatedAt)}
                    </TableCell>
=======
                    {/* {console.log(product)}
                    {console.log(selectedFlavours)} */}
                    {product.isCake ? (
                      <td className="table-body" align="right">
                        {selectedFlavours && selectedFlavours.length > 0 ? (
                          <div>
                            {selectedFlavours.map((flavour, index) => {
                              return (
                                <div>
                                  {index + 1}. {flavour}
                                  <hr />
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          'All'
                        )}
                      </td>
                    ) : null}
                    {product.isCake ? (
                      <td className="table-body" align="right">
                        {product.minWeight}
                      </td>
                    ) : null}
                    {product.isCake ? (
                      <td className="table-body" align="right">
                        {product.maxWeight}
                      </td>
                    ) : null}
                    {product.isCake ? (
                      <td className="table-body" align="right">
                        {product.hasAllFlavour ? 'All' : 'Limited'}
                      </td>
                    ) : null}
                    <td className="table-body" align="right">
                      {product.maxQuantity}
                    </td>
                    <td className="table-body" align="right">
                      {product.images.length > 0
                        ? product.images.map((image, index) => {
                            return (
                              <div>
                                <a
                                  target="_blank"
                                  key={index}
                                  href={`${image_url.concat(image)}`}
                                >
                                  {image}
                                </a>
                                <hr />
                              </div>
                            );
                          })
                        : 'No image found'}
                    </td>
                    <td className="table-body" align="right">
                      {product.hasEgg ? 'Egg' : 'Eggless'}
                    </td>
                    <td className="table-body" align="right">
                      {product.isBestSeller ? 'Yes' : 'No'}
                    </td>

                    <td className="table-body" align="right">
                      {product.isCake ? 'Cake' : 'Other'}
                    </td>
                    <td className="table-body" align="right">
                      {formatDate(product.createdAt)}
                    </td>
                    <td className="table-body" align="right">
                      {formatDate(product.updatedAt)}
                    </td>
>>>>>>> 067e8913bf32a4fcab18a8f2a17e20123869132f
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export function AdminProducts({
         loading,
         error,
         products,
         flavours,
         productsAdd,
         productsEdit,
         productsImageEdit,
         productsDelete,
         onFetchProducts,
         onFetchFlavours,
         allSubcategories,
         onFetchAllSubcategories,
         onAddProducts,
         onEditProducts,
         onProductsImageEdit,
         onDeleteProducts,
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
              // console.log(event);
              setPage(0);
            };
            const [deleteProducts, setDeleteProducts] = useState(
              null,
            );
            const [deleteModal, setDeleteModal] = useState(false);

             useEffect(() => {
               // When initial state username is not null, submit the form to load repos
               // if (username && username.trim().length > 0) onSubmitForm();
               onFetchProducts();
               onFetchFlavours()
               onFetchAllSubcategories();
              //  fetchFlavours();
             },[])

            const handleDeleteModalOpen = (name, id) => {
              setDeleteProducts({ name, id });
              setDeleteModal(true);
            };

            const handleDeleteModalClose = () => {
              onRemoveError();
              setDeleteModal(false);
            };

            const handleDeleteProducts = () => {
              onDeleteProducts(
                { id: deleteProducts && deleteProducts.id },
                handleDeleteModalClose,
              );
            };

<<<<<<< HEAD
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
          <PageTitle name="Products" />
          <div style={{ padding: '0% 2%' }}>
            <div style={{ textAlign: 'right' }}>
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: '10px' }}
              >
                <RefreshIcon onClick={onFetchProducts} />
              </Button>
              <Button
                size="medium"
                variant="contained"
                color="primary"
                startIcon={<AddCircleOutlineIcon />}
                onClick={handleAddModalOpen}
              >
                ADD Products
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
              {products ? (
                <TableContainer component={Paper}>
                  <Table aria-label="collapsible table">
                    <TableHead>
                      <TableRow>
                        <td className="table-head">Details</td>
                        <td className="table-head">Name</td>
                        <td className="table-head">Description</td>
                        <td className="table-head">SubCategory</td>
                        <td className="table-head">Price (₹)</td>
                        <td className="table-head">Delete</td>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {products &&
                        products
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage,
                          )
                          .map((product, index) => (
                            <Row key={product._id} product={product} handleDeleteModalOpen={handleDeleteModalOpen} />
                          ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <h6 className="text-center">
                  No products Found / Error in fetching product data
                </h6>
              )}
              <TablePagination
                rowsPerPageOptions={[5, 10, 20, 30, 40]}
                component="div"
                count={products != undefined ? products.length : 10}
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
        aria-labelledby="add-products-modal"
        aria-describedby="to-add-products"
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
            <h1 style={{ fontSize: '1.25em', marginTop: 0 }}>Add Products</h1>
            <hr className="line" align="left" />
            <Formik
              initialValues={{ name: '', email: '', mobile: '' }}
              validationSchema={AdminProductsSchema}
              onSubmit={values => handleAddProducts(values)}
            >
              {({ errors, touched, handleChange, handleBlur }) => (
                <Form>
                  <Grid container style={{ width: '300px' }}>
=======
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
                    <PageTitle name="Products" />
                    <div style={{ padding: '0% 2%' }}>
                      <div style={{ textAlign: 'right' }}>
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ marginRight: '10px' }}
                        >
                          <RefreshIcon onClick={onFetchProducts} />
                        </Button>
                        <Button
                          size="medium"
                          variant="contained"
                          color="primary"
                          startIcon={<AddCircleOutlineIcon />}
                          // onClick={handleAddModalOpen}
                          onClick={() =>
                            browserRedirect('/admin/add/product')
                          }
                        >
                          ADD Products
                        </Button>
                      </div>
                    </div>
                  </div>
                  {loading ? (
                    <div className="loader">
                      <CircularProgress
                        style={{ color: '#09799C' }}
                      />
                    </div>
                  ) : error &&
                    error.response &&
                    error.response.data &&
                    error.response.data.message ? (
>>>>>>> 067e8913bf32a4fcab18a8f2a17e20123869132f
                    <div className="error-message">
                      <p>{error.response.data.message}</p>
                    </div>
                  ) : (
                    <>
                      <div style={{ padding: '2%' }}>
                        {products ? (
                          <TableContainer component={Paper}>
                            <Table aria-label="collapsible table">
                              <TableHead>
                                <TableRow>
                                  <td className="table-head">
                                    Details
                                  </td>
                                  <td className="table-head">
                                   
                                    Name
                                 
                                  </td>
                                  <td className="table-head">
                                    Description
                                  </td>
                                  <td className="table-head">
                                    Parent SubCategory
                                  </td>
                                  <td className="table-head">
                                    Price (₹)
                                  </td>
                                  <td className="table-head">
                                    Delete
                                  </td>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {products &&
                                  products
                                    .slice(
                                      page * rowsPerPage,
                                      page * rowsPerPage +
                                        rowsPerPage,
                                    )
                                    .map((product, index) =>
                                      product.isDeleted ? null : (
                                        <Row
                                          key={product._id}
                                          product={product}
                                          flavours={flavours}
                                          subcategories={
                                            allSubcategories
                                          }
                                          handleDeleteModalOpen={
                                            handleDeleteModalOpen
                                          }
                                        />
                                      ),
                                    )}
                              </TableBody>
                            </Table>
                          </TableContainer>
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
                        <TablePagination
                          rowsPerPageOptions={[5, 10, 20, 30, 40]}
                          component="div"
                          count={
                            products != undefined
                              ? products.length
                              : 10
                          }
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onChangePage={handleChangePage}
                          onChangeRowsPerPage={
                            handleChangeRowsPerPage
                          }
                        />
                      </div>
                    </>
                  )}
<<<<<<< HEAD
                </Form>
              )}
            </Formik>
          </div>
        </Fade>
      </Modal>
      {productsAdd && productsAdd.loading ? (
                    <CircularProgress
                      style={{ color: '#09799C' }}
                      size={25}
                    />
                  ) : (
      <AlertDialog
        open={deleteModal}
        onClose={handleDeleteModalClose}
        title={'Delete Product'}
        message={`Are you sure that you want to delete Product with name : "${deleteProducts &&
          deleteProducts.name}"`}
        button1="Delete"
        button1OnClick={handleDeleteProducts}
        button2="Cancel"
        button2OnClick={handleDeleteModalClose}
        
      />
      )}
    </Grid>
  );
}
=======
                </Grid>

                {/* Delete Product Modal */}
                <Modal
                  open={deleteModal}
                  onClose={handleDeleteModalClose}
                  aria-labelledby="delete-products-modal"
                  aria-describedby="to-delete-products"
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
                        Delete Product
                      </h1>
                      <Divider />
                      <div className="error-message">
                        {productsDelete &&
                        productsDelete.error &&
                        productsDelete.error.response &&
                        productsDelete.error.response.data &&
                        productsDelete.error.response.data
                         
                          .message ? (
                          <p style={{ marginBottom: '30px' }}>
                            {
                              productsDelete.error.response.data
                                .message
                            }
                          </p>
                        ) : null}
                      </div>
                      <h4
                        style={{
                          fontSize: '1em',
                          marginTop: '10px',
                        }}
                      >
                        Are you sure that you want to delete product
                        with name : <br />
                        <br />
                        <i>
                          "{deleteProducts && deleteProducts.name}"
                        </i>
                      </h4>
                      <br />
                      {productsDelete && productsDelete.loading ? (
                        <CircularProgress
                          style={{ color: '#09799C' }}
                          size={25}
                        />
                      ) : (
                        <>
                          <Button
                            color="default"
                            variant="contained"
                            size="medium"
                            onClick={handleDeleteProducts}
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
>>>>>>> 067e8913bf32a4fcab18a8f2a17e20123869132f

AdminProducts.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // products: PropTypes.oneOfType([PropTypes.object]),
  productsAdd: PropTypes.object,
  productsEdit : PropTypes.object,
  productsImageEdit : PropTypes.object,
  productsDelete: PropTypes.object,
  onFetchProducts: PropTypes.func,
  onFetchFlavours: PropTypes.func,
  onAddProducts: PropTypes.func,
  onProductsImageEdit: PropTypes.func,
  onDeleteProducts: PropTypes.func,
  onRemoveError: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  products: makeSelectProducts(),
  flavours: makeSelectFlavours(),
  allSubcategories: makeSelectAllSubcategories(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  productsAdd: makeSelectProductsAdd(),
  productsEdit: makeSelectProductsEdit(),
  productsImageEdit : makeSelectProductsImageEdit(),
  productsDelete: makeSelectProductsDelete(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onFetchProducts: () => {
      dispatch(adminProductsFetch());
    },
    onFetchFlavours: () => {
      dispatch(adminFlavoursFetch());
    },
    onFetchAllSubcategories: () => {
      dispatch(adminAllSubcategoriesFetch());
    },
    onAddProducts: (evt, closeAddModal) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(adminProductsAdd(evt, closeAddModal));
    },
    onEditProducts: (evt, closeEditProductModal) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(adminProductsEdit(evt, closeEditProductModal));
    },
    onProductsImageEdit: (evt, closeEditProductModal) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(adminProductsImageEdit(evt, closeEditProductModal));
    },
    onDeleteProducts: (evt, closeDeleteModal) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(adminProductsDelete(evt, closeDeleteModal));
    },

    onRemoveError: () => {
      dispatch(adminProductsRemoveError());
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
)(AdminProducts);
