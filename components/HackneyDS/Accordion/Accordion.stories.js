import React from 'react';
import Accordion from '.';

export default {
  title: 'Hackney Design System/Accordion',
  component: Accordion,
  argTypes: {},
};

const Template = (args) => <Accordion {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <div expanded key={Math.random()}>
        <div slot="header">Section A</div>
        <div slot="content">Example item 1</div>
      </div>
      <div key={Math.random()}>
        <div slot="header">Section B</div>
        <div slot="content">Example item 2</div>
      </div>
    </>
  ).props.children,
};

export const ExpandAllButtonEnabled = Template.bind({});
ExpandAllButtonEnabled.args = {
  expandAll: true,
  children: (
    <>
      <div expanded key={Math.random()}>
        <div slot="header">Section A</div>
        <div slot="content">Example item 1</div>
      </div>
      <div key={Math.random()}>
        <div slot="header">Section B</div>
        <div slot="content">Example item 2</div>
      </div>
    </>
  ).props.children,
};
