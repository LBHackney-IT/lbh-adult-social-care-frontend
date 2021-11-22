import React from 'react';
import BackToTop from '.';

export default {
  title: 'Hackney Design System/BackToTop',
  component: BackToTop,
};

const Template = (args) => <BackToTop {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: 'Back to Top',
  to: '#',
};
