import React, { useEffect, useState } from "react";
import {NURSING_CARE_ROUTE} from "../../routes/RouteConstants";
import RadioButton, { yesNoValues } from "../RadioButton";
import CarePackageSetup from "../CarePackages/CarePackageSetup";
import CareSelectDropdown from "../CarePackages/CareSelectDropdown";
import { getFixedPeriodOptions } from '../../api/Utils/CommonOptions';
import { getNursingCareTypeOfStayOptions } from '../../api/CarePackages/NursingCareApi';
import {useRouter} from "next/router";
import fieldValidator from "../../service/inputValidator";
import DateSetup from './DateSetup'

const NursingCareSetup = ({
  careTypes,
  selectedCareType,
  setSelectedCareType,
}) => {
  const router = useRouter();

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

  const [errorFields, setErrorFields] = useState({
    isImmediate: '',
    isS117: '',
    isFixedPeriod: '',
    startDate: '',
    careTypes: '',
    isRespiteCare: '',
    isImmediateOrReEnablement: '',
    isDischargePackage: '',
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
      {name: 'isImmediateOrReEnablement', value: isImmediateOrReEnablement, rules: ['empty']},
      {name: 'isS117', value: isS117, rules: ['empty']},
      {name: 'isFixedPeriod', value: isFixedPeriod, rules: ['empty']},
      {name: 'isDischargePackage', value: isDischargePackage, rules: ['empty']},
      {name: 'isRespiteCare', value: isRespiteCare, rules: ['empty']},
      {name: 'startDate', value: startDate, rules: ['empty']},
      {name: 'endDate', value: endDate, rules: ['empty']},
      {name: 'careTypes', value: selectedCareType, rules: ['empty']},
    ]);
    if(hasErrors) {
      setErrorFields(validFields);
      return;
    }
    router.push(
      `${NURSING_CARE_ROUTE}/${isFixedPeriod}/${startDate}/${typeOfStayId}/` +
      `${isRespiteCare}/${isDischargePackage}/${isImmediateOrReEnablement}/${isS117}/${endDate}`
    );
  };

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
            initialText={null}
            error={errorFields.careTypes}
            setError={() => changeErrorFields('careTypes')}
            careTypes={careTypes}
            setSelectedCareType={setSelectedCareType}
            selectedCareType={selectedCareType}
          />
        </div>
        <DateSetup
          endDate={endDate}
          changeErrorFields={changeErrorFields}
          errorFields={errorFields}
          isFixedPeriod={isFixedPeriod}
          setEndDate={setEndDate}
          setIsFixedPeriod={setIsFixedPeriod}
          setStartDate={setStartDate}
          startDate={startDate}
        />
      </div>
      <div className="mt-2">
        <RadioButton
          error={errorFields.isRespiteCare}
          setError={() => changeErrorFields('isRespiteCare')}
          label="Respite care?"
          options={yesNoValues}
          onChange={setIsRespiteCare}
          selectedValue={isRespiteCare}
        />
      </div>
      <div className="mt-2">
        <RadioButton
          error={errorFields.isDischargePackage}
          setError={() => changeErrorFields('isDischargePackage')}
          label="Discharge package?"
          options={yesNoValues}
          onChange={setIsDischargePackage}
          selectedValue={isDischargePackage}
        />
      </div>
      <div className="mt-2">
        <RadioButton
          error={errorFields.isImmediateOrReEnablement}
          setError={() => changeErrorFields('isImmediateOrReEnablement')}
          label="Immediate / re-enablement package?"
          options={yesNoValues}
          onChange={setIsImmediateOrReEnablement}
          selectedValue={isImmediateOrReEnablement}
        />
      </div>
      <div className="mt-2">
        <RadioButton
          error={errorFields.typeOfStayId}
          setError={() => changeErrorFields('typeOfStayId')}
          label="What type of stay is this?"
          options={nursingCareTypeOfStayOptions}
          onChange={setTypeOfStayId}
          selectedValue={typeOfStayId}
        />
      </div>
      <div className="mt-2">
        <RadioButton
          error={errorFields.isS117}
          setError={() => changeErrorFields('isS117')}
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
