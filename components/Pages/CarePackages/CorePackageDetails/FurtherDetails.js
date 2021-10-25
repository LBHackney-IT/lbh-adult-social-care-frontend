import React, { useEffect } from 'react';
import { Checkbox } from 'components/HackneyDS';
import { Controller } from 'react-hook-form';
import FormGroup from 'components/HackneyDS/FormGroup';

const checkboxOptions = [
  { id: 'hasRespiteCare', label: 'Respite care' },
  { id: 'hospitalAvoidance', label: 'Hospital avoidance' },
  { id: 'hasDischargePackage', label: 'Discharge package' },
  { id: 'isReEnablement', label: 'Re-enablement package' },
  { id: 'isS117Client', label: 'S117 client' },
];

export const FurtherDetails = ({ settings, control, setValue }) => {
  useEffect(() => {
    if (settings) {
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of Object.entries(settings)) {
        setValue(key, value);
      }
    }
  }, [settings]);

  return (
    <>
      <FormGroup label="Further details" hint="select all that apply">
        {checkboxOptions.map(({ id, label}) => (
          <Controller
            key={id}
            name={id}
            control={control}
            render={({ field }) => (
              <Checkbox id={id} handler={field.onChange} label={label} {...field} />
            )}
          />
        ))}
      </FormGroup>
    </>
  );
};
