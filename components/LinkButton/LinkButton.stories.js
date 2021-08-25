import React from 'react';
import LinkButton from '.';

export default {
  title: 'Hackney Design System/LinkButton',
  component: LinkButton,
  argTypes: {
    onClick: {
      control: false,
    },
  },
};

const Template = (args) => <LinkButton {...args} />;

export const Link = Template.bind({});

Link.args = {
  children: 'Link button',
  secondary: false,
  disabled: false,
  link: '/example',
};

export const DisabledLink = Template.bind({});

DisabledLink.args = {
  children: 'Disabled link',
  secondary: false,
  disabled: true,
  link: '/example',
};
