import React from 'react';
import { Tag } from '../index';

export default {
  title: 'Hackney Design System/Tag',
  component: Tag,
  argTypes: {
    color: { type: '' },
    className: { type: 'string' },
  },
};

const Template = (args) => <Tag {...args} />;

export const Green = Template.bind({});
Green.args = {
  children: 'Approved',
  className: '',
  color: 'green',
};

export const Yellow = Template.bind({});
Yellow.args = {
  children: 'In review',
  className: '',
  color: 'yellow',
};

export const Red = Template.bind({});
Red.args = {
  children: 'Overdue',
  className: '',
  color: 'red',
};

export const Blue = Template.bind({});
Blue.args = {
  children: 'Archived',
  className: '',
  color: 'blue',
};

export const Gray = Template.bind({});
Gray.args = {
  children: 'Archived',
  className: '',
  color: 'gray',
};
