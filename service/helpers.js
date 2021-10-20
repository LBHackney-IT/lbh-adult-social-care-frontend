import { add, format } from 'date-fns';

const chr4 = () => Math.random().toString(16).slice(-4);

export const uniqueID = () => `${chr4() + chr4()}-${chr4()}-${chr4()}-${chr4()}-${chr4()}${chr4()}${chr4()}`;

export const dateStringToDate = (dateString) => (dateString ? new Date(dateString) : null);

export const incrementDate = ({ incrementTime, date = new Date() }) => {
  const { years = 0, months = 0, days = 0, weeks = 0, hours = 0, minutes = 0, seconds = 0 } = incrementTime;

  return add(date, {
    years,
    months,
    weeks,
    days,
    hours,
    minutes,
    seconds,
  });
};

export const formatDate = (date, formatString = 'dd.MM.yy') => date && format(new Date(date), formatString);

export const getUrlFromFile = (file) => {
  if (!file) return '';
  if (file?.url) return file.url;

  return window.URL.revokeObjectURL(file);
};

export const getLoggedInUser = ({ req }) => {
  const user = req.session.get('user');
  if (user === undefined) return null;
  return user;
};

export const getNumberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
