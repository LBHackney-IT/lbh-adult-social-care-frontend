// {
//     id: 1,
//     label: "Morning",
//     careBreakdown: true,
//     timeLabel: "08:00 - 10:00",
//     days: [],
//   },
import { CheckGreenIcon } from "../../../components/Icons";
import {
  PERSONAL_CARE_MODE,
  DOMESTIC_CARE_MODE,
  LIVE_IN_CARE_MODE,
  ESCORT_CARE_MODE,
} from "../HomeCarePickerHelper";
import Dropdown from "../../../components/Dropdown";
import { nightOwlOptions, allNightOptions } from "../HomeCarePickerHelper";

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

const CareTimeDropdown = ({ weekSlotId, dayId, onChange, selectedValue }) => {
  let careDropdownOptions;
  switch (weekSlotId) {
    case 7: {
      careDropdownOptions = nightOwlOptions;
      break;
    }
    default: {
      careDropdownOptions = allNightOptions;
      break;
    }
  }

  const onDropdownChange = (option) => {
    onChange(dayId, option);
  };

  return (
    <div className="care-checkbox">
      <Dropdown
        isUp={true}
        options={careDropdownOptions}
        onOptionSelect={onChange}
        selectedValue={selectedValue}
      >
        {" "}
      </Dropdown>
    </div>
  );
};

const CarePickerTimeSlot = ({
  currentMode,
  weekSlotItem,
  onClick,
  onCareDropdownSelect,
}) => {
  const onCarePickerClick = (dayId) => {
    onClick(weekSlotItem.id, dayId);
  };

  const onCarePickerDropdownSelect = (dayId, selectedValue) => {
    onCareDropdownSelect(weekSlotItem.id, dayId, selectedValue);
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
              <CareTimeDropdown
                weekSlotId={weekSlotItem.id}
                dayId={weekSlotDayItem.id}
                onChange={onCarePickerDropdownSelect}
                selectedValue={weekSlotDayItem.value}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CarePickerTimeSlot;
