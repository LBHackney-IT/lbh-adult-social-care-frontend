import React from 'react';
import { TreeView } from './index';

export default {
  title: 'Hackney Design System/TreeView',
  component: TreeView,
  argTypes: {},
};

const Template = (args) => <TreeView {...args} />;

export const Default = Template.bind({});
Default.args = {
  items: [
    { id: '1', children: [{ id: '1a', children: [{ id: '1aa', children: [] }] }] },
    { id: '2', children: [{ id: '2a', children: [] }] },
  ],
  renderItem: (item) => <h1>id: {item.id}</h1>,
};
