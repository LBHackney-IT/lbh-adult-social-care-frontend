import React from 'react';
import { Container, HorizontalSeparator, Select } from 'components/HackneyDS';
import { optionsMapper, usePackageGetAll } from 'api';
import usePrimarySupportReason from 'api/SWR/package/usePrimarySupportReason';
import { Controller } from 'react-hook-form';
import FormGroup from 'components/HackneyDS/FormGroup';

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
