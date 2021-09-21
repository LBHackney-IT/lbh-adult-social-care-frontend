import React from 'react';
import { SingleCareCharge } from './SingleCareCharge';

export default {
  title: 'Pages/CareCharges/SingleCareCharge',
  component: SingleCareCharge,
  argTypes: {
    SingleCareCharge: {},
  },
};

const Template = (args) => <SingleCareCharge {...args} />;

export const Page = Template.bind({});
Page.args = {
};
