import React from 'react';
import { Heading } from './index';

export default {
  title: 'Hackney Design System/Lettering/Heading',
  component: Heading,
  argTypes: {
    children: { type: 'string' },
  },
};

const Template = (args) => <Heading {...args} />;

export const NoSizeSpecified = Template.bind({});
NoSizeSpecified.args = {
  children: 'Default/No Size Specified',
};

export const SmallHeading = Template.bind({});
SmallHeading.args = {
  children: 'Small Heading',
  size: 's',
};

export const MediumHeading = Template.bind({});
MediumHeading.args = {
  children: 'Medium Heading',
  size: 'm',
};

export const LargeHeading = Template.bind({});
LargeHeading.args = {
  children: 'Large Heading',
  size: 'l',
};

export const ExtraLargeHeading = Template.bind({});
ExtraLargeHeading.args = {
  children: 'Extra Large Heading',
  size: 'xl',
};
