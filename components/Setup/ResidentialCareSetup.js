import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectResidentialTypeOfStayOptions } from '../../reducers/carePackageSlice';
import { RESIDENTIAL_CARE_ROUTE } from '../../routes/RouteConstants';
import RadioButton, { yesNoValues } from '../RadioButton';
import CarePackageSetup from '../CarePackages/CarePackageSetup';
import CareSelectDropdown from '../CarePackages/CareSelectDropdown';
import fieldValidator from '../../service/inputValidator';
import DateSetup from './DateSetup';

const ResidentialCareSetup = ({ careTypes, selectedCareType, setSelectedCareType }) => {
  const router = useRouter();

  const typeOfStayOptions = useSelector(selectResidentialTypeOfStayOptions);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [hasRespiteCare, setHasRespiteCare] = useState(undefined);
  const [hasDischargePackage, setHasDischargePackage] = useState(undefined);
  const [isImmediateOrReEnablement, setIsImmediateOrReEnablement] = useState(undefined);
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
    });
  };

  // Handle build click
  const onBuildClick = () => {
    const { validFields, hasErrors } = fieldValidator([
      { name: 'isImmediateOrReEnablement', value: isImmediateOrReEnablement, rules: ['empty'] },
      { name: 'isS117', value: isS117, rules: ['empty'] },
      { name: 'typeOfStayId', value: typeOfStayId, rules: ['empty'] },
      { name: 'hasDischargePackage', value: hasDischargePackage, rules: ['empty'] },
      { name: 'hasRespiteCare', value: hasRespiteCare, rules: ['empty'] },
      { name: 'startDate', value: startDate, rules: ['empty'] },
      { name: 'endDate', value: endDate, rules: ['empty'] },
      { name: 'careTypes', value: selectedCareType, rules: ['empty'] },
    ]);
    if (hasErrors) {
      setErrorFields(validFields);
      return;
    }

    const typeOfStay = typeOfStayOptions.find((opt) => opt.value === typeOfStayId);
    const typeOfStayText = typeOfStay ? typeOfStay.text : null;
    // Get the parameters for the residential care package route
    router.push(
      `${RESIDENTIAL_CARE_ROUTE}/${hasRespiteCare}/${hasDischargePackage}/` +
        `${isImmediateOrReEnablement}/${typeOfStayId}/${isS117}/${isFixedPeriod}/${startDate}/${endDate}?typeOfStayText=${typeOfStayText}`
    );
  };

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
          options={typeOfStayOptions}
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
