import React from 'react';
import { ClientStatus } from './ClientStatus';

export default {
  title: 'Pages/CareCharges/SingleCareCharge/ClientStatus',
  component: ClientStatus,
  argTypes: {
    ClientStatus: {},
  },
};

const Template = (args) => <ClientStatus {...args} />;

export const ExistingClient = Template.bind({});
ExistingClient.args = {
  status: 'existing',
};

export const NewClient = Template.bind({});
NewClient.args = {
  status: 'new',
};
