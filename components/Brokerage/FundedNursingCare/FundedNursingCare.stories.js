import React from 'react';
import FundedNursingCare from './index';

export default {
  title: 'Pages/Brokerage/FundedNursingCare',
  component: FundedNursingCare,
  argTypes: {
    controls: null,
  },
};

const Template = (args) => <FundedNursingCare {...args} />;

export const Default = Template.bind({});
Default.args = {
  collectedByOptions: [
    { value: 'hackney', text: 'Hackney council (gross)' },
    { value: 'supplier', text: 'Supplier (net)' },
  ]
};
