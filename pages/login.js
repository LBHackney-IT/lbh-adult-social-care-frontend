import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BROKERAGE_ROUTE, getPreviousPath, setPreviousPath } from 'routes/RouteConstants';
import axios from 'axios';
import { useUser } from 'api';
import { HackneyFooterInfo, Loading } from 'components';
import { userLogin } from 'reducers/userReducer';
import { getLoggedInUser } from 'service';
import { NewHeader } from 'components/NewHeader';
import withSession from 'lib/session';
import { changeHeader, resetHeader } from '../reducers/headerReducer';

const hackneyAuthLink = 'https://auth.hackney.gov.uk/auth?redirect_uri=';

export const getServerSideProps = withSession(({ req }) => {
  const user = getLoggedInUser({ req });
  if (user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return { props: {} };
});

const Login = () => {
  const dispatch = useDispatch();
  const { user, mutateUser } = useUser({
    redirectTo: getPreviousPath() || BROKERAGE_ROUTE,
    redirectIfFound: true,
  });

  const [origin, setOrigin] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setOrigin(window.location.origin);

    (async () => {
      setLoading(true);
      try {
        await mutateUser(await axios('/api/login'));

        const res = await axios.get('/api/user');
        dispatch(userLogin({ user: res.data }));
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    dispatch(changeHeader({ links: [] }));

    return () => {
      dispatch(resetHeader());
    };
  }, []);

  return (
    <>
      <NewHeader roles={[]} noLinks/>
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
                {loading ? (
                  <Loading className="loading-blue loading-absolute-centered" isLoading={loading} />
                ) : (
                  <strong>Sign in with Google</strong>
                )}
              </a>
            </div>
          </div>
        )}

        <HackneyFooterInfo />
      </div>
    </>
  );
};

export default Login;
