import React from "react";
import history from "../utils/history";
import { useCookies, Cookies } from 'react-cookie';

export const browserRedirect = (location, route) => {
  history.push(location, route ? route : "/");
};

export const checkAuthorization = () => {
  const isLoggedin = localStorage.getItem("token")&& localStorage.getItem("name") && localStorage.getItem("type");

  if (isLoggedin) {
    return true;
  }
  
  return false;
};

export const checkAuthorizationFromCookie = () => {
  const cookie = new Cookies();

  const isLoggedin = cookie.get('customertoken') && cookie.get('type');

  if (isLoggedin) {
    return true;
  }

  return false;
};

export const checkTokenExpiry = (err) => {
  const isLoggedin = localStorage.getItem("token")&& localStorage.getItem("name") && localStorage.getItem("type");

  // if (err && err.response && err.response.data && err.response.data.e && err.response.data.e === "Unauthorized") {
  if (err && err.response.status === 403) {
      localStorage.removeItem("item");
      localStorage.removeItem("name");
      localStorage.removeItem("type");
      browserRedirect('/admin');
      return true;
}
  return false;
};

export const checkAdmin = () => {
  const storedType = localStorage.getItem("type");

  if (storedType === 'admin') {
    return true;
  }
  
  return false;
};

export const checkStaff = () => {
  const storedType = localStorage.getItem("type");

  if (storedType === 'staff') {
    return true;
  }
  
  return false;
};

export const checkCustomer = () => {
  const cookie = new Cookies();
  const storedType = cookie.get('type');

  if (storedType === 'customer') {
    return true;
  }

  return false;
};

export const formatDate = (input) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let input_date = new Date(input);
  let date = input_date.getDate();
  let month = input_date.getMonth();
  let year = input_date.getFullYear();
  return months[month] + ' ' + date + ' ' + year;
}

export const formatCurrency = input => {
  return input.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
};

export const totalCostCalculator = (
  price,
  quantity,
  discountPercentage,
  taxPercentage,
) => {
  var totalCost = parseFloat(price) * parseFloat(quantity);
  // console.log('before discount: ', totalCost);
  // console.log(
  //   'discount: ',
  //   parseFloat(totalCost) * parseFloat(parseFloat(discountPercentage) / 100),
  // );
  totalCost =
    parseFloat(totalCost) -
    parseFloat(totalCost) * parseFloat(parseFloat(discountPercentage) / 100);

  // console.log('after discount: ', totalCost);
  // console.log(
  //   'tax: ',
  //   parseFloat(totalCost) * parseFloat(parseFloat(taxPercentage) / 100),
  // );
  totalCost =
    parseFloat(totalCost) +
    parseFloat(totalCost) * parseFloat(parseFloat(taxPercentage) / 100);

  // console.log('after tax: ', totalCost);
  return totalCost;
};

export const getTimeSlots = () => {
  return '';
};