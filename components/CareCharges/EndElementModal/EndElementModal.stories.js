import React from 'react';
import { EndElementModal } from '../../HackneyDS/index';

export default {
  title: 'Pages/CareCharges/EndElementModal',
  component: EndElementModal,
  argTypes: {
    EndElementModal: {},
  },
};

const Template = (args) => <EndElementModal {...args} />;

export const Default = Template.bind({});
Default.args = {
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
      endDate: new Date(2021, 3, 1),
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
};