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
  return !str.trim();
};

export const isServer = () => typeof window === 'undefined';
export const isBrowser = () => typeof window !== 'undefined';
export const isFunction = (func) => typeof func === 'function';
