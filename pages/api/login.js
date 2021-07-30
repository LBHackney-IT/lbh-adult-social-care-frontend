import Cookies from 'cookies';
import withSession from '../../lib/session';
import { hackneyGoogleLogin } from '../../api/Users/AuthApi';

export default withSession(async (req, res) => {
  const { hackneyToken } = req.cookies;

  try {
    // checking if token is valid and return user token
    /* await axios.get(`${RESIDENTIAL_CARE_URL}/type-of-stay-options`, {
      headers: {
        Authorization: `Bearer ${hackneyToken}`,
      },
    }); */
    const userRes = await hackneyGoogleLogin(hackneyToken);

    // const tokenData = jwt.decode(hackneyToken);
    const user = { isLoggedIn: true, ...userRes };

    req.session.set('user', user);
    await req.session.save();

    // Set auth cookie
    // Create a cookies instance
    const cookies = new Cookies(req, res);
    cookies.set('hascToken', user?.token, {
      httpOnly: false, // true by default
      sameSite: 'lax',
    });
    // cookieCutter.set('hascToken', user?.token);
    res.json(user);
  } catch (error) {
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});
