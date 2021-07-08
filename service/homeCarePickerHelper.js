// Each represents a timeslot row in the care picker 'table'
const weekSlots = [
  {
    id: 1,
    label: "Morning",
    careBreakdown: true,
    timeLabel: "08:00 - 10:00",
    days: [],
  },
  {
    id: 2,
    label: "Mid Morning",
    careBreakdown: true,
    timeLabel: "10:00 - 12:00",
    days: [],
  },
  {
    id: 3,
    label: "Lunch",
    careBreakdown: true,
    timeLabel: "12:00 - 14:00",
    days: [],
  },
  {
    id: 4,
    label: "Afternoon",
    careBreakdown: true,
    timeLabel: "14:00 - 17:00",
    days: [],
  },
  {
    id: 5,
    label: "Evening",
    careBreakdown: true,
    timeLabel: "17:00 - 20:00",
    days: [],
  },
  {
    id: 6,
    label: "Night",
    careBreakdown: true,
    timeLabel: "20:00 - 22:00",
    days: [],
  },
  { id: 7, label: "Night Owl", careBreakdown: false, days: [] },
  { id: 8, label: "Waking Nights", careBreakdown: false, days: [] },
  { id: 9, label: "Sleeping Nights", careBreakdown: false, days: [] },
];

const weekDays = [
  { id: 1, name: "MON", minutes: 0 },
  { id: 2, name: "TUE", minutes: 0 },
  { id: 3, name: "WED", minutes: 0 },
  { id: 4, name: "THU", minutes: 0 },
  { id: 5, name: "FRI", minutes: 0 },
  { id: 6, name: "SAT", minutes: 0 },
  { id: 7, name: "SUN", minutes: 0 },
];

const getWeekSlots = () => {
  return weekSlots.map((weekSlotItem) => {
    if (weekSlotItem.days.length <= 0) {
      if (weekSlotItem.id < 7) {
        for (let i = 1; i <= 7; i++) {
          weekSlotItem.days.push({
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
      } else {
        for (let i = 1; i <= 7; i++) {
          weekSlotItem.days.push({
            id: i,
            value: undefined,
          });
        }
      }
    }
    return weekSlotItem;
  });
};

const nightOwlOptions = [
  { text: "30 minutes", value: 30 },
  { text: "45 minutes", value: 45 },
  { text: "1 hour", value: 60 },
  { text: "1 hour 15 minutes", value: 75 },
  { text: "1 hour 30 minutes", value: 90 },
  { text: "1 hour 45 minutes", value: 105 },
  { text: "2 hours", value: 120 },
];

const allNightOptions = [
  { text: "6 hours", value: 360 },
  { text: "12 hours", value: 720 },
];

const PERSONAL_CARE_MODE = 1;
const DOMESTIC_CARE_MODE = 2;
const LIVE_IN_CARE_MODE = 3;
const ESCORT_CARE_MODE = 4;

export {
  getWeekSlots,
  weekDays,
  nightOwlOptions,
  allNightOptions,
  PERSONAL_CARE_MODE,
  DOMESTIC_CARE_MODE,
  LIVE_IN_CARE_MODE,
  ESCORT_CARE_MODE,
};
