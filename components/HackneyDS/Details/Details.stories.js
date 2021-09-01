import React from 'react';
import Details from '.';

export default {
  title: 'Hackney Design System/Details',
  component: Details,
  argTypes: {
    open: {type: 'boolean'},
    value: { type: 'object' },
  },
};

const Template = (args) => <Details {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: (
    <>
      <span slot="title">Title example</span>
      <span slot="content">Content example</span>
    </>
  ).props.children,
};

export const Expanded = Template.bind({});

Expanded.args = {
  children: (
    <>
      <span slot="title">Title example</span>
      <span slot="content">Content example</span>
    </>
  ).props.children,
  open: true,
};

export const WithHtml = Template.bind({});

WithHtml.args = {
  children: (
    <>
      <span slot="title">Title example</span>
      <span slot="content">
        Your National Insurance number can be found on
        <ul>
          <li>your National Insurance card</li>
          <li>your payslip</li>
          <li>P60</li>
          <li>benefits information</li>
          <li>tax return</li>
        </ul>
      </span>
    </>
  ).props.children,
};
