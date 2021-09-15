/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Home from 'containers/Home';
import AdminLogin from '../Admin/Login';
import AdminForgetPassword from '../Admin/ForgetPassword';
import AdminResetPassword from '../Admin/ResetPassword';
import AdminCategories from '../Admin/Categories';
import AdminStaff from '../Admin/Staff';
import AdminPromoCode from '../Admin/PromoCode';
import AdminProfile from '../Admin/Profile';
import AdminCustomer from '../Admin/Customer';
import AdminBanner from '../Admin/banner';
import AdminProducts from '../Admin/Products';
import Checkout from '../Customer/Checkout';
import Login from '../Customer/Login';
import Category from '../Customer/Category';
import SignUp from '../Customer/Signup';
import Faqs from '../Customer/Faqs';
import About from '../Customer/Aboutus';
import Terms from '../Customer/Terms';
import Privacy from '../Customer/Privacypolicy';
import Cart from '../Customer/Cart';
import AuthRoute from '../../helpers/authRoutes';
import AdminRoute from '../../helpers/adminRoutes';
import StaffRoute from '../../helpers/staffRoutes';
import CustomerRoute from '../../helpers/customerRoutes';
import Product from '../Customer/Product';
import Allcategories from '../Customer/Allcategories';
import Customorder from '../Customer/CustomOrder';
import Order from '../Customer/Order';
import OrderHistory from '../Customer/Orderhistory';
import AdminFlavours from '../Admin/Flavours';
import AdminOrders from '../Admin/Orders';
import AdminOrderDetails from '../Admin/Orders/Orderdetails';
import AdminCustomOrder from '../Admin/CustomOrder';
import Verify from '../Customer/Verify';
import ForgotPassword from '../Customer/Forgotpassword';
import AdminAddProducts from '../Admin/Products/Add';
import AdminEditProducts from '../Admin/Products/Edit';
import AdminEditCustomOrder from '../Admin/CustomOrder/Edit'

import NotFound from '../NotFoundPage';
import ErrorBoundary from '../../components/ErrorComponent';
import CustomOrderHistory from '../Customer/Customorderhistory';
import CustomOrderView from '../Customer/Customorderview';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App(props) {
  const [open, setOpen] = useState(false);
  const enableTopBarButton = () => {
    setOpen(false);
  };
  return (
    <AppWrapper>
      <Grid item xs={12}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/admin">
            <Redirect to="/admin/login" />
          </Route>
          <AuthRoute path="/admin/login" component={AdminLogin} />
          <AuthRoute
            path="/admin/forgetPassword"
            component={AdminForgetPassword}
          />
          <AuthRoute
            path="/admin/resetPassword"
            component={AdminResetPassword}
          />
          <AdminRoute path="/admin/customer" component={AdminCustomer} />
          <AdminRoute path="/admin/staff" component={AdminStaff} />
          <AdminRoute path="/admin/promoCode" component={AdminPromoCode} />
          <AdminRoute path="/admin/flavours" component={AdminFlavours} />
          <AdminRoute exact path="/admin/orders" component={AdminOrders} />
          <AdminRoute
            path="/admin/orderdetails/:ordernumber"
            component={AdminOrderDetails}
          />
          <StaffRoute
            exact
            path="/admin/customorder"
            component={AdminCustomOrder}
          />
          <StaffRoute
            exact
            path="/admin/customorder/edit"
            component={AdminEditCustomOrder}
          />
          <StaffRoute path="/admin/products" component={AdminProducts} />
          <StaffRoute
            path="/admin/add/product"
            component={AdminAddProducts}
          />
          <StaffRoute
            path="/admin/edit/product"
            component={AdminEditProducts}
          />
          <StaffRoute path="/admin/edit/product" component={AdminProducts} />
          <StaffRoute path="/admin/categories" component={AdminCategories} />
          <StaffRoute path="/admin/profile" component={AdminProfile} />
          <StaffRoute path="/admin/banner" component={AdminBanner} />

          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route
            path="/cart"
            component={routerProps => {
              return <ErrorBoundary>{Cart(routerProps)}</ErrorBoundary>;
            }}
          />
          <Route
            path="/category/:id"
            component={routerProps => Category(routerProps)}
          />
          <Route path="/privacy" component={Privacy} />
          <Route path="/faqs" component={Faqs} />
          <Route path="/terms" component={Terms} />
          <Route path="/about" component={About} />

          <Route
            path="/product/:id"
            component={routerProps => (
              <ErrorBoundary>{Product(routerProps)}</ErrorBoundary>
            )}
          />

          <Route path="/allcategories" component={Allcategories} />
          <CustomerRoute
            path="/customorder"
            component={Customorder}
            redirect="/login"
          />

          <Route path="/forgotpassword" component={ForgotPassword} />
          <Route path="/verify" component={Verify} />

          <CustomerRoute path="/checkout" component={Checkout} />

          <CustomerRoute
            path="/order"
            component={routerProps => Order(routerProps)}
          />

          <CustomerRoute
            path="/orderhistory"
            component={routerProps => OrderHistory(routerProps)}
          />

          <CustomerRoute
            path="/customorderdetails"
            component={routerProps => CustomOrderView(routerProps)}
          />

          <CustomerRoute
            path="/customorderhistory"
            component={routerProps => CustomOrderHistory(routerProps)}
          />
          <Route path="" component={NotFound} />
        </Switch>
      </Grid>
    </AppWrapper>
  );
}
