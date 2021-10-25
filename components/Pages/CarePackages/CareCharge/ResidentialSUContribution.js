import React, { memo } from 'react';
import { currency } from 'constants/strings';
import { Checkbox, Input, RadioGroup, DatePicker } from 'components/HackneyDS';
import { Controller } from 'react-hook-form';
import ActionButtons from './ActionButtons';

const claimedByOptions = [
  { id: 'gross', label: 'Gross' },
  { id: 'net', label: 'Net' },
];

const ResidentialSuContribution = ({ isMore12, control, onCancel, onEnd }) => {
  const weeks = isMore12 ? '13+' : '1-12';
  const formKey = isMore12 ? 'residentialMore12' : 'residentialLess12';
  const description = `Without Property ${weeks} weeks`;

  const options = claimedByOptions.map((el) => ({
    label: el.label,
    id: `${formKey}-${el.id}`,
  }));

  return (
    <div className="residential-contribution">
      <h3>Residential SU contribution</h3>
      <p>{description}</p>

      <Controller
        name={`${formKey}.value`}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            id={`${weeks}-value`}
            label="Value"
            preSign={currency.euro}
            handler={field.onChange}
            value={field.value}
          />
        )}
      />

      <Controller
        name={`${formKey}.claimedBy`}
        control={control}
        render={({ field }) => (
          <RadioGroup
            inline
            items={options}
            name={`${formKey}-claimedBy`}
            className="care-charge__radios"
            handle={field.onChange}
            value={field.value}
          />
        )}
      />

      <div className="care-charge__dates">
        <div>
          <h5>Start date</h5>
          <Controller
            name={`${formKey}.startDate`}
            control={control}
            render={({ field }) => <DatePicker day={{ label: 'From' }} date={field.value} setDate={field.onChange} />}
          />
        </div>

        <div>
          <h5>End date</h5>
          <Controller
            name={`${formKey}.endDate`}
            control={control}
            render={({ field }) => <DatePicker day={{ label: 'To' }} date={field.value} setDate={field.onChange} />}
          />
        </div>

        {isMore12 && (
          <Controller
            name={`${formKey}.isOngoing`}
            control={control}
            render={({ field }) => <Checkbox value={field.value} onChangeValue={field.onChange} label="Ongoing" />}
          />
        )}
      </div>

      <ActionButtons onCancel={onCancel} onEnd={onEnd} />
    </div>
  );
};

export default memo(ResidentialSuContribution);
