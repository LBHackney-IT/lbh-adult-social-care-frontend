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

const getEnGBFormattedDate = (dateString) => new Date(dateString).toLocaleDateString('en-GB');
const stringIsNullOrEmpty = (str) => {
  if (!str || str.length === 0) return true;
  if (!str || /^\s*$/.test(str)) return true;
  if (!str.trim()) return true;
  return false;
};

export { getAgeFromDateString, getEnGBFormattedDate, stringIsNullOrEmpty };
