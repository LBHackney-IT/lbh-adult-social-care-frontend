import { add, compareDesc, format } from 'date-fns';

const chr4 = () => Math.random().toString(16).slice(-4);

export const uniqueID = () => `${chr4() + chr4()}-${chr4()}-${chr4()}-${chr4()}-${chr4()}${chr4()}${chr4()}`;

export const dateStringToDate = (dateString) => (dateString ? new Date(dateString) : null);

export const compareDescendingDMY = (startDate, endDate) => {
  const resetStartDate = new Date(startDate);
  const resetEndDate = new Date(endDate);
  resetStartDate.setHours(0,0,0,0);
  resetEndDate.setHours(0,0,0,0);
  return compareDesc(resetStartDate, resetEndDate);
};

export const hasUrl = (id, string) => id !== undefined ? string : null;

export const incrementDate = (incrementTime, date = new Date()) => {
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
  if (file?.fileId) return `/document/${file.fileId}`;
  if (file?.url) return file.url;

  return window.URL.createObjectURL(file);
};

export const getLoggedInUser = ({ req }) => {
  const user = req.session.get('user');
  if (user === undefined) return null;
  return user;
};

export const getNumberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
