import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { memo, useEffect } from 'react';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        Cookies.remove('hackneyToken', { domain: '.hackney.gov.uk' });
        await axios.get('/api/logout');
        router.reload();
      } catch (error) {
        console.log(error);
      }
    };

    const hackneyToken = Cookies.get('hackneyToken');

    if (hackneyToken) logout();
    else router.push('/login');
  }, []);

  return <></>;
};

export default memo(Logout);
