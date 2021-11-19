import React from 'react';
import WarningText from '.';

export default {
  title: 'Hackney Design System/Info Text/WarningText',
  component: WarningText,
  argTypes: {
    children: { type: 'object' },
  },
};

const Template = (args) => <WarningText {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: (
    <span>
      It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application.
    </span>
  ).props.children,
};
