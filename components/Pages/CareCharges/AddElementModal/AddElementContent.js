import React, { useEffect, useState } from 'react';
import { formValidator, incrementDate } from '../../../../service';
import CareChargesInfoEdited from '../CareChargesInfoEdited';
import CareChargesModalActions from '../CareChargesModalActions';
import CareChargesInfoTitle from '../CareChargesInfoTitle';
import CareChargesModalTitle from '../CareChargesModalTitle';
import { ErrorMessage } from '../../../HackneyDS';

const initialInputs = {
  value: '',
  startDate: '',
  endDate: '',
};

const AddElementContent = ({ activeElements, closeModal, headerText }) => {
  const [inputs, setInputs] = useState([]);
  const [inputHasErrors, setInputHasErrors] = useState(false);
  const [inputErrors, setInputErrors] = useState([]);

  const onChangeInput = (field, value, index) => {
    setInputHasErrors(false);
    const newInput = { ...inputs[index] };
    newInput[field] = value;
    if (field === 'startDate') {
      const { dateFromWeeks } = newInput;
      const minEndDate =
        dateFromWeeks &&
        incrementDate({
          incrementTime: { weeks: dateFromWeeks },
          date: value,
        });
      if (dateFromWeeks) {
        newInput.endDate = minEndDate;
      }
    }
    const cloneInputs = inputs.slice();
    cloneInputs.splice(index, 1, newInput);
    setInputs(cloneInputs);
    onChangeInputError(field, '', index);
  };

  const onChangeInputError = (field, value, index) => {
    const newInputError = { ...inputErrors[index] };
    newInputError[field] = value;
    const cloneInputErrors = inputErrors.slice();
    cloneInputErrors.splice(index, 1, newInputError);
    setInputErrors(cloneInputErrors);
  };

  const cancelAction = () => alert('Cancel');

  const savePackage = () => {
    let hasErrors = false;
    const newInputErrors = inputErrors.slice();

    inputs.forEach((input, index) => {
      const { validFields, hasErrors: hasLocalErrors } = formValidator({ form: input });
      if (hasLocalErrors) {
        hasErrors = true;
        newInputErrors.splice(index, 1, validFields);
      }
    });

    if (hasErrors) {
      setInputHasErrors(true);
      setInputErrors(newInputErrors);
      return;
    }

    alert('Saved success');
  };

  useEffect(() => {
    if (activeElements?.length) {
      setInputs(activeElements.map((activeElement) => ({ ...activeElement, period: 'fixed-period' })));

      setInputErrors(
        activeElements.map(() => ({
          ...initialInputs,
        }))
      );
    }
  }, [activeElements]);

  return (
    <>
      <CareChargesModalTitle title={headerText} />
      <CareChargesInfoTitle title="NEW ELEMENT" />
      <CareChargesInfoEdited
        hasEditStyle={false}
        elements={inputs}
        inputErrors={inputErrors}
        onChangeInput={onChangeInput}
      />
      {inputHasErrors && <ErrorMessage>There some errors above</ErrorMessage>}
      <CareChargesModalActions
        actions={[
          { title: 'Save and update package', handler: savePackage },
          { title: 'Cancel', handler: cancelAction, className: 'without-background' },
        ]}
      />
    </>
  );
};

export default AddElementContent;
