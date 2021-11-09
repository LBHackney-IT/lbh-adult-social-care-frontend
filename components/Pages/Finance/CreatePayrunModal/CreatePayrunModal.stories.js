import React from 'react';
import CreatePayrunModal from '.';

export default {
  title: 'Pages/Finance/CreatePayrunModal',
  component: CreatePayrunModal,
  argTypes: {
    control: null,
  },
};

const Template = (args) => <CreatePayrunModal {...args} />;

export const Default = Template.bind({});

Default.args = {};