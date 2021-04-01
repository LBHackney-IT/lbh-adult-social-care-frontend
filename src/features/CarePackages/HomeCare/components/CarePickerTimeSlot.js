// {
//     id: 1,
//     label: "Morning",
//     careBreakdown: true,
//     timeLabel: "08:00 - 10:00",
//     days: [],
//   },
import { useState } from "react";
import { CheckGreenIcon } from "../../../components/Icons";
import {
  PERSONAL_CARE_MODE,
  DOMESTIC_CARE_MODE,
  LIVE_IN_CARE_MODE,
  ESCORT_CARE_MODE,
} from "../HomeCarePickerHelper";

const isPickerActive = (currentMode, { person, domestic, liveIn, escort }) => {
  switch (currentMode) {
    case PERSONAL_CARE_MODE: {
      return person.primary > 0;
    }
    case DOMESTIC_CARE_MODE: {
      return domestic > 0;
    }
    case LIVE_IN_CARE_MODE: {
      return liveIn > 0;
    }
    case ESCORT_CARE_MODE: {
      return escort > 0;
    }
    default: {
      return false;
    }
  }
};

const CarePicker = ({ currentMode, dayId, onClick, selectedValues }) => {
  const { person, domestic, liveIn, escort } = selectedValues;
  const isActive = isPickerActive(currentMode, selectedValues);

  const onPickerClick = () => {
    onClick(dayId);
  };

  const hasPersonalSecondary = person.primary > 0 && person.secondary > 0;

  return (
    <div
      className={"care-picker" + (isActive ? " is-active" : "")}
      onClick={onPickerClick}
    >
      <div className="pickers-cont">
        <div
          className={
            "picker-item " +
            (hasPersonalSecondary ? "is-split" : "personal-home-care")
          }
        >
          {person.primary > 0 ? (
            <span className="personal-home-care">{person.primary}</span>
          ) : null}
          {hasPersonalSecondary ? (
            <span className="personal-home-care is-final">
              {person.secondary}
            </span>
          ) : null}
        </div>
        <div className="domestic-home-care picker-item">
          {domestic > 0 ? domestic : ""}
        </div>
      </div>
      <div className="pickers-cont pickers-cont-2">
        <div className="live-in-home-care picker-item">
          {liveIn > 0 ? liveIn : ""}
        </div>
        <div className="escort-home-care picker-item">
          {escort > 0 ? escort : ""}
        </div>
      </div>
    </div>
  );
};

const CareCheckbox = ({ dayId, onChange, selectedValues }) => {
  const { selected } = selectedValues;

  return (
    <div className="care-checkbox">{selected ? <CheckGreenIcon /> : null}</div>
  );
};

const CarePickerTimeSlot = ({ currentMode, weekSlotItem, onClick }) => {
  const onCarePickerClick = (dayId) => {
    onClick(weekSlotItem.id, dayId);
  };

  return (
    <div className="columns">
      <div className="column week-slot-labels">
        <label>{weekSlotItem.label}</label>
        <label>{weekSlotItem.timeLabel}</label>
      </div>
      {weekSlotItem.days.map((weekSlotDayItem) => {
        return (
          <div className="column" key={weekSlotItem.id + weekSlotDayItem.id}>
            {weekSlotItem.careBreakdown ? (
              <CarePicker
                currentMode={currentMode}
                dayId={weekSlotDayItem.id}
                onClick={onCarePickerClick}
                selectedValues={weekSlotDayItem.values}
              />
            ) : (
              <CareCheckbox
                dayId={weekSlotDayItem.id}
                onChange={onCarePickerClick}
                selectedValues={weekSlotDayItem.values}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CarePickerTimeSlot;
