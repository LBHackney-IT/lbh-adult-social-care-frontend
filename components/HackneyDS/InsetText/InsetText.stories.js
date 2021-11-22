import React from 'react';
import InsetText from '.';

export default {
  title: 'Hackney Design System/InsetText',
  component: InsetText,
};

const Template = (args) => <InsetText {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: (
    <span>
      It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application.
    </span>
  ).props.children,
};
