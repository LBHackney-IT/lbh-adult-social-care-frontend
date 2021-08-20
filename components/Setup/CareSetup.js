import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import RadioButton, { yesNoValues } from '../RadioButton';
import CarePackageSetup from '../CarePackages/CarePackageSetup';
import CareSelectDropdown from '../CarePackages/CareSelectDropdown';
import fieldValidator from '../../service/inputValidator';
import DateSetup from './DateSetup';
import { includeString } from '../../service/helpers'

const CareSetup = ({
  errors,
  setErrors,
  values,
  setValues,
  careTypes,
  selectedCareType,
  setSelectedCareType,
  history,
}) => {
  const router = useRouter();

  useEffect(() => {
    console.log('CareSetup history', history);
  }, [history]);

  const changeErrorFields = (field) => {
    setErrors({
      ...errors,
      [field]: '',
    });
  };


  // Handle build click
  const onBuildClick = () => {
    const requiredFields = careTypes[selectedCareType].fields.map(field => {
      let rules = ['empty'];

      if(includeString(field.toLowerCase(), 'date')) {
        rules.push('null');

        if(field === 'endDate' && !values.isFixedPeriod) {
          rules = [];
        }
      }

      return { name: field, value: values[field], rules }
    });

    const { validFields, hasErrors } = fieldValidator(requiredFields);
    if (hasErrors) {
      setErrors((prevValues) => ({
        ...prevValues,
        ...validFields
      }));
      return;
    }

    const formattedRoute = {};
    careTypes[selectedCareType].fields.forEach(field => {
      formattedRoute[field] = values[field];
    });

    router.push(`${careTypes[selectedCareType].route}/${Object.keys(formattedRoute).join('/')}`);
  };

  return (
    <CarePackageSetup onBuildClick={onBuildClick}>
      <div className="level" />
      <div className="columns">
        <div className="column is-5">
          <CareSelectDropdown
            error={errors.careType}
            initialText={null}
            setError={() => changeErrorFields('careType')}
            careTypes={careTypes}
            setSelectedCareType={setSelectedCareType}
            selectedCareType={selectedCareType}
          />
        </div>
        <DateSetup
          endDate={values.endDate}
          changeErrorFields={changeErrorFields}
          errorFields={errors}
          isFixedPeriod={values.isFixedPeriod}
          setEndDate={(date) => setValues('endDate', date)}
          setIsFixedPeriod={(value) => setValues('isFixedPeriod', value)}
          setStartDate={(date) => setValues('startDate', date)}
          startDate={values.startDate}
        />
      </div>
        {Object.keys(careTypes[selectedCareType].labels).map(field => (
          <div key={field} className="mt-2">
            <RadioButton
              label={careTypes[selectedCareType].labels[field]}
              options={yesNoValues}
              error={errors[field]}
              setError={() => changeErrorFields(field)}
              onChange={value => setValues(field, value)}
              selectedValue={values[field]}
            />
          </div>
        ))}
    </CarePackageSetup>
  );
};

export default CareSetup;
