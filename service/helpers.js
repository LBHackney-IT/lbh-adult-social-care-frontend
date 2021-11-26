import { add, compareDesc, format } from 'date-fns';
import { isServer } from '../api/Utils/FuncUtils';

const chr4 = () => Math.random().toString(16).slice(-4);

export const uniqueID = () => `${chr4() + chr4()}-${chr4()}-${chr4()}-${chr4()}-${chr4()}${chr4()}${chr4()}`;

export const dateStringToDate = (dateString) => (dateString ? new Date(dateString) : null);

export const compareDescendingDMY = (startDate, endDate) => {
  const resetStartDate = new Date(startDate);
  const resetEndDate = new Date(endDate);
  resetStartDate.setHours(0, 0, 0, 0);
  resetEndDate.setHours(0, 0, 0, 0);
  return compareDesc(resetStartDate, resetEndDate);
};

export const hasUrl = (id, string) => (id !== undefined ? string : null);

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

export const getUrlFromFile = async (file) => {
  if (isServer() || !file) return;
  if (file?.url) return file.url;

  return window.URL.createObjectURL(file);
};

export const urlToFile = (url, filename) => (
  fetch(url)
    .then((res) => res.arrayBuffer())
    .then((buf) =>
      new File([buf], filename, { type: (url.match(/^data:([^;]+);/) || '')[1] }))
);

export const formatDocumentInfo = async ({ fileName, fileId, href }) => {
  if (fileName) {
    if (href) {
      const fileFromUrl = await urlToFile(href, fileName);
      return { file: fileFromUrl, fileId, updated: true };
    }
    return { fileId, file: null, updated: false };
  }
  return {};
};

export const getLoggedInUser = ({ req }) => {
  const user = req.session.get('user');
  if (user === undefined) return null;
  return user;
};

export const getNumberWithCommas = (x) => x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
