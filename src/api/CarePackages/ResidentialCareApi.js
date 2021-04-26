const getResidentialCareTypeOfStayOptions = () => {
  return [];
}

const getResidentialCareAdditionalNeedsCostOptions = () => {
  return [
    { text: "Weekly", value: 1 },
    { text: "One off", value: 2 },
  ];
}

const getTypeOfResidentialCareHomeOptions = () => {
  return [
    { text: "Assisted Home", value: 1 },
    { text: "XYZ Home", value: 2 },
  ];
}

export {
  getResidentialCareTypeOfStayOptions,
  getResidentialCareAdditionalNeedsCostOptions,
  getTypeOfResidentialCareHomeOptions
}
