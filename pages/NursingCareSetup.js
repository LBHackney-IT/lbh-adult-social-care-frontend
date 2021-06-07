import { useEffect, useState } from "react";
import { NURSING_CARE } from "../routes/RouteConstants";
import DatePick from "../components/DatePick";
import RadioButton, { yesNoValues } from "../components/RadioButton";
import CarePackageSetup from "../components/CarePackages/CarePackageSetup";
import CareSelectDropdown from "../components/CarePackages/CareSelectDropdown";
import { getFixedPeriodOptions } from '../api/Utils/CommonOptions';
import { getNursingCareTypeOfStayOptions } from '../api/CarePackages/NursingCareApi';

const NursingCareSetup = ({
  history,
  careTypes,
  selectedCareType,
  setSelectedCareType,
}) => {
  const fixedPeriodOptions = getFixedPeriodOptions();

  const [nursingCareTypeOfStayOptions, setNursingCareTypeOfStayOptions] = useState([]);
  const [errors, setErrors] = useState([]);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isRespiteCare, setIsRespiteCare] = useState(undefined);
  const [isDischargePackage, setIsDischargePackage] = useState(undefined);
  const [isImmediateOrReEnablement, setIsImmediateOrReEnablement] = useState(
    undefined
  );
  const [typeOfStayId, setTypeOfStayId] = useState(undefined);
  const [isS117, setIsS117] = useState(undefined);

  const [isFixedPeriod, setIsFixedPeriod] = useState(true);

  useEffect(() => {
    if (nursingCareTypeOfStayOptions.length === 0){
      retrieveNursingCareTypeOfStayOptions();
    }
  }, [])


  const retrieveNursingCareTypeOfStayOptions = () => {
    getNursingCareTypeOfStayOptions().then(res => {
      let options = res.map(option => ({
        text: `${option.optionName} (${option.optionPeriod})`,
        value: option.typeOfStayOptionId
      }))
      setNursingCareTypeOfStayOptions(options);
    })
      .catch(error => {
        setErrors([...errors, `Retrieve nursing care type of stay options failed. ${error.message}`]);
      });
  };

  // Handle build click
  const onBuildClick = () => {
    // Get the parameters for the residential care package route
    history.push(
      `${NURSING_CARE}/${isFixedPeriod}/${startDate}/${typeOfStayId}/` +
      `${isRespiteCare}/${isDischargePackage}/${isImmediateOrReEnablement}/${isS117}/${endDate}`
    );
  };

  const handleFixedPeriodChange = (newVal) => {
    // Update end date based on this change
    if (!newVal){
      setEndDate(null);
    } else {
      setEndDate(new Date());
    }
    setIsFixedPeriod(newVal);
  }

  return (
    <CarePackageSetup onBuildClick={onBuildClick}>
      <div className="level"/>
      <div className="columns">
        <div className="column is-5">
          <CareSelectDropdown
            careTypes={careTypes}
            setSelectedCareType={setSelectedCareType}
            selectedCareType={selectedCareType}
          />
        </div>
        <div className="column">
          <div className="columns is-mobile">
            <div className="column is-3">
              <RadioButton
                options={fixedPeriodOptions}
                inline={false}
                onChange={handleFixedPeriodChange}
                selectedValue={isFixedPeriod}
              />
            </div>
            <div className="column is-6">
              <div className="is-flex">
            <span className="mr-3">
              <DatePick
                label="Start date"
                dateValue={startDate}
                setDate={setStartDate}
              />
            </span>
                { isFixedPeriod && (
                  <span>
              <DatePick
                label="End date"
                dateValue={endDate}
                setDate={setEndDate}
              />
            </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <RadioButton
          label="Respite care?"
          options={yesNoValues}
          onChange={setIsRespiteCare}
          selectedValue={isRespiteCare}
        />
      </div>
      <div className="mt-2">
        <RadioButton
          label="Discharge package?"
          options={yesNoValues}
          onChange={setIsDischargePackage}
          selectedValue={isDischargePackage}
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
          options={nursingCareTypeOfStayOptions}
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

export default NursingCareSetup;
