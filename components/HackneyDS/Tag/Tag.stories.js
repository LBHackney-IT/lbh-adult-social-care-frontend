import React from 'react';
import { Tag } from '../index';

export default {
  title: 'Hackney Design System/Tag',
  component: Tag,
  argTypes: {
    yellow: { type: 'boolean' },
    red: { type: 'boolean' },
    green: { type: 'boolean' },
    gray: { type: 'boolean' },
    className: { type: 'string' },
  },
};

const Template = (args) => <Tag {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: 'New',
  className: '',
};

export const Green = Template.bind({});

Green.args = {
  children: 'Approved',
  className: '',
  green: true,
};

export const Yellow = Template.bind({});

Yellow.args = {
  children: 'In review',
  className: '',
  yellow: true,
};

export const Red = Template.bind({});

Red.args = {
  children: 'Overdue',
  className: '',
  red: true,
};

export const Grey = Template.bind({});

Grey.args = {
  children: 'Archived',
  className: '',
  grey: true,
};
