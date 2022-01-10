import React from 'react';
import { Button, Container, HorizontalSeparator, VerticalSeparator } from '../index';

export default {
  title: 'Hackney Design System/Button',
  component: Button,
  argTypes: {
    onClick: {
      control: false,
    },
  },
};

const Template = (args) => {
  if (args.coloredButtons) return args.coloredButtons;

  return <Button {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  children: 'Default button',
  secondary: false,
  disabled: false,
  link: '',
  addItem: false,
};

export const Secondary = Template.bind({});

Secondary.args = {
  children: 'Secondary button',
  secondary: true,
  disabled: false,
  link: '',
  addItem: false,
};

export const Disabled = Template.bind({});

Disabled.args = {
  children: 'Button',
  disabled: true,
  linkBtn: false,
};

export const Link = Template.bind({});

Link.args = {
  children: 'Link button',
  secondary: false,
  disabled: false,
  outline: false,
  color: '',
  link: '/example',
  addItem: false,
};

export const DisabledLink = Template.bind({});

DisabledLink.args = {
  children: 'Disabled link',
  secondary: false,
  disabled: true,
  link: '/example',
  addItem: false,
};

export const AddAnotherItemButton = Template.bind({});

AddAnotherItemButton.args = {
  children: 'Add another item',
  secondary: false,
  disabled: false,
  link: '',
  addItem: true,
};

export const LoadingComponentButton = Template.bind({});
LoadingComponentButton.args = {
  children: 'Loading',
  secondary: false,
  disabled: true,
  isLoading: true,
  link: '',
};

export const OutlineButton = Template.bind({});
OutlineButton.args = {
  children: 'Loading',
  secondary: false,
  outline: true,
  disabled: true,
  isLoading: true,
  link: '',
};

export const ColoredButtons = Template.bind({});
ColoredButtons.args = {
  coloredButtons: (
    <Container className="storybook-buttons" display="flex">
      <Container>
        <Button>Primary</Button>
        <HorizontalSeparator height={10} />
        <Button secondary color="red">
          Secondary red
        </Button>
        <HorizontalSeparator height={10} />
        <Button secondary color="yellow">
          Secondary yellow
        </Button>
        <HorizontalSeparator height={10} />
        <Button secondary color="gray">
          Secondary gray
        </Button>
        <HorizontalSeparator height={10} />
        <Button secondary color="blue">
          Secondary blue
        </Button>
      </Container>
      <VerticalSeparator width={10} />
      <Container>
        <Button outline>Primary</Button>
        <HorizontalSeparator height={10} />
        <Button outline secondary color="red">
          Secondary red
        </Button>
        <HorizontalSeparator height={10} />
        <Button outline secondary color="yellow">
          Secondary yellow
        </Button>
        <HorizontalSeparator height={10} />
        <Button outline secondary color="gray">
          Secondary gray
        </Button>
        <HorizontalSeparator height={10} />
        <Button outline secondary color="blue">
          Secondary blue
        </Button>
      </Container>
    </Container>
  ),
};
