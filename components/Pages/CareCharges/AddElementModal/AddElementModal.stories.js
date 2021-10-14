import React from 'react';
import { AddElementModal } from './index';

export default {
  title: 'Pages/CareCharges/AddElementModal',
  component: AddElementModal,
  argTypes: {
    AddElementModal: {},
  },
};

const Template = (args) => <AddElementModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  activeElements: [
    {
      id: 1,
      name: 'Residential SU contribution',
      property: 'Without Property',
      dateFromWeeks: 0,
      value: '200',
      claimedBy: 'gross',
      startDate: new Date(),
      endDate: new Date(),
    },
  ],
};
