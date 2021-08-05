const getFixedPeriodOptions = () => [
  { text: 'Fixed period', value: true },
  { text: 'Ongoing', value: false },
];

const getInitDaysSelected = [
  { id: 1, short: 'Mon', long: 'Monday', checked: true },
  { id: 2, short: 'Tue', long: 'Tuesday', checked: false },
  { id: 3, short: 'Wed', long: 'Wednesday', checked: true },
  { id: 4, short: 'Thu', long: 'Thursday', checked: false },
  { id: 5, short: 'Fri', long: 'Friday', checked: true },
  { id: 6, short: 'Sat', long: 'Saturday', checked: false },
  { id: 7, short: 'Sun', long: 'Sunday', checked: true },
];

const getInitialPackageReclaim = () => ({
  type: '',
  notes: '',
  from: '',
  category: '',
  amount: '',
  id: '1',
});

const getSelectedDate = (daysData) => {
  const monday = {
    ...getInitDaysSelected.find((dayObj) => dayObj.long.toLowerCase() === 'monday'),
    checked: daysData.packageDetails.monday,
  };
  const tuesday = {
    ...getInitDaysSelected.find((dayObj) => dayObj.long.toLowerCase() === 'tuesday'),
    checked: daysData.packageDetails.tuesday,
  };
  const wednesday = {
    ...getInitDaysSelected.find((dayObj) => dayObj.long.toLowerCase() === 'wednesday'),
    checked: daysData.packageDetails.wednesday,
  };
  const thursday = {
    ...getInitDaysSelected.find((dayObj) => dayObj.long.toLowerCase() === 'thursday'),
    checked: daysData.packageDetails.thursday,
  };
  const friday = {
    ...getInitDaysSelected.find((dayObj) => dayObj.long.toLowerCase() === 'friday'),
    checked: daysData.packageDetails.friday,
  };
  const saturday = {
    ...getInitDaysSelected.find((dayObj) => dayObj.long.toLowerCase() === 'saturday'),
    checked: daysData.packageDetails.saturday,
  };
  const sunday = {
    ...getInitDaysSelected.find((dayObj) => dayObj.long.toLowerCase() === 'sunday'),
    checked: daysData.packageDetails.sunday,
  };
  return [monday, tuesday, wednesday, thursday, friday, saturday, sunday];
};

const SWR_OPTIONS = {
  REVALIDATE_ON_MOUNT: {
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
  },
};

export { getFixedPeriodOptions, getInitialPackageReclaim, getInitDaysSelected, getSelectedDate, SWR_OPTIONS };
