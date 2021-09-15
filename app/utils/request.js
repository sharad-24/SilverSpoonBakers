import axios from 'axios';
import { useCookies, Cookies } from 'react-cookie';



const API_ROOT =
  process.env.REACT_APP_NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL;

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
// export default function request(url, options) {
//   return fetch(url, options)
//     .then(checkStatus)
//     .then(parseJSON);
// }
export default async function request(
  method,
  url,
  payload = null,
  headers = 1,
) {
    //console.log('request url: ', url);
    const requestData = {
      method,
      url: API_ROOT + url,
    };
    if (payload) {
      requestData.data = payload;
    }
    if (headers === 1) {
      requestData.headers = {
        // 'Access-Control-Allow-Origin': 'https://www.silverspoonbakers.in',
        Authorization: localStorage.getItem('token'),
      };
    } else {
      requestData.headers = {
        Authorization: 'NO_TOKEN',
      };
    }
    const response = await axios(requestData);

    return response;
  }

export async function requestCustomer(
  method,
  url,
  payload = null,
  headers = 1,
) {
  const cookie = new Cookies();

  const requestData = {
    method,
    url: API_ROOT + url,
  };
  if (payload) {
    requestData.data = payload;
  }
  if (headers === 1) {
    requestData.headers = {
      // 'Access-Control-Allow-Origin': '*',
      Authorization: cookie.get('customertoken'),
    };
  } else {
    requestData.headers = {
      Authorization: 'NO_TOKEN',
    };
  }
  const response = await axios(requestData);

  return response;
}

