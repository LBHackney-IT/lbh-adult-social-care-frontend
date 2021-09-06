import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import HackneyFooterInfo from 'components/HackneyFooterInfo';
import Header from 'components/Layout/Header';
import useUser from 'api/SWR/useUser';
import { userLogin } from 'reducers/userReducer';

const hackneyAuthLink = 'https://auth.hackney.gov.uk/auth?redirect_uri=';

const Login = () => {
  const dispatch = useDispatch();
  const { mutateUser } = useUser({
    redirectTo: '/care-package',
    redirectIfFound: true,
  });

  const [origin, setOrigin] = useState('');

  useEffect(() => {
    setOrigin(window.location.origin);

    const login = async () => {
      try {
        mutateUser(await axios('/api/login'));
      } catch (error) {
        console.log(error);
      }
    };

    login().then(() => {
      axios.get('/api/user').then((user) => {
        dispatch(userLogin({ user: user.data }));
      });
    });
  }, []);

  return (
    <div className="login-page">
      <Header showPageHeader={false} />
      <div className="login-page__form-container">
        <div className="login-page__form">
          <h2>Sign In</h2>
          <p>Please sign in with your Hackney email account.</p>
          <p>Please contact your manager if you have issues signing in.</p>
          <a className="button button-base" href={`${hackneyAuthLink}${origin}/login`} target="_self">
            <strong>Sign in with Google</strong>
          </a>
        </div>
      </div>
      <HackneyFooterInfo />
    </div>
  );
};

export default Login;
