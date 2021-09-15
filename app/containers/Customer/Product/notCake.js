import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Header from '../../../components/Header';
import Counter from '../../../components/Counter';
import Footer from '../../../components/Footer';
import Button from '@material-ui/core/Button';
import {
  Container,
  Switch,
  MenuItem,
  Breadcrumbs,
  Link,
  NativeSelect,
  Chip,
  Avatar,
} from '@material-ui/core';
import { Carousel, Image } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
const svg1 = require('../../../images/quality-assurance.svg');
const svg2 = require('../../../images/logistics__delivery__safe_-512.png');
import { image_url } from '../../../config/urls';
import { urls } from '../../../config/urls';
import request from '../../../utils/request';
import './product.css';
import { browserRedirect } from '../../../helpers/helpers';
import { Home, InfoRounded, VerticalAlignBottom } from '@material-ui/icons';

function valuetext(value) {
  return `${value}Kg`;
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function NotCake(props) {
  const [snackbar, setsnackbar] = React.useState(false);
  const [severity, setseverity] = useState('');
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({
    id: '',
    name: '',
    image: '',
    quantity: '',
    hasAllFlavour: false,
    hasEgg: false,
    customMessage: '',
    specialInstruction: '',
  });

  const handleSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setsnackbar(false);
  };

  const handleChange = event => {
    setForm({ ...form, hasEgg: !form.hasEgg });
  };

  const handleData = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleAddToCart = ({
    weight,
    quantity,
    customMessage,
    specialInstruction,
    hasEgg,
  }) => {
    try {
      console.log('handle cart invoked');
      let exisitingCartData = JSON.parse(localStorage.getItem('cart')) || [];

      if (!(quantity > 0)) {
        throw new Error('Please increase the quantity');
      }
      const now = new Date();
      if (exisitingCartData) {
        exisitingCartData.push({
          name: props.product.name,
          id: props.product._id,
          hasAllFlavour: false,
          isCake: false,
          flavours: null,
          price: props.product.price,
          calculatedPrice: props.product.price,
          maxQuantity: props.product.maxQuantity,
          image: props.product.images[0],
          customMessage,
          weight,
          quantity,
          specialInstruction,
          hasEgg: false,
          createdAt: now,
        });
      } else {
        exisitingCartData.push({
          name: props.product.name,
          id: props.product._id,
          hasAllFlavour: false,
          isCake: false,
          flavours: null,
          price: props.product.price,
          calculatedPrice: props.product.price,
          maxQuantity: props.product.maxQuantity,
          image: props.product.images[0],
          customMessage,
          weight,
          quantity,
          specialInstruction,
          hasEgg: false,
          createdAt: now,
        });
      }
      localStorage.setItem('cart', JSON.stringify(exisitingCartData));
      setMessage('Product added to cart');
      setseverity('success');
      setsnackbar(true);
      // console.log('formdata: ', exisitingCartData);
      browserRedirect('/cart');
    } catch (error) {
      setMessage(error.message);
      setseverity('info');
      setsnackbar(true);
    }
  };

  return (
    <>
      <Container>
        <div className="d-flex flex-column">
          <div className="row navigation">
            <div className="col-md-12 col-sm-12">
              <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="/">
                  Home
                </Link>
                <h> Category</h>
                <h>Subcategory</h>
                <Typography color="textPrimary">Product Details</Typography>
              </Breadcrumbs>
            </div>
          </div>

          <div className="row container align-self-center">
            <div className="col-md-6 col-sm-12 leftimagepane">
              <div className="row">
                <Carousel style={{ width: '100%' }}>
                  {props.product ? (
                    props.product.images ? (
                      props.product.images.map(image => (
                        <Carousel.Item className="productImage">
                          <Image
                            className="d-block w-100"
                            src={image_url + image}
                            style={{ height: '100%', width: '100%' }}
                            alt={props.product.name}
                            fluid
                          />
                        </Carousel.Item>
                      ))
                    ) : (
                      <Carousel.Item className="productImage">
                        <Image
                          className="d-block w-100"
                          style={{ maxHeight: '100%' }}
                          alt={props.product.name}
                          fluid
                        />
                      </Carousel.Item>
                    )
                  ) : (
                    'Loading Products...'
                  )}
                </Carousel>
              </div>
              <div className="container my-3">
                <Chip 
                  variant="contained"
                  label={<i>
                    Actual product may slightly vary from the image shown
                  </i>}
                  icon={<InfoRounded/>}
                />
              </div>
            </div>

            <div className="col container-fluid productdetailspane">
              {props.product ? (
                <>
                  <div style={{ paddingBottom: '3%' }}>
                    <h4 style={{ textTransform: 'capitalize' }}>
                      <b>
                        {props.product.name
                          ? props.product.name
                          : 'Product not found in DB'}
                      </b>
                    </h4>
                  </div>
                  <div className="col container-fluid">
                    <div className="row">
                      <h>
                        <i>
                          {props.product
                            ? props.product.description
                            : 'Description'}
                        </i>
                      </h>
                    </div>
                  </div>
                  <hr />
                  <div className="row ">
                    <div className="col">
                      <h4>
                        <b>₹ </b>
                        {props.product
                          ? props.product.isCake && value
                            ? Number(props.product.price) * Number(value)
                            : props.product.price
                          : ''}
                      </h4>
                    </div>
                  </div>

                  <div className="row fluid" style={{ marginTop: '2%' }}>
                    <div
                      className="col-md-6"
                      style={{ padding: '2% 0 2% 3.5%' }}
                    >
                      <h>
                        <b>Quantity : </b>
                      </h>
                    </div>
                    <div className="col-md-6">
                      <Counter
                        increase={props.increase}
                        decrease={props.decrease}
                        count={props.count}
                      />
                    </div>
                  </div>

                  <div>
                    <form className="" autoComplete="off">
                      <TextField
                        style={{ marginTop: '5%' }}
                        fullWidth
                        size="small"
                        id="customMessage"
                        name="customMessage"
                        label="Customized Message"
                        variant="outlined"
                        color="primary"
                        value={form.customMessage}
                        onChange={handleData}
                      />
                      <TextField
                        style={{ marginTop: '5%' }}
                        fullWidth
                        size="small"
                        name="specialInstruction"
                        id="specialInstruction"
                        label="Special instructions"
                        variant="outlined"
                        color="primary"
                        value={form.specialInstruction}
                        onChange={handleData}
                      />
                    </form>
                    <div>
                      <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        className="shadow-none rounded-0"
                        startIcon={<AddShoppingCartIcon />}
                        style={{
                          backgroundColor: '#ffbc2a',
                          marginTop: '5%',
                        }}
                        onClick={() => {
                          handleAddToCart({
                            weight: null,
                            quantity: props.count,
                            customMessage: form.customMessage,
                            specialInstruction: form.specialInstruction,
                            hasEgg: form.hasEgg,
                          });
                        }}
                      >
                        <Typography variant="button" display="block">
                          <b>ADD TO Cart</b>
                        </Typography>
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                'Fetching products          ...'
              )}
            </div>
          </div>
        </div>
        <div
          className="row container qualityText text-center"
          style={{ paddingLeft: '10%' }}
        >
          <div className="col-md-4 col-sm-12 my-2">
            <p>
              <img src={svg1} width="30" height="30" /> Assured Quality
            </p>
          </div>
          <div className="col-md-4 col-sm-12 my-2">
            <p>
              <VerifiedUserOutlinedIcon /> Secure payments
            </p>
          </div>
          <div className="col-md-4 col-sm-12 my-2">
            <p>
              <img src={svg2} width="30" height="30" /> Safe Delivery
            </p>
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
    </>
  );
}
                   
                   
                  
                   
                   
                  
                   
                   
                  
                   
                   
                  
                   
                   
                  
     