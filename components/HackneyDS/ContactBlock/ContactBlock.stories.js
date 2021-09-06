import React from 'react';
import { ContactBlock } from './index';

export default {
  title: 'Hackney Design System/ContactBlock',
  component: ContactBlock,
  argTypes: {},
};

const Template = (args) => <ContactBlock {...args} />;

export const Default = Template.bind({});
Default.args = {
  withMap: true,
  serviceName: 'Default Service Name',
  mapMarkers: [
    [51.545386, -0.057069],
  ],
  openingTimes: [
    'Monday: Closed',
    'Tuesday: 9:30am - 5:30pm',
    'Wednesday: 9:30am - 5:30pm',
    'Thursday: 9:30am - 8:00pm',
    'Friday: 9:30am - 5:30pm',
    'Saturday: 10:00am - 5:30pm',
    'Sunday: Closed',
  ],
  email: 'iamanemail@hackney.gov.uk',
  addresses: [
    'Service Centre',
    '1 Hillman Street',
    'E8 1DY'
  ],
  telephones: [
    '020 8356 3000',
    '020 8356 3736',
  ],
  notes: [
    'Visitor centre open daily 10am-3pm except public holidays.',
  ],
};

export const WithoutMap = Template.bind({});
WithoutMap.args = {
  serviceName: 'WithoutMap Service Name',
  openingTimes: [
    'Monday: Closed',
    'Tuesday: 9:30am - 5:30pm',
    'Wednesday: 9:30am - 5:30pm',
    'Thursday: 9:30am - 8:00pm',
    'Friday: 9:30am - 5:30pm',
    'Saturday: 10:00am - 5:30pm',
    'Sunday: Closed',
  ],
  email: 'iamanemail@hackney.gov.uk',
  addresses: [
    'Service Centre',
    '1 Hillman Street',
    'E8 1DY'
  ],
  telephones: [
    '020 8356 3000',
    '020 8356 3736',
  ],
  notes: [
    'Visitor centre open daily 10am-3pm except public holidays.',
  ],
};
