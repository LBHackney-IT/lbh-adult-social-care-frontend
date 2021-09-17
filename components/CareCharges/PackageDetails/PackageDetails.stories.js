import React from 'react';
import faker from 'faker';
import { PackageDetails } from './PackageDetails';

export default {
  title: 'Pages/CareCharges/PackageDetails',
  component: PackageDetails,
  argTypes: {
    PackageDetails: {},
  },
};

const Template = (args) => <PackageDetails {...args} />;

const yesOrNo = ['Yes', 'No'];

export const Default = Template.bind({});
Default.args = {
  packageDetails: {
    careSource: 'Care Home Ltd',
    startDate: faker.date.past(5),
    endDate: faker.date.future(10),
    respiteCare: yesOrNo[Math.round(Math.random())],
    immediatePackage: yesOrNo[Math.round(Math.random())],
    dischargePackage: yesOrNo[Math.round(Math.random())],
    stayType: 'Long term (52+ weeks)',
    s117: yesOrNo[Math.round(Math.random())],
  },
};
