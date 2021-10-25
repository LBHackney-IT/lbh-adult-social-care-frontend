import React from 'react';
// import { object, string } from 'yup';
// import { addWeeks } from 'date-fns';
// import CareChargesInfoEdited from '../../../CareCharges/ModalComponents/CareChargesInfoEdited';
import CareChargesModalTitle from '../ModalComponents/CareChargesModalTitle';
import CareChargesInfoTitle from '../ModalComponents/CareChargesInfoTitle';
import CareChargesInfoStatic from '../ModalComponents/CareChargesInfoStatic';
import CareChargesModalActions from '../ModalComponents/CareChargesModalActions';
// import { ErrorMessage } from '../../../../HackneyDS';

// const initialInputs = {
//   value: '',
//   startDate: '',
//   endDate: '',
// };

const EditElementContent = ({ activeElements, headerText, onClose }) => {
  // const [inputs, setInputs] = useState([]);
  // const [inputHasErrors, setInputHasErrors] = useState(false);
  // const [inputErrors, setInputErrors] = useState([]);

  // const onChangeInput = (field, value, index) => {
  //   setInputHasErrors(false);
  //   const newInput = { ...inputs[index] };
  //   newInput[field] = value;
  //   if (field === 'startDate') {
  //     const { dateFromWeeks } = newInput;
  //     const minEndDate = dateFromWeeks && addWeeks(value, dateFromWeeks);
  //     if (dateFromWeeks) {
  //       newInput.endDate = minEndDate;
  //     }
  //   }
  //   const cloneInputs = inputs.slice();
  //   cloneInputs.splice(index, 1, newInput);
  //   setInputs(cloneInputs);
  //   onChangeInputError(field, '', index);
  // };

  // const onChangeInputError = (field, value, index) => {
  //   const newInputError = { ...inputErrors[index] };
  //   newInputError[field] = value;
  //   const cloneInputErrors = inputErrors.slice();
  //   cloneInputErrors.splice(index, 1, newInputError);
  //   setInputErrors(cloneInputErrors);
  // };

  const confirm = () => alert('Confirm');

  // const next = async () => {
  //   let hasErrors = false;
  //   const newInputErrors = inputErrors.slice();
  //
  //   const schema = object().shape({
  //     value: string().required(),
  //   });
  //
  //   let index = 0;
  //   for await (const item of inputs) {
  //     const valid = await schema.isValid({ value: item.value });
  //     if (!valid) {
  //       hasErrors = true;
  //       newInputErrors.splice(index, 1, {
  //         value: 'Required field',
  //       });
  //     }
  //     index += 1;
  //   }
  //
  //   if (hasErrors) {
  //     setInputHasErrors(true);
  //     setInputErrors(newInputErrors);
  //     return;
  //   }
  //
  //   setEditStep(false);
  // };

  // useEffect(() => {
  //   if (activeElements?.length) {
  //     // setInputs(activeElements.map((activeElement) => ({ ...activeElement, period: 'fixed-period' })));
  //
  //     // setInputErrors(
  //     //   activeElements.map(() => ({
  //     //     ...initialInputs,
  //     //   }))
  //     // );
  //   }
  // }, [activeElements]);

  return (
    <>
      <CareChargesModalTitle title={headerText} />

      <CareChargesInfoTitle title="PREVIOUS ELEMENT" />
      <CareChargesInfoStatic activeElements={activeElements} />

      <CareChargesInfoTitle title="NEW ELEMENT" />
      <CareChargesInfoStatic activeElements={activeElements} />

      {/* {editStep ? ( */}
      {/*  <CareChargesInfoEdited elements={inputs} inputErrors={inputErrors} onChangeInput={onChangeInput} /> */}
      {/* ) : ( */}
      {/*  <CareChargesInfoStatic activeElements={inputs} /> */}
      {/* )} */}

      {/* <CareChargesInfoStatic activeElements={inputs} /> */}

      {/* {inputHasErrors && <ErrorMessage>There some errors above</ErrorMessage>} */}

      <CareChargesModalActions
        actions={[
          { title: 'Confirm', handler: confirm },
          { title: 'Edit', handler: onClose, className: 'without-background' },
          { title: 'Cancel', handler: onClose, className: 'without-background' },
        ]}
      />
    </>
  );
};

export default EditElementContent;
