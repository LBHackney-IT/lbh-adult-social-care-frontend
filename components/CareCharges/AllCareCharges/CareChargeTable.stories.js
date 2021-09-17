import React from 'react';
import { CareChargeTable } from './CareChargeTable';

export default {
  title: 'Pages/CareCharges/AllCareCharges/CareChargeTable',
  component: CareChargeTable,
  argTypes: {
    CareChargeTable: {},
  },
};

const Template = (args) => <CareChargeTable {...args} />;

export const Page = Template.bind({});
Page.args = {
};
