import React, {useState , useEffect, useLayoutEffect} from 'react';
import { Link } from 'react-router-dom';

import {
  Tab,
  Divider,
  Container,
  Snackbar,
  Breadcrumbs,
  Typography,
} from '@material-ui/core';

import Header from '../../../components/Header';
import MuiAlert from '@material-ui/lab/Alert';
import Footer from '../../../components/Footer';
import Button from '@material-ui/core/Button';

import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import { browserRedirect } from '../../../helpers/helpers';
import './cart.css';
import { useCookies, Cookies } from 'react-cookie';
import CartItem from './Cartitem';
import { ShoppingCart } from '@material-ui/icons';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Cart() {
  let cookie = new Cookies();
  const [snackbar, setsnackbar] = React.useState(false);
  const [severity, setseverity] = useState('');
  const [message, setMessage] = useState('');
  let [cartItems, setCartItems] = React.useState({
    cart: JSON.parse(localStorage.getItem('cart')),
  });
  
  const [cookies, setCookie, removeCookie] = useCookies({
    customertoken: null,
  });

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setsnackbar(false);
  };


  const handleAddToCart = (index, quantity) => {
    try {
      let exisitingCartData = JSON.parse(localStorage.getItem('cart')) || [];

      exisitingCartData[index].quantity = quantity;

      localStorage.setItem('cart', JSON.stringify(exisitingCartData));
      setMessage('Product quantity updated');
      setseverity('success');
      setsnackbar(true);
      console.log('formdata: ', exisitingCartData);
    } catch (error) {
      setMessage(error.message);
      setseverity('info');
      setsnackbar(true);
    }
  };

  const handleDeleteItem = index => {
    console.log('delete item invoked at : ', index);
    let newCartItems = cartItems.cart;
    newCartItems.splice(index, 1);
    console.log(newCartItems);
    setCartItems({ cart: newCartItems });
    localStorage.setItem('cart', JSON.stringify(newCartItems));
  };

  return (
    <>
      <Header />
      <Container>
        <div className="col container">
          <Breadcrumbs aria-label="breadcrumb">
            <Link style={{ color: 'grey' }} href="/">
              Home
            </Link>
            <Typography color="textPrimary">Cart</Typography>
          </Breadcrumbs>
        </div>

        <div className="row cotainer-fluid justify-content-center mx-3 my-3">
          {cartItems ? (
            cartItems.cart ? (
              cartItems.cart.length > 0 ? (
                cartItems.cart.map((product, index) => {
                  return (
                    <CartItem
                      index={index}
                      key={cartItems}
                      product={product}
                      delete={handleDeleteItem}
                      handleAddToCart={handleAddToCart}
                    />
                  );
                })
              ) : (
                <div className=" text-center text-muted">
                  <ShoppingCart /> Your cart is empty ! 
                  <br />
                  Please add items to proceed.
                </div>
              )
            ) : (
              <div className=" text-center text-muted">
                <ShoppingCart /> Your cart is empty !  <br />
                Please add items to proceed.
              </div>
            )
          ) : (
            <div className=" text-center text-muted">
              <ShoppingCart /> Your cart is empty ! <br />
              Please add items to proceed.
            </div>
          )}

          <Divider />

          <div
            className="row container"
            style={{ textAlign: 'center', padding: '5%' }}
          >
            <div className="col-md-6 col-sm-12 mt-3">
              <Button
                className="shadow-none rounded-0"
                fullwidth
                size="large"
                variant="contained"
                style={{ backgroundColor: '#d6d6d6' }}
                onClick={() => browserRedirect('/')}
              >
                <KeyboardArrowLeftIcon />
                <b>Continue Shopping</b>
              </Button>
            </div>
            <div className="col-md-6 col-sm-12 mt-3">
              {cartItems.cart ? (
                cartItems.cart.length > 0) ? 
                ( 
                cookies.customertoken ? (
                  <div>
                    {/* {console.log('cookes: ', cookies.customertoken)} */}
                    <Button
                      className="shadow-none rounded-0"
                      fullwidth
                      size="large"
                      variant="contained"
                      style={{ backgroundColor: '#ffbc2a' }}
                      onClick={() => browserRedirect('/checkout')}
                    >
                      <b>Proceed To Checkout</b>
                      <KeyboardArrowRightIcon />
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Link
                      style={{ textDecoration: 'none' }}
                      to={{
                        pathname: '/login',
                        data: 'checkout', // your data array of objects
                      }}
                    >
                      <Button
                        className="shadow-none rounded-0"
                        fullwidth
                        size="large"
                        variant="contained"
                        style={{
                          backgroundColor: '#ffbc2a',
                        }}
                        // onClick={() => browserRedirect('/login')}
                      >
                        <b>Login to checkout</b>
                        <KeyboardArrowRightIcon />
                      </Button>
                    </Link>
                  </div>
                )
              ) : (
                <div>
                  <Button
                    className="shadow-none rounded-0"
                    disabled
                    fullwidth
                    size="large"
                    variant="contained"
                  >
                    <b>Proceed to checkout</b>
                    <KeyboardArrowRightIcon />
                  </Button>
                </div>
              ) : (
                <div>
                  <Button
                    className="shadow-none rounded-0"
                    disabled
                    fullwidth
                    size="large"
                    variant="contained"
                  >
                    <b>Proceed to checkout</b>
                    <KeyboardArrowRightIcon />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
      <Snackbar
        open={snackbar}
        autoHideDuration={1500}
        onClose={handleSnackBar}
      >
        <Alert onClose={handleSnackBar} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      <Footer />
    </>
  );
}