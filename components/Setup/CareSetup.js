import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import RadioButton, { yesNoValues } from '../RadioButton';
import CarePackageSetup from '../CarePackages/CarePackageSetup';
import CareSelectDropdown from '../CarePackages/CareSelectDropdown';
import fieldValidator from '../../service/inputValidator';
import DateSetup from './DateSetup';
import { includeString } from '../../service/helpers'
import { RESIDENTIAL_CARE_ROUTE } from '../../routes/RouteConstants'

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

  const selectedCare = careTypes.find(item => item.value === selectedCareType);

  // Handle build click
  const onBuildClick = () => {
    const requiredFields = selectedCare.fields.map(field => {
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

    let formattedRoute = '';
    selectedCare.fields.forEach(field => {
      if(field === 'typeOfStayId' && selectedCare.route === RESIDENTIAL_CARE_ROUTE) {
        const typeOfStay = selectedCare.optionFields[field].find((opt) => opt.value === selectedCare.typeOfStayId);
        formattedRoute += `?typeOfStayText=${typeOfStay}`;
      } else {
        formattedRoute += `/${values[field]}`;
      }
    });

    router.push(`${selectedCare.route}${formattedRoute}`);
  };

  return (
    <CarePackageSetup onBuildClick={onBuildClick}>
      <div className="level" />
      <div className="columns">
        <div className="column">
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
        {Object.keys(selectedCare.labels).map(field => (
          <div key={field} className="mt-2">
            <RadioButton
              label={selectedCare.labels[field]}
              options={selectedCare.optionFields[field] || yesNoValues}
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
