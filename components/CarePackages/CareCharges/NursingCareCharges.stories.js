import React, { useState } from 'react';
import { NursingCareCharges } from './NursingCareCharges';
import faker from 'faker';

export default {
  title: 'Pages/CareCharges/NursingCareCharges',
  component: NursingCareCharges,
  argTypes: {
    SingleCareCharge: {},
  },
};

const Template = (args) => {
  const [reasonCollectingCharges, setReasonCollectingCharges] = useState('');
  const [collectingCharges, setCollectingCharges] = useState('');
  const [provisionalAge, setProvisionalAge] = useState('25-29');
  const [provisionalCost, setProvisionalCost] = useState('');
  const [careChargeErrors, setCareChargeErrors] = useState({
    provisionalCost: '',
    reasonCollectingCharges: '',
  });

  return (
    <NursingCareCharges
      careChargeErrors={careChargeErrors}
      collectingCharges={collectingCharges}
      provisionalAge={provisionalAge}
      provisionalCost={provisionalCost}
      reasonCollectingCharges={reasonCollectingCharges}
      setCollectingCharges={setCollectingCharges}
      setProvisionalCost={setProvisionalCost}
      setReasonCollectingCharges={setReasonCollectingCharges}
      {...args}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};

export const AfterCareChargeTeam = Template.bind({});
AfterCareChargeTeam.args = {
  collectingCharges: 'hackney-council',
  tableData: [
    {
      status: 'Active',
      element: 'Residential Care / wk',
      startDate: faker.date.past(20),
      cost: 1000,
    },
    {
      status: 'Active',
      element: 'Additional needs payment / wk',
      startDate: faker.date.past(20),
      cost: 100,
    },
    {
      status: 'End',
      element: 'Residential SU contribution',
      startDate: faker.date.past(20),
      endDate: faker.date.future(20),
      cost: -100,
    },
    {
      status: 'Active',
      element: 'Residential SU contribution',
      startDate: faker.date.past(20),
      endDate: faker.date.future(20),
      cost: -200,
    },
    {
      status: 'Active',
      element: 'Residential SU contribution',
      startDate: faker.date.past(20),
      endDate: faker.date.future(20),
      cost: -200,
    },
  ],
};
