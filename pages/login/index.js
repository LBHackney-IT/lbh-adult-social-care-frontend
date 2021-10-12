import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import HackneyFooterInfo from 'components/HackneyFooterInfo';
import Header from 'components/Layout/Header';
import useUser from 'api/SWR/useUser';
import { userLogin } from 'reducers/userReducer';
import { BROKERAGE_HUB_ROUTE } from 'routes/RouteConstants';

const hackneyAuthLink = 'https://auth.hackney.gov.uk/auth?redirect_uri=';

const Login = () => {
  const dispatch = useDispatch();
  const { user, mutateUser } = useUser({
    redirectTo: BROKERAGE_HUB_ROUTE,
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
      axios.get('/api/user').then((res) => {
        dispatch(userLogin({ user: res.data }));
      });
    });
  }, []);

  return (
    <div className="login-page">
      <Header showPageHeader={false} />

      {!user?.isLoggedIn && (
        <div className="login-page__form-container">
          <div className="login-page__form">
            <h2>Sign In</h2>
            <p>Please sign in with your Hackney email account.</p>
            <p>Please contact your manager if you have issues signing in.</p>
            <a
              className="button button-base"
              href={`${hackneyAuthLink}${origin}/login`}
              rel="noopener noreferrer"
              target="_self"
            >
              <strong>Sign in with Google</strong>
            </a>
          </div>
        </div>
      )}

      <HackneyFooterInfo />
    </div>
  );
};

export default Login;
