import React, { memo } from 'react';
import { currency } from 'constants/strings';
import { Checkbox, Input, RadioGroup, DatePicker } from 'components/HackneyDS';
import ActionButtons from './ActionButtons';

const claimedByOptions = [
  { id: 'gross', label: 'Gross' },
  { id: 'net', label: 'Net' },
];

const ResidentialSuContribution = ({ weeks }) => {
  const description = `Without Property ${weeks} weeks`;
  const hasOngoing = weeks === '13+';

  return (
    <div className="residential-contribution">
      <h3>Residential SU contribution</h3>
      <p>{description}</p>

      <Input
        id={`${weeks}-value`}
        label="Value"
        preSign={currency.euro}
        // onChangeValue={setCostPerWeek}
        // value={costPerWeek}
        // error={errors.costPerWeek}
        // onBlur={() => {
        //   if (costPerWeek < calculatedCost) {
        //     setCostPerWeek(calculatedCost);
        //   }
        // }}
      />

      <RadioGroup
        inline
        items={claimedByOptions}
        className="care-charge__radios"
        // handle={(value) => {
        //   changeError('collectedBy');
        //   setCollectedBy(value);
        // }}
        // error={errors.collectedBy}
        // value={collectedBy}
      />

      <div className="care-charge__dates">
        <div>
          <h5>Start date</h5>
          <DatePicker
            day={{ label: 'From' }}
            // minDate={startMinDate}
            // date={dates[fields.dateFrom]}
            // setDate={(date) => setDates(fields.dateFrom, date)}
          />
        </div>

        <div>
          <h5>End date</h5>
          <DatePicker
            day={{ label: 'To' }}
            // minDate={startMinDate}
            // date={dates[fields.dateFrom]}
            // setDate={(date) => setDates(fields.dateFrom, date)}
          />
        </div>

        {hasOngoing && (
          <Checkbox
            // value={isOngoing}
            // id={checkboxId}
            // onChangeValue={value => setIsOngoing(value)}
            label="Ongoing"
          />
        )}
      </div>

      <ActionButtons />
    </div>
  );
};

export default memo(ResidentialSuContribution);
