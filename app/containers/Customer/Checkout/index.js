import React, { Component, useEffect, useState, useLayoutEffect } from 'react';
import {
  TextField,
  Grid,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
  Divider,
  MenuItem,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper, 
  Step,
  StepButton,
  Stepper,
  StepLabel,
  Breadcrumbs,
  CircularProgress,
  Backdrop
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { useCookies, Cookies } from 'react-cookie';
import Snackbar from '@material-ui/core/Snackbar';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import { browserRedirect, totalCostCalculator } from '../../../helpers/helpers';
import {requestCustomer} from '../../../utils/request';
import { urls } from '../../../config/urls';
import MuiAlert from '@material-ui/lab/Alert';
import CheckOutForms from './CheckoutForms'
import Review from './Review';
import {DELIVERY_SLOTS } from '../../../utils/constants'
const logo = require('../../../images/logo.svg');


const steps = ['Shipping address', 'Review your order'];


const IST_OFFSET = 330;
const OFFSET_MULTIPLIER = 60000;

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'black',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    backgroundColor: "#ffbc2a",
    color: "black",
    boxShadow: "none",
    borderRadius : "0"
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CheckoutPage = () => {
  
  const classes = useStyles();
  const cookie = new Cookies();
  const [snackbar, setsnackbar] = React.useState(false);
  const [message, setMessage] = useState('');
  const [severity, setseverity] = useState("")

  const [validDeliverySlots, setvalidDeliverySlots] = useState(null)
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  const [totalamount, settotalamount] = useState(0);
  const [payableamount, setpayableamount] = useState(0);
  const [areas, setareas] = useState([]);
  const [promocode, setpromocode] = useState(null)
  const [isPromoCodeApplicableOnProduct, setisPromoCodeApplicableOnProduct] = useState(null)
  const [promocodeerror, setpromocodeerror] = useState(null)
  const [loading, setloading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies({
    customertoken: cookie.get('customertoken'),
  });
  const [backdrop, setbackdrop] = React.useState(false);
  const [homedelivery, sethomedelivery] = useState(true);
  const [store, setstore] = useState(true)
  const [placeOrderError, setplaceOrderError] = useState(null)

  let [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem('cart')),
  );
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  
  
  let [address, setAddress] = useState({
    deliveryDate: new Date(),
    deliveryTime: '',
    name: '',
    mobile: '',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    areaId: '',
    city: 'Lucknow',
    state: 'UP',
  });
  
  const handleNext = values => {
    setActiveStep(activeStep + 1);
  };

  const fetchArea = async () => {
    
    const response = await requestCustomer('GET', urls.DELIVERY_CHARGES);
    //console.log('areas', response.data.data);
    setareas(response.data.data);
  };

  const handleBack = () => {
    setplaceOrderError(null)
    setpromocodeerror(null)
    setActiveStep(activeStep - 1);
  };
  useEffect(() => {
    fetchArea();
      if (!cookies.customertoken) {
        browserRedirect('/login');
      }
      if (!localStorage.getItem('cart')) {
        browserRedirect('/');
      } else {
        totalAmount(cartItems);
      }
      
  }, []);

  const handleSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setsnackbar(false);
  };
  const handlePlaceOrder = async event => {
    setbackdrop(true);
    try {
    const promocodeId = () => {
        if(promocode){
          return promocode.details.id
        }else{
          return  null
        }
    }
    let payload = {}
    if(homedelivery){
      address.deliveryDate.setHours(0, 0, 0, 0);
      address.deliveryDate = new Date(
        address.deliveryDate.getTime() + IST_OFFSET * OFFSET_MULTIPLIER,
      );
      payload = {
      customerName: address.name,
      customerMobile: address.mobile,
      deliveryDate: address.deliveryDate,
      deliverySlot: address.deliveryTime,
      address: {
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        landmark: address.landmark,
        city: address.city,
        state: address.state,
        areaId: address.areaId._id,
      },
      promoId : promocodeId(),
      customization: null,
      amount: totalamount,
      discount: 0,
      payableAmount: payableamount,
      isStorePickup : false
    };
    payload.products = 
        cartItems.map(cartItem =>{
        if(cartItem.isCake){
          return {
            name: cartItem.name,
            price: cartItem.price,
            weight: cartItem.weight,
            quantity: cartItem.quantity,
            productId: cartItem.id,
            isCake: cartItem.isCake,
            flavourId: cartItem.flavour._id,
            hasEgg: cartItem.hasEgg,
            customMessage: cartItem.customMessage,
            specialInstruction: cartItem.specialInstruction,
          };
        }
        else{
            return {
                name: cartItem.name,
                price: cartItem.price,
                weight: cartItem.weight,
                quantity: cartItem.quantity,
                productId: cartItem.id,
                flavourId: null,
                isCake: cartItem.isCake,
                hasEgg: cartItem.hasEgg,
                customMessage: cartItem.customMessage,
                specialInstruction: cartItem.specialInstruction,
              };
            }
          } 
        )
    }
    else{
    
      payload = {
        customerName: address.name,
        customerMobile: address.mobile,
        deliveryDate: address.deliveryDate,
        deliverySlot: address.deliveryTime,
        promoId : promocodeId(),
        customization: null,
        amount: totalamount,
        discount: 0,
        payableAmount: payableamount,
        isStorePickup : true
      };
      if(!store){
        payload.store = "STORE_1"
      }else{
        payload.store = "STORE_2"
      }
      
      payload.products = 
          cartItems.map(cartItem =>{
          if(cartItem.isCake){
            return {
              name: cartItem.name,
              price: cartItem.price,
              weight: cartItem.weight,
              quantity: cartItem.quantity,
              productId: cartItem.id,
              isCake: cartItem.isCake,
              flavourId: cartItem.flavour._id,
              hasEgg: cartItem.hasEgg,
              customMessage: cartItem.customMessage,
              specialInstruction: cartItem.specialInstruction,
            };
          }
          else{
              return {
                  name: cartItem.name,
                  price: cartItem.price,
                  weight: cartItem.weight,
                  quantity: cartItem.quantity,
                  productId: cartItem.id,
                  flavourId: null,
                  isCake: cartItem.isCake,
                  hasEgg: cartItem.hasEgg,
                  customMessage: cartItem.customMessage,
                  specialInstruction: cartItem.specialInstruction,
                };
              }
            } 
          )
    }
    
    setplaceOrderError(null);
    const createOrderResponse = await requestCustomer(
      'POST',
      urls.ORDER_URL,
      payload,
    );
      if(createOrderResponse.status == "200"){
        setbackdrop(false);
        localStorage.removeItem('cart')
        const orderNumber = createOrderResponse.data.data.orderNumber
          browserRedirect(`/order?id=${orderNumber}`)
        }
        setbackdrop(false);
    }
    catch(error){
      setbackdrop(false)
      setplaceOrderError(error.response.data.message)
      console.log("error in placing order:", error.response.data.message)
    }
  };

  const handleAddressFormChanges = ({
    deliveryDate,
    deliveryTime,
    name,
    mobile,
    addressLine1,
    addressLine2,
    landmark,
    areaId,
    city,
    state,
  }) => {
    setAddress({
      ...address,
      name,
      mobile,
      deliveryDate,
      deliveryTime,
      addressLine1,
      addressLine2,
      landmark,
      areaId,
      city,
      state,
    });
    handleNext();
  };
  
  const totalAmount = products => {
    try {
      const priceArray = products.map((product, index) => {
        if(product.isCake){
          return (
              Number(product.calculatedPrice) *
              Number(product.quantity) 
            )
          }else{
            return (
              Number(product.calculatedPrice) *
              Number(product.quantity) 
            )
          }
      });
      const totalamountl = priceArray.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
      );
      settotalamount(totalamountl);
      const finalPaymentAmount = (Number(totalamountl))
      setpayableamount(finalPaymentAmount)
    } catch (error) {
      throw error;
    }
  };

  const handleDateChange = deliverydate => {
    setAddress({ ...address, deliverydate: deliverydate });
  };

  const checkPromoCodeApplicability = (promocode)=>{

    //const array = [{a: false}, {b: false}]
    const even = (element) => { return Object.values(element)[0] === true}
    const result = promocode.products.some(even);
      return result
  }

  const handlePromocode = async (values) => {
    try {
      setbackdrop(true);
      setpromocodeerror(null)
      const response = await requestCustomer(
        'POST',
        urls.PROMO_CODE_URL,
        {
          promocode: values.promocode,
          products: cartItems,
        },
      );
      setpromocode({details: response.data.data})
      const isPromocodeValid = checkPromoCodeApplicability(
        response.data.data,
      );
      setisPromoCodeApplicableOnProduct(isPromocodeValid)
      if(!isPromocodeValid){
        setbackdrop(false);
        setMessage("Promo code not applicable on any product!")
        setseverity("error")
        setsnackbar(true);
      }
      setbackdrop(false);
    }catch(error){
      setbackdrop(false);
      setpromocodeerror(error.response.data.message)
      console.log(error.response.data.message)
      console.log("error in fetching promocode")
    }
  }
  const handlePromocodeCardClick = async (promocode)=>{
    try{
      setbackdrop(true);
      setpromocodeerror(null);
      const response = await requestCustomer(
        'POST',
        urls.PROMO_CODE_URL,
        {
          promocode: promocode.code,
          products: cartItems,
        },
      );
      setpromocode({details: response.data.data})
      const isPromocodeValid = checkPromoCodeApplicability(
        response.data.data,
      );
      setisPromoCodeApplicableOnProduct(isPromocodeValid)
      if(!isPromocodeValid){
        setbackdrop(false);
        setMessage("Promo code not applicable on any product!")
        setseverity("error")
        setsnackbar(true);
      }
      setbackdrop(false);
    }catch(error){
     
        setbackdrop(false);
        setpromocodeerror(error.response.data.message)
        console.log(error.response.data.message)
        console.log("error in fetching promocode")
      
    }
  }
  const handleDeliveryLocation = event => {
    sethomedelivery(!homedelivery);
  }; 
  const handleChangeStore = () =>{
    setstore(!store)
  }

  const handleStoreNext = (values) =>{
    const now = new Date()
    if(store){
      setAddress({
        ...address,
        name: values.name,
        mobile: values.mobile,
        deliveryDate: values.deliveryDate,
        deliveryTime: values.deliveryTime,
        store: 'STORE_1',
      });
    }else{
      setAddress({
        ...address,
        name: values.name,
        mobile: values.mobile,
        deliveryDate: values.deliveryDate,
        deliveryTime: values.deliveryTime,
        store: 'STORE_2',
      });
    }
    handleNext();
  }


  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  function getStepContent(step) {
    switch (step) {
      case 0: {
        
          return (
            <CheckOutForms
              selectedDate={selectedDate}
              handleDateChange={handleDateChange}
              address={address}
              deliverySlots={validDeliverySlots}
              areas={areas}
              products={cartItems}
              homedelivery={homedelivery}
              handleDeliveryLocation={handleDeliveryLocation}
              store={store}
              handleChangeStore={handleChangeStore}
              handleStoreNext={handleStoreNext}
              handleAddressFormChanges={handleAddressFormChanges}
            />
          );
      }
      case 1:
        return (
          <Review
            homedelivery={homedelivery}
            payableAmount={payableamount}
            totalAmount={totalamount}
            products={cartItems}
            promocode={promocode}
            address={address}
            handlePromocode={handlePromocode}
            isPromoCodeApplicableOnProduct={
              isPromoCodeApplicableOnProduct
            }
            handlePromocodeCardClick={handlePromocodeCardClick}
            error={promocodeerror}
            placeOrderError={placeOrderError}
          />
        );
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <div>
      <Header />
      <div className="col container">
        <Breadcrumbs aria-label="breadcrumb">
          <Link style={{ color: 'grey' }} href="/">
            Home
          </Link>
          <Link style={{ color: 'grey' }} href="/cart">
            Cart
          </Link>
          <Typography color="textPrimary">Checkout</Typography>
        </Breadcrumbs>
      </div>
      {areas.length > 0 ? (
        <React.Fragment>
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <Typography component="h1" variant="h4" align="center">
                Checkout
              </Typography>
              <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map(label => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <React.Fragment>
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography variant="h5" gutterBottom>
                      Some error occurred. Please refresh.
                    </Typography>
                    <Typography variant="subtitle1">.......</Typography>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {getStepContent(activeStep)}
                    <div className="my-3 text-center">
                      {placeOrderError ? (
                        <div
                          className="my-2 text-center"
                          style={{
                            color: 'red',
                            textTransform: 'capitalize',
                            backgroundColor: 'yellow',
                          }}
                        >
                          <p>Error: {placeOrderError}</p>
                        </div>
                      ) : null}
                    </div>
                    <div className={classes.buttons}>
                      {activeStep !== 0 && (
                        <Button
                          onClick={handleBack}
                          style={{ backgroundColor: '#d6d6d6' }}
                          className={classes.button}
                        >
                          <KeyboardArrowLeftIcon />
                          Back
                        </Button>
                      )}
                      {activeStep === steps.length - 1 ? (
                        
                          <Button
                            variant="contained"
                            //disabled={nextButtonDisabled}
                            onClick={handlePlaceOrder}
                            style={{
                              backgroundColor: '#ffbc2a',
                              boxShadow: 'none',
                            }}
                            className={classes.button}
                          >
                            {activeStep === steps.length - 1
                              ? 'Place order'
                              : 'Next'}
                            <KeyboardArrowRightIcon />
                          </Button>
                      ) : null}
                    </div>
                  </React.Fragment>
                )}
              </React.Fragment>
            </Paper>
          </main>
        </React.Fragment>
      ) : (
        <div className="text-center">
          <CircularProgress />
        </div>
      )}
      <div className="container">
        <div className="col">
          <div className="row">
            <div className="col-md-6 col-sm-12 px-4">
              <div className="row" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Snackbar
        open={snackbar}
        autoHideDuration={3500}
        onClose={handleSnackBar}
      >
        <Alert onClose={handleSnackBar} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      {/* <Button variant="outlined" color="primary" onClick={handleToggle}>
        Show backdrop
      </Button> */}
      <Backdrop className={classes.backdrop} open={backdrop} >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
export default CheckoutPage;
