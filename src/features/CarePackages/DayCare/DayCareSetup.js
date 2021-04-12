import { useState } from "react";
import { DAY_CARE } from "../../../routes/RouteConstants";
import DatePick from "../../components/DatePick";
import RadioButton, { yesNoValues } from "../../components/RadioButton";
import CarePackageSetup from "../components/CarePackageSetup";
import CareSelectDropdown from "../components/CareSelectDropdown";

// TODO remove
const fixedPeriodOptions = [
  { text: "Fixed period", value: 1 },
  { text: "Ongoing", value: 2 },
];

const DayCareSetup = ({
  history,
  careTypes,
  selectedCareType,
  setSelectedCareType,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [isImmediate, setIsImmediate] = useState(undefined);
  const [isS117, setIsS117] = useState(undefined);
  const [isFixedPeriod, setIsFixedPeriod] = useState(undefined);

  // Handle build click
  const onBuildClick = () => {
    // Get the parameters for the home care package route
    history.push(
      `${DAY_CARE}/${isImmediate}/${isS117}/${isFixedPeriod}/${startDate}`
    );
  };
  return (
    <CarePackageSetup onBuildClick={onBuildClick}>
      <div className="level"></div>
      <div className="columns">
        <div className="column is-5">
          <CareSelectDropdown
            careTypes={careTypes}
            setSelectedCareType={setSelectedCareType}
            selectedCareType={selectedCareType}
          />
        </div>
        <div className="column">
          <div style={{ marginBottom: "5px" }}>
            <RadioButton
              options={fixedPeriodOptions}
              onChange={setIsFixedPeriod}
              selectedValue={isFixedPeriod}
            />
          </div>
          <div>
            <span className="mr-3">
              <DatePick dateValue={startDate} setDate={setStartDate} />
            </span>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <RadioButton
          label="Is this an immediate service or a re-enablement package?"
          options={yesNoValues}
          onChange={setIsImmediate}
          selectedValue={isImmediate}
        />
      </div>
      <div className="mt-2">
        <RadioButton
          label="Is this user under S117 of the Mental Health Act?"
          options={yesNoValues}
          onChange={setIsS117}
          selectedValue={isS117}
        />
      </div>
    </CarePackageSetup>
  );
};

export default DayCareSetup;
