import React, { useState } from 'react';
import Pagination from '.';

export default {
  title: 'Hackney Design System/Pagination',
  component: Pagination,
  argTypes: {
    meta: { type: 'object' },
  },
};

const Template = (args) => {
  const [meta, setMeta] = useState({
    currentPage: 3,
    from: 101,
    to: 150,
    lastPage: 5,
    total: 246,
  });
  return <Pagination {...args} meta={meta} action={(e) => setMeta({ ...meta, currentPage: e })} />;
};

export const Default = Template.bind({});

Default.args = {
  meta: {
    currentPage: 3,
    from: 101,
    to: 150,
    lastPage: 5,
    total: 246,
  },
  action(to) {
    alert('Go to page ' + to);
  },
};
