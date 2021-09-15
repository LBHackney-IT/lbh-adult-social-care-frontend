import React, { useEffect, useState } from 'react';
import formValidator from '../../../service/formValidator';
import CareChargesInfoStatic from '../CareChargesInfoStatic';
import CareChargesInfoEdited from '../CareChargesInfoEdited';
import { incrementDate } from '../../../service/helpers';
import CareChargesModalActions from '../CareChargesModalActions';
import CareChargesInfoTitle from '../CareChargesInfoTitle';
import CareChargesModalTitle from '../CareChargesModalTitle';
import { ErrorMessage } from '../../HackneyDS/index';

const AddElementContent = ({
  activeElements,
  headerText,
  editStep,
  setEditStep,
}) => {
  const [initialInputs] = useState({
    value: '',
    startDate: '',
    endDate: '',
  });
  const [inputs, setInputs] = useState([]);
  const [inputHasErrors, setInputHasErrors] = useState(false);
  const [inputErrors, setInputErrors] = useState([]);

  const onChangeInput = (field, value, index) => {
    setInputHasErrors(false);
    const newInput = { ...inputs[index] };
    newInput[field] = value;
    if(field === 'startDate') {
      const { dateFromWeeks } = newInput;
      const minEndDate = dateFromWeeks && incrementDate({
        incrementTime: { weeks: dateFromWeeks },
        date: value,
      });
      if(dateFromWeeks) {
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

  const confirm = () => alert('Confirm');

  const editElement = () => setEditStep(true);

  const cancelAction = () => alert('Cancel');

  const next = () => {
    let hasErrors = false;
    const newInputErrors = inputErrors.slice();

    inputs.forEach((input, index) => {
      const { validFields, hasErrors: hasLocalErrors } = formValidator({ form: input });
      if(hasLocalErrors) {
        hasErrors = true;
        newInputErrors.splice(index, 1, validFields);
      }
    });

    if(hasErrors) {
      setInputHasErrors(true);
      setInputErrors(newInputErrors);
      return;
    }

    setEditStep(false);
  };

  useEffect(() => {
    if(activeElements?.length) {
      setInputs(activeElements.map((activeElement) => ({...activeElement, period: 'fixed-period'})));

      setInputErrors(activeElements.map(() => ({
        ...initialInputs,
      })));
    }
  }, [activeElements]);

  return (
    <>
      <CareChargesModalTitle title={headerText} />
      <CareChargesInfoTitle title={editStep ? 'ACTIVE ELEMENT' : 'PREVIOUS ELEMENT'} />
      <CareChargesInfoStatic activeElements={activeElements} />
      <CareChargesInfoTitle title={editStep ? 'EDITED ELEMENT' : 'NEW ELEMENT'} />
      {editStep ?
        <CareChargesInfoEdited
          elements={inputs}
          inputErrors={inputErrors}
          onChangeInput={onChangeInput}
        /> : <CareChargesInfoStatic activeElements={inputs} />
      }
      {inputHasErrors && <ErrorMessage>There some errors above</ErrorMessage>}
      <CareChargesModalActions
        actions={[
          { title: editStep ? 'Next' : 'Confirm', handler: editStep ? next : confirm },
          !editStep && { title: 'Edit', className: 'without-background', handler: editElement },
          { title: 'Cancel', handler: cancelAction, className: 'without-background' },
        ]}
      />
    </>
  )
};

export default AddElementContent;