import React, { useState, useEffect } from 'react';
import { useCookies, Cookies } from 'react-cookie';

const fetchUserDataFromCookie = () => {
  let cookie = new Cookies();
  const [name, setname] = useState('');

  const fetchName = () => {
    setname(decodeURIComponent(cookie.get('name')).split(' ')[0] || '');
  };
  useEffect(() => {
    fetchName();
  }, []);

  const userData = {};
  userData.firstName = name;
  return userData;
};

export default fetchUserDataFromCookie;
