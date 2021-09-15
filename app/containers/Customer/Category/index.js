import React, { useState, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import LinearProgress from '@material-ui/core/LinearProgress';

import './category.css';
import { Grid, Container, Link, Button, Breadcrumbs } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import {browserRedirect} from '../../../helpers/helpers'

const cake = require('../../../images/cake.png');
import { image_url } from '../../../config/urls';
import { urls } from '../../../config/urls';
import request from '../../../utils/request';
import { filter } from 'lodash';
import { transform } from '@babel/core';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  roots: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  media: {
    height: 280,
  },
  card: {
    width: 300,
    boxShadow: 'none',
    borderRadius: 0,
    textAlign: 'center',
  },
  actions: {},
}));

export default function Category(routerProps) {
                                                const classes = useStyles();
                                                const [
                                                  value,
                                                  setValue,
                                                ] = React.useState(
                                                  0,
                                                );
                                                const handleChange = (
                                                  event,
                                                  newValue,
                                                ) => {
                                                  setValue(
                                                    newValue,
                                                  );
                                                };
                                                const [
                                                  subCategoryImage,
                                                  setsubCategoryImage,
                                                ] = useState(
                                                  [],
                                                );
                                                const [
                                                  categoryData,
                                                  setcategoryData,
                                                ] = useState(
                                                  null,
                                                );
                                                const [
                                                  subCategoryData,
                                                  setsubCategoryData,
                                                ] = useState(
                                                  null,
                                                );

                                                useEffect(() => {
                                                  async function fetchCategoryData() {
                                                    const response = await request(
                                                      'get',
                                                      urls.ADMIN_CATEGORY_URL,
                                                      {},
                                                      {
                                                        header: 0,
                                                      },
                                                    );
                                                    setcategoryData(
                                                      response
                                                        .data
                                                        .data,
                                                    );
                                                  }

                                                  async function fetchProductData() {
                                                    const response = await request(
                                                      'get',
                                                      `${
                                                        urls.ADMIN_PRODUCTS_URL
                                                      }?groupBySubcategory=true`,
                                                      {},
                                                      {
                                                        header: 0,
                                                      },
                                                    );
                                                    await setsubCategoryData(
                                                      response
                                                        .data
                                                        .data,
                                                    );
                                                  }
                                                  fetchProductData();
                                                  fetchCategoryData();
                                                }, []);
                                                // subCategoryData ?
                                                // (console.log( subCategoryData.find((subcategory)=>{ return subcategory._id === routerProps.match.params.id })
                                                // )) : console.log("lol")
                                                // console.log("Product DATA " ,subCategoryData);
                                                useLayoutEffect(() => {
                                                  window.scrollTo(
                                                    0,
                                                    0,
                                                  );
                                                }, [
                                                  location.pathname,
                                                ]);

                                                return (
                                                  <div
                                                    className={
                                                      classes.root
                                                    }
                                                  >
                                                    <div>
                                                      <Header />
                                                      <Container>
                                                        <div
                                                          style={{
                                                            marginLeft:
                                                              '1.5%',
                                                            marginBottom:
                                                              '2%',
                                                            marginTop:
                                                              '3%',
                                                          }}
                                                        >
                                                          <Breadcrumbs aria-label="breadcrumb">
                                                            <Link
                                                              color="inherit"
                                                              href="/"
                                                            >
                                                              Home
                                                            </Link>
                                                            <h>
                                                              {' '}
                                                              Category
                                                            </h>
                                                            <Typography color="textPrimary">
                                                              Subcategories
                                                            </Typography>
                                                          </Breadcrumbs>
                                                          <br />
                                                          <br />
                                                          <h3 align="left">
                                                            <b>
                                                              {categoryData
                                                                ? categoryData.find(
                                                                    category => {
                                                                      return (
                                                                        category._id ===
                                                                        routerProps
                                                                          .match
                                                                          .params
                                                                          .id
                                                                      );
                                                                    },
                                                                  )
                                                                  ? categoryData.find(
                                                                      category => {
                                                                        return (
                                                                          category._id ===
                                                                          routerProps
                                                                            .match
                                                                            .params
                                                                            .id
                                                                        );
                                                                      },
                                                                    )
                                                                      .name
                                                                  : 'Category not found in DB.'
                                                                : ''}
                                                            </b>
                                                          </h3>
                                                        </div>
                                                        <Grid
                                                          item
                                                          xs={
                                                            12
                                                          }
                                                        >
                                                          <Tabs
                                                            value={
                                                              value
                                                            }
                                                            onChange={
                                                              handleChange
                                                            }
                                                            indicatorColor="black"
                                                            variant="scrollable"
                                                            scrollButtons="auto"
                                                          >
                                                            {categoryData ? (
                                                              categoryData.find(
                                                                category => {
                                                                  return (
                                                                    category._id ===
                                                                    routerProps
                                                                      .match
                                                                      .params
                                                                      .id
                                                                  );
                                                                },
                                                              ) ? (
                                                                categoryData
                                                                  .find(
                                                                    category => {
                                                                      return (
                                                                        category._id ===
                                                                        routerProps
                                                                          .match
                                                                          .params
                                                                          .id
                                                                      );
                                                                    },
                                                                  )
                                                                  .subcategories.map(
                                                                    (
                                                                      subcategory,
                                                                      index,
                                                                    ) => (
                                                                      <Tab
                                                                        className="backImage"
                                                                        label={
                                                                          subcategory.name
                                                                        }
                                                                        style={{
                                                                          backgroundImage: `url(${image_url +
                                                                            subcategory.image})`,
                                                                          borderRadius:
                                                                            '15px',
                                                                          color:
                                                                            'white',
                                                                          fontWeight:
                                                                            'bold',
                                                                          padding:
                                                                            '1.5%',
                                                                          margin:
                                                                            '3%',
                                                                          whiteSpace:
                                                                            'nowrap',
                                                                        }}
                                                                        {...a11yProps(
                                                                          0,
                                                                        )}
                                                                      />
                                                                    ),
                                                                  )
                                                              ) : (
                                                                <Tab
                                                                  className="customTabs backImage"
                                                                  label="Fetching subcategories..."
                                                                  {...a11yProps(
                                                                    0,
                                                                  )}
                                                                />
                                                              )
                                                            ) : (
                                                              <Card />
                                                            )}
                                                          </Tabs>

                                                          {categoryData ? (
                                                            categoryData.find(
                                                              category => {
                                                                return (
                                                                  category._id ===
                                                                  routerProps
                                                                    .match
                                                                    .params
                                                                    .id
                                                                );
                                                              },
                                                            ) ? (
                                                              categoryData
                                                                .find(
                                                                  category => {
                                                                    return (
                                                                      category._id ===
                                                                      routerProps
                                                                        .match
                                                                        .params
                                                                        .id
                                                                    );
                                                                  },
                                                                )
                                                                .subcategories.map(
                                                                  (
                                                                    subcategory,
                                                                    index,
                                                                  ) => (
                                                                    <TabPanel
                                                                      value={
                                                                        value
                                                                      }
                                                                      index={
                                                                        index
                                                                      }
                                                                    >
                                                                      <Grid
                                                                        item
                                                                        xs={
                                                                          6
                                                                        }
                                                                      >
                                                                        <h3>
                                                                          <b>
                                                                            {
                                                                              subcategory.name
                                                                            }
                                                                          </b>
                                                                        </h3>
                                                                        <hr
                                                                          align="left"
                                                                          style={{
                                                                            width:
                                                                              '40%',
                                                                            backgroundColor:
                                                                              '#ffbc2a',
                                                                          }}
                                                                        />
                                                                      </Grid>

                                                                      {/* <CardDeck className="text-center"> */}
                                                                      <div class="container-fluid ">
                                                                        <div class="scrolling-wrapper row flex-row flex-wrap mt-4 pb-4">
                                                                          {subCategoryData ? (
                                                                            subCategoryData.find(
                                                                              subCategory => {
                                                                                return (
                                                                                  subCategory._id ===
                                                                                  subcategory._id
                                                                                );
                                                                              },
                                                                            ) ? (
                                                                              subCategoryData
                                                                                .find(
                                                                                  subCategory => {
                                                                                    return (
                                                                                      subCategory._id ===
                                                                                      subcategory._id
                                                                                    );
                                                                                  },
                                                                                )
                                                                                .products.map(
                                                                                  (
                                                                                    product,
                                                                                    index,
                                                                                  ) => (
                                                                                    <div
                                                                                      class="col container"
                                                                                      onClick={() => {
                                                                                        return browserRedirect(
                                                                                          `/product/${
                                                                                            product._id
                                                                                          }`,
                                                                                        );
                                                                                      }}
                                                                                    >
                                                                                      <Card
                                                                                        className={
                                                                                          classes.card
                                                                                        }
                                                                                      >
                                                                                        <CardActionArea>
                                                                                          <CardMedia
                                                                                            className={
                                                                                              classes.media
                                                                                            }
                                                                                            image={
                                                                                              image_url +
                                                                                              product
                                                                                                .images[0]
                                                                                            }
                                                                                            title={
                                                                                              product.name
                                                                                            }
                                                                                          />
                                                                                          <CardContent>
                                                                                            <Typography
                                                                                              gutterBottom
                                                                                              variant="h5"
                                                                                              component="h2"
                                                                                            >
                                                                                              {
                                                                                                product.name
                                                                                              }
                                                                                            </Typography>
                                                                                            <hr />
                                                                                            <Typography
                                                                                              variant="body2"
                                                                                              color="textPrimary"
                                                                                              component="p"
                                                                                            >
                                                                                              ₹{' '}
                                                                                              {
                                                                                                product.displayPrice
                                                                                              }
                                                                                            </Typography>
                                                                                          </CardContent>
                                                                                        </CardActionArea>
                                                                                      </Card>
                                                                                    </div>
                                                                                  ),
                                                                                )
                                                                            ) : (
                                                                              <Card>
                                                                                <i>
                                                                                  No
                                                                                  product
                                                                                  in
                                                                                  this
                                                                                  subcategory,
                                                                                  Try
                                                                                  other
                                                                                  ones.
                                                                                </i>
                                                                              </Card>
                                                                            )
                                                                          ) : (
                                                                            <div className="scrolling-wrapper row flex-row flex-nowrap mt-4 pb-4">
                                                                              <div class="container">
                                                                                <section class="card">
                                                                                  <figure class="card-image loading" />
                                                                                  <div class="card-detail">
                                                                                    <h3 class="card-title loading" />
                                                                                  </div>
                                                                                </section>
                                                                              </div>
                                                                              <div class="container">
                                                                                <section class="card">
                                                                                  <figure class="card-image loading" />
                                                                                  <div class="card-detail">
                                                                                    <h3 class="card-title loading" />
                                                                                  </div>
                                                                                </section>
                                                                              </div>
                                                                              <div class="container">
                                                                                <section class="card">
                                                                                  <figure class="card-image loading" />
                                                                                  <div class="card-detail">
                                                                                    <h3 class="card-title loading" />
                                                                                  </div>
                                                                                </section>
                                                                              </div>
                                                                              <div class="container">
                                                                                <section class="card">
                                                                                  <figure class="card-image loading" />
                                                                                  <div class="card-detail">
                                                                                    <h3 class="card-title loading" />
                                                                                  </div>
                                                                                </section>
                                                                              </div>
                                                                            </div>
                                                                          )}
                                                                        </div>
                                                                      </div>
                                                                      {/* </CardDeck> */}
                                                                    </TabPanel>
                                                                  ),
                                                                )
                                                            ) : (
                                                              <Card />
                                                            )
                                                          ) : (
                                                            <Card />
                                                          )}
                                                        </Grid>
                                                      </Container>
                                                      <Footer />
                                                    </div>
                                                  </div>
                                                );
                                              }