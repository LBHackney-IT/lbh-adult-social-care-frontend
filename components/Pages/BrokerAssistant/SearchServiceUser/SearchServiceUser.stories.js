import React, { useState } from 'react';
import faker from 'faker';
import SearchServiceUser from './index';

export default {
  title: 'Pages/Broker Assistant/SearchServiceUser',
  component: SearchServiceUser,
  argTypes: {
    controls: null,
  },
};

const Template = (args) => {
  const [pageNumber, setPageNumber] = useState(1);
  return <SearchServiceUser {...args} pageNumber={pageNumber} setPageNumber={setPageNumber} />;
}

export const Default = Template.bind({});
Default.args = {
  totalCount: 3,
  totalPages: 3,
  pushRoute: (item) => alert(`push route with id: ${item.id}`),
  searchResults: [
    {
      id: 1,
      address: 'E9 6EY',
      userName: faker.name.findName(),
      dateOfBirth: new Date(1972, 12, 9),
      hackneyId: '786288',
    },
    {
      id: 2,
      address: 'E9 6EY',
      userName: faker.name.findName(),
      dateOfBirth: new Date(1972, 12, 9),
      hackneyId: '786288',
    },
    {
      id: 3,
      address: 'E9 6EY',
      userName: faker.name.findName(),
      dateOfBirth: new Date(1972, 12, 9),
      hackneyId: '786288',
    },
  ]
};
