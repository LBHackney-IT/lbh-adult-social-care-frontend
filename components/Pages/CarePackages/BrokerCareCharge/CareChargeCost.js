import React from 'react';
import { Controller } from 'react-hook-form';
import { Container, HorizontalSeparator, FormGroup, Input, Announcement, WarningText } from 'components';

export const CareChargeCost = ({ control, errors, isS117Client, isDisabled }) => (
  <Container className="brokerage__container">
    <WarningText>Provisional care charge (pre-assessement)</WarningText>
    <HorizontalSeparator height="10px" />
    {isS117Client && (
      <>
        <Announcement title="This client has been categorised as S117" isError>
          No care charges need to be applied
        </Announcement>
        <HorizontalSeparator height="28px" />
      </>
    )}
    <HorizontalSeparator height="20px" />
    <FormGroup label="Cost per week" hint="Auto calculated on age" error={errors.cost?.message} disabled={isDisabled}>
      <Controller
        name="cost"
        control={control}
        render={({ field }) => (
          <Input
            type="number"
            step="any"
            preSign="£"
            value={field.value}
            onChangeValue={(text) => field.onChange(parseFloat(text))}
            flex
          />
        )}
      />
    </FormGroup>
  </Container>
);
