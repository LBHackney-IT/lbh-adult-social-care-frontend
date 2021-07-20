import React from 'react';
import Dropdown from '../Dropdown';
import {
  DOMESTIC_CARE_MODE,
  ESCORT_CARE_MODE,
  LIVE_IN_CARE_MODE,
  PERSONAL_CARE_MODE,
} from '../../service/homeCarePickerHelper';

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
    <div className={`care-picker${isActive ? ' is-active' : ''}`} onClick={onPickerClick} role="presentation">
      <div className="pickers-cont">
        <div className={`picker-item ${hasPersonalSecondary ? 'is-split' : 'personal-home-care'}`}>
          {person.primary > 0 ? <span className="personal-home-care">{person.primary}</span> : null}
          {hasPersonalSecondary ? <span className="personal-home-care is-final">{person.secondary}</span> : null}
        </div>
        <div className="domestic-home-care picker-item">{domestic > 0 ? domestic : ''}</div>
      </div>
      <div className="pickers-cont pickers-cont-2">
        <div className="live-in-home-care picker-item">{liveIn > 0 ? liveIn : ''}</div>
        <div className="escort-home-care picker-item">{escort > 0 ? escort : ''}</div>
      </div>
    </div>
  );
};

const CareTimeDropdown = ({ minuteOptions, dayId, onChange, selectedValue }) => {
  const onDropdownChange = (option) => {
    onChange(dayId, option);
  };

  return (
    <div className="care-checkbox">
      <Dropdown
        isUp
        options={minuteOptions.map((minuteOptionItem) => ({
          text: minuteOptionItem.label,
          value: minuteOptionItem.minutes,
        }))}
        onOptionSelect={onDropdownChange}
        selectedValue={selectedValue}
      >
        {' '}
      </Dropdown>
    </div>
  );
};

const CarePickerTimeSlot = ({ homeCareServices, currentMode, weekSlotItem, onClick, onCareDropdownSelect }) => {
  const onCarePickerClick = (dayId) => {
    onClick(weekSlotItem.id, dayId);
  };

  const onCarePickerDropdownSelect = (dayId, selectedValue) => {
    onCareDropdownSelect(weekSlotItem.id, dayId, selectedValue);
  };

  return (
    <div className="columns">
      <div className="column week-slot-labels">
        <span>{weekSlotItem.timeSlotShiftName}</span>
        <span>{weekSlotItem.timeSlotTimeLabel}</span>
      </div>
      {weekSlotItem.days.map((weekSlotDayItem) => (
        <div className="column" key={weekSlotItem.id + weekSlotDayItem.id}>
          {!weekSlotItem.linkedToHomeCareServiceTypeId ? (
            <CarePicker
              currentMode={currentMode}
              dayId={weekSlotDayItem.id}
              onClick={onCarePickerClick}
              selectedValues={weekSlotDayItem.values}
            />
          ) : (
            <CareTimeDropdown
              minuteOptions={
                homeCareServices.find((item) => item.id === weekSlotItem.linkedToHomeCareServiceTypeId).minutes
              }
              weekSlotId={weekSlotItem.id}
              dayId={weekSlotDayItem.id}
              onChange={onCarePickerDropdownSelect}
              selectedValue={weekSlotDayItem.value}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CarePickerTimeSlot;
