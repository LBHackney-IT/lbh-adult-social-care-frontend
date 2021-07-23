import axios from 'axios';
import jwt from 'jsonwebtoken';
import { RESIDENTIAL_CARE_URL } from '../../api/CarePackages/ResidentialCareApi';
import withSession from '../../lib/session';

export default withSession(async (req, res) => {
  const { hackneyToken } = req.cookies;

  try {
    // checking if token is valid before saving the user
    // await axios.get(`${RESIDENTIAL_CARE_URL}/type-of-stay-options`, {
    //   headers: {
    //     Authorization: `Bearer ${hackneyToken}`,
    //   },
    // });

    const tokenData = jwt.decode(hackneyToken);
    const user = { isLoggedIn: true, ...tokenData };

    req.session.set('user', user);
    await req.session.save();
    res.json(user);
  } catch (error) {
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});
