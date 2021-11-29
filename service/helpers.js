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

export const dateToIsoString = (date) => date && new Date(date).toISOString();

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

export const formatDocumentInfo = async ({ fileName, href }) => {
  if (!fileName) return;
  if (href) return await urlToFile(href, fileName);

  return null;
};

export const formatDataWithFile = ({
  data,
  fileField = {
    file: 'assessmentFile',
    fileId: 'assessmentFileId',
    fileName: 'assessmentFileName',
  },
}) => {
  if (data[fileField.file]?.name === data[fileField.fileName]) {
    delete data[fileField.file];
  } else {
    delete data[fileField.fileName];
    delete data[fileField.fileId];
  }
};

export const getLoggedInUser = ({ req }) => {
  const user = req.session.get('user');
  if (user === undefined) return null;
  return user;
};

export const getNumberWithCommas = (x) => x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const removeEmpty = (obj) => {
  Object.keys(obj).forEach(k =>
    (obj[k] && typeof obj[k] === 'object') && removeEmpty(obj[k]) ||
    (!obj[k] && obj[k] !== undefined) && delete obj[k]
  );
  return obj;
};