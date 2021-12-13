import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BROKER_REFERRAL_ROUTE, getPreviousPath, setPreviousPath } from 'routes/RouteConstants';
import axios from 'axios';
import { useUser } from 'api';
import { HackneyFooterInfo, Loading } from 'components';
import { userLogin } from 'reducers/userReducer';
import { useRouter } from 'next/router';
import { changeHeader, resetHeader } from 'reducers/headerReducer';

const hackneyAuthLink = 'https://auth.hackney.gov.uk/auth?redirect_uri=';

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, mutateUser } = useUser();

  const [origin, setOrigin] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setOrigin(window.location.origin);

      setLoading(true);
      try {
        await mutateUser(await axios('/api/login'));
      } catch (error) {
        console.log(error);
      }

      const res = await axios.get('/api/user');
      setLoading(false);
      dispatch(userLogin({ user: res.data }));
      router.replace(getPreviousPath() || BROKER_REFERRAL_ROUTE);
    })();
  }, [user]);

  useEffect(() => {
    dispatch(changeHeader({ links: [] }));

    return () => {
      dispatch(resetHeader());
    };
  }, []);

  return (
    <div className="login-page">
      {!user?.isLoggedIn && (
        <div className="login-page__form-container">
          <div className="login-page__form">
            <h2>Sign In</h2>
            <p>Please sign in with your Hackney email account.</p>
            <p>Please contact your manager if you have issues signing in.</p>
            <a
              className="lbh-button govuk-button is-relative"
              href={`${hackneyAuthLink}${origin}/login`}
              onClick={() => setPreviousPath('')}
              rel="noopener noreferrer"
              target="_self"
            >
              {
                loading ? (
                  <Loading className="loading-blue loading-absolute-centered" isLoading={loading} />
                ) : <strong>Sign in with Google</strong>
              }
            </a>
          </div>
        </div>
      )}

      <HackneyFooterInfo />
    </div>
  );
};

export default Login;
