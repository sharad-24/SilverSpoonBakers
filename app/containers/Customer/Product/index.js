import React, { useState, useEffect, useLayoutEffect } from 'react';
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
  NativeSelect
} from '@material-ui/core';
import { Carousel, Image } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const svg1 = require('../../../images/quality-assurance.svg');
const svg2 = require('../../../images/logistics__delivery__safe_-512.png');
import { image_url } from '../../../config/urls';
import { urls } from '../../../config/urls';
import request from '../../../utils/request';
import './product.css';
import { browserRedirect } from '../../../helpers/helpers';
import { VerticalAlignBottom } from '@material-ui/icons';
import LimitedFlavourCake from './limitedFlavourCake';
import NotCake from './notCake';
import AllFlavourCake from './allFlavourCake';

function valuetext(value) {
    return `${value}Kg`;
  }
  
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Product(routerProps) {

    const [snackbar, setsnackbar] = React.useState(false);
    const [productData, setproductData] = useState(null);
    const [basePriceOfCake, setbasePriceOfCake] = useState("")
    const [severity, setseverity] = useState("")
    const [egg, setEgg] = React.useState(true);
    const [message, setMessage] = useState('');
    const [allFlavours, setallFlavours] = useState(null);
    const [selectedFlavours, setselectedFlavours] = useState([])
    let [count, setCount] = useState(1);
    let [value, setValue] = useState(null)
    const [form, setForm] = useState({
      id: '',
      name: '',
      image: '',
      weight: '',
      quantity: '',
      flavour: "",
      hasAllFlavour: false,
      hasEgg: false,
      customMessage: '',
      specialInstruction: '',
    });


    async function fetchProductData() {
      try{
          const response = await request('get', `${urls.ADMIN_PRODUCTS_URL}?productId=${routerProps.match.params.id}`,
            {},
            { header: 0 },
          );
         // console.log("prodct data: ", response.data.data[0])
          setproductData(response.data.data[0]);
          setValue(response.data.data[0].minWeight);
          setForm({ 
            id: response.data.data[0]._id, 
            name: response.data.data[0].name,
            hasAllFlavour : response.data.data[0].hasAllFlavour,
          })
          setbasePriceOfCake(response.data.data[0].price);
           const initialPrice = Number(response.data.data[0].price) * Number(response.data.data[0].minWeight)
           productData ? productData.price ? setproductData({...productData, price : initialPrice}) : "" : ""
        }
         catch(error){
            setMessage("Error in fetching products. Please check your internet or reload!")
            setseverity("Error")
            setsnackbar(true);
           console.log("error occured in fetching data")
         }
    }

    async function fetchAllFlavours() {
      try {
        const response = await request(
          'GET',
          urls.FLAVOUR_URL,
          {},
          { header: 0 },
        );
        setallFlavours(response.data.data);
       
        //('all flvours: ', response.data.data);
      } catch (error) {
        console.log('error in fetching flavours');
        setMessage(
          'Error in fetching flavours. Please check your internet or reload!',
        );
        setseverity('Error');
        setsnackbar(true);
      }
    }
   
   const filterFlavours=()=>
   {
      try{
        if(productData){
          if(!productData.hasAllFlavour){
          if(productData.flavours && allFlavours){
          // console.log("prdoduct data in state: ", productData)
          // console.log("all flavours in state: ", allFlavours)
          let res = allFlavours.filter(flavour => {
            if (productData.flavours.includes(flavour._id)) {
              return flavour;
            }
          });
          setselectedFlavours(res);
        }}
        else{
          console.log('Some error occured')
        }}
      }
      catch(error){
        console.log("error occured in filtering flavours")
      }
    }
    useLayoutEffect(() => {
      window.scrollTo(0, 0);
    }, [location.pathname]);
  
    useEffect(() => {
      fetchProductData();
      fetchAllFlavours();
    }, []);
    allFlavours && productData ? filterFlavours() : '';
    
    productData && allFlavours ? 
      productData.hasAllFlavour ? 
      (!form.flavour) ? 
        <>{setForm({...form, flavour : allFlavours[0]})} </>  
        : null : 
          null
        : null
    
    const handleChange = (event) => {
      setEgg(!egg);
    };
    const decrease = (event) => {
      if (count === 0) {
        return '';
      }
      setCount(count -= 1);
      
    }
    allFlavours && productData ? filterFlavours() : '';

    // if(productData.hasAllFlavour){
    //   setForm({form.flavour : response.data.data[0]})
    // }
    const handleData = (event) =>{
        setForm({...form, [event.target.name] : event.target.value })
    }
    const handleFlavourChange = (event) =>{
      // console.log("Flavour change: ", event.target.value)
      setMessage("Price updated")
      setseverity("info")
      setsnackbar(true);
     // console.log("evennt: ", event.target.value)
      setForm({...form, [event.target.name] : event.target.value })
     // console.log("price chnah")
      handlePriceOnWeightChange(value, event.target.value.price)
  }
    const increase = (event) => {
        if(count < productData.maxQuantity){
          setCount(count += 1);
        }
        else{
          setMessage("Quantity limit reached")
          setseverity("info")
          setsnackbar(true);
        }
    }

    const handleSnackBar = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      setsnackbar(false);
    };

    
    const handlePriceOnWeightChange = (value, flavourPrice) => {
      if (flavourPrice) {
        const cakeAmount = Number(basePriceOfCake) + Number(flavourPrice);
        setproductData({ ...productData, price: cakeAmount });
      } else {
        const cakeAmount = Number(basePriceOfCake);
        setproductData({ ...productData, price: cakeAmount });
      }
    };
  return (
    <>
      <Header />

      {productData && allFlavours ? 
        productData.isCake ? 
          productData.hasAllFlavour ? (
            <AllFlavourCake 
              product={productData}
              egg={egg}
              count={count}
              increase={increase}
              decrease={decrease}
              handleChange={handleChange}
              allFlavours={allFlavours} 
            />
        
      ) : ({selectedFlavours} ? 
              <LimitedFlavourCake
              product={productData}
              egg={egg}
              count={count}
              increase={increase}
              decrease={decrease}
              handleChange={handleChange}
              allFlavours={allFlavours} 
              selectedFlavours={selectedFlavours}
              />
              : ""
      )
       : 
        (
          <NotCake
            product={productData}
            egg={egg}
            count={count}
            increase={increase}
            decrease={decrease}
            handleData={handleData}
            form={form}
            handleChange={handleChange}
          />
        ) :  (
        <div className="container text-center">
          <CircularProgress color="inherit" />
        </div>
      )}
      <Footer />
    </>
  );
}