import React from 'react';
import faker from 'faker';
import { Heading, Label, HorizontalSeparator, VerticalSeparator, Button, Container } from '../../../HackneyDS';
import { ClientDetails } from './ClientDetails/ClientDetails';
import { PackageDetails } from './PackageDetails/PackageDetails';
import { SingleCareChargeTable } from './SingleCareChargeTable';

export const SingleCareCharge = () => {
  const data = [
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
  ];

  const clientDetails = {
    name: faker.name.findName(),
    birthday: faker.date.past(90),
    address: faker.address.streetAddress(),
    mosaicId: faker.random.alphaNumeric(6),
    cederId: faker.random.alphaNumeric(7),
  };

  const yesOrNo = ['Yes', 'No'];

  const DummyPackageDetails = {
    careSource: 'Care Home Ltd',
    startDate: faker.date.past(5),
    endDate: faker.date.future(10),
    respiteCare: yesOrNo[Math.round(Math.random())],
    immediatePackage: yesOrNo[Math.round(Math.random())],
    dischargePackage: yesOrNo[Math.round(Math.random())],
    stayType: 'Long term (52+ weeks)',
    s117: yesOrNo[Math.round(Math.random())],
  };

  return (
    <div>
      <Container padding="16px" background="#F8F8F8">
        <ClientDetails clientDetails={clientDetails} />
      </Container>
      <HorizontalSeparator height="30px" />
      <Container display="flex" alignItems="flex-start" padding="0px 16px 16px 16px" justifyContent="stretch">
        <Container display="flex" flexDirection="column" flex="1">
          <Label>Active package details</Label>
          <HorizontalSeparator height="8px" />
          <Heading size="l">Residential Care</Heading>
          <HorizontalSeparator height="16px" />
          <Container display="flex">
            <Container padding="16px" background="#F8F8F8" width="fit-content">
              <PackageDetails packageDetails={DummyPackageDetails} />
            </Container>
            <VerticalSeparator width="20px" />
            <Container display="flex" flexDirection="column" alignItems="flex-end" flex="1">
              {data && <SingleCareChargeTable data={data} />}
              <HorizontalSeparator height="16px" />
              <Button>Add financial assessment</Button>
            </Container>
          </Container>
        </Container>
      </Container>
    </div>
  );
};
