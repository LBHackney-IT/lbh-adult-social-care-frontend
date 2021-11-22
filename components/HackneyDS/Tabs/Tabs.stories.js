import React from 'react';
import { Tab } from './Tab';
import { Tabs } from ".";

export default {
  title: 'Hackney Design System/Tabs',
  component: Tabs,
  argTypes: {
    onClick: {
      control: false,
    },
  },
};

const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];
const Template = (args) => (
  <Tabs {...args}>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
    <Tab>Tab 3</Tab>
  </Tabs>
);

export const Default = Template.bind({});

Default.args = {
  title: 'Tabs Example',
  tabs,
  initialTab: 0,
};

export const InitialTab = Template.bind({});

InitialTab.args = {
  title: 'Tabs Example',
  tabs,
  initialTab: 2,
};
