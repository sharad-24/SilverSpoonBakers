import React, { useState, useEffect, useLayoutEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
  List,
  TextField,
  Button,
  Backdrop,
  CircularProgress,
  Paper,
  Chip,
  CardActionArea,
  CardContent,
  Card,
} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import { formatCurrency } from '../../../helpers/helpers';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import EventIcon from '@material-ui/icons/Event';
import { CropFreeOutlined, Error, ErrorOutline, Event, EventOutlined, InfoOutlined, ListAltOutlined, LocalOffer, LocalShippingOutlined, LoyaltyOutlined, NewReleases, RotateLeft, Schedule, ScheduleOutlined } from '@material-ui/icons';
import { requestCustomer } from '../../../utils/request';
import { urls } from '../../../config/urls';
import './review.css'

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    fontWeight: 600,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  card: {
    maxWidth: "100%",
    marginTop: "1rem"
  }
}));


export default function Review(props) {
  const classes = useStyles();
  const [promoCodes, setpromoCodes] = useState(null);
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const [open, setOpen] = React.useState(false);

  const fetchPromoCodes = async () => {
    const response = await requestCustomer('get', urls.PROMO_CODE_URL);
    //console.log(response.data.data)
    setpromoCodes(response.data.data)
  };
  
  const handleToggle = () => {
    setOpen(!open);
  };
  
  useEffect(() => {
    fetchPromoCodes();
  }, []);
  console.log('props: ', props);
  return (
    <React.Fragment>
      <div className="py-3">
        <Button 
          size="large"
          fullWidth
          variant="contained"
          startIcon={<ListAltOutlined size="large"/>}
          style={{
            boxShadow: "none",
            borderRadius: "0"
          }}
        >
          <Typography variant="h6">
            Order summary
          </Typography>
        </Button>
      </div>
      <div className="row container-fluid pr-0">
        <Typography variant="subtitle1" className="col text-left pl-0">Product</Typography>
        <Typography variant="subtitle1" className="col text-right pr-0">Qty x Cost/KG</Typography>
      </div>
      <hr />
      <List disablePadding>
        {props.products
          ? props.products.map(product => (
              <ListItem className={classes.listItem} key={product.name}>
                <ListItemText
                  primary={product.name}
                  secondary={product.weight ? `${product.weight} KG` : ''}
                />
                <Typography variant="body2">
                  {product.quantity} x{' '}
                  {formatCurrency(product.calculatedPrice)}
                </Typography>
              </ListItem>
            ))
          : null}
        <hr />
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total amount" />
          <Typography>
            {props.totalAmount ? (
              <h> {formatCurrency(props.totalAmount)}</h>
            ) : null}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="GST (18%)" />
          <Typography>Included</Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Delivery charges" />
          <Typography>
            {props.address ? (
              props.address.areaId.price ? (
                <h> {formatCurrency(props.address.areaId.price)}</h>
              ) : (
                'Free'
              )
            ) : (
              'Free'
            )}
          </Typography>
        </ListItem>
        {props.promocode ? (
          <ListItem className={classes.listItem}>
            <ListItemText primary="Promocode discount" />
            <Typography>
              {props.promocode ? (
                <h> {props.promocode.details.discountPercentage}%</h>
              ) : null}
            </Typography>
          </ListItem>
        ) : null}
        <ListItem className={classes.listItem}>
            {props.payableAmount ? (
              <>
              <ListItemText primary="Payable Amount" />
              <Typography variant="subtitle1" className={classes.total}>
                  {formatCurrency(
                    Number(props.payableAmount)
                  )}
                </Typography>
              </>
              
            ) : null}
          </ListItem>
      </List>
      <hr />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
            <Chip
              icon={<LocalShippingIcon/>}
              label={props.homedelivery ? <b>DELIVERY DETAILS</b> : <b>PICKUP DETAILS</b>}
            />
          <Typography gutterBottom className="pt-3">
            Receiver's Name: {props.address.name}
          </Typography>
          <Typography gutterBottom>
            Contact: {props.address.mobile}
          </Typography>
          {props.homedelivery ? (
            <>
              <Typography gutterBottom>Address: </Typography>
              <small>
                {props.address.addressLine1}
                <br />
                {props.address.addressLine2 ? (
                  <>
                    {props.address.addressLine2}
                    <br />
                  </>
                ) : (
                  ''
                )}
                {props.address.landmark ? (
                  <>
                    {props.address.landmark}
                    <br />
                  </>
                ) : null}
                Area: {props.address.areaId.area}
                <br />
                {props.address.city}, {props.address.state}
              </small>
            </>
          ) : (
            <>
              <Typography gutterBottom>Store pickup</Typography>
              {!props.store ? (
                <>
                  <Typography gutterBottom>Address:</Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    267, Aishbagh Road, <br />
                    Opp - Bank of India Lucknow, 226004, <br />
                    Contact: 0522-4101530, +91-6306998580
                    <br />
                  </Typography>
                </>
              ) : (
                <>
                  <Typography gutterBottom>Address:</Typography>
                   <Typography variant="subtitle2" gutterBottom>
                    82, Guru Gobind Singh Marg, <br />
                    Near Hussainganj Metro station Gate 2, <br />
                    Lucknow 226001 +91-7905213159
                    <br />
                  </Typography>
                </>
              )}
            </>
          )}
        </Grid>
        <Grid item container direction="row" xs={12} sm={6}>
          <Grid item xs={12} sm={12}>
            <Chip
              icon={<Event/>}
              label={<b>DELIVERY DATE</b>}
            />
            <Typography gutterBottom className="py-3">
              {props.address.deliveryDate
                ? props.address.deliveryDate.toDateString()
                : ''}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Chip
                icon={<Schedule/>}
                label={<b>DELIVERY TIME</b>}
              />
            <Typography gutterBottom className="py-3">
              {props.address.deliveryTime
                ? props.address.deliveryTime == 'SLOT_1'
                  ? '12:00-14:00'
                  : props.address.deliveryTime == 'SLOT_2'
                  ? '14:00-16:00'
                  : props.address.deliveryTime == 'SLOT_3'
                  ? '16:00-18:00'
                  : props.address.deliveryTime == 'SLOT_4'
                  ? '18:00-20:00'
                  : props.address.deliveryTime == 'SLOT_5'
                  ? '20:00-22:00'
                  : props.address.deliveryTime == 'SLOT_6'
                  ? '22:00-00:00'
                  : null
                : null}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Paper elevation={1} style={{ backgroundColor: 'lightyellow', boxShadow: "none", borderRadius: "0" }}>
            <Typography
              className="text-center justify-center py-3 px-2"
              style={{ color: 'maroon' }}
              variant="subtitle2"
            >
                <i>Please confirm above details before placing the order <b>!</b></i>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <hr />
      <Grid container-fluid spacing={2}>
        <Grid item xs={12} sm={12}>
          <Button 
            variant="contained"
            fullWidth
            startIcon={<LocalOffer/>}
            style={{
              boxShadow: 'none',
              borderRadius: '0',
            }}
          >
            Apply coupon
          </Button>
        </Grid>
        {props.isPromoCodeApplicableOnProduct ? (
          <Grid item xs={12} sm={12} className="py-3">
            <Button
              fullWidth
              size="small"
              style={{ backgroundColor: 'lightgreen', boxShadow: 'none' }}
              variant="contained"
              size="large"
              endIcon={<NewReleases/>}
            >
              {props.promocode.details.discountPercentage}% discount applied
            </Button>
            <br/>
            <small><i>discount applicable on eligible products only**</i></small>
          </Grid>
        ) : null}
        <Formik
          initialValues={{
            promocode: '',
          }}
          onSubmit={values => {
            return props.handlePromocode(values);
          }}
        >
          {formik => (
            <form onSubmit={formik.handleSubmit}>
              <Grid item container xs={12} sm={12} spacing={2}>
                <Grid item xs={12} sm={12}>
                  {props.error ? (
                    <div
                      className="text-center mt-2"
                      style={{ color: 'red'}}
                    >
                      <Chip style={{ color: 'red'}} variant="outlined" label={`${props.error}`} icon={<Error style={{ color: 'red'}}/>}/>
                    </div>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="promocode"
                    id="promocode"
                    size="small"
                    required
                    variant="outlined"
                    value={formik.values.promocode}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.promocode &&
                      Boolean(formik.errors.promocode)
                    }
                    InputProps={{
                      endAdornment: <CropFreeOutlined />,
                    }}
                    helperText={
                      formik.touched.promocode && formik.errors.promocode
                    }
                    label="Enter coupon code here"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={{
                      backgroundColor: '#ffbc2a',
                      boxShadow: 'none',
                      borderRadius: '0',
                    }}
                    startIcon={<RotateLeft/>}
                  >
                    Apply
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
        {promoCodes ? (
          <>
          <hr class="hr-text" data-content="OR" />
          <div className="my-3 text-center">
            <Typography variant="subtitle1" color="textSecondary">
              Coupon codes (click to apply)
            </Typography>
            {promoCodes.map((promocode, index)=> {
              return (
              <>
                  <Card className={classes.card} key={index} onClick={()=> props.handlePromocodeCardClick(promocode)}>
                    <CardActionArea>
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="h2">
                          <b>{promocode.code}</b>
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {promocode.description} {" "}<LoyaltyOutlined/>
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </>
              )
            })}
         
          </div>
          </>
        ) : null} 
      </Grid>
      
    </React.Fragment>
  );
}
