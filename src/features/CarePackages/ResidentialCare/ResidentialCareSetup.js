import React, { useEffect, useState } from "react";
import { RESIDENTIAL_CARE } from "../../../routes/RouteConstants";
import DatePick from "../../components/DatePick";
import RadioButton, { yesNoValues } from "../../components/RadioButton";
import CarePackageSetup from "../components/CarePackageSetup";
import CareSelectDropdown from "../components/CareSelectDropdown";
import { getResidentialCareTypeOfStayOptions } from "../../../api/CarePackages/ResidentialCareApi";

const ResidentialCareSetup = ({
  history,
  careTypes,
  selectedCareType,
  setSelectedCareType,
}) => {
  const [
    residentialCareTypeOfStayOptions,
    setResidentialCareTypeOfStayOptions,
  ] = useState([]);

  const [errors, setErrors] = useState([]);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [hasRespiteCare, setHasRespiteCare] = useState(undefined);
  const [hasDischargePackage, setHasDischargePackage] = useState(undefined);
  const [isImmediateOrReEnablement, setIsImmediateOrReEnablement] = useState(
    undefined
  );
  const [typeOfStayId, setTypeOfStayId] = useState(undefined);
  const [isS117, setIsS117] = useState(undefined);

  const retrieveResidentialCareTypeOfStayOptions = () => {
    getResidentialCareTypeOfStayOptions()
      .then((res) => {
        let options = res.map((option) => ({
          text: `${option.optionName} (${option.optionPeriod})`,
          value: option.typeOfStayOptionId,
        }));
        setResidentialCareTypeOfStayOptions(options);
      })
      .catch((error) => {
        setErrors([
          ...errors,
          `Retrieve residential care type of stay options failed. ${error.message}`,
        ]);
      });
  };

  useEffect(() => {
    if (residentialCareTypeOfStayOptions.length === 0) {
      retrieveResidentialCareTypeOfStayOptions();
    }
  }, []);

  // Handle build click
  const onBuildClick = () => {
    const typeOfStay = residentialCareTypeOfStayOptions.find(
      (opt) => opt.value === typeOfStayId
    );
    const typeOfStayText = typeOfStay ? typeOfStay.text : null;
    // Get the parameters for the residential care package route
    history.push(
      `${RESIDENTIAL_CARE}/${hasRespiteCare}/${hasDischargePackage}/` +
        `${isImmediateOrReEnablement}/${typeOfStayId}/${isS117}/${startDate}/${endDate}?typeOfStayText=${typeOfStayText}`
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
          <div className="is-flex">
            <span className="mr-3">
              <DatePick
                label="Start date"
                dateValue={startDate}
                setDate={setStartDate}
              />
            </span>
            <span>
              <DatePick
                label="End date"
                dateValue={endDate}
                setDate={setEndDate}
              />
            </span>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <RadioButton
          label="Respite care?"
          options={yesNoValues}
          onChange={setHasRespiteCare}
          selectedValue={hasRespiteCare}
        />
      </div>
      <div className="mt-2">
        <RadioButton
          label="Discharge package?"
          options={yesNoValues}
          onChange={setHasDischargePackage}
          selectedValue={hasDischargePackage}
        />
      </div>
      <div className="mt-2">
        <RadioButton
          label="Immediate / re-enablement package?"
          options={yesNoValues}
          onChange={setIsImmediateOrReEnablement}
          selectedValue={isImmediateOrReEnablement}
        />
      </div>
      <div className="mt-2">
        <RadioButton
          label="What type of stay is this?"
          options={residentialCareTypeOfStayOptions}
          onChange={setTypeOfStayId}
          selectedValue={typeOfStayId}
        />
      </div>
      <div className="mt-2">
        <RadioButton
          label="S117 client?"
          options={yesNoValues}
          onChange={setIsS117}
          selectedValue={isS117}
        />
      </div>
    </CarePackageSetup>
  );
};

export default ResidentialCareSetup;
