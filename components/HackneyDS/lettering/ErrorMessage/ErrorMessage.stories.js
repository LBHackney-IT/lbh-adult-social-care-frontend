import React from 'react';
import { ErrorMessage } from '../../index';

export default {
  title: 'Hackney Design System/Lettering/ErrorMessage',
  component: ErrorMessage,
  argTypes: {
    children: { type: 'string' },
    className: { type: 'string' },
  },
};

const Template = (args) => <ErrorMessage {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: 'Default error message text',
  className: '',
};
