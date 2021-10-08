import { add, format } from 'date-fns';
import { getEnGBFormattedDate } from '../api/Utils/FuncUtils';
import { maxStringLength } from '../constants/variables';

const chr4 = () => Math.random().toString(16).slice(-4);

const uniqueID = () => `${chr4() + chr4()}-${chr4()}-${chr4()}-${chr4()}-${chr4()}${chr4()}${chr4()}`;

const formatDateWithSign = (date, sign = '/') => {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  return `${`00${day}`.slice(-2)}${sign}${`00${month}`.slice(-2)}${sign}${`00${year}`.slice(-2)}`;
};

const dateStringToDate = (dateString) => dateString ? new Date(dateString) : null;

const incrementDate = ({ incrementTime, date = new Date() }) => {
  const {
    years = 0,
    months = 0,
    days = 0,
    weeks = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
  } = incrementTime;

  return add(date, {
    years,
    months,
    weeks,
    days,
    hours,
    minutes,
    seconds,
  });
}

const formatStringLength = (string, collapsedText, isSlicedText) => {
  if(!string) return '';

  if (string.length > maxStringLength && collapsedText && isSlicedText) {
    return `${string.slice(0, maxStringLength)}`;
  }
  return string;
};

const formatCareDatePeriod = (startDate, endDate) => {
  return {
    startDate: getEnGBFormattedDate(startDate, ' '),
    endDate: endDate ? getEnGBFormattedDate(endDate, ' ') : 'Ongoing'
  };
};

const formatDate = ( date, formatString = 'dd.MM.yy') => date && format(new Date(date), formatString);

const includeString = (mainString, checkString) => mainString && mainString.indexOf(checkString) > -1;

const getUrlFromFile = file => {
  if(!file) return '';
  if(file?.url) return file.url;

  return window.URL.revokeObjectURL(file);
}

const formatStatus = (status, sign = '-', isUpperCase) => {
  if(!status) return '';
  if(status.indexOf('-') > -1) {
    return status
      .split('-')
      .map((text) => text.slice(0, 1).toUpperCase() + text.slice(1, text.length))
      .join(' ');
  }

  let newStatus = '';
  for(const i of status) {
    if(i !== '' && i !== ' ') {
      if(i === i.toUpperCase() && i !== status[0].toUpperCase()) {
        newStatus += sign;
      }
      newStatus += i;
    }
  }
  return isUpperCase ? newStatus : newStatus.toLowerCase();
}

// check user session
// if no user, then redirect to Login Page
const getUserSession = ({ req, res }) => {
  const user = req.session.get('user');

  if (user === undefined) {
    res.setHeader('location', '/login');
    res.statusCode = 302;
    res.end();

    return true;
  }

  return false;
};

const getLoggedInUser = ({ req }) => {
  const user = req.session.get('user');

  if (user === undefined) {
    return null;
  }

  return user;
};

function formatForDropDownOptions(fields, res) {
  if(!res) return [];
  const localFields = {
    text: 'text',
    value: 'id',
    ...fields,
  };
  return res.map((item) => ({
    text: item[localFields.text],
    value: item[localFields.value],
  }));
}

/**
  behavior: auto or smooth
  block: start, center, end, or nearest
  inline: start, center, end, or nearest
 */
const scrollToElement = ({ element, behavior = 'smooth', block = 'center', inline = 'end' }) => {
  element?.scrollIntoView({
    behavior,
    block,
    inline,
  });
};

const sortTableByKey = (input, sort) => {
  if (!Array.isArray(input)) {
    console.error('Sorted object is not an array');
    return [];
  }
  if (!sort?.value && !sort?.name) {
    console.error('Wrong format of sorting object');
    return [];
  }
  const isIncrease = sort.value === 'ascending';
  return input.sort((a, b) => {
    const moveTo = { up: isIncrease ? 1 : -1, down: isIncrease ? -1 : 1 };
    if (a[sort.name] > b[sort.name]) return moveTo.up;
    if (a[sort.name] < b[sort.name]) return moveTo.down;
    if (a[sort.name] === b[sort.name]) return 0;
  });
};

const deleteSpaces = (str) => str.replace(/\s/g, '');

const getErrorResponse = (error) => error?.response?.data || {}; // { firstName: 'First Name must be more then 10 symbols', secondName: 'Second Name must be more then 10 symbols'

const getNumberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export {
  uniqueID,
  deleteSpaces,
  formatDateWithSign,
  formatStatus,
  includeString,
  getUserSession,
  getErrorResponse,
  formatDate,
  getLoggedInUser,
  sortTableByKey,
  formatForDropDownOptions,
  scrollToElement,
  getNumberWithCommas,
  formatCareDatePeriod,
  formatStringLength,
  incrementDate,
  getUrlFromFile,
  dateStringToDate,
};