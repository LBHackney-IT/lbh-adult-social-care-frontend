import React from 'react';
import Collapsible from '.';

export default {
  title: 'Hackney Design System/Collapsible',
  component: Collapsible,
};

const Template = (args) => <Collapsible {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: (
    <>
      <div slot="title">Collapsible</div>
      <div slot="content">Content example</div>
    </>
  ).props.children,
  collapsed: false
};
