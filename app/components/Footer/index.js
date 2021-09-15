import React, {useState} from 'react';
import { Grid, Link, Snackbar, Button } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import {browserRedirect} from '../../helpers/helpers'
import {menu_url} from '../../config/urls'
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import './index.css';

import AirtelLogo from '../../images/paymenticons/airtel.svg'
import AmazonLogo from '../../images/paymenticons/amazonpay.svg'
import AmazonpayLogo from '../../images/paymenticons/apay.svg'
import MastercardLogo from '../../images/paymenticons/mastercard.svg'
import MaestroLogo from '../../images/paymenticons/maestro.svg'
import PaypalLogo from '../../images/paymenticons/paypal.svg'
import PhonepayLogo from '../../images/paymenticons/phonepay.svg'
import AWSLogo from '../../images/paymenticons/aws.svg'
import RazorpayLogo from '../../images/paymenticons/razorpay.svg'
import UpiLogo from '../../images/paymenticons/upi.svg'
import VisaLogo from '../../images/paymenticons/visa.svg'
import MobikwikLogo from '../../images/paymenticons/mobikwik.svg'



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Footer() {
  const [open, setOpen] = useState(false)

  const handleLogout= (event)=>{
    localStorage.removeItem('token');
    setOpen(true)
    browserRedirect("/")
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <footer className="footer">
      {/* desktop footer */}
      <div id="content-desktop">
        <Grid className="container">
          <Grid item xs={3}>
            <p className="footer-head">Know us</p>
            <hr className="underline" />
            <Link
              onClick={() => {
                browserRedirect('/about');
              }}
              href="#"
              color="inherit"
              display="block"
              className="footer-text"
            >
              About us
            </Link>
            <br />
            <Link
              onClick={() => {
                browserRedirect('/privacy');
              }}
              href="#"
              color="inherit"
              display="block"
              className="footer-text"
            >
              Privacy Policy
            </Link>
            <br />
            <Link
              onClick={() => {
                browserRedirect('/faqs');
              }}
              href="#"
              color="inherit"
              display="block"
              className="footer-text"
            >
              FAQs
            </Link>
            <br />
            <Link
              onClick={() => {
                browserRedirect('/terms');
              }}
              href="#"
              color="inherit"
              display="block"
              className="footer-text"
            >
              Terms & Conditions
            </Link>
          </Grid>
          <Grid item xs={3}>
            <p className="footer-head">Account</p>
            <hr className="underline" />
            <Link
              onClick={() => {
                browserRedirect('/signup');
              }}
              href="login"
              color="inherit"
              display="block"
              className="footer-text"
            >
              Create Account
            </Link>
            <br />
            <Link
              onClick={() => {
                browserRedirect('/login');
              }}
              href="#"
              color="inherit"
              display="block"
              className="footer-text"
            >
              Login
            </Link>
            <br />
            <Link
              href="cart"
              color="inherit"
              display="block"
              className="footer-text"
            >
              Your cart
            </Link>
            <br />
            <Link
              className="footer-text"
              href={menu_url}
              target="_blank"
              color="inherit"
              display="block"
              className="footer-text"
            >
              Menu
            </Link>
            <br />
          </Grid>
          <Grid item xs={3}>
            <p className="footer-head">Accepted payments</p>
            <hr className="underline" />
            <div className="container">
              <div>
                <img
                  className="paymenticons"
                  src={AirtelLogo}
                  alt="Airtel Pay"
                />
              </div>
              <div>
                <img className="paymenticons" src={VisaLogo} alt="Visa" />
              </div>
              <div>
                <img
                  className="paymenticons"
                  src={MastercardLogo}
                  alt="Mastercard"
                />
              </div>
            </div>
            <div className="container">
              <div>
                <img
                  className="paymenticons"
                  src={MaestroLogo}
                  alt="Maestro"
                />
              </div>
              <div>
                <img
                  className="paymenticons-h"
                  src={PaypalLogo}
                  alt="Paypal"
                />
              </div>
              <div>
                <img className="paymenticons-h" src={UpiLogo} alt="UPI" />
              </div>
            </div>
            <div className="container">
              <div>
                <img
                  className="paymenticons-h"
                  src={AmazonLogo}
                  style={{ backgroundColor: 'white' }}
                  alt="Amazon Pay"
                />
              </div>
              <div>
                <img
                  className="paymenticons-h"
                  src={MobikwikLogo}
                  alt="Mobikwik"
                />
              </div>
              <div>
                <img
                  className="paymenticons-h"
                  src={RazorpayLogo}
                  alt="Razorpay"
                />
              </div>
            </div>
            <div className="container">
              <div>
                <img
                  className="paymenticons-h"
                  src={PhonepayLogo}
                  alt="Phonepay"
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={3}>
            <p className="footer-head">Visit</p>
            <hr className="underline" />
            <form
              action="http://maps.google.com/maps"
              method="get"
              target="_blank"
            >
              <label for="saddr">
                <p
                  className="footer-text"
                  href="#"
                  color="inherit"
                  display="block"
                  className="footer-text"
                >
                  Store -1: <br />
                  267, Aishbagh Road
                  <br />
                  Opp- Bank of India
                  <br />
                  Lucknow, 226004
                  <br />
                  <a style={{ color: 'white' }} href="tel:+915224101530">
                    0522-4101530
                  </a>
                  <br />
                  <a style={{ color: 'white' }} href="tel:+916306998580">
                    +91-6306998580
                  </a>
                </p>
              </label>
              <br />
              <input
                type="hidden"
                name="daddr"
                value="silverspoon bakerrs and cafe, 267, Aishbagh Road Lucknow, 226004, uttar pradesh"
              />
              <Button
                variant="outlined"
                style={{ color: '#ffbc2a', borderColor: '#ffbc2a' }}
                size="small"
                type="submit"
              >
                Get Directions
              </Button>
            </form>
            <br />
            <form
              action="http://maps.google.com/maps"
              method="get"
              target="_blank"
            >
              <label for="saddr">
                <p
                  className="footer-text"
                  href="#"
                  color="inherit"
                  display="block"
                  className="footer-text"
                >
                  Store -2: <br />
                  82, Guru Gobind Singh Marg
                  <br />
                  Near Hussainganj Metro station
                  <br />
                  Gate 2, Lucknow <br />
                  226001
                  <br />
                  <a style={{ color: 'white' }} href="tel:+917905213159">
                    +91-7905213159
                  </a>
                </p>
              </label>
              <input
                type="hidden"
                name="daddr"
                value="silverspoon bakerrs and cafe, 82, Guru Gobind Singh Marg
                  Near Hussainganj Metro station
                  Gate 2, Lucknow
                  226001"
              />
              <Button
                variant="outlined"
                style={{ color: '#ffbc2a', borderColor: '#ffbc2a' }}
                size="small"
                type="submit"
              >
                Get Directions
              </Button>
            </form>
            <br />
          </Grid>
        </Grid>

        <hr />
        <Grid item xs style={{ textAlign: 'center' }}>
          <a
            href="https://www.instagram.com/silverspoon_bakers_cafe"
            style={{ color: 'white' }}
            className="mx-4"
          >
            <InstagramIcon fontSize="large" color="inherit" />
          </a>
          <a
            href="https://www.facebook.com/silverspoonbakery99"
            style={{ color: 'white' }}
            className="mx-4"
          >
            <FacebookIcon fontSize="large" color="inherit" />
          </a>
        </Grid>

        <div className="bottomText">
          <hr className="underline" />
          <p style={{ textAlign: 'center', margin: 0 }}>
            <div>
              <small>
                © {new Date().getFullYear()} Silver Spoon Bakers & Cafe.
              </small>
            </div>
            <div>
              <small>
                {' '}
                Powered by{' '}
                <img className="paymenticons-h" src={AWSLogo} alt="AWS" />
              </small>
            </div>
          </p>
        </div>
      </div>

      {/* mobile footer */}
      <div className="mobileContainer" id="content-mobile">
        <div className="mobileFooter">
          <Grid container>
            <Grid container xs={12}>
              <Grid item xs={6}>
                <p className="footer-head">Know Us</p>
                <hr className="underline" />

                <Link
                  onClick={() => {
                    browserRedirect('/about');
                  }}
                  href="#"
                  display="block"
                  color="inherit"
                  className="footer-text"
                >
                  About us
                </Link>
                <br />
                <Link
                  onClick={() => {
                    browserRedirect('/privacy');
                  }}
                  href="#"
                  display="block"
                  color="inherit"
                  className="footer-text"
                >
                  Privacy Policy
                </Link>
                <br />
                <Link
                  onClick={() => {
                    browserRedirect('/faqs');
                  }}
                  href="#"
                  display="block"
                  color="inherit"
                  className="footer-text"
                >
                  FAQs
                </Link>
                <br />
                <Link
                  onClick={() => {
                    browserRedirect('/terms');
                  }}
                  href="#"
                  color="inherit"
                  className="footer-text"
                >
                  Terms & Conditions
                </Link>
              </Grid>
              <Grid item xs={6}>
                <p className="footer-head">Account</p>
                <hr className="underline" />

                <Link
                  onClick={() => {
                    browserRedirect('/login');
                  }}
                  href="#"
                  color="inherit"
                  display="block"
                  className="footer-text"
                >
                  Create Account
                </Link>
                <br />
                <Link
                  onClick={() => {
                    browserRedirect('/login');
                  }}
                  href="#"
                  color="inherit"
                  display="block"
                  className="footer-text"
                >
                  Login
                </Link>
                <br />
                <Link
                  onClick={() => {
                    browserRedirect('/cart');
                  }}
                  href="#"
                  color="inherit"
                  display="block"
                  className="footer-text"
                >
                  Your cart
                </Link>
                <br />
              </Grid>
            </Grid>
            <Grid container xs={12} style={{ marginTop: '5%' }}>
              <Grid item xs={6}>
                <p className="footer-head">Shop</p>
                <hr className="underline" />
                <Link
                  className="footer-text"
                  href={menu_url}
                  color="inherit"
                  target="_blank"
                  display="block"
                  className="footer-text"
                >
                  Menu
                </Link>
              </Grid>
              <Grid item xs={6}>
                <p className="footer-head">Visit</p>
                <hr className="underline" />
                <form
                  action="http://maps.google.com/maps"
                  method="get"
                  target="_blank"
                >
                  <label for="saddr">
                    <p
                      className="footer-text"
                      href="#"
                      color="inherit"
                      display="block"
                      className="footer-text"
                    >
                      Store -1: <br />
                      267, Aishbagh Road
                      <br />
                      Opp- Bank of India
                      <br />
                      Lucknow, 226004
                      <br />
                      <a style={{ color: 'white' }} href="tel:+915224101530">
                        0522-4101530
                      </a>
                      <br />
                      <a style={{ color: 'white' }} href="tel:+916306998580">
                        +91-6306998580
                      </a>
                    </p>
                  </label>
                  <input
                    type="hidden"
                    name="daddr"
                    value="silverspoon bakerrs and cafe, 267, Aishbagh Road Lucknow, 226004, uttar pradesh"
                  />
                  <Button
                    variant="outlined"
                    style={{ color: '#ffbc2a', borderColor: '#ffbc2a' }}
                    size="small"
                    type="submit"
                  >
                    Get Directions
                  </Button>
                </form>
                <br />
                <form
                  action="http://maps.google.com/maps"
                  method="get"
                  target="_blank"
                >
                  <label for="saddr">
                    <p
                      className="footer-text"
                      href="#"
                      color="inherit"
                      display="block"
                      className="footer-text"
                    >
                      Store -2: <br />
                      82, Guru Gobind Singh Marg
                      <br />
                      Near Hussainganj Metro station
                      <br />
                      Gate 2, Lucknow <br />
                      226001
                      <br />
                      <a style={{ color: 'white' }} href="tel:+917905213159">
                        +91-7905213159
                      </a>
                    </p>
                  </label>
                  <input
                    type="hidden"
                    name="daddr"
                    value="silverspoon bakerrs and cafe, 82, Guru Gobind Singh Marg
                  Near Hussainganj Metro station
                  Gate 2, Lucknow
                  226001"
                  />
                  <Button
                    variant="outlined"
                    style={{ color: '#ffbc2a', borderColor: '#ffbc2a' }}
                    size="small"
                    type="submit"
                  >
                    Get Directions
                  </Button>
                </form>
                <br />
              </Grid>
            </Grid>
          </Grid>
          <hr />
          <div className="text-center">
            <p style={{ textAlign: 'center', margin: 0 }}>
              Accepted payments
            </p>
            <hr style={{ backgroundColor: '#ffbc2a', width: '30%' }} />
          </div>
          <div className="container">
            <div>
              <img
                className="paymenticons"
                src={AirtelLogo}
                alt="Airtel Pay"
              />
            </div>
            <div>
              <img className="paymenticons" src={VisaLogo} alt="Visa" />
            </div>
            <div>
              <img
                className="paymenticons"
                src={MastercardLogo}
                alt="Mastercard"
              />
            </div>
            <div>
              <img className="paymenticons" src={MaestroLogo} alt="Maestro" />
            </div>
          </div>
          <div className="container">
            <div>
              <img className="paymenticons-h" src={PaypalLogo} alt="Paypal" />
            </div>
            <div>
              <img className="paymenticons-h" src={UpiLogo} alt="UPI" />
            </div>
            <div>
              <img
                className="paymenticons-h"
                src={AmazonLogo}
                style={{ backgroundColor: 'white' }}
                alt="Amazon Pay"
              />
            </div>
          </div>
          <div className="container">
            <div>
              <img
                className="paymenticons-h"
                src={MobikwikLogo}
                alt="Mobikwik"
              />
            </div>
            <div>
              <img
                className="paymenticons-h"
                src={RazorpayLogo}
                alt="Razorpay"
              />
            </div>
            <div>
              <img
                className="paymenticons-h"
                src={PhonepayLogo}
                alt="Phonepay"
              />
            </div>
          </div>
          <hr />
          <Grid item xs style={{ textAlign: 'center' }}>
            <a
              href="https://www.instagram.com/silverspoon_bakers_cafe"
              style={{ color: 'white' }}
              className="mx-4"
            >
              <InstagramIcon fontSize="large" color="inherit" />
            </a>
            <a
              href="https://www.facebook.com/silverspoonbakery99"
              style={{ color: 'white' }}
              className="mx-4"
            >
              <FacebookIcon fontSize="large" color="inherit" />
            </a>
          </Grid>
          <div className="text-center">
            <hr style={{ backgroundColor: '#ffbc2a' }} />
            <p style={{ textAlign: 'center', margin: 0 }}>
              <small>
                © {new Date().getFullYear()} Silver Spoon Bakers & Cafe.
              </small>
            </p>
          </div>
          <div className="container-fluid text-center">
            <small>
              {' '}
              Powered by{' '}
              <img className="paymenticons-h" src={AWSLogo} alt="AWS" />
            </small>
          </div>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          logged Out !
        </Alert>
      </Snackbar>
    </footer>
  );
}

export default Footer;
