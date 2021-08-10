const getAgeFromDateString = (dateString) => {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  return age;
};

const getEnGBFormattedDate = (dateString) => {
  if (!dateString) return null;
  return new Date(dateString).toLocaleDateString('en-GB');
};

const stringIsNullOrEmpty = (str) => {
  if (!str || str.length === 0) return true;
  if (!str || /^\s*$/.test(str)) return true;
  if (!str.trim()) return true;
  return false;
};

const isServer = () => typeof window === 'undefined';
const isBrowser = () => typeof window !== 'undefined';

const isFunction = (func) => typeof func === 'function';

const sortArrayOfObjectsByStringAscending = (data = [], fieldName) =>
  data.sort((a, b) => `${a[fieldName]}`.localeCompare(b[fieldName]));

const sortArrayOfObjectsByStringDescending = (data = [], fieldName) =>
  data.sort((a, b) => `${b[fieldName]}`.localeCompare(a[fieldName]));

const sortArrayOfObjectsByNumberAscending = (data = [], fieldName) =>
  data.sort((a, b) => (Number(a[fieldName]) || 0) - (Number(b[fieldName]) || 0));

const sortArrayOfObjectsByNumberDescending = (data = [], fieldName) =>
  data.sort((a, b) => (Number(b[fieldName]) || 0) - (Number(a[fieldName]) || 0));

const sortArrayOfObjectsByDateAscending = (data = [], fieldName) =>
  data.sort((a, b) => new Date(a[fieldName]) - new Date(b[fieldName]));

const sortArrayOfObjectsByDateDescending = (data = [], fieldName) =>
  data.sort((a, b) => new Date(b[fieldName]) - new Date(a[fieldName]));

export {
  getAgeFromDateString,
  getEnGBFormattedDate,
  stringIsNullOrEmpty,
  isServer,
  isBrowser,
  isFunction,
  sortArrayOfObjectsByStringAscending,
  sortArrayOfObjectsByStringDescending,
  sortArrayOfObjectsByNumberAscending,
  sortArrayOfObjectsByNumberDescending,
  sortArrayOfObjectsByDateAscending,
  sortArrayOfObjectsByDateDescending,
};
