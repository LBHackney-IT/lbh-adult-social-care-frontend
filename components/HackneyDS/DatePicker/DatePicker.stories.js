import React, { useEffect, useState } from 'react';
import DatePicker from './index';
import FormGroup from '../FormGroup';

export default {
  title: 'Hackney Design System/DatePicker',
  component: DatePicker,
  argTypes: {},
};

const Template = (args) => {
  const [day, setDay] = useState({
    value: '',
    onChangeValue: (value) => setDay(prevState => ({ ...prevState, value, error: '' })),
    error: '',
  });

  const [month, setMonth] = useState({
    value: '',
    onChangeValue: (value) => setMonth(prevState => ({ ...prevState, value, error: '' })),
    error: '',
    ...args.month
  });

  const [year, setYear] = useState({
    value: '',
    onChangeValue: (value) => setYear(prevState => ({ ...prevState, value, error: '' })),
    error: '',
    ...args.year
  });

  useEffect(() => {
    setDay(prevState => ({
      ...prevState,
      ...args.day,
    }));

    setMonth(prevState => ({
      ...prevState,
      ...args.month,
    }));

    setYear(prevState => ({
      ...prevState,
      ...args.year,
    }));
  }, [args.year, args.day, args.month]);

  const error = day.error || month.error || year.error;

  return (
    <FormGroup label='Form label' hint='Form hint' error={error}>
      <DatePicker
        {...args}
        day={day}
        month={month}
        year={year}
      />
    </FormGroup>
  );
};

export const Default = Template.bind({});
Default.args = {
  formId: 'date-picker',
  day: {},
  month: {},
  year: {}
};

export const ErrorDay = Template.bind({});
ErrorDay.args = {
  formId: 'error-day',
  day: { error: 'Error day' },
  month: { error: 'Error month' },
  year: { error: 'Error year' }
};

export const ErrorMonth = Template.bind({});
ErrorMonth.args = {
  formId: 'error-month',
  day: { label: 'Day' },
  month: { error: 'Error month' },
  year: { error: 'Error year' }
};

export const ErrorYear = Template.bind({});
ErrorYear.args = {
  formId: 'error-year',
  day: { label: 'Day' },
  month: { label: 'Month' },
  year: { error: 'Error year' }
};

export const LabelHintError = Template.bind({});
LabelHintError.args = {
  formId: 'label-hint-error',
  hint: 'Date picker hint',
  label: 'Date picker label',
  day: { label: 'Day' },
  month: { label: 'Month' },
  year: { error: 'Error year', label: 'Year' }
};