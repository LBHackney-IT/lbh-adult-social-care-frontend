import React from 'react';
import Breadcrumbs from '.';

export default {
  title: 'Hackney Design System/Breadcrumbs',
  component: Breadcrumbs,
};

const Template = (args) => <Breadcrumbs {...args} />;

export const Default = Template.bind({});

Default.args = {
  values: [
    {
      text: 'Section',
      onClick() {
        alert(this.text);
      },
    },
    {
      text: 'Second Part',
      onClick() {
        alert(this.text);
      },
    },
  ],
};
