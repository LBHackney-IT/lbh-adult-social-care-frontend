import React from 'react';
import { Link } from '../index';

export default {
  title: 'Hackney Design System/Link',
  component: Link,
  argTypes: {
    text: { type: 'string' },
    className: { type: 'string' },
    href: { type: 'string' },
  },
};

const Template = (args) => <Link {...args} />;

export const Default = Template.bind({});

Default.args = {
  text: 'Default label text',
  className: '',
};
