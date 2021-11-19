import React from 'react';
import Breadcrumbs from '.';

export default {
  title: 'Hackney Design System/Navigation/Breadcrumbs',
  component: Breadcrumbs,
};

const Template = (args) => <Breadcrumbs {...args} />;

export const Default = Template.bind({});

Default.args = {
  values: [
    {
      text: 'Section',
      href: '#',
    },
    {
      text: 'Second Part',
    },
  ],
};
