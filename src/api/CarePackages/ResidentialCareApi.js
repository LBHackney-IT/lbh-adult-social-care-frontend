const getResidentialCareTypeOfStayOptions = () => {
  return [
    { text: "Interim (Under 6 weeks)", value: 1 },
    { text: "Temporary (Expected under 52 weeks)", value: 2 },
    { text: "Long Term (52+ weeks)", value: 3 },
  ];
};

const getResidentialCareAdditionalNeedsCostOptions = () => {
  return [
    { text: "Weekly", value: 1 },
    { text: "One off", value: 2 },
    { text: "Fixed Period", value: 3 },
  ];
};

const getTypeOfResidentialCareHomeOptions = () => {
  return [
    { text: "Assisted Home", value: 1 },
    { text: "XYZ Home", value: 2 },
  ];
};

export {
  getResidentialCareTypeOfStayOptions,
  getResidentialCareAdditionalNeedsCostOptions,
  getTypeOfResidentialCareHomeOptions,
};
