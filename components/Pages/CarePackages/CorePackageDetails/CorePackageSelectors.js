import React from 'react';
import { Container, Select } from '../../../HackneyDS';

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
  <Container className="brokerage__container">
    <h3>Package type</h3>
    <Container display="flex" flexDirection="column">
      <Container className="core-package-details__selector" display="flex" flexDirection="column">
        <label>Package type</label>
        <Select
          error={errors.packageType}
          onChange={({ target: { value } }) => {
            setPackageType(value);
            changeError('packageType');
          }}
          value={packageType}
          options={packageTypeOptions}
        />
      </Container>
      {supportReasonOptions && (
        <Container className="core-package-details__selector" display="flex" flexDirection="column">
          <label>Primary support reason</label>
          <Select
            error={errors.supportReason}
            onChange={({ target: { value } }) => {
              setSupportReason(value);
              changeError('supportReason');
            }}
            value={supportReason}
            options={supportReasonOptions}
          />
        </Container>
      )}
    </Container>
  </Container>
);

export default CorePackageSelectors;
