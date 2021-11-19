import React from 'react';
import { Pagination } from '.';

export default {
  title: 'Hackney Design System/Pagination/Pagination',
  component: Pagination,
  argTypes: {
    onPageChange: {
      control: false,
    },
  },
};

const Template = (args) => <Pagination {...args} />;

export const Default = Template.bind({});

Default.args = {
  totalCount: 100,
  currentPage: 1,
  pageSize: 10,
  siblingCount: 1,
};
