import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import {  Carousel  } from 'react-bootstrap';;
import { Card } from 'react-bootstrap';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import request from '../../utils/request';;
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import ReactGa from 'react-ga';;
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
import './home.css';
import { image_url, menu_url } from '../../config/urls';
import { urls } from '../../config/urls';
import { BUTTON_THEME_COLOR } from '../../utils/constants';
import Loader from '../../components/Loader';
const svg1 = require('../../images/quality-assurance.svg');
const svg2 = require('../../images/logistics__delivery__safe_-512.png');

const menucard = require('../../images/menu_card.svg');
const swiggy = require('../../images/swiggy.svg');
const zomato = require('../../images/zomato.svg');
export function Home({  onFetchCategory }) {
  const GA_ID = process.env.REACT_APP_GA_TRACKING_ID
  const [categoryData, setcategoryData] = useState(null);
  const [bannerData, setbannerData] = useState(null);
  const [bestSellerData, setbestSellerData] = useState(null);

  async function fetchData() {
    const response = await request(
      'get',
      urls.ADMIN_CATEGORY_URL,
      {},
      { header: 0 },
    );
    setcategoryData(response.data.data);
  }

  async function fetchbannerData() {
    const response = await request('get', urls.BANNER_URL, {}, { header: 0 });
    setbannerData(response.data.data);
  }

  async function fetchbestSellerData() {
    const response = await request(
      'get',
      `${urls.BESTSELLER_URL}?isBestSeller=true`,
      {},
      { header: 0 },
    );
    setbestSellerData(response.data.data);
  }
  
  //
  useEffect(() => { 
    
    ReactGa.initialize(GA_ID)
    ReactGa.pageview('/')
    
    fetchData();
    fetchbannerData();
    fetchbestSellerData();
    onFetchCategory();
    }, []);

  if (!bannerData) {
    return (
      <>
        <Loader />
      </>
    );
  }
  return (
    <>
      {/* desktop content */}
      <div>
        <div id="content-desktop" className="ioIqki">
          <Header />
          <div>
            <Carousel>
              {bannerData ? (
                bannerData.map((bannerImage, index) => {
                  if (!bannerImage.isMobileBanner) {
                    return (
                      <Carousel.Item>
                        <Link to={bannerImage.link}>
                          <img
                            className="d-block bannerImages"
                            src={image_url + bannerImage.image}
                            alt="First slide"
                          />
                          <Carousel.Caption />
                        </Link>
                      </Carousel.Item>
                    );
                  }
                })
              ) : (
                <Carousel>
                  <Carousel.Item>
                    <img
                      src={`${image_url}temp_banner.webp`}
                      alt="temp banner image"
                    />
                  </Carousel.Item>
                </Carousel>
              )}
            </Carousel>
          </div>
        </div>
        {/* mobile banner */}
        <div className="mobileNav" id="content-mobile">
          <Header />
          <Carousel>
            {bannerData ? (
              bannerData.map((bannerImage, index) => {
                if (bannerImage.isMobileBanner) {
                  //console.log('mobile');
                  return (
                    <Carousel.Item>
                      <Link to={bannerImage.link}>
                        <img
                          className="d-block bannerImagesMobile"
                          src={image_url + bannerImage.image}
                        />
                      </Link>
                    </Carousel.Item>
                  );
                }
              })
            ) : (
              <Card.Img variant="top" />
            )}
          </Carousel>
        </div>
        <div>
          <div style={{ position: 'relative' }}>
            <div
              className="col-sm-12 text-center category"
              style={{ marginTop: '3%' }}
            >
              <h3>
                <b>Categories</b>
              </h3>
              <hr
                style={{
                  width: '20%',
                  height: '3px',
                  backgroundColor: `${BUTTON_THEME_COLOR}`,
                }}
              />
            </div>
          </div>
          {/* <CardDeck> */}
          <div className="container" style={{ maxWidth: '95vw' }}>
            <div className="mt-1 pb-4 categories">
              {categoryData ? (
                categoryData.map((card, index) => (
                  <div className="col">
                    <Card className="text-center">
                      <Link
                        to={`category/${card._id}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <Card.Img variant="top" src={image_url + card.image} />
                        <Card.Body>
                          <Card.Title>
                            <Typography
                              variant="h6"
                              style={{
                                fontWeight: 'bold',
                                letterSpacing: '6px',
                              }}
                            >
                              {card.name.toUpperCase()}
                            </Typography>
                          </Card.Title>
                        </Card.Body>
                      </Link>
                    </Card>
                  </div>
                ))
              ) : (
                <>
                  <div className="container">
                    <section className="card">
                      <figure className="card-image loading" />
                      <div className="card-detail">
                        <h3 className="card-title loading" />
                      </div>
                    </section>
                  </div>
                  <div className="container">
                    <section className="card">
                      <figure className="card-image loading" />
                      <div className="card-detail">
                        <h3 className="card-title loading" />
                      </div>
                    </section>
                  </div>
                  <div className="container">
                    <section className="card">
                      <figure className="card-image loading" />
                      <div className="card-detail">
                        <h3 className="card-title loading" />
                      </div>
                    </section>
                  </div>
                  <div className="container">
                    <section className="card">
                      <figure className="card-image loading" />
                      <div className="card-detail">
                        <h3 className="card-title loading" />
                      </div>
                    </section>
                  </div>
                </>
              )}
            </div>
          </div>
          {/* </CardDeck> */}

          <div>
            <div className="col-sm-12 text-center category">
              <h3>
                <b>Best Sellers</b>
              </h3>
              <hr
                style={{
                  width: '20%',
                  height: '3px',
                  backgroundColor: '#ffbc2a',
                }}
              />
            </div>
            <div class="container" style={{ maxWidth: '95vw' }}>
              <div className="py-2 categories">
                {bestSellerData ? (
                  bestSellerData.map((card, index) => (
                    <div className="col">
                      <Card className="text-center">
                        <Link
                          to={`product/${card._id}`}
                          style={{
                            textDecoration: 'none',
                          }}
                        >
                          <Card.Img
                            variant="top"
                            src={image_url + card.images[0]}
                          />
                          <CardContent>
                            <Card.Title>
                              <Typography
                                variant="h6"
                                style={{
                                  fontWeight: 'bold',
                                }}
                              >
                                {card.name}
                              </Typography>
                            </Card.Title>
                            <hr />
                            <Typography
                              variant="body2"
                              color="textPrimary"
                              component="p"
                            >
                              Starts @ ₹ {card.displayPrice}
                            </Typography>
                          </CardContent>
                        </Link>
                      </Card>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="container">
                      <section className="card">
                        <figure className="card-image loading" />
                        <div className="card-detail">
                          <h3 className="card-title loading" />
                        </div>
                      </section>
                    </div>
                    <div className="container">
                      <section className="card">
                        <figure className="card-image loading" />
                        <div className="card-detail">
                          <h3 className="card-title loading" />
                        </div>
                      </section>
                    </div>
                    <div className="container">
                      <section className="card">
                        <figure className="card-image loading" />
                        <div className="card-detail">
                          <h3 className="card-title loading" />
                        </div>
                      </section>
                    </div>
                    <div className="container">
                      <section className="card">
                        <figure className="card-image loading" />
                        <div className="card-detail">
                          <h3 className="card-title loading" />
                        </div>
                      </section>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="text-center px-5 py-3 mx-3">
              <ErrorOutlineIcon size="small" />
              <small>
                <i>
                  {' '}
                  Pricing stated above are for display purpose only. Final
                  product price may vary depending on the weight and flavour
                  choosen
                </i>
              </small>
            </div>
            <div
              style={{
                textAlign: 'center',
                paddingBottom: '2%',
                paddingTop: '2%',
              }}
            >
              <button className="primary-button">
                <Link
                  to="/customorder"
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  {' '}
                  Place custom order
                </Link>
              </button>
            </div>
            <div className="extras container-fluid  my-2 text-center">
              <div className="col-md-4 col-sm-12 text-center">
                <div className="my-4">
                  <h5>We're also available on</h5>
                </div>
                <div className="iconsContainer my-3">
                  <a href="https://www.swiggy.com/restaurants/silver-spoon-bakers-and-cafe-aminabad-lucknow-129384">
                    <img src={swiggy} className="iconImage my-3" />
                  </a>
                  <a href="https://www.zomato.com/lucknow/silver-spoon-bakers-cafe-aishbagh">
                    <img src={zomato} className="iconImage my-3" />
                  </a>
                </div>
              </div>

              <div className="col-md-4 col-sm-12 text-center">
                <div>
                  <h4 className="my-3 qatext">
                    <h5>Quality product & Safe delivery assured.</h5>
                  </h4>
                </div>
                <div>
                  <img src={svg1} className="qaimage" />
                  <img src={svg2} className="qaimage" />
                </div>
              </div>
              <div className="col-md-4 col-sm-12 text-center my-3">
                <img className="menuCard mb-3" src={menucard} />
                <div>
                  <form action={menu_url} target="_blank">
                    <button className="primary-button my-3 ml-2 px-3 py-2">
                      Cafe Menu
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-sm-12 col-md-12 px-3 text-center">
              <b>
                <i>
                  Note: We strive to deliver the best quality product possible,
                  in case of any complaints feel free to reach us.
                </i>
              </b>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

Home.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onLogin: PropTypes.func,
  onFetchCategory: PropTypes.func,
  onFetchProducts: PropTypes.func,
};
const mapStateToProps = createStructuredSelector({
  success: makeSelectSuccess(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  products: makeSelectProducts(),
  category: makeSelectCategory(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onFetchProducts: () => {
      dispatch(adminProductsFetch());
    },
    onFetchCategory: () => {
      //console.log('on fetch category invoked');
      dispatch(categoryFetch());
    },
    onLogin: (evt, closeloginModal) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(homeLogin(evt, closeloginModal));
    },
    onforgetPassword: (evt, closeforgetPasswordModal) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(homeLogin(evt, closeforgetPasswordModal));
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
)(Home);
