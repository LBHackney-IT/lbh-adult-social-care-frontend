import {
  PERSONAL_CARE_MODE,
  DOMESTIC_CARE_MODE,
  LIVE_IN_CARE_MODE,
  ESCORT_CARE_MODE,
} from "./homeCarePickerHelper";

const serviceTypes = [
  { text: "Personal care", value: PERSONAL_CARE_MODE },
  { text: "Domestic care", value: DOMESTIC_CARE_MODE },
  { text: "Live in care", value: LIVE_IN_CARE_MODE },
  { text: "Escort care", value: ESCORT_CARE_MODE },
];

const careTimes = [
  {
    serviceTypeId: PERSONAL_CARE_MODE,
    times: [
      { text: "30 minutes", value: 1, mins: 30 },
      { text: "45 minutes", value: 2, mins: 45 },
      { text: "1 hour", value: 3, mins: 60 },
      { text: "1 hour 15 minutes", value: 4, mins: 75 },
      { text: "1 hour 30 minutes", value: 5, mins: 90 },
      { text: "1 hour 45 minutes", value: 6, mins: 105 },
      { text: "2 hours", value: 7, mins: 120 },
    ],
    secondaryTimes: [
      { text: "N/A", value: 0, mins: 0 },
      { text: "30 minutes", value: 1, mins: 30 },
      { text: "45 minutes", value: 2, mins: 45 },
      { text: "1 hour", value: 3, mins: 60 },
      { text: "1 hour 15 minutes", value: 4, mins: 75 },
      { text: "1 hour 30 minutes", value: 5, mins: 90 },
      { text: "1 hour 45 minutes", value: 6, mins: 105 },
      { text: "2 hours", value: 7, mins: 120 },
    ],
  },
  {
    serviceTypeId: DOMESTIC_CARE_MODE,
    times: [
      { text: "30 minutes", value: 1, mins: 30 },
      { text: "45 minutes", value: 2, mins: 45 },
      { text: "1 hour", value: 3, mins: 60 },
      { text: "1 hour 15 minutes", value: 4, mins: 75 },
      { text: "1 hour 30 minutes", value: 5, mins: 90 },
      { text: "1 hour 45 minutes", value: 6, mins: 105 },
      { text: "2 hours", value: 7, mins: 120 },
    ],
  },
  {
    serviceTypeId: LIVE_IN_CARE_MODE,
    times: [
      { text: "30 minutes", value: 1, mins: 30 },
      { text: "45 minutes", value: 2, mins: 45 },
      { text: "1 hour", value: 3, mins: 60 },
      { text: "1 hour 15 minutes", value: 4, mins: 75 },
      { text: "1 hour 30 minutes", value: 5, mins: 90 },
      { text: "1 hour 45 minutes", value: 6, mins: 105 },
      { text: "2 hours", value: 7, mins: 120 },
    ],
  },
  {
    serviceTypeId: ESCORT_CARE_MODE,
    times: [
      { text: "30 minutes", value: 1, mins: 30 },
      { text: "45 minutes", value: 2, mins: 45 },
      { text: "1 hour", value: 3, mins: 60 },
      { text: "1 hour 15 minutes", value: 4, mins: 75 },
      { text: "1 hour 30 minutes", value: 5, mins: 90 },
      { text: "1 hour 45 minutes", value: 6, mins: 105 },
      { text: "2 hours", value: 7, mins: 120 },
    ],
  },
];

const getServiceTypeCareTimes = (serviceTypeId) => {
  const careTimeItem = careTimes.find(
    (item) => item.serviceTypeId === serviceTypeId
  );

  if (serviceTypeId === PERSONAL_CARE_MODE) {
    return {
      times: careTimeItem.times,
      secondaryTimes: careTimeItem.secondaryTimes,
    };
  } else {
    return {
      times: careTimeItem.times,
    };
  }
};

const getServiceTimes = (homeCareServices, selectedServiceTypeId) => {
  const { minutes } = homeCareServices
    ? homeCareServices.find((item) => item.id === selectedServiceTypeId)
    : { minutes: null };

  const times = minutes
    ? minutes
        .filter((item) => item.isSecondaryCarer === false)
        .map((item) => {
          return { text: item.label, value: item.minutes };
        })
    : [];
  let secondaryTimes = minutes
    ? minutes
        .filter((item) => item.isSecondaryCarer === true)
        .map((item) => {
          return { text: item.label, value: item.minutes };
        })
    : [];
  secondaryTimes = secondaryTimes.length === 0 ? undefined : secondaryTimes;

  return { times, secondaryTimes };
};

export { getServiceTimes, serviceTypes, getServiceTypeCareTimes };
