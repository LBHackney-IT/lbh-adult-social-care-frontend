import { add, compareDesc, format } from 'date-fns';
import React from 'react';
import { getIsoDateWithoutTimezone, isServer } from '../api/Utils/FuncUtils';
import { currency } from '../constants/strings';

const chr4 = () => Math.random().toString(16).slice(-4);

export const uniqueID = () => `${chr4() + chr4()}-${chr4()}-${chr4()}-${chr4()}-${chr4()}${chr4()}${chr4()}`;

export const dateStringToDate = (dateString) => (dateString ? new Date(dateString) : null);

export const addIndentToString = (string) => {
  const arrayOfWords = string.split('\n');
  const newArray = [];
  arrayOfWords.forEach((item, index) => {
    const newElement = [item];
    if (index !== arrayOfWords.length - 1) newElement.push(<br />);

    newArray.push(...newElement);
  });

  return newArray;
};

export const compareDescendingDMY = (startDate, endDate) => {
  const resetStartDate = new Date(startDate);
  const resetEndDate = new Date(endDate);
  resetStartDate.setHours(0, 0, 0, 0);
  resetEndDate.setHours(0, 0, 0, 0);
  return compareDesc(resetStartDate, resetEndDate);
};

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

export const dateToIsoString = (date) => (date ? getIsoDateWithoutTimezone(new Date(date)) : null);

export const getUrlFromFile = async (file) => {
  if (isServer() || !file) return;
  if (file?.url) return file.url;

  return window.URL.createObjectURL(file);
};

export const urlToFile = (url, filename) =>
  fetch(url)
    .then((res) => res.arrayBuffer())
    .then((buf) => new File([buf], filename, { type: (url.match(/^data:([^;]+);/) || '')[1] }));

export const formatDocumentInfo = async ({ fileName, href }) => {
  if (!fileName) return;
  if (href) return await urlToFile(href, fileName);

  return null;
};

export const getLoggedInUser = ({ req }) => {
  const user = req.session.get('user');
  if (user === undefined) return null;
  return user;
};

export const formatNumber = (x, options = { isAbsolute: false }) => {
  if (!Number.isNaN(x) && x) return options.isAbsolute ? Math.abs(x) : x;

  return 0;
};

export const getNumberWithPreSign = (number) => {
  const minusSign = number < 0 ? '-' : '';
  return `${minusSign}${currency.euro}${getNumberWithCommas(formatNumber(number, { isAbsolute: true }))}`;
};

export const getNumberWithCommas = (x) =>
  x === 0
    ? x
    : Number(x)
        ?.toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const formatNumberToCurrency = (number) => {
  const minusSign = number < 0 ? '-' : '';
  return `${minusSign}${currency.euro}${getNumberWithCommas(formatNumber(number, { isAbsolute: true }))}`;
};

export const removeEmpty = (obj) => {
  Object.keys(obj).forEach(
    (k) =>
      (obj[k] && typeof obj[k] === 'object' && removeEmpty(obj[k])) ||
      (!obj[k] && obj[k] !== undefined && delete obj[k])
  );
  return obj;
};
