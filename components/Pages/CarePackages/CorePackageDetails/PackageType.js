import React from 'react';
import { Container, HorizontalSeparator, Select, FormGroup } from 'components/HackneyDS';
import { optionsMapper, usePackageGetAll, usePrimarySupportReason } from 'api';
import { Controller } from 'react-hook-form';

export const PackageType = ({ errors, control }) => {
  const { data: primarySupportReasons = [] } = usePrimarySupportReason();
  const { options: packageTypes = [] } = usePackageGetAll();
  const mappedSupportReasons = optionsMapper(
    {
      text: 'primarySupportReasonName',
      value: 'primarySupportReasonId',
    },
    primarySupportReasons
  );
  return (
    <Container className="brokerage__container">
      <FormGroup label="Package type" error={errors.packageType?.message}>
        <Controller
          name="packageType"
          control={control}
          render={({ field }) => <Select options={packageTypes} {...field} />}
        />
      </FormGroup>
      <HorizontalSeparator height="20px" />
      <FormGroup label="Primary support reason" error={errors.primarySupportReasonId?.message}>
        <Controller
          name="primarySupportReasonId"
          control={control}
          render={({ field }) => <Select options={mappedSupportReasons} {...field} />}
        />
      </FormGroup>
    </Container>
  );
};
