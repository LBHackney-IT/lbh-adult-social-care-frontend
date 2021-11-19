import React from 'react';
import { Link } from '../../index';

export default {
  title: 'Hackney Design System/Lettering/Link',
  component: Link,
  argTypes: {
    children: { type: 'string' },
    className: { type: 'string' },
    href: { type: 'string' },
  },
};

const Template = (args) => <Link {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: 'Default link text',
  className: '',
};
