import React, { useState } from 'react';
import AlternativePagination from './index';

export default {
  title: 'Hackney Design System/AlternativePagination',
  component: AlternativePagination,
  argTypes: {
    onPageChange: {
      control: false,
    },
  },
};

const Template = (args) => {
  const [page, setPage] = useState(1);

  return <AlternativePagination {...args} currentPage={page} changePagination={setPage} />;
}

export const Default = Template.bind({});

Default.args = {
  totalCount: 100,
  currentPage: 1,
  pageSize: 10,
  totalPages: 10,
  siblingCount: 5,
};
