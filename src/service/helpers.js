const chr4 = () => {
  return Math.random().toString(16).slice(-4);
};

const uniqueID = () => {
  return chr4() + chr4() +
    '-' + chr4() +
    '-' + chr4() +
    '-' + chr4() +
    '-' + chr4() + chr4() + chr4();
};

const formatDateWithSlash = (date, sign = '/') => {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.getMonth()+1;
  const year = newDate.getFullYear();

  return `${('00'+day).slice(-2)}${sign}${('00'+month).slice(-2)}${sign}${('00'+year).slice(-2)}`;
};

const includeString = (mainString, checkString) => mainString && mainString.indexOf(checkString) > -1;

const formatStatus = status => status ? status.split('-').map(text => text.slice(0, 1).toUpperCase() + text.slice(1,text.length)).join(' ') : '';

export {
  uniqueID,
  formatDateWithSlash,
  formatStatus,
  includeString,
};
