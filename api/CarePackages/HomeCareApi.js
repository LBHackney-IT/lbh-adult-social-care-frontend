import axios from 'axios';
import { format } from 'date-fns';
import { UTC_DATE_FORMAT } from '../../Constants';
import { weekDays } from 'service/homeCarePickerHelper';
import { BASE_URL } from '../BaseApi';
import { handleError, handleResponse } from '../Utils/ApiUtils';

const HOME_CARE_URL = `${BASE_URL}/v1/HomeCarePackage`;
const HOME_CARE_BROKERAGE_URL = `${BASE_URL}/v1/home-care-packages`;
const HOME_CARE_SERVICE_URL = `${BASE_URL}/v1/homeCareService`;
const HOME_CARE_PACKAGE_SLOTS_URL = `${BASE_URL}/v1/homeCarePackageSlots`;
const HOME_CARE_TIME_SLOT_SHIFTS_URL = `${BASE_URL}/v1/timeSlotShifts`;

// Home care packages
const createHomeCarePackage = async ({
  startDate,
  endDate,
  isImmediate,
  isS117,
  isFixedPeriod,
  creatorId,
  clientId,
  packageReclaims,
}) => {
  try {
    const response = await axios
      .post(
        HOME_CARE_URL,
        {
          isThisClientUnderS117: isS117,
          isThisAnImmediateService: isImmediate,
          isFixedPeriod,
          isOngoingPeriod: !isFixedPeriod,
          startDate: startDate ? format(new Date(startDate), UTC_DATE_FORMAT) : '',
          endDate: endDate ? format(new Date(endDate), UTC_DATE_FORMAT) : '',
          creatorId,
          clientId,
          statusId: 1,
          packageReclaims,
        }
      )
    return response?.data;
  } catch (error) {
    console.error(error);
  }
};

// Home care services
const getHomeCareServices = async () => {
  const response = await axios
    .get(`${HOME_CARE_SERVICE_URL}/getall`)
    .catch((error) => {
      // TODO error
      console.log(error);
      debugger;
    });

  return response.data;
};

// Home care time slots
const getHomeCareTimeSlotShifts = async () => {
  const response = await axios
    .get(`${HOME_CARE_TIME_SLOT_SHIFTS_URL}/getall`)
    .catch((error) => {
      // TODO error
      console.log(error);
    });

  return response.data.map((shiftItem) => {
    const daysForShiftItem = [];
    for (let i = 1; i <= 7; i++) {
      const hasLinkedHomeCareServiceTypeId =
        shiftItem.LinkedToHomeCareServiceTypeId && shiftItem.LinkedToHomeCareServiceTypeId.length > 0;

      if (hasLinkedHomeCareServiceTypeId) {
        daysForShiftItem.push({
          id: i,
          value: 0,
        });
      } else {
        daysForShiftItem.push({
          id: i,
          values: {
            person: {
              primary: 0,
              secondary: 0,
            },
            domestic: 0,
            liveIn: 0,
            escort: 0,
          },
        });
      }
    }
    return { ...shiftItem, days: daysForShiftItem };
  });
};

const getMinsOrHoursText = (minutes) => {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  return `${minutes / 60}h`;
};

// Post home care time slots
const postHomeCareTimeSlots = async (data) => {
  const postData = {
    HomeCarePackageId: data.id,
    HomeCarePackageSlots: data.slots.map((item) => ({
      PrimaryInMinutes: item.PrimaryInMinutes,
      SecondaryInMinutes: item.SecondaryInMinutes,
      TimeSlotShiftId: item.TimeSlotShiftId,
      DayId: item.DayId,
      NeedToAddress: item.NeedToAddress,
      WhatShouldBeDone: item.WhatShouldBeDone,
      ServiceId: item.ServiceId,
    })),
  };

  const response = await axios
    .post(`${HOME_CARE_PACKAGE_SLOTS_URL}`, postData)
    .catch(
      (error) =>
        // TODO error
        error
    );

  let iterator = 0;
  const returnData = weekDays
    .map((weekDayItem) => {
      const itemsForWeekDay = response.data.homeCarePackageSlots.filter((item) => item.dayId === weekDayItem.id);

      if (itemsForWeekDay && itemsForWeekDay.length > 0) {
        iterator += 1;
        return {
          id: iterator,
          dayId: weekDayItem.id,
          day: weekDayItem.longName,
          careSummaries: itemsForWeekDay.map((itemForWeekDay) => ({
            id: 1,
            timeSlot: itemForWeekDay.timeSlotShift.timeSlotTimeLabel,
            label: itemForWeekDay.service,
            primaryCarer: getMinsOrHoursText(itemForWeekDay.primaryInMinutes),
            secondaryCarer: getMinsOrHoursText(itemForWeekDay.secondaryInMinutes),
            totalHours: getMinsOrHoursText(itemForWeekDay.primaryInMinutes + itemForWeekDay.secondaryInMinutes),
            needAddressing: itemForWeekDay.needToAddress,
            whatShouldBeDone: itemForWeekDay.whatShouldBeDone,
          })),
        };
      }

      return null;
    })
    .filter((item) => item !== null);
  return returnData;
};

const getHomeCareSummaryData = () => [
  {
    id: 1,
    dayId: 1,
    day: 'Monday',
    careSummaries: [
      {
        id: 1,
        timeSlot: '8am - 10am',
        label: 'Personal Care',
        primaryCarer: '2h',
        secondaryCarer: '30m',
        totalHours: '2.5',
        needAddressing:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend faucibus dictum. Nulla congue velit velit, ut ultricies eros consequat quis. Duis at fermentum ex. Vivamus metus sem, consequat nec ante sed, tempus placerat risus. Maecenas suscipit sed dui et pellentesque. Proin et sapien dolor. Sed quam odio, pretium eget semper in, congue eget diam. Nulla faucibus, velit et iaculis maximus, urna nunc consequat est, non blandit mauris dui sed risus. Curabitur efficitur sollicitudin tellus, sed sagittis urna ornare id. Fusce varius nisi non tincidunt luctus. Morbi porttitor diam mi, sit amet laoreet elit tincidunt in. Cras ex ante, luctus vel metu',
        whatShouldBeDone:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend faucibus dictum. Nulla congue velit velit, ut ultricies eros consequat quis. Duis at fermentum ex. Vivamus metus sem, consequat nec ante sed, tempus placerat risus. Maecenas suscipit sed dui et pellentesque. Proin et sapien dolor. Sed quam odio, pretium eget semper in, congue eget diam. Nulla faucibus, velit et iaculis maximus, urna nunc consequat est, non blandit mauris dui sed risus. Curabitur efficitur sollicitudin tellus, sed sagittis urna ornare id. Fusce varius nisi non tincidunt luctus. Morbi porttitor diam mi, sit amet laoreet elit tincidunt in. Cras ex ante, luctus vel metu',
      },
      {
        id: 2,
        timeSlot: '12pm - 2pm',
        label: 'Personal Care',
        primaryCarer: '2h',
        secondaryCarer: '30m',
        totalHours: '2.5',
        needAddressing:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend faucibus dictum. Nulla congue velit velit, ut ultricies eros consequat quis. Duis at fermentum ex. Vivamus metus sem, consequat nec ante sed, tempus placerat risus. Maecenas suscipit sed dui et pellentesque. Proin et sapien dolor. Sed quam odio, pretium eget semper in, congue eget diam. Nulla faucibus, velit et iaculis maximus, urna nunc consequat est, non blandit mauris dui sed risus. Curabitur efficitur sollicitudin tellus, sed sagittis urna ornare id. Fusce varius nisi non tincidunt luctus. Morbi porttitor diam mi, sit amet laoreet elit tincidunt in. Cras ex ante, luctus vel metu',
        whatShouldBeDone:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend faucibus dictum. Nulla congue velit velit, ut ultricies eros consequat quis. Duis at fermentum ex. Vivamus metus sem, consequat nec ante sed, tempus placerat risus. Maecenas suscipit sed dui et pellentesque. Proin et sapien dolor. Sed quam odio, pretium eget semper in, congue eget diam. Nulla faucibus, velit et iaculis maximus, urna nunc consequat est, non blandit mauris dui sed risus. Curabitur efficitur sollicitudin tellus, sed sagittis urna ornare id. Fusce varius nisi non tincidunt luctus. Morbi porttitor diam mi, sit amet laoreet elit tincidunt in. Cras ex ante, luctus vel metu',
      },
    ],
  },
  {
    id: 2,
    dayId: 2,
    day: 'Tuesday',
    careSummaries: [
      {
        id: 3,
        timeSlot: '8am - 10am',
        label: 'Personal Care',
        primaryCarer: '2h',
        secondaryCarer: '30m',
        totalHours: '2.5',
        needAddressing:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend faucibus dictum. Nulla congue velit velit, ut ultricies eros consequat quis. Duis at fermentum ex. Vivamus metus sem, consequat nec ante sed, tempus placerat risus. Maecenas suscipit sed dui et pellentesque. Proin et sapien dolor. Sed quam odio, pretium eget semper in, congue eget diam. Nulla faucibus, velit et iaculis maximus, urna nunc consequat est, non blandit mauris dui sed risus. Curabitur efficitur sollicitudin tellus, sed sagittis urna ornare id. Fusce varius nisi non tincidunt luctus. Morbi porttitor diam mi, sit amet laoreet elit tincidunt in. Cras ex ante, luctus vel metu',
        whatShouldBeDone:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend faucibus dictum. Nulla congue velit velit, ut ultricies eros consequat quis. Duis at fermentum ex. Vivamus metus sem, consequat nec ante sed, tempus placerat risus. Maecenas suscipit sed dui et pellentesque. Proin et sapien dolor. Sed quam odio, pretium eget semper in, congue eget diam. Nulla faucibus, velit et iaculis maximus, urna nunc consequat est, non blandit mauris dui sed risus. Curabitur efficitur sollicitudin tellus, sed sagittis urna ornare id. Fusce varius nisi non tincidunt luctus. Morbi porttitor diam mi, sit amet laoreet elit tincidunt in. Cras ex ante, luctus vel metu',
      },
    ],
  },
];

const getHomeCarePackageDetailsForBrokerage = (homeCarePackageId) =>
  axios.get(`${HOME_CARE_BROKERAGE_URL}/${homeCarePackageId}/brokerage`).then(handleResponse).catch(handleError);

const changeHomeCareBrokerageStatus = async ({ id, statusId }) =>
  await axios
    .put(`${HOME_CARE_BROKERAGE_URL}/${id}/changeStatus/${statusId}`)
    .catch(
      (error) =>
        // TODO error
        error
    );

const createHomeCareBrokerageInfo = ({ id, postData }) => {
  const options = {
    url: `${HOME_CARE_BROKERAGE_URL}/${id}/brokerage`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: postData,
  };
  return axios(options).then(handleResponse).catch(handleError);
};

const postRequestMoreInformation = ({ homeCarePackageId, informationText }) => {
  const options = {
    url: `${HOME_CARE_BROKERAGE_URL}/home-care-request-more-information`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: {
      homeCarePackageId,
      informationText,
    },
  };
  return axios(options).then(handleResponse).catch(handleError);
};

const getHomeCareBrokerageApprovePackage = async (packageId) => {
  const response = await axios
    .get(`${HOME_CARE_BROKERAGE_URL}/${packageId}/approve-package`, {
      
    })
    .catch((error) => {
      // TODO error
      console.log(error);
    });

  return response.data;
};

export {
  createHomeCarePackage,
  getHomeCareTimeSlotShifts,
  getHomeCareServices,
  getHomeCareSummaryData,
  postHomeCareTimeSlots,
  getHomeCareBrokerageApprovePackage,
  getHomeCarePackageDetailsForBrokerage,
  createHomeCareBrokerageInfo,
  changeHomeCareBrokerageStatus,
  postRequestMoreInformation,
};
