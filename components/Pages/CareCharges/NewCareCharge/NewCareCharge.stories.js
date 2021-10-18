import React, { useState } from 'react';
import { NewCareCharge } from './index';
import faker from 'faker';

export default {
  title: 'Pages/CareCharges/NewCareCharge',
  component: NewCareCharge,
  argTypes: {
    NewCareCharge: {},
  },
};

const Template = (args) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [filters, setFilters] = useState({
    status: '',
    date: '',
    modifiedBy: '',
  });

  return <NewCareCharge {...args} filters={filters} setFilters={setFilters} pageNumber={pageNumber} setPageNumber={setPageNumber}/>;
};

export const Default = Template.bind({});
Default.args = {
  searchResults: {
    data: [
      {
        userName: faker.name.findName(),
        statusIds: [4],
        dateOfBirth: new Date(1972, 12, 9),
        address: '1 Hillman Street, London, E8 1DY',
        mosaicId: '786288',
        packageName: 'Nursing Care',
        startDate: new Date(2021, 8, 20),
        lastModified: new Date(2021, 8, 20),
        modifiedBy: faker.name.findName(),
      },
      {
        userName: faker.name.findName(),
        statusIds: [4, 5],
        dateOfBirth: new Date(1972, 12, 9),
        address: '1 Hillman Street, London, E8 1DY',
        mosaicId: '786289',
        packageName: 'Nursing Care',
        startDate: new Date(2021, 8, 20),
        lastModified: new Date(2021, 8, 20),
        modifiedBy: faker.name.findName(),
      },
    ],
    pagingMetaData: {
      totalPages: 1,
      totalCount: 3,
      pageSize: 3,
    },
  }
};
