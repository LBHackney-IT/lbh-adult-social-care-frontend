import OutsideTrigger from "./OutsideTrigger";
import { useState } from "react";

const Dropdown = ({ options, selectedValue, onOptionSelect }) => {
  const initialSelectedOption =
    selectedValue !== undefined
      ? options.find((item) => item.value === selectedValue).first()
      : options[0];

  const [isActive, setIsActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initialSelectedOption);

  const onTriggerClick = (event) => {
    event.stopPropagation();
    setIsActive(!isActive);
  };

  const onOptionClick = (event, option) => {
    event.stopPropagation();
    setSelectedOption(option);
    onOptionSelect(option.value);
  };

  return (
    <OutsideTrigger onClick={() => setIsActive(false)}>
      <div
        data-selected-value={selectedOption.value}
        className={"dropdown" + isActive ? " is-active" : ""}
      >
        <div
          className="dropdown-trigger"
          onClick={(event) => onTriggerClick(event)}
        >
          <button
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
          >
            <span>{selectedOption.text}</span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {options.map((optionItem) => {
              return (
                <div
                  key={optionItem.value}
                  className="dropdown-item"
                  onClick={(event) => onOptionClick(event, optionItem)}
                >
                  {optionItem.text}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </OutsideTrigger>
  );
};

export default Dropdown;
