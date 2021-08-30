import React from 'react';
import { Link } from '../../index';

export default {
  title: 'Hackney Design System/Link',
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
  children: 'Default label text',
  className: '',
};
