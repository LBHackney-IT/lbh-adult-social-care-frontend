import { DATA_TYPES } from './CommonOptions';

export const getAgeFromDateString = (dateString) => {
  if (!dateString) return;
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  return age;
};

export const getEnGBFormattedDate = (dateString, nullData = false) => {
  if (!dateString) {
    if (nullData) {
      return nullData;
    }
    return null;
  }
  return new Date(dateString).toLocaleDateString('en-GB');
};

export const stringIsNullOrEmpty = (str) => {
  if (!str || str.length === 0) return true;
  if (!str || /^\s*$/.test(str)) return true;
  if (!str.trim()) return true;
  return false;
};

export const isServer = () => typeof window === 'undefined';
export const isBrowser = () => typeof window !== 'undefined';

export const isFunction = (func) => typeof func === 'function';

const sortArrayOfObjectsByString = (data = [], fieldName, type) => {
  if (type === 'ascending') return data.sort((a, b) => `${a[fieldName]}`.localeCompare(b[fieldName]));
  return data.sort((a, b) => `${b[fieldName]}`.localeCompare(a[fieldName]));
};

const sortArrayOfObjectsByDate = (data = [], fieldName, type) => {
  if (type === 'ascending') return data.sort((a, b) => new Date(a[fieldName]) - new Date(b[fieldName]));
  return data.sort((a, b) => new Date(b[fieldName]) - new Date(a[fieldName]));
};

const sortArrayOfObjectsByNumber = (data = [], fieldName, type) => {
  if (type === 'ascending') return data.sort((a, b) => (Number(a[fieldName]) || 0) - (Number(b[fieldName]) || 0));
  return data.sort((a, b) => (Number(b[fieldName]) || 0) - (Number(a[fieldName]) || 0));
};

const sortArrayBy = {
  string: sortArrayOfObjectsByString,
  date: sortArrayOfObjectsByDate,
  number: sortArrayOfObjectsByNumber,
};

export const sortArray = (data, sort) => {
  if (!Array.isArray(data)) return [];
  const { value = '', name = '' } = sort || {};
  const variableType = sort.dataType || (data[0] && data[0][name]?.constructor?.name);

  if (!variableType) return data;

  switch (variableType.toLowerCase()) {
    case DATA_TYPES.DATE:
      return sortArrayBy.date(data, name, value);
    case DATA_TYPES.STRING:
      return sortArrayBy.string(data, name, value);
    case DATA_TYPES.NUMBER:
      return sortArrayBy.number(data, name, value);
    default:
      return data;
  }
};
