import React from 'react';
import BackLink from '.';

export default {
  title: 'Hackney Design System/BackLink',
  component: BackLink,
};

const Template = (args) => <BackLink {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: 'Back link',
  to: '/#',
};
