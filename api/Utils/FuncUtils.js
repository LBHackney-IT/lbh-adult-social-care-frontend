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

export { getAgeFromDateString, getEnGBFormattedDate, stringIsNullOrEmpty, isServer, isBrowser };
