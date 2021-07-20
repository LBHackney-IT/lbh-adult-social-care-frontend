import React, { useEffect, useState } from "react";
import {RESIDENTIAL_CARE_ROUTE} from "../../routes/RouteConstants";
import DatePick from "../DatePick";
import RadioButton, { yesNoValues } from "../RadioButton";
import CarePackageSetup from "../CarePackages/CarePackageSetup";
import CareSelectDropdown from "../CarePackages/CareSelectDropdown";
import { getFixedPeriodOptions } from '../../api/Utils/CommonOptions';
import { getResidentialCareTypeOfStayOptions } from "../../api/CarePackages/ResidentialCareApi";
import {useRouter} from "next/router";
import fieldValidator from "../../service/inputValidator";

const ResidentialCareSetup = ({
  careTypes,
  selectedCareType,
  setSelectedCareType,
}) => {
  const fixedPeriodOptions = getFixedPeriodOptions();
  const router = useRouter();
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

  const [isFixedPeriod, setIsFixedPeriod] = useState(true);

  const [errorFields, setErrorFields] = useState({
    isImmediateOrReEnablement: '',
    isS117: '',
    isFixedPeriod: '',
    typeOfStayId: '',
    hasDischargePackage: '',
    hasRespiteCare: '',
    startDate: '',
    endDate: '',
    careTypes: '',
  });

  const changeErrorFields = (field) => () => {
    setErrorFields({
      ...errorFields,
      [field]: '',
    })
  };

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
    const { validFields, hasErrors } = fieldValidator([
      {name: 'isImmediateOrReEnablement', value: isImmediateOrReEnablement, rules: ['empty']},
      {name: 'isS117', value: isS117, rules: ['empty']},
      {name: 'typeOfStayId', value: typeOfStayId, rules: ['empty']},
      {name: 'hasDischargePackage', value: hasDischargePackage, rules: ['empty']},
      {name: 'hasRespiteCare', value: hasRespiteCare, rules: ['empty']},
      {name: 'startDate', value: startDate, rules: ['empty']},
      {name: 'endDate', value: endDate, rules: ['empty']},
      {name: 'careTypes', value: selectedCareType, rules: ['empty']},
    ]);
    if(hasErrors) {
      setErrorFields(validFields);
      return;
    }

    const typeOfStay = residentialCareTypeOfStayOptions.find(
      (opt) => opt.value === typeOfStayId
    );
    const typeOfStayText = typeOfStay ? typeOfStay.text : null;
    // Get the parameters for the residential care package route
    router.push(
      `${RESIDENTIAL_CARE_ROUTE}/${hasRespiteCare}/${hasDischargePackage}/` +
        `${isImmediateOrReEnablement}/${typeOfStayId}/${isS117}/${isFixedPeriod}/${startDate}/${endDate}?typeOfStayText=${typeOfStayText}`
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
      <div className="level" />
      <div className="columns">
        <div className="column is-5">
          <CareSelectDropdown
            initialText={null}
            error={errorFields.careTypes}
            setError={changeErrorFields('careTypes')}
            careTypes={careTypes}
            setSelectedCareType={setSelectedCareType}
            selectedCareType={selectedCareType}
          />
        </div>
        <div className="column">
          <div className="columns is-mobile">
            <div className="column is-3">
              <RadioButton
                error={errorFields.isFixedPeriod}
                setError={() => changeErrorFields('isFixedPeriod')}
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
                error={errorFields.startDate}
                setError={() => changeErrorFields('startDate')}
                label="Start date"
                dateValue={startDate}
                setDate={setStartDate}
              />
            </span>
                { isFixedPeriod && (
                  <span>
              <DatePick
                error={errorFields.endDate}
                setError={() => changeErrorFields('endDate')}
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
          error={errorFields.hasRespiteCare}
          setError={changeErrorFields('hasRespiteCare')}
          label="Respite care?"
          options={yesNoValues}
          onChange={setHasRespiteCare}
          selectedValue={hasRespiteCare}
        />
      </div>
      <div className="mt-2">
        <RadioButton
          error={errorFields.hasDischargePackage}
          setError={changeErrorFields('hasDischargePackage')}
          label="Discharge package?"
          options={yesNoValues}
          onChange={setHasDischargePackage}
          selectedValue={hasDischargePackage}
        />
      </div>
      <div className="mt-2">
        <RadioButton
          error={errorFields.isImmediateOrReEnablement}
          setError={changeErrorFields('isImmediateOrReEnablement')}
          label="Immediate / re-enablement package?"
          options={yesNoValues}
          onChange={setIsImmediateOrReEnablement}
          selectedValue={isImmediateOrReEnablement}
        />
      </div>
      <div className="mt-2">
        <RadioButton
          error={errorFields.typeOfStayId}
          setError={changeErrorFields('typeOfStayId')}
          label="What type of stay is this?"
          options={residentialCareTypeOfStayOptions}
          onChange={setTypeOfStayId}
          selectedValue={typeOfStayId}
        />
      </div>
      <div className="mt-2">
        <RadioButton
          error={errorFields.isS117}
          setError={changeErrorFields('isS117')}
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
