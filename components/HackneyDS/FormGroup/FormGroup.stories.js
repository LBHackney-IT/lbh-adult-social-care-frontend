import React from 'react';
import FormGroup from '.';
import { Input } from '../Input';

export default {
  title: 'Hackney Design System/FormGroup',
  component: FormGroup,
};

const Template = (args) => <FormGroup {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: (
    <>
      <Input label="ex" handler={() => {}} id="ex1" />
      <Input label="ex" hint="Field hint" handler={() => {}} id="ex2" />
      <Input label="ex" error="Field error" hint="Field hint" handler={() => {}} id="ex" />
    </>
  ).props.children,
  label: 'National Insurance number',
  hint: 'It’s on your National Insurance card, benefit letter, payslip or P60. For example, ‘QQ 12 34 56 C’.',
  error: 'Error message goes here',
};
