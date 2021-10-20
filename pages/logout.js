import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { memo, useEffect } from 'react';
import { getLoggedInUser } from 'service';
import withSession from 'lib/session';

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
  }, [router]);

  return <></>;
};

export default memo(Logout);
