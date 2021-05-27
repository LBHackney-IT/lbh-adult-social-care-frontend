const getFixedPeriodOptions = () => {
  return [
    { text: "Fixed period", value: true },
    { text: "Ongoing", value: false },
  ];
};

const getInitDaysSelected = () => [
  { id: 1, short: "Mon", long: "Monday", checked: true },
  { id: 2, short: "Tue", long: "Tuesday", checked: false },
  { id: 3, short: "Wed", long: "Wednesday", checked: true },
  { id: 4, short: "Thu", long: "Thursday", checked: false },
  { id: 5, short: "Fri", long: "Friday", checked: true },
  { id: 6, short: "Sat", long: "Saturday", checked: false },
  { id: 7, short: "Sun", long: "Sunday", checked: true },
];

export { getFixedPeriodOptions, getInitDaysSelected };
