import { useState } from "react";
import CarePickerTimeSlot from "./CarePickerTimeSlot";
import LegendItem from "./LegendItem";
import RadioButton from "../RadioButton";
import { getWeekSlots, weekDays } from "../../service/homeCarePickerHelper";
import {
  PERSONAL_CARE_MODE,
  DOMESTIC_CARE_MODE,
  LIVE_IN_CARE_MODE,
  ESCORT_CARE_MODE,
} from "../../service/homeCarePickerHelper";

const minutesOrHoursOptions = [
  { text: "Minutes", value: 1 },
  { text: "Hours", value: 2 },
];

const WeekCarePicker = ({
  homeCareServices,
  homeCareTimeShifts,
  currentMode,
  weekDays,
  onCarePickerClick = () => {},
}) => {
  const [displayMinsOrHours, setDisplayMinsOrHours] = useState(2);

  const onCarePickerDropdownSelect = (weekSlotId, dayId, selectedValue) => {
    alert("onCarePickerDropdownSelect");
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
            options={minutesOrHoursOptions}
            selectedValue={displayMinsOrHours}
            onChange={setDisplayMinsOrHours}
          />
        </div>
      </div>
      <div className="week-care-picker mt-4">
        <div className="columns header-columns">
          <div className="column"></div>
          {weekDays.map((weekDayItem) => {
            const timeOutput =
              displayMinsOrHours === 1
                ? `${weekDayItem.minutes} Mins`
                : `${weekDayItem.minutes / 60} Hrs`;
            return (
              <div
                className="column week-care-picker-day"
                key={weekDayItem.name}
              >
                <label>
                  <strong>{weekDayItem.name}</strong>
                </label>
                <label>({timeOutput})</label>
              </div>
            );
          })}
        </div>
        {homeCareTimeShifts.map((homeCareTimeShiftItem) => {
          return (
            <div className="time-slot-cont" key={homeCareTimeShiftItem.id}>
              <CarePickerTimeSlot
                homeCareServices={homeCareServices}
                currentMode={currentMode}
                weekSlotItem={homeCareTimeShiftItem}
                onClick={onCarePickerClick}
                onCareDropdownSelect={onCarePickerDropdownSelect}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default WeekCarePicker;
