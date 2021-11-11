import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useUser } from 'api';
import { HackneyFooterInfo } from 'components';
import { userLogin } from 'reducers/userReducer';
import { getLoggedInUser } from 'service';
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
    redirectTo: '/',
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

  useEffect(() => {
    dispatch(changeHeader({ links: []}));

    return () => {
      dispatch(resetHeader());
    }
  }, [])

  return (
    <div className="login-page">
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
