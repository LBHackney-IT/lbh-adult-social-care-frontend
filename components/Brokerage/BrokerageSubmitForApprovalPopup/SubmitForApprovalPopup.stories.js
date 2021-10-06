import React from 'react';
import SubmitForApprovalPopup from './SubmitForApprovalPopup';

export default {
  title: 'Pages/Brokerage/SubmitForApprovalPopup',
  component: SubmitForApprovalPopup,
  argTypes: {
    controls: null,
  },
};

const Template = (args) => <SubmitForApprovalPopup {...args} />;

export const Default = Template.bind({});
Default.args = {
  approvedByOptions: [
    { text: 'Mark Watson', value: 'Mark Watson' },
    { text: 'Mark Mark', value: 'Mark Mark' },
    { text: 'Watson Watson', value: 'Watson Watson' },
  ]
};
