import React from 'react';
import { Controller } from 'react-hook-form';
import { Container, HorizontalSeparator, FormGroup, Input, Announcement, WarningText } from 'components';
import { PreviousCareCharges } from './PreviousCareCharge';

export const CareChargeCost = ({
  control,
  showPreviousAnnouncement,
  hasAssessmentBeenCarried,
  errors,
  isS117Client,
  isDisabled,
  previousCareCharge,
}) => (
  <Container className="brokerage__container">
    <WarningText>Provisional care charge (pre-assessement)</WarningText>
    <HorizontalSeparator height="10px" />
    {isS117Client && (
      <>
        <Announcement title="This client has been categorised as S117" isError>
          No care charges need to be applied
        </Announcement>
      </>
    )}
    {showPreviousAnnouncement && <PreviousCareCharges {...previousCareCharge} />}
    {hasAssessmentBeenCarried && (
      <>
        <Announcement isWarning title="Care charge assessment for this package already done.">
          <p>Manage care charges for this package in the Care Charges menu</p>
        </Announcement>
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
