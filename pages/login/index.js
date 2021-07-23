import axios from 'axios';
import React, { useEffect } from 'react';
import absoluteUrl from 'next-absolute-url';
import { Button } from '../../components/Button';
import HackneyFooterInfo from '../../components/HackneyFooterInfo';
import Header from '../../components/Layout/Header';
import useUser from '../../lib/useUser';

const hackneyAuthLink = 'https://auth.hackney.gov.uk/auth?redirect_uri=';

export async function getServerSideProps({ req }) {
  const { origin } = absoluteUrl(req);
  return { props: { origin } };
}

const Login = ({ origin }) => {
  const { mutateUser } = useUser({
    redirectTo: '/care-package',
    redirectIfFound: true,
  });

  useEffect(() => {
    const login = async () => {
      try {
        mutateUser(await axios('/api/login'));
      } catch (error) {
        console.log(error);
      }
    };

    login();
  }, []);

  return (
    <div className='login-page'>
      <Header showPageHeader={false} />
      <div className='login-page__form-container'>
        <div className='login-page__form'>
          <h2>Sign In</h2>
          <p>Please sign in with your Hackney email account.</p>
          <p>Please contact your manager if you have issues signing in.</p>
          <a className='button button-base' href={`${hackneyAuthLink}${origin}`} target='_self'>
            <strong>Sign in with Google</strong>
          </a>
        </div>
      </div>
      <HackneyFooterInfo />
    </div>
  );
};

export default Login;
