import React from 'react';
import faker from 'faker';
import { ClientDetails } from './ClientDetails';

export default {
  title: 'Pages/CareCharges/SingleCareCharge/ClientDetails',
  component: ClientDetails,
  argTypes: {
    ClientDetails: {},
  },
};

const Template = (args) => <ClientDetails {...args} />;

export const Default = Template.bind({});
Default.args = {
  clientDetails: {
    name: faker.name.findName(),
    birthday: faker.date.past(90),
    address: faker.address.streetAddress(),
    mosaicId: faker.random.alphaNumeric(6),
    cederId: faker.random.alphaNumeric(7),
  },
};
