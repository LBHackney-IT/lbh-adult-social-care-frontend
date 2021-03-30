// {
//     id: 1,
//     label: "Morning",
//     careBreakdown: true,
//     timeLabel: "08:00 - 10:00",
//     days: [],
//   },
import { useState } from "react";
import { CheckGreenIcon } from "../../../components/Icons";

const getCarePickerStateValues = () => {
  return {
    selected: false,
    person: false,
    domestic: false,
    liveIn: false,
    escort: false,
  };
};

const CarePicker = ({ dayId, onChange }) => {
  const [pickerState, setPickerState] = useState({
    dayId: dayId,
    selectedValues: getCarePickerStateValues(),
  });

  const { selectedValues } = pickerState;
  const { person, domestic, liveIn, escort } = selectedValues;

  const onPickerClick = (selectedValues) => {
    setPickerState({
      dayId: pickerState.dayId,
      selectedValues,
    });

    onChange(pickerState);
  };

  return (
    <div className="care-picker">
      <div className="pickers-cont">
        <div
          className="personal-home-care picker-item"
          onClick={() => onPickerClick({ ...selectedValues, person: !person })}
        >
          {person ? "2" : ""}
        </div>
        <div
          className="domestic-home-care picker-item"
          onClick={() =>
            onPickerClick({ ...selectedValues, domestic: !domestic })
          }
        >
          {domestic ? "2" : ""}
        </div>
      </div>
      <div className="pickers-cont pickers-cont-2">
        <div
          className="live-in-home-care picker-item"
          onClick={() => onPickerClick({ ...selectedValues, liveIn: !liveIn })}
        >
          {liveIn ? "2" : ""}
        </div>
        <div
          className="escort-home-care picker-item"
          onClick={() => onPickerClick({ ...selectedValues, escort: !escort })}
        >
          {escort ? "2" : ""}
        </div>
      </div>
    </div>
  );
};

const CareCheckbox = ({ dayId, onChange }) => {
  const [checkBoxState, setCheckBoxState] = useState({
    dayId: dayId,
    selectedValues: getCarePickerStateValues(),
  });

  const { selectedValues } = checkBoxState;
  const { selected } = selectedValues;

  const onCheckboxClick = () => {
    setCheckBoxState({
      dayId: checkBoxState.dayId,
      selectedValues: { ...selectedValues, selected: !selected },
    });

    onChange(checkBoxState);
  };

  return (
    <div className="care-checkbox" onClick={onCheckboxClick}>
      {selected ? <CheckGreenIcon /> : null}
    </div>
  );
};

const CarePickerTimeSlot = ({ weekSlotItem, onChange }) => {
  const days = [];
  for (let i = 1; i <= 7; i++) {
    days.push(i);
  }

  const onCarePickerChange = (changePack) => {
    const { dayId, selectedValues } = changePack;
    onChange(weekSlotItem.id, dayId, selectedValues);
  };

  return (
    <div className="columns">
      <div className="column week-slot-labels">
        <label>{weekSlotItem.label}</label>
        <label>{weekSlotItem.timeLabel}</label>
      </div>
      {days.map((dayIdentifier) => {
        return (
          <div className="column" key={dayIdentifier}>
            {weekSlotItem.careBreakdown ? (
              <CarePicker dayId={dayIdentifier} onChange={onCarePickerChange} />
            ) : (
              <CareCheckbox
                dayId={dayIdentifier}
                onChange={onCarePickerChange}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CarePickerTimeSlot;
