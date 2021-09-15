/*
 * Home
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useState, useRef, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Snowfall from 'react-snowfall';

import {Carousel, Image} from 'react-bootstrap'

import {
  Card,
} from 'react-bootstrap';

import CardActionArea from '@material-ui/core/CardActionArea';

import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import request from '../../utils/request'

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import { homeLogin, categoryFetch, adminProductsFetch } from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectProducts,
  makeSelectCategory,
  makeSelectSuccess,
} from './selectors';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { image_url, menu_url } from '../../config/urls';
import { urls } from '../../config/urls';
import { browserRedirect } from '../../helpers/helpers';
const svg1 = require('../../images/quality-assurance.svg');
const svg2 = require('../../images/logistics__delivery__safe_-512.png');


const API_ROOT =
  process.env.REACT_APP_NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL;

const primary = require('../../images/primary.png');

const menucard = require('../../images/menu_card.svg');
const swiggy = require('../../images/swiggy.svg');
const zomato = require('../../images/zomato.svg');

const key = 'home';

export default function Home(){
    
         return (
           <>
                 <Header />
                 fgb
                 <Footer />
           </>
         );
}
