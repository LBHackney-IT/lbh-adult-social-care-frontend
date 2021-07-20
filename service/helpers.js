const chr4 = () => Math.random().toString(16).slice(-4);

const uniqueID = () => `${chr4() + chr4()}-${chr4()}-${chr4()}-${chr4()}-${chr4()}${chr4()}${chr4()}`;

const formatDateWithSign = (date, sign = '/') => {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  return `${`00${day}`.slice(-2)}${sign}${`00${month}`.slice(-2)}${sign}${`00${year}`.slice(-2)}`;
};

const includeString = (mainString, checkString) => mainString && mainString.indexOf(checkString) > -1;

const formatStatus = (status) =>
  status
    ? status
        .split('-')
        .map((text) => text.slice(0, 1).toUpperCase() + text.slice(1, text.length))
        .join(' ')
    : '';

// check user session
// if no user, then redirect to Login Page
const getUserSession = ({ req }) => {
  const user = req.session.get('user');

  if (!user) {
    return {}; // TODO delete after setup login
    /* return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }; */
  }
  return user;
};

const getErrorResponse = (error) => error?.response?.data || {}; // { firstName: 'First Name must be more then 10 symbols', secondName: 'Second Name must be more then 10 symbols'
export { uniqueID, formatDateWithSign, formatStatus, includeString, getUserSession, getErrorResponse };
