import React from 'react';
import { EditElementModal } from '../index';

export default {
  title: 'Hackney Design System/EditElementModal',
  component: EditElementModal,
};

const Template = (args) => <EditElementModal {...args} />;

export const EditStep = Template.bind({});
EditStep.args = {
  activeElements: [
    {
      id: 1,
      name: 'Residential SU contribution',
      property: 'Without Property 1-12 weeks',
      dateFromWeeks: 1,
      dateToWeeks: 12,
      value: '200',
      claimedBy: 'gross',
      startDate: new Date(2021, 2, 1),
      endDate: new Date(2021, 5, 1),
    },
    {
      id: 2,
      name: 'Residential SU contribution',
      property: 'Without Property 13+ weeks',
      dateFromWeeks: 13,
      value: '200',
      claimedBy: 'net',
      startDate: new Date(2021, 5, 2),
      endDate: new Date(2021, 9, 2),
    }
  ],
  isOpened: true,
};
