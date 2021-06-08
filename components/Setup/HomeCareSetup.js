import React, { useState } from "react";
import { HOME_CARE } from "../../routes/RouteConstants";
import DatePick from "../DatePick";
import RadioButton, { yesNoValues } from "../RadioButton";
import CarePackageSetup from "../CarePackages/CarePackageSetup";
import CareSelectDropdown from "../CarePackages/CareSelectDropdown";
import {useRouter} from "next/router";

// TODO remove
const fixedPeriodOptions = [
  { text: "Fixed period", value: true },
  { text: "Ongoing", value: false },
];

const HomeCareSetup = ({
  careTypes,
  selectedCareType,
  setSelectedCareType,
}) => {
  const router = useRouter();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isImmediate, setIsImmediate] = useState(undefined);
  const [isS117, setIsS117] = useState(undefined);
  const [isFixedPeriod, setIsFixedPeriod] = useState(undefined);

  // Handle build click
  const onBuildClick = () => {
    // Get the parameters for the home care package route
    router.push(
      `${HOME_CARE}/${isImmediate}/${isS117}/${isFixedPeriod}/${startDate}/${endDate}`
    );
  };

  return (
    <CarePackageSetup onBuildClick={onBuildClick}>
      <div className="level" />
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
          <div className="is-flex">
            <span className="mr-3">
              <DatePick dateValue={startDate} setDate={setStartDate} />
            </span>
            <span>
              <DatePick dateValue={endDate} setDate={setEndDate} />
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

export default HomeCareSetup;
