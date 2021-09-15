import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import RadioButton, { yesNoValues } from '../RadioButton';
import CarePackageSetup from '../CarePackages/CarePackageSetup';
import CareSelectDropdown from '../CarePackages/CareSelectDropdown';
import formValidator from 'service/formValidator';
import DateSetup from './DateSetup';
import { incrementDate, includeString } from 'service/helpers';
import { RESIDENTIAL_CARE_ROUTE } from 'routes/RouteConstants';

const CareSetup = ({
  errors,
  setErrors,
  values,
  setValues,
  careTypes,
  selectedCareType,
  setSelectedCareType,
  history,
  tooltips,
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
    const inputRules = {};
    const form = {};
    const ignoreInputs = [];
    selectedCare.fields.forEach(field => {
      form[field] = values[field];

      if(includeString(field.toLowerCase(), 'date')) {
        inputRules[field] = ['null'];

        if(field === 'endDate' && !values.isFixedPeriod) {
          ignoreInputs.push(field);
        }
      }
    });

    const { validFields, hasErrors } = formValidator({ form, inputRules, ignoreInputs });
    if (hasErrors) {
      setErrors((prevValues) => ({
        ...prevValues,
        ...validFields
      }));
      return;
    }

    let formattedRoute = '';
    selectedCare.fields.forEach(field => {
      if(values[field] !== undefined && values[field] !== '') {
        formattedRoute += `/${values[field]}`;
      }
    });

    if(selectedCare.route === RESIDENTIAL_CARE_ROUTE) {
      formattedRoute += `?${selectedCare.optionFields.typeOfStayId.find((opt) => opt.value === values.typeOfStayId).text}`;
    }

    router.push(`${selectedCare.route}${formattedRoute}`);
  };

  const typeOfStayIdMaxDates = {
    1: incrementDate({ incrementTime: { weeks: 5} }),
    2: incrementDate({ incrementTime: { weeks: 51} }),
    3: undefined,
  };

  const hasTypeOfStayId = selectedCare.fields.includes('typeOfStayId');

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
          disabledStartDate={hasTypeOfStayId && !values.typeOfStayId}
          changeErrorFields={changeErrorFields}
          errorFields={errors}
          startMaxDate={typeOfStayIdMaxDates[values.typeOfStayId]}
          isFixedPeriod={values.isFixedPeriod}
          setEndDate={(date) => setValues('endDate', date)}
          setIsFixedPeriod={(value) => setValues('isFixedPeriod', value)}
          setStartDate={(date) => {
            setValues('startDate', date);
            const { endDate, isFixedPeriod } = values;
            if(endDate && date && isFixedPeriod) {
              if (endDate - date < 0) {
                setValues('endDate', date);
              }
            }
          }}
          startDate={values.startDate}
        />
      </div>
        {Object.keys(selectedCare.labels).map(field => (
          <div key={field} className="mt-2">
            <RadioButton
              tooltipText={tooltips[field] || ''}
              label={selectedCare.labels[field]}
              options={selectedCare.optionFields ? selectedCare.optionFields[field] || yesNoValues : yesNoValues}
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
