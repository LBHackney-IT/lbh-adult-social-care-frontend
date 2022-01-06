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

export const getDateWithoutTimezone = (dateValue) => {
  if (dateValue == null) return dateValue;
  const timestamp = dateValue.getTime() - dateValue.getTimezoneOffset() * 60000;
  const transformedDate = new Date(timestamp);
  transformedDate.setUTCHours(0, 0, 0, 0);
  return transformedDate;
};

export const getIsoDateWithoutTimezone = (dateValue) => {
  if (dateValue == null) return dateValue;
  const dateParam = new Date(dateValue);
  const timestamp = dateParam.getTime() - dateParam.getTimezoneOffset() * 60000;
  const transformedDate = new Date(timestamp);
  transformedDate.setUTCHours(0, 0, 0, 0); // comment this line to get iso with timezone
  return transformedDate.toISOString();
};

export const getUrlOrNull = (string) => (string.includes('undefined') || string.includes('null') ? null : string);

export const stringIsNullOrEmpty = (str) => {
  if (!str || str.length === 0) return true;
  if (!str || /^\s*$/.test(str)) return true;
  return !str.trim();
};

export const isServer = () => typeof window === 'undefined';
export const isBrowser = () => typeof window !== 'undefined';
export const isFunction = (func) => typeof func === 'function';
