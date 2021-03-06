import React from 'react';
import { Container, FormGroup, Heading, Hint, HorizontalSeparator, Input } from 'components';
import { Controller } from 'react-hook-form';
import { formatNumber, getNumberWithCommas } from 'service';

export const CoreWeeklyCost = ({ control, coreCost, errors }) => (
  <Container>
    <FormGroup label="Core weekly cost" error={errors.coreCost?.message}>
      <Container display="flex" justifyContent="stretch">
        <Controller
          name="coreCost"
          control={control}
          render={({ field }) => (
            <Input
              type="number"
              step="any"
              preSign="£"
              value={field.value}
              onChangeValue={(text) => field.onChange(parseFloat(text))}
              flex
              {...field}
            />
          )}
        />
      </Container>
    </FormGroup>
    <HorizontalSeparator height="48px" />
    <Container
      borderTop="1px solid #bfc1c3"
      borderBottom="1px solid #bfc1c3"
      padding="24px 0"
      display="flex"
      justifyContent="space-between"
    >
      <Hint>Core weekly cost</Hint>
      <Heading size="m">£{getNumberWithCommas(formatNumber(coreCost, { isAbsolute: true }))}</Heading>
    </Container>
  </Container>
);
