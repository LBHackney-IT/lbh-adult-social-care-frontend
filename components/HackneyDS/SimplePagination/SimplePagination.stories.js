import React from 'react';
import { SimplePagination } from '.';

export default {
  title: 'Hackney Design System/SimplePagination',
  component: SimplePagination,
  argTypes: {
    totalCount: { type: 'number' },
    currentPage: { type: 'number' },
    showPageNumber: { type: 'boolean' },
  },
};

const Template = (args) => <SimplePagination {...args} />;

export const Default = Template.bind({});
Default.args = {
  totalCount: 3,
  currentPage: 2,
  titles: ['Title here'],
};

export const FirstPage = Template.bind({});
FirstPage.args = {
  totalCount: 3,
  currentPage: 1,
  titles: ['Title here'],
};

export const ShowPageNumber = Template.bind({});
ShowPageNumber.args = {
  totalCount: 3,
  currentPage: 2,
  showPageNumber: true,
};

export const WithTitle = Template.bind({});
WithTitle.args = {
  totalCount: 3,
  currentPage: 2,
  titles: ['First page title', 'Second page title', 'Third page title'],
};
