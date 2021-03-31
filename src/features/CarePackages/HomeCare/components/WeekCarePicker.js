import { useState } from "react";
import CarePickerTimeSlot from "./CarePickerTimeSlot";
import LegendItem from "./LegendItem";
import RadioButton from "../../../components/RadioButton";

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
  { id: 1, name: "MON", hours: 0 },
  { id: 2, name: "TUE", hours: 0 },
  { id: 3, name: "WED", hours: 0 },
  { id: 4, name: "THU", hours: 0 },
  { id: 5, name: "FRI", hours: 0 },
  { id: 6, name: "SAT", hours: 0 },
  { id: 7, name: "SUN", hours: 0 },
];

const WeekCarePicker = () => {
  const [weekSlotsValue, setWeekSlotsValue] = useState(weekSlots);
  const [weekDaysValue, setWeekDaysValue] = useState(weekDays);

  const onTimeSlotChange = (weekSlotId, dayId, values) => {
    const weekSlotEntry = weekSlotsValue.find((item) => item.id === weekSlotId);

    // Attempt to find existing day entry
    let daySlot = weekSlotEntry.days.find((item) => item.id === dayId);
    const hadDaySlot = daySlot !== undefined;

    if (!hadDaySlot) {
      daySlot = {
        id: dayId,
        values,
      };

      // Add new day slot
      weekSlotEntry.days.push(daySlot);
    } else {
      daySlot = { ...daySlot, values };

      // Overwrite existing day slot
      weekSlotEntry.days = weekSlotEntry.days.map((item) =>
        item.id === dayId ? daySlot : item
      );
    }

    // Set week slots with new week slot value
    const newWeekSlotsValue = weekSlotsValue.map((item) =>
      item.id === weekSlotEntry.id ? weekSlotEntry : item
    );
    setWeekSlotsValue(newWeekSlotsValue);

    // Calculate the total hours for each day
    calculateDayTotalHours(newWeekSlotsValue);
  };

  const calculateDayTotalHours = (newWeekSlotsValue) => {
    setWeekDaysValue(
      weekDays.map((weekDayItem) => {
        let hours = 0;

        // For each week slot, get the hours for this day
        newWeekSlotsValue.forEach((weekSlotItem) => {
          const weekSlotItemDayEntry = weekSlotItem.days.find(
            (item) => item.id === weekDayItem.id
          );

          if (weekSlotItemDayEntry !== undefined) {
            hours += weekSlotItemDayEntry.values.hours;
          }
        });

        // Overwrite the hours
        return { ...weekDayItem, hours };
      })
    );
  };

  return (
    <>
      <div className="level">
        <div className="level-item level-left">
          <div className="legend-items">
            <LegendItem className="personal-home-care">
              <strong>Personal Home care</strong>&nbsp;(8 Hrs)
            </LegendItem>
            <LegendItem className="domestic-home-care">Domestic</LegendItem>
            <LegendItem className="live-in-home-care">Live in carer</LegendItem>
            <LegendItem className="escort-home-care">Escort</LegendItem>
          </div>
        </div>
        <div className="level-item level-right">
          <RadioButton
            label="Display Time"
            name="minutesOrHoursRadioBtn"
            trueText="Minutes"
            falseText="Hours"
          />
        </div>
      </div>
      <div className="week-care-picker mt-4">
        <div className="columns header-columns">
          <div className="column"></div>
          {weekDaysValue.map((weekDayItem) => {
            return (
              <div className="column week-care-picker-day" key={weekDayItem.id}>
                <label>
                  <strong>{weekDayItem.name}</strong>
                </label>
                <label>({weekDayItem.hours} Hrs)</label>
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
