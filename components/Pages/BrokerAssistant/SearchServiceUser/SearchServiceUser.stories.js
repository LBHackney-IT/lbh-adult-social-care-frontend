import React, { useEffect, useState } from 'react';
import faker from 'faker';
import SearchServiceUser from './index';
import { getQueryParamsFromObject } from '../../../../api/Utils/ApiUtils';

export default {
  title: 'Pages/Broker Assistant/SearchServiceUser',
  component: SearchServiceUser,
  argTypes: {
    controls: null,
  },
};

const Template = (args) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [initialFilters] = useState({
    postcode: '',
    firstName: '',
    lastName: '',
    hackneyId: '',
    dateOfBirth: null,
  });
  const [filters, setFilters] = useState({ ...initialFilters });
  const [searchFilters, setSearchFilters] = useState({ ...initialFilters });

  const changeFilters = (field, value) => {
    setFilters(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({ ...initialFilters });
    setSearchFilters({ ...initialFilters });
  };

  const onSearch = () => setSearchFilters({ ...filters });

  useEffect(() => {
    if(searchFilters) {
      alert(`Search request with: ${getQueryParamsFromObject(searchFilters)}`)
    }
  }, [searchFilters])

  return (
    <SearchServiceUser
      {...args}
      onSearch={onSearch}
      clearFilters={clearFilters}
      filters={filters}
      changeFilters={changeFilters}
      allocateToBroker={(item) => alert(item)}
      viewPackageHistory={(item) => alert(item)}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
    />
  )
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
