import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { DAY_CARE_ROUTE } from 'routes/RouteConstants';
import RadioButton, { yesNoValues } from '../RadioButton';
import CarePackageSetup from '../CarePackages/CarePackageSetup';
import CareSelectDropdown from '../CarePackages/CareSelectDropdown';
import formValidator from 'service/formValidator';
import DateSetup from './DateSetup';

const DayCareSetup = ({ careTypes, selectedCareType, setSelectedCareType }) => {
  const router = useRouter();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isImmediate, setIsImmediate] = useState(undefined);
  const [isS117, setIsS117] = useState(undefined);
  const [isFixedPeriod, setIsFixedPeriod] = useState(false);

  // Handle build click
  const onBuildClick = () => {
    // Get the parameters for the home care package route
    const { validFields, hasErrors } = formValidator({
      form: { isImmediate, isS117, isFixedPeriod, startDate, endDate, selectedCareType }
    });
    if (hasErrors) {
      setErrorFields(validFields);
      return;
    }
    router.push(`${DAY_CARE_ROUTE}/${isImmediate}/${isS117}/${isFixedPeriod}/${startDate}/${endDate}`);
  };

  const [errorFields, setErrorFields] = useState({
    isImmediate: '',
    isS117: '',
    isFixedPeriod: '',
    startDate: '',
    endDate: '',
    careTypes: '',
  });

  const changeErrorFields = (field) => {
    setErrorFields({
      ...errorFields,
      [field]: '',
    });
  };

  const handleFixedPeriodChange = (newVal) => {
    // Update end date based on this change
    if (!newVal) {
      setEndDate(null);
    } else {
      setEndDate(new Date());
    }
    setIsFixedPeriod(newVal);
  };

  return (
    <CarePackageSetup onBuildClick={onBuildClick}>
      <div className="level" />
      <div className="columns">
        <div className="column">
          <CareSelectDropdown
            initialText={null}
            careTypes={careTypes}
            error={errorFields.careTypes}
            setError={() => changeErrorFields('careTypes')}
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
          error={errorFields.isS117}
          setError={() => changeErrorFields('isS117')}
          onChange={setIsS117}
          selectedValue={isS117}
        />
      </div>
    </CarePackageSetup>
  );
};

export default DayCareSetup;
