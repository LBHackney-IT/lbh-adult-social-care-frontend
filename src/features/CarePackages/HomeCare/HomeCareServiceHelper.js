const serviceTypes = [
  { text: "Personal care", value: 1 },
  { text: "Domestic care", value: 2 },
  { text: "Live in care", value: 3 },
  { text: "Escort care", value: 4 },
];

const careTimes = [
  {
    serviceTypeId: 1,
    times: [
      { text: "N/A", value: 0 },
      { text: "30 minutes", value: 1 },
      { text: "45 minutes", value: 2 },
      { text: "1 hour", value: 3 },
      { text: "1 hour 15 minutes", value: 4 },
      { text: "1 hour 30 minutes", value: 5 },
      { text: "1 hour 45 minutes", value: 6 },
      { text: "2 hours", value: 7 },
    ],
  },
  {
    serviceTypeId: 2,
    times: [
      { text: "N/A", value: 0 },
      { text: "30 @@ minutes", value: 1 },
      { text: "45 minutes", value: 2 },
      { text: "1 hour", value: 3 },
      { text: "1 hour 15 minutes", value: 4 },
      { text: "1 hour 30 minutes", value: 5 },
      { text: "1 hour 45 minutes", value: 6 },
      { text: "2 hours", value: 7 },
    ],
  },
  {
    serviceTypeId: 3,
    times: [
      { text: "N/A", value: 0 },
      { text: "30 @@@ minutes", value: 1 },
      { text: "45 minutes", value: 2 },
      { text: "1 hour", value: 3 },
      { text: "1 hour 15 minutes", value: 4 },
      { text: "1 hour 30 minutes", value: 5 },
      { text: "1 hour 45 minutes", value: 6 },
      { text: "2 hours", value: 7 },
    ],
  },
  {
    serviceTypeId: 4,
    times: [
      { text: "N/A", value: 0 },
      { text: "30 @@@@ minutes", value: 1 },
      { text: "45 minutes", value: 2 },
      { text: "1 hour", value: 3 },
      { text: "1 hour 15 minutes", value: 4 },
      { text: "1 hour 30 minutes", value: 5 },
      { text: "1 hour 45 minutes", value: 6 },
      { text: "2 hours", value: 7 },
    ],
  },
];

const getServiceTypeCareTimes = (serviceTypeId) => {
  return careTimes.find((item) => item.serviceTypeId === serviceTypeId).times;
};

export { serviceTypes, getServiceTypeCareTimes };
