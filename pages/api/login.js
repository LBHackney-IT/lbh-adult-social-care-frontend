import Cookies from 'cookies';
import withSession from 'lib/session';
import { hackneyGoogleLogin, HASC_TOKEN_ID } from 'api';

export default withSession(async (req, res) => {
  const { hackneyToken } = req.cookies;

  try {
    const userRes = await hackneyGoogleLogin(hackneyToken);

    const user = { isLoggedIn: true, ...userRes };

    req.session.set('user', user);
    await req.session.save();

    // Set auth cookie
    // Create a cookies instance
    const cookies = new Cookies(req, res);
    cookies.set(HASC_TOKEN_ID, user?.token, {
      httpOnly: false, // true by default
      sameSite: 'lax',
    });
    res.json(user);
  } catch (error) {
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 400).json(error.data);
  }
});
