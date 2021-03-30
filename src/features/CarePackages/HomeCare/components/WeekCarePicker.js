import { useState } from "react";
import CarePickerTimeSlot from "./CarePickerTimeSlot";
import LegendItem from "./LegendItem";

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
  { id: 6, label: "Night Owl", careBreakdown: false, days: [] },
  { id: 6, label: "Waking Nights", careBreakdown: false, days: [] },
  { id: 6, label: "Sleeping Nights", careBreakdown: false, days: [] },
];

const weekDays = [
  { id: 1, name: "Monday" },
  { id: 2, name: "Tuesday" },
  { id: 3, name: "Wednesday" },
  { id: 4, name: "Thursday" },
  { id: 5, name: "Friday" },
  { id: 6, name: "Saturday" },
  { id: 7, name: "Sunday" },
];

const WeekCarePicker = () => {
  const [weekSlotsValue, setWeekSlotsValue] = useState(weekSlots);

  const onTimeSlotChange = (weekSlotId, dayId, values) => {
    debugger;
    const weekSlotEntry = weekSlotsValue.find((item) => item.id === weekSlotId);

    // Attempt to find existing day entry
    let daySlot = weekSlotEntry.days.find((item) => item.id === dayId);
    const hadDaySlot = daySlot === undefined;

    if (!hadDaySlot) {
      daySlot = {
        dayId,
        values,
      };

      // Add new day slot
      weekSlotEntry.days.push(daySlot);
    } else {
      daySlot.values = values;

      // Overwrite existing day slot
      weekSlotEntry.days = weekSlotEntry.days.map((item) =>
        item.id === dayId ? daySlot : item
      );
    }

    // Set week slots with new week slot value
    setWeekSlotsValue(
      weekSlotsValue.map((item) =>
        item.id === weekSlotEntry.Id ? weekSlotEntry : item
      )
    );
  };

  return (
    <>
      <div className="legend-items">
        <LegendItem className="personal-home-care">
          <strong>Personal Home care</strong>&nbsp;(8 Hrs)
        </LegendItem>
        <LegendItem className="domestic-home-care">Domestic</LegendItem>
        <LegendItem className="live-in-home-care">Live in carer</LegendItem>
        <LegendItem className="escort-home-care">Escort</LegendItem>
      </div>
      <div className="week-care-picker mt-4">
        <div className="columns">
          <div className="column"></div>
          {weekDays.map((weekDayItem) => {
            return (
              <div key={weekDayItem.id}>
                <label>{weekDayItem.label}</label>
              </div>
            );
          })}
        </div>
        {weekSlotsValue.map((weekSlotItem) => {
          return (
            <div className="time-slot-cont" key={weekSlotItem.Id}>
              <CarePickerTimeSlot
                weekSlotItem={weekSlotItem}
                onChange={onTimeSlotChange}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default WeekCarePicker;
