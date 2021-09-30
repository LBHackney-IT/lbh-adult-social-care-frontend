import { Container } from '../../HackneyDS';
import { Select } from '../../HackneyDS';
import React from 'react';
import { SelectArrowTriangle } from '../../Icons';

const CorePackageSelectors = ({
  errors,
  packageType,
  setPackageType,
  changeError,
  packageTypeOptions,
  setSupportReason,
  supportReason,
  supportReasonOptions,
}) => (
  <Container className='brokerage__container'>
    <h3>Package type</h3>
    <Container display='flex' flexDirection='column'>
      <Container className='core-package-details__selector' display='flex' flexDirection='column'>
        <label>Package type</label>
        <Select
          error={errors.packageType}
          onChange={({ target: { value } }) => {
            setPackageType(value);
            changeError('packageType');
          }}
          value={packageType.value}
          options={packageTypeOptions}
        />
      </Container>
      {supportReason &&
      <Container className='core-package-details__selector' display='flex' flexDirection='column'>
        <label>Primary support reason</label>
        <Select
          error={errors.supportReason}
          onChange={({ target: { value } }) => {
            setSupportReason(value);
            changeError('supportReason');
          }}
          value={supportReason.value}
          options={supportReasonOptions}
        />
      </Container>
      }
    </Container>
  </Container>
);

export default CorePackageSelectors;