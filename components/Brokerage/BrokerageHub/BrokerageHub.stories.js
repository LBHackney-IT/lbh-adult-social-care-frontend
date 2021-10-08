import React from 'react';
import BrokerageHub from './index';
import faker from 'faker';

export default {
  title: 'Pages/Brokerage/BrokerageHub',
  component: BrokerageHub,
  argTypes: {
    control: false,
  },
};

const Template = (args) => <BrokerageHub {...args} />;

export const Default = Template.bind({});
const statuses = ['new', 'in-progress', 'waiting-approval', 'not-approved', 'approved'];
Default.args = {
  statusOptions: [
    { text: 'Status-1', value: 'status-1' },
    { text: 'Status-2', value: 'status-2' },
  ],
  brokerOptions: [
    { text: 'Broker-1', value: 'broker-1' },
    { text: 'Broker-2', value: 'broker-2' },
  ],
  searchResults: {
    totalCount: 30,
    totalPages: 3,
    pageSize: 10,
    items: [
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
    ]
  }
};