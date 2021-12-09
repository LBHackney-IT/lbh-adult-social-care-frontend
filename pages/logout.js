import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { memo, useEffect } from 'react';
import { useServerSideProps } from 'routes/RouteConstants';

export const getServerSideProps = useServerSideProps({
  redirect: { permanent: false }
});

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        const isDev = process.env.NODE_ENV === 'development';
        Cookies.remove('hackneyToken', {
          domain: isDev ? 'localhost' : '.hackney.gov.uk',
        });

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
