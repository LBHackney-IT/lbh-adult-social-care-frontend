import React from 'react';
import { Collapse } from './Collapse';
import { ArrowTopIcon, CaretDownIcon } from '../../Icons';

export default {
  title: 'Hackney Design System/Accordion/Collapse',
  component: Collapse,
};

const Template = (args) => <Collapse {...args}>{args.children}</Collapse>;

export const Default = Template.bind({});

Default.args = {
  children: <p>children content</p>,
  title: <p>Title Content</p>
};

export const Expanded = Template.bind({});
Expanded.args = {
  children: <p>children content</p>,
  title: <p>Title Content</p>,
  expanded: true,
};

export const IconComponent = Template.bind({});
IconComponent.args = {
  children: <p>children content</p>,
  title: <p>Title Content</p>,
  IconComponent: ArrowTopIcon,
  isNegativeRotationAnimation: true,
};

export const AnotherIconComponent = Template.bind({});
AnotherIconComponent.args = {
  children: <p>children content</p>,
  title: <p>Title Content</p>,
  IconComponent: CaretDownIcon,
};
