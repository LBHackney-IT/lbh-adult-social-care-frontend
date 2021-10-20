import React, { useState } from 'react';
import CareChargesModalActions from '../ModalComponents/CareChargesModalActions';
import CareChargesModalTitle from '../ModalComponents/CareChargesModalTitle';
import { RadioGroup } from '../../../HackneyDS';

const OptionsElementContent = ({ options, closeModal }) => {
  const [optionElement, setOptionElement] = useState('edit-element');

  const cancelAction = () => alert('Cancel');

  const nextStep = () => alert('Next');

  return (
    <>
      <CareChargesModalTitle title="Element options" />
      <RadioGroup value={optionElement} handle={(itemId) => setOptionElement(itemId)} items={options} />
      <CareChargesModalActions
        actions={[
          { title: 'Next', handler: nextStep },
          { title: 'Cancel', handler: cancelAction, className: 'without-background' },
        ]}
      />
    </>
  );
};

export default OptionsElementContent;
