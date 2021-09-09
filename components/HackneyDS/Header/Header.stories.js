import React from 'react';
import Header from '.';

export default {
  title: 'Hackney Design System/Header',
  component: Header,
};

const Template = (args) => <Header {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: (<></>).props.children,
};

export const Fixed = Template.bind({});

Fixed.args = {
  children: (<></>).props.children,
  fixed: true,
};

export const WithServiceName = Template.bind({});

WithServiceName.args = {
  children: (
    <>
      <span slot="service-name">Manage a tenancy</span>
    </>
  ).props.children,
};

export const WithLinks = Template.bind({});

WithLinks.args = {
  children: (
    <>
      <span slot="service-name">Manage a tenancy</span>
      <p slot="link">Anne James</p>
      <a slot="link" href="">
        Sign out
      </a>
    </>
  ).props.children,
};

export const ShortServiceName = Template.bind({});

ShortServiceName.args = {
  children: (
    <>
      <span slot="short-name">Intranet</span>
      <p slot="link">Anne James</p>
      <a slot="link" href="">
        Sign out
      </a>
    </>
  ).props.children,
};

export const PurpleScheme = Template.bind({});

PurpleScheme.args = {
  children: (
    <>
      <span slot="short-name">Intranet</span>
    </>
  ).props.children,
  purple: true,
};
