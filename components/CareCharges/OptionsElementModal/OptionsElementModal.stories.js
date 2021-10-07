import React from 'react';
import { OptionsElementModal } from './index';

export default {
  title: 'Pages/CareCharges/OptionsElementModal',
  component: OptionsElementModal,
  argTypes: {
    EditElementModal: {},
  },
};

const Template = (args) => <OptionsElementModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  options: [
    { id: 'edit-element', label: 'Edit element' },
    { id: 'end-element', label: 'End element' },
    { id: 'cancel-element', label: 'Cancel element' },
  ]
};
