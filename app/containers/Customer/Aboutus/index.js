import React from 'react';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import { Divider, Container } from '@material-ui/core';
import { about_us } from '../../../utils/text';
const swiggy = require('../../../images/swiggy.svg');
const zomato = require('../../../images/zomato.svg');
const Aboutus = () => (
  <div>
    <Header />
    <br />
    <Container maxWidth="sm">
      <h2 align="center">
        <b>About Us</b>
      </h2>
      <Divider />
      <br />
      <p>{about_us}</p>

      <br />
      <br />
      <Divider />
      <br />
      <h4 align="center">We're also available on</h4>
      <div
        style={{
          display: 'inline-block',
          marginLeft: '50px',
        }}
      >
        {' '}
        <a href="https://www.swiggy.com/restaurants/silver-spoon-bakers-and-cafe-aminabad-lucknow-129384">
          <img
            src={swiggy}
            style={{
              width: '200px',
              height: '100px',
              marginRight: '50px',
            }}
          />
        </a>
        <a href="https://www.zomato.com/lucknow/silver-spoon-bakers-cafe-aishbagh">
          <img
            src={zomato}
            style={{
              width: '200px',
              height: '100px',
              marginRight: '50px',
            }}
          />
        </a>
      </div>
    </Container>
    <Footer />
  </div>
);
export default Aboutus;
