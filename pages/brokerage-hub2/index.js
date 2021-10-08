import React from 'react';
import faker from 'faker';
import { BrokerageHub as BrokerageHubPage } from 'components/Brokerage/BrokerageHub';

const BrokerageHub = () => {
  const statuses = ['new', 'in-progress', 'waiting-approval', 'not-approved', 'approved'];
  const statusOptions = [
    { text: 'Status-1', value: 'status-1' },
    { text: 'Status-2', value: 'status-2' },
  ];
  const brokerOptions = [
    { text: 'Broker-1', value: 'broker-1' },
    { text: 'Broker-2', value: 'broker-2' },
  ];

  const results = [
    {
      mosaicId: 786288,
      userName: faker.name.findName(),
      packageStatus: faker.random.arrayElement(statuses),
      dateOfBirth: new Date(1972, 11, 9),
      address: '1 Hillman Street, London, E8 1DY',
      packageName: 'Nursing Care',
      brokerName: faker.name.findName(),
      assigned: faker.date.past(20),
    },
    {
      mosaicId: 786289,
      userName: faker.name.findName(),
      packageStatus: 'new',
      address: '1 Hillman Street, London, E8 1DY',
      dateOfBirth: new Date(1972, 11, 9),
      packageName: 'Nursing Care',
      brokerName: faker.name.findName(),
      assigned: faker.date.past(20),
    },
    {
      mosaicId: 786290,
      userName: faker.name.findName(),
      packageStatus: 'new',
      address: '1 Hillman Street, London, E8 1DY',
      dateOfBirth: new Date(1972, 11, 9),
      packageName: 'Nursing Care',
      brokerName: faker.name.findName(),
      assigned: faker.date.past(20),
    },
    {
      mosaicId: 786291,
      userName: faker.name.findName(),
      packageStatus: 'new',
      address: '1 Hillman Street, London, E8 1DY',
      dateOfBirth: new Date(1972, 11, 9),
      packageName: 'Nursing Care',
      brokerName: faker.name.findName(),
      assigned: faker.date.past(20),
    },
    {
      mosaicId: 786292,
      userName: faker.name.findName(),
      packageStatus: 'new',
      address: '1 Hillman Street, London, E8 1DY',
      dateOfBirth: new Date(1972, 11, 9),
      packageName: 'Nursing Care',
      brokerName: faker.name.findName(),
      assigned: faker.date.past(20),
    },
  ];

  const searchResults = {
    totalCount: 30,
    totalPages: 3,
    pageSize: 10,
    items: results,
  };

  return (
    results && (
      <BrokerageHubPage statusOptions={statusOptions} brokerOptions={brokerOptions} searchResults={searchResults} />
    )
  );
};
export default BrokerageHub;
