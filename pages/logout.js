import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { memo, useEffect } from 'react';
import { getLoggedInUser } from 'service';
import withSession from 'lib/session';
import { HACKNEY_TOKEN_ID } from '../api';

export const getServerSideProps = withSession(({ req }) => {
  const user = getLoggedInUser({ req });
  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return { props: {} };
});

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        const isDev = process.env.NODE_ENV === 'development';
        Cookies.remove(HACKNEY_TOKEN_ID, {
          domain: isDev ? 'localhost' : '.hackney.gov.uk',
        });

        await axios.get('/api/logout');
        router.reload();
      } catch (error) {
        console.log(error);
      }
    };

    const hackneyToken = Cookies.get(HACKNEY_TOKEN_ID);

    if (hackneyToken) logout();
    else router.push('/login');
  }, []);

  return <></>;
};

export default memo(Logout);
