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
import { InfoRounded, VerticalAlignBottom } from '@material-ui/icons';

function valuetext(value) {
  return `${value}Kg`;
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AllFlavourCake(props) {
  const [snackbar, setsnackbar] = React.useState(false);
  const [severity, setseverity] = useState('');
  const [message, setMessage] = useState('');
  const [price, setprice] = useState({ price: props.product.price });
  const [baseprice, setbaseprice] = useState(props.product.price);
  let [value, setValue] = useState({ weight: props.product.minWeight });
  const [form, setForm] = useState({
    id: '',
    name: '',
    image: '',
    weight: '',
    quantity: '',
    flavour: props.allFlavours[0],
    hasAllFlavour: true,
    hasEgg: false,
    customMessage: '',
    specialInstruction: '',
  });

  const getPrice = () => {
                           const priceC =
                             (Number(baseprice) +
                               Number(
                                 form.flavour.price,
                               )) *
                             Number(value.weight);
                           setprice({ price: priceC });
                         };

  useEffect(() => {
    getPrice();
  }, [form.flavour, value, price.price]);
  
  const handleSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setsnackbar(false)
  };
  const handleData = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleChange = event => {
    setForm({ ...form, hasEgg: !form.hasEgg });
  };

  const handleFlavourChange = event => {
    setMessage('Price updated');
    setseverity('info');
    setsnackbar(true);
    setForm({ ...form, flavour: event.target.value });
  };

  const handleAddToCart = ({
    weight,
    quantity,
    customMessage,
    specialInstruction,
    hasEgg,
  }) => {
    try {
      let exisitingCartData = JSON.parse(localStorage.getItem('cart')) || [];

      if (!(quantity > 0)) {
        throw new Error('Please increase the quantity');
      }
      const now = new Date();
      if (exisitingCartData) {
        exisitingCartData.push({
          name: props.product.name,
          price: props.product.price,
          maxQuantity: props.product.maxQuantity,
          image: props.product.images[0],
          id: props.product._id,
          isCake: true,
          calculatedPrice: price.price,
          flavour: form.flavour,
          hasAllFlavour: form.hasAllFlavour,
          customMessage,
          weight,
          quantity,
          specialInstruction,
          hasEgg,
          createdAt: now,
        });
      } else {
        exisitingCartData.push({
          name: props.product.name,
          price: props.product.price,
          maxQuantity: props.product.maxQuantity,
          image: props.product.images[0],
          id: props.product._id,
          isCake: true,
          calculatedPrice: price.price,
          flavour: form.flavour,
          hasAllFlavour: form.hasAllFlavour,
          customMessage,
          weight,
          quantity,
          specialInstruction,
          hasEgg,
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
                  label={
                    <i>
                      Actual product may slightly vary from the image shown
                    </i>
                  }
                  icon={<InfoRounded />}
                />
              </div>
              <div className="col my-4 servingGuideButton">
                <div className="row">
                  <h6 className="pl-3">
                    <b>Serving Guide : </b>
                  </h6>
                </div>
                <div className="row">
                  <div className="col">
                    <p>
                      1/2 Kg Cake - 5-7 people <br /> 1 Kg Cake - 12-14 people
                    </p>
                  </div>
                  <div className="col">
                    Wedding Cakes: <p>5 Kg Cake - 70-80 people </p>
                  </div>
                </div>
                <div className="container-fluid">
                  <small>
                    <i>**Above values are approx. estimates.</i>
                  </small>
                </div>
              </div>
            </div>

            <div className="col container-fluid productdetailspane">
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
                      {price.price}
                    </h4>
                  </div>
                </div>
                <div className="row ">
                  <div className="col">
                    <small>
                      <i>(price indicated above </i>{' '}
                      {form.flavour ? (
                        <i>includes</i>
                      ) : (
                        <b>
                          <i>does not include </i>
                        </b>
                      )}
                      <i> flavour price for {value.weight} KG weight)</i>
                    </small>
                  </div>
                </div>
                <div className="text-left py-2">
                  <h>
                    <Switch
                      checked={form.hasEgg}
                      onChange={handleChange}
                      color="default"
                      style={{ color: '#ffbc2a' }}
                      name="checkedB"
                    />
                    {form.hasEgg ? 'Egg' : 'Eggless'}
                  </h>
                </div>
                <div className="row fluid" style={{ paddingTop: '5%' }}>
                  <div className="col" style={{ padding: '2% 0 2% 3.5%' }}>
                    <>
                      <TextField
                        id="flavour"
                        variant="outlined"
                        select
                        size="small"
                        required
                        fullWidth
                        value={form.flavour}
                        // defaultValue={props.props.allFlavours[1]}
                        disabled={!props.product.isCake}
                        name="flavour"
                        label="Flavour"
                        onChange={value => {
                          return handleFlavourChange(value);
                        }}
                        helperText="select cake flavour"
                      >
                        {props.allFlavours
                          ? props.allFlavours.map((option, index) => {
                              return (
                                <MenuItem key={index} value={option}>
                                  {option.name}
                                </MenuItem>
                              );
                            })
                          : 'fetching flavours...'}
                      </TextField>
                    </>
                  </div>
                </div>

                <div style={{ marginTop: '3%' }}>
                  <h>
                    <b>Weight : {value.weight} Kg</b>
                  </h>
                  <div className="rootSlider" style={{ color: '#ffbc2a' }}>
                    <Slider
                      style={{ color: '#ffbc2a' }}
                      defaultValue={value.weight}
                      getAriaValueText={valuetext}
                      valueLabelDisplay="auto"
                      step={0.5}
                      marks
                      min={props.product.minWeight}
                      max={props.product.maxWeight}
                      onChange={(event, value) => {
                        setValue({ weight: value });
                        getPrice();
                      }}
                      value={value.weight}
                    />
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
                          weight: value.weight,
                          quantity: props.count,
                          hasEgg: form.hasEgg,
                          customMessage: form.customMessage,
                          specialInstruction: form.specialInstruction,
                        });
                      }}
                    >
                      <b>ADD TO Cart</b>
                    </Button>
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
        <div
          className="row container qualityText text-center"
          style={{ paddingLeft: '10%' }}
        >
          <div className="col-md-4 col-sm-12 my-2">
            <Chip
              label={<h5>Assured Quality</h5>}
            />
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
