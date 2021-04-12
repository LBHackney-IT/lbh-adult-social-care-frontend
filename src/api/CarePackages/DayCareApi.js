const getTermTimeConsiderationOptions = () => {
  return [
    { text: "N/A", value: 1 },
    { text: "Term Time", value: 2 },
    { text: "Holiday", value: 3 },
  ];
};

const getOpportunitiesLengthOptions = () => {
  return [
    { text: "45 minutes", value: 45 },
    { text: "1 hour", value: 60 },
    { text: "1 hour 15 minutes", value: 75 },
  ];
};

const getOpportunitiesTimePerMonthOptions = () => {
  return [
    { text: "Daily", value: 1 },
    { text: "Weekly", value: 2 },
    { text: "Monthly", value: 3 },
  ];
};

export {
  getTermTimeConsiderationOptions,
  getOpportunitiesLengthOptions,
  getOpportunitiesTimePerMonthOptions,
};
