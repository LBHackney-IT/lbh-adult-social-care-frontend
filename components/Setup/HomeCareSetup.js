import React, { useState } from "react";
import { HOME_CARE_ROUTE } from "../../routes/RouteConstants";
import DatePick from "../DatePick";
import RadioButton, { yesNoValues } from "../RadioButton";
import CarePackageSetup from "../CarePackages/CarePackageSetup";
import CareSelectDropdown from "../CarePackages/CareSelectDropdown";
import {useRouter} from "next/router";
import fieldValidator from "../../service/inputValidator";

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

  const [errorFields, setErrorFields] = useState({
    isImmediate: '',
    isS117: '',
    isFixedPeriod: '',
    startDate: '',
    endDate: '',
  });

  const changeErrorFields = (field) => {
    setErrorFields({
      ...errorFields,
      [field]: '',
    })
  };

  // Handle build click
  const onBuildClick = () => {
    // Get the parameters for the home care package route
    const { validFields, hasErrors } = fieldValidator([
      {name: 'isImmediate', value: isImmediate, rules: ['empty']},
      {name: 'isS117', value: isS117, rules: ['empty']},
      {name: 'isFixedPeriod', value: isFixedPeriod, rules: ['empty']},
      {name: 'startDate', value: startDate, rules: ['empty']},
      {name: 'endDate', value: endDate, rules: ['empty']},
      {name: 'careType', value: selectedCareType, rules: ['empty']},
    ]);
    if(hasErrors) {
      setErrorFields(validFields);
      return;
    }
    router.push(
      `${HOME_CARE_ROUTE}/${isImmediate}/${isS117}/${isFixedPeriod}/${startDate}/${endDate}`
    );
  };

  return (
    <CarePackageSetup onBuildClick={onBuildClick}>
      <div className="level" />
      <div className="columns">
        <div className="column is-5">
          <CareSelectDropdown
            error={errorFields.careType}
            initialText={null}
            setError={() => changeErrorFields('careType')}
            careTypes={careTypes}
            setSelectedCareType={setSelectedCareType}
            selectedCareType={selectedCareType}
          />
        </div>
        <div className="column">
          <div style={{ marginBottom: "5px" }}>
            <RadioButton
              options={fixedPeriodOptions}
              error={errorFields.isFixedPeriod}
              setError={() => changeErrorFields('isFixedPeriod')}
              onChange={setIsFixedPeriod}
              selectedValue={isFixedPeriod}
            />
          </div>
          <div className="is-flex">
            <span className="mr-3">
              <DatePick
                error={errorFields.startDate}
                setError={() => changeErrorFields('startDate')}
                dateValue={startDate}
                setDate={setStartDate}
              />
            </span>
            <span>
              <DatePick
                dateValue={endDate}
                setDate={setEndDate}
                error={errorFields.endDate}
                setError={() => changeErrorFields('endDate')}
              />
            </span>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <RadioButton
          label="Is this an immediate service or a re-enablement package?"
          options={yesNoValues}
          error={errorFields.isImmediate}
          setError={() => changeErrorFields('isImmediate')}
          onChange={setIsImmediate}
          selectedValue={isImmediate}
        />
      </div>
      <div className="mt-2">
        <RadioButton
          label="Is this user under S117 of the Mental Health Act?"
          options={yesNoValues}
          onChange={setIsS117}
          error={errorFields.isS117}
          setError={() => changeErrorFields('isS117')}
          selectedValue={isS117}
        />
      </div>
    </CarePackageSetup>
  );
};

export default HomeCareSetup;
