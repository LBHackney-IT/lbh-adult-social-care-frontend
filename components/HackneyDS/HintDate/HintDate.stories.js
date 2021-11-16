import React from 'react';
import { HintDate } from '.';

export default {
  title: 'Hackney Design System/HintDate',
  component: HintDate,
};

const Template = (args) => <HintDate {...args} />;

export const Default = Template.bind({});

Default.args = {
  dateFrom: new Date(2021, 2, 23),
  dateTo: new Date(2021, 3, 5),
};
