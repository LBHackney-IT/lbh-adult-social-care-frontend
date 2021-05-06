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

export {
  uniqueID,
};
