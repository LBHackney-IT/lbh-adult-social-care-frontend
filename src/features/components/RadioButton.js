import { useState } from "react";

const RadioButton = ({
  name,
  trueText = "Yes",
  trueValue = "1",
  falseText = "No",
  falseValue = "0",
  trueIsChecked = true,
  onChange = () => {},
}) => {
  const [trueIsCheckedValue, setTrueIsChecked] = useState(trueIsChecked);

  const radioChange = (event) => {
    event.stopPropagation();
    onChange(!trueIsCheckedValue);
    setTrueIsChecked(!trueIsCheckedValue);
  };

  return (
    <div className="control">
      <label className="radio">
        <input
          type="radio"
          value={trueValue}
          name={name}
          onChange={radioChange}
          checked={trueIsCheckedValue}
        />
        {trueText}
      </label>
      <label className="radio">
        <input
          type="radio"
          value={falseValue}
          name={name}
          onChange={radioChange}
          checked={!trueIsCheckedValue}
        />
        {falseText}
      </label>
    </div>
  );
};

export default RadioButton;
