import React from 'react';
import CookieBanner from '.';

export default {
  title: 'Hackney Design System/Info Text/CookieBanner',
  component: CookieBanner,
  argTypes: {
    'policy-link': { type: 'string' },
    handler: {
      control: false,
    },
  },
};

const Template = (args) => <CookieBanner {...args} />;

export const Default = Template.bind({});

Default.args = {
  'policy-link': '/example',
  handler: () => alert('Accepted'),
};
