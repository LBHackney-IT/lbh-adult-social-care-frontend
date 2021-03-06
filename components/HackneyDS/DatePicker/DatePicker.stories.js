import React, { useEffect, useState } from 'react';
import DatePicker from './index';
import FormGroup from '../FormGroup';

export default {
  title: 'Hackney Design System/DatePicker',
  component: DatePicker,
  argTypes: {},
};

const Template = (args) => {
  const [date, setDate] = useState(null);

  useEffect(() => {
    //  eslint-disable-next-line react/destructuring-assignment
    setDate(args.date);
    //  eslint-disable-next-line react/destructuring-assignment
  }, [args.date]);

  //  eslint-disable-next-line react/destructuring-assignment
  const error = args.day?.error || args.month?.error || args.year?.error;

  return (
    <FormGroup label="Form label" hint="Form hint" error={error}>
      <DatePicker {...args} date={date} setDate={setDate} />
    </FormGroup>
  );
};

export const Default = Template.bind({});
Default.args = {
  formId: 'date-picker',
};

export const CalendarStylePosition = Template.bind({});
CalendarStylePosition.args = {
  formId: 'date-picker',
  calendarStylePosition: { left: 50 },
};

export const ErrorDay = Template.bind({});
ErrorDay.args = {
  formId: 'error-day',
  day: { error: 'Error day' },
  month: { error: 'Error month' },
  year: { error: 'Error year' },
};

export const ErrorMonth = Template.bind({});
ErrorMonth.args = {
  formId: 'error-month',
  day: { label: 'Day' },
  month: { error: 'Error month' },
  year: { error: 'Error year' },
};

export const ErrorYear = Template.bind({});
ErrorYear.args = {
  formId: 'error-year',
  day: { label: 'Day' },
  month: { label: 'Month' },
  year: { error: 'Error year' },
};

export const LabelHintError = Template.bind({});
LabelHintError.args = {
  formId: 'label-hint-error',
  hint: 'Date picker hint',
  label: 'Date picker label',
  day: { label: 'Day' },
  month: { label: 'Month' },
  year: { error: 'Error year', label: 'Year' },
};

export const WithClearButton = Template.bind({});
WithClearButton.args = {
  formId: 'label-hint-error',
  hint: 'Date picker hint',
  label: 'Date picker label',
  day: { label: 'Day' },
  month: { label: 'Month' },
  year: { error: 'Error year', label: 'Year' },
  hasClearButton: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  formId: 'label-hint-error',
  hint: 'Date picker hint',
  label: 'Date picker label',
  day: { label: 'Day' },
  month: { label: 'Month' },
  year: { error: 'Error year', label: 'Year' },
  disabled: true,
  hasClearButton: true,
};
