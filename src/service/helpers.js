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

const formatDateWithSlash = date => {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.getMonth()+1;
  const year = newDate.getFullYear();

  return `${month}/${day}/${year}`;
}

export {
  uniqueID,
  formatDateWithSlash,
};
