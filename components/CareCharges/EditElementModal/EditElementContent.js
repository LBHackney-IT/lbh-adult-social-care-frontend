import React, { useEffect, useState } from 'react';
import CareChargesInfoStatic from '../ModalComponents/CareChargesInfoStatic';
import CareChargesInfoEdited from '../ModalComponents/CareChargesInfoEdited';
import { incrementDate } from '../../../service/helpers';
import CareChargesModalActions from '../ModalComponents/CareChargesModalActions';
import CareChargesInfoTitle from '../ModalComponents/CareChargesInfoTitle';
import CareChargesModalTitle from '../ModalComponents/CareChargesModalTitle';
import { ErrorMessage } from '../../HackneyDS/index';
import { object, string } from 'yup';

const EditElementContent = ({ activeElements, headerText }) => {
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
    if (field === 'startDate') {
      const { dateFromWeeks } = newInput;
      const minEndDate = dateFromWeeks && incrementDate({
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

  const next = async () => {
    let hasErrors = false;
    const newInputErrors = inputErrors.slice();

    const schema = object().shape({
      value: string().required(),
    });

    let index = 0;
    for await (let item of inputs) {
      const valid = await schema.isValid({ value: item.value });
      if (!valid) {
        hasErrors = true;
        newInputErrors.splice(index, 1, {
          value: 'Required field',
        });
      }
      index += 1;
    }

    if (hasErrors) {
      setInputHasErrors(true);
      setInputErrors(newInputErrors);
      return;
    }
    alert('next successful');
  };

  useEffect(() => {
    if (activeElements?.length) {
      setInputs(activeElements.map((activeElement) => ({ ...activeElement, period: 'fixed-period' })));

      setInputErrors(activeElements.map(() => ({
        ...initialInputs,
      })));
    }
  }, [activeElements]);

  return (
    <>
      <CareChargesModalTitle title={headerText}/>
      <CareChargesInfoTitle title='ACTIVE ELEMENT'/>
      <CareChargesInfoStatic activeElements={activeElements}/>
      <CareChargesInfoTitle title='EDITED ELEMENT'/>
      <CareChargesInfoEdited
        elements={inputs}
        inputErrors={inputErrors}
        onChangeInput={onChangeInput}
      />
      {inputHasErrors && <ErrorMessage>There some errors above</ErrorMessage>}
      <CareChargesModalActions
        actions={[
          { title: 'Next', handler: next },
          { title: 'Cancel', handler: cancelAction, className: 'without-background' },
        ]}
      />
    </>
  );
};

export default EditElementContent;