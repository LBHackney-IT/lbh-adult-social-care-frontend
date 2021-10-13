import React from 'react';
import AssignCarePlan from './index';

export default {
  title: 'Pages/Broker Assistant/AssignCarePlan',
  component: AssignCarePlan,
  argTypes: {
    controls: null,
  },
};

const Template = (args) => <AssignCarePlan {...args} />;

export const Default = Template.bind({});
Default.args = {
  brokerOptions: [
    { value: '', text: 'Select one' },
    { value: 'broker-1', text: 'Broker 1' },
    { value: 'broker-2', text: 'Broker 2' },
  ],
  packageTypeOptions: [
    { value: '', text: 'Select one' },
    { value: 'package-1', text: 'Package 1' },
    { value: 'package-2', text: 'Package 2' },
  ],
  userDetails: {
    address: 'E9 6EY',
    userName: 'James Stevens',
    dateOfBirth: new Date(1972, 12, 9),
    hackneyId: '786288',
  }
};
