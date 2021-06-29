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
  currentMode,
  primaryCareTimes,
  selectedPrimaryCareTypeId,
  secondaryCareTimes,
  selectedSecondaryCareTypeId,
}) => {
  const [weekSlotsValue, setWeekSlotsValue] = useState(getWeekSlots());
  const [weekDaysValue, setWeekDaysValue] = useState(weekDays);

  const onCarePickerClick = (weekSlotId, dayId) => {
    const weekSlot = weekSlotsValue.find((item) => item.id === weekSlotId);
    const weekSlotDayItem = weekSlot.days.find((item) => item.id === dayId);

    const primaryCareTimeItem = primaryCareTimes.find(
      (item) => item.value === selectedPrimaryCareTypeId
    );

    const setPrimaryTime = (primaryTimeProperty) => {
      // Determine primary care time
      const hasPrimary = primaryTimeProperty > 0;
      return hasPrimary ? 0 : primaryCareTimeItem.mins;
    };

    switch (currentMode) {
      case PERSONAL_CARE_MODE: {
        // Determine primary care time
        weekSlotDayItem.values.person.primary = setPrimaryTime(
          weekSlotDayItem.values.person.primary
        );

        // Determine secondary care time
        const secondaryCareTimeItem = secondaryCareTimes.find(
          (item) => item.value === selectedSecondaryCareTypeId
        );
        const hasSecondary = weekSlotDayItem.values.person.secondary > 0;
        weekSlotDayItem.values.person.secondary = hasSecondary
          ? 0
          : secondaryCareTimeItem.mins;
        break;
      }
      case DOMESTIC_CARE_MODE: {
        // Determine primary care time
        weekSlotDayItem.values.domestic = setPrimaryTime(
          weekSlotDayItem.values.domestic
        );
        break;
      }
      case LIVE_IN_CARE_MODE: {
        // Determine primary care time
        weekSlotDayItem.values.liveIn = setPrimaryTime(
          weekSlotDayItem.values.liveIn
        );
        break;
      }
      case ESCORT_CARE_MODE: {
        // Determine primary care time
        weekSlotDayItem.values.escort = setPrimaryTime(
          weekSlotDayItem.values.escort
        );
        break;
      }
      default: {
        break;
      }
    }

    weekSlot.days = weekSlot.days.map((dayItem) => {
      return dayItem.id === dayId ? weekSlotDayItem : dayItem;
    });
    const newWeekSlotsValue = weekSlotsValue.map((weekSlotItem) => {
      return weekSlotItem.id === weekSlotId ? weekSlot : weekSlotItem;
    });

    setWeekSlotsValue(newWeekSlotsValue);
    calculateTotalTimePerDay(newWeekSlotsValue);
  };

  const calculateTotalTimePerDay = (newWeekSlotsValue) => {
    setWeekDaysValue(
      weekDays.map((weekDayItem) => {
        let minutes = 0;

        // For each week slot, get the minutes for this day
        newWeekSlotsValue.forEach((weekSlotItem) => {
          const weekSlotItemDayEntry = weekSlotItem.days.find(
            (item) => item.id === weekDayItem.id
          );

          if (weekSlotItemDayEntry !== undefined) {
            if (weekSlotItemDayEntry.values !== undefined) {
              minutes += weekSlotItemDayEntry.values.person.primary;
              minutes += weekSlotItemDayEntry.values.person.secondary;
              minutes += weekSlotItemDayEntry.values.domestic;
              minutes += weekSlotItemDayEntry.values.liveIn;
              minutes += weekSlotItemDayEntry.values.escort;
            } else {
              // Dropdown
            }
          }
        });

        // Overwrite the minutes
        return { ...weekDayItem, minutes };
      })
    );
  };

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
            selectedValue={2}
          />
        </div>
      </div>
      <div className="week-care-picker mt-4">
        <div className="columns header-columns">
          <div className="column"></div>
          {weekDaysValue.map((weekDayItem) => {
            return (
              <div
                className="column week-care-picker-day"
                key={weekDayItem.name}
              >
                <label>
                  <strong>{weekDayItem.name}</strong>
                </label>
                <label>({weekDayItem.minutes / 60} Hrs)</label>
              </div>
            );
          })}
        </div>
        {weekSlotsValue.map((weekSlotItem) => {
          return (
            <div className="time-slot-cont" key={weekSlotItem.id}>
              <CarePickerTimeSlot
                currentMode={currentMode}
                weekSlotItem={weekSlotItem}
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
