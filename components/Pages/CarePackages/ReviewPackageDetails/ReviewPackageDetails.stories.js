import React from 'react';
import BrokerageBorderCost from '../BrokerageBorderCost';
import { ReviewPackageDetails } from './index';

export default {
  title: 'Pages/Brokerage/ReviewPackageDetails',
  component: ReviewPackageDetails,
  argTypes: {
    controls: null,
  },
};

const testUserDetails = {
  client: 'James Stevens',
  hackneyId: '786288',
  dateOfBirth: new Date(1972, 12, 9),
  postcode: 'E9 6EY',
};

const testSummary = [
  { key: 'Cost', value: '10' },
  { key: 'FNC payment', value: '10' },
  { key: 'Additional weekly cost', value: '10' },
  { key: 'Sub total cost of package', value: '120', className: 'brokerage__summary-cost' },
  { key: 'FNC (net collected at source)', value: '10' },
  { key: 'Care charges (gross collected from service user)', value: '10' },
  { key: 'Sub reclaimed by Hackney', value: '20', className: 'brokerage__summary-cost' },
  { key: 'Total weekly cost', value: '100', className: 'brokerage__summary-cost' },
  { key: 'Total one off payment', value: '10', className: 'brokerage__summary-cost' },
];

const fundedNursingCareClaimCollector = {
  2: 'Hackney Council (gross/net)',
  1: 'Supplier (gross/net)',
};

const careChargesClaimCollector = {
  2: 'Hackney Council (gross)',
  1: 'Supplier (net)',
};

const testPackageInfoItems = [
  {
    headerTitle: 'Residential',
    id: 1,
    costOfPlacement: 300,
    items: [
      {
        startDate: new Date(2021, 6, 1),
        endDate: new Date(2021, 9, 1),
        title: 'Supplier',
        place: 'Bupa Care Home Luke Site 1',
        id: '123456789',
        address: '15 Atherden Rd, Lower Clapton, London E5 0QP',
        serviceUserNeed: {
          term: 'Long term 52+ weeks',
          careType: ['Respite Care'],
        },
      }
    ],
  },
  {
    headerTitle: 'Weekly Additional Need',
    id: 2,
    items: [
      {
        id: '1',
        startDate: new Date(2021, 6, 1),
        endDate: new Date(2021, 9, 1),
        cost: 300,
      },
      {
        id: '2',
        startDate: new Date(2021, 6, 1),
        endDate: new Date(2021, 9, 1),
        cost: 300,
      }
    ],
    totalCostHeader: 'Total weekly need (Net Off)',
    totalCost: 375.20
  },
  {
    headerTitle: 'One Off Additional Need',
    id: 3,
    items: [
      {
        id: '3',
        startDate: new Date(2021, 6, 1),
        endDate: new Date(2021, 9, 1),
        cost: 187.60,
      }
    ],
    totalCostHeader: 'Total (Net Off)',
    details: (
      <>
        <p>
          <span className="font-weight-bold">FNC assessment been carried out: </span>
          Yes
        </p>
        <p>
          <span className="font-weight-bold">Collected by: </span>
          {fundedNursingCareClaimCollector[1]}
        </p>
        <p>
          <span className="font-weight-bold">FNC assessment: </span>
          <span className="link-button text-blue">View</span>
        </p>
      </>
    ),
    totalCostComponent: (
      <>
        <BrokerageBorderCost totalCost={84.9} totalCostHeader="Total (Gross)"/>
        <br/>
        <BrokerageBorderCost totalCost={84.9} totalCostHeader="Total (Net Off)"/>
      </>
    ),
  },
  {
    headerTitle: 'Care Charges',
    id: 4,
    items: [
      {
        id: '5',
        startDate: new Date(2021, 6, 1),
        endDate: new Date(2021, 9, 1),
        cost: 100.50,
      }
    ],
    details: (
      <>
        <p>
          <span className="font-weight-bold">Provisional care charge (pre-assessement)</span>
        </p>
        <p>
          <span className="font-weight-bold">Collected by: </span>
          {careChargesClaimCollector[2]}
        </p>
        <p className="font-weight-bold">Why is Hackney collecting these care charges: </p>
        <p>Service user unable to manage finances</p>
      </>
    ),
    totalCostComponent: (
      <>
        <BrokerageBorderCost totalCost={84.9} totalCostHeader="Total (Gross)"/>
        <br/>
        <BrokerageBorderCost totalCost={84.9} totalCostHeader="Total (Net Off)"/>
      </>
    ),
  },
];

const Template = (args) => <ReviewPackageDetails {...args} />;

export const Default = Template.bind({});
Default.args = {
  userDetails: testUserDetails,
  summary: testSummary,
  packageId: 1,
  packageInfoItems: testPackageInfoItems,
  title: 'Nursing Care',
  subTitle: 'Package details',
};
