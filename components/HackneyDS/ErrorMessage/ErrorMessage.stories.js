import React from 'react';
import { ErrorMessage } from '../index';

export default {
  title: 'Hackney Design System/ErrorMessage',
  component: ErrorMessage,
  argTypes: {
    text: { type: 'string' },
    className: { type: 'string' },
  },
};

const Template = (args) => <ErrorMessage {...args} />;

export const Default = Template.bind({});

Default.args = {
  text: 'Default error message text',
  className: '',
};
