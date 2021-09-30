import React from 'react';
import { CorePackageDetails } from './index';

export default {
  title: 'Pages/Remove Approvals/CorePackageDetails',
  component: CorePackageDetails,
  argTypes: {
    checked: { type: 'boolean' },
    small: { type: 'boolean' },
    disabled: { type: 'boolean' },
    value: { type: 'string' },
    id: { type: 'string' },
    name: { type: 'string' },
    handler: { control: false },
  },
};

const testUserDetails = {
  client: 'James Stevens',
  hackneyId: '786288',
  dateOfBirth: new Date(1972, 12, 9),
  postcode: 'E9 6EY',
};

const testSupportReasonOptions = [
  { value: 'reason-1', text: 'Support reason 1' },
  { value: 'reason-2', text: 'Support reason 2' }
];

const testPackageTypeOptions = [
  { value: 'package-type-1', text: 'Package type 1' },
  { value: 'package-type-2', text: 'Package type 2' }
];

const testCheckboxOptions = [
  { id: 'respite-care', label: 'Respite care' },
  { id: 'hospital-avoidance', label: 'Hospital avoidance' },
  { id: 'discharge-package', label: 'Discharge package' },
  { id: 're-enablement-package', label: 'Re-enablement package' },
  { id: 'S117-client', label: 'S117 client' },
];

const testPackageScheduleOptions = [
  {
    id: 'interim-or-immediate-service',
    label: <p>Interim or immediate service <br/><span>(6 weeks and under)</span></p>
  },
  { id: 'temporary', label: <p>Temporary <br/><span>(expected 52 weeks or under)</span></p> },
  { id: 'long-term', label: <p>Long term <br/><span>(52+ weeks)</span></p> },
];

const Template = (args) => <CorePackageDetails {...args} />;

export const Default = Template.bind({});
Default.args = {
  userDetails: testUserDetails,
  packageScheduleOptions: testPackageScheduleOptions,
  supportReasonOptions: testSupportReasonOptions,
  checkboxOptions: testCheckboxOptions,
  packageTypeOptions: testPackageTypeOptions,
};
