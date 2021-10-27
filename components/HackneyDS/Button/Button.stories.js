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
  if(args.coloredButtons) return args.coloredButtons;

  return <Button {...args} />
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

export const ColoredButtons = Template.bind({});
ColoredButtons.args = {
  coloredButtons: (
    <Container className='storybook-buttons' display='flex'>
      <Container>
        <Button className='lbh-primary-button'>Primary</Button>
        <HorizontalSeparator height={10} />
        <Button className='secondary-red'>Secondary red</Button>
        <HorizontalSeparator height={10} />
        <Button className='secondary-yellow'>Secondary yellow</Button>
        <HorizontalSeparator height={10} />
        <Button className='secondary-gray'>Secondary gray</Button>
        <HorizontalSeparator height={10} />
        <Button className='secondary-blue'>Secondary blue</Button>
      </Container>
      <VerticalSeparator width={10} />
      <Container>
        <Button className='green outline'>Primary</Button>
        <HorizontalSeparator height={10} />
        <Button className='red outline'>Secondary red</Button>
        <HorizontalSeparator height={10} />
        <Button className='outline yellow'>Secondary yellow</Button>
        <HorizontalSeparator height={10} />
        <Button className='outline gray'>Secondary gray</Button>
        <HorizontalSeparator height={10} />
        <Button className='outline blue'>Secondary blue</Button>
      </Container>

    </Container>
  )
};
