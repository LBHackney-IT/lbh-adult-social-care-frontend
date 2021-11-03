import React from 'react';
import withSession from 'lib/session';
import { getLoggedInUser } from 'service';
import { Breadcrumbs, BrokerageHeader, Button, Container, Heading, HorizontalSeparator, Tab, Tabs } from 'components';
import { PayrunFilters } from 'components/Pages/Payruns/PayrunFilters';
import AlternativePagination from 'components/AlternativePagination';
import { PayrunList } from 'components/Pages/Payruns/PayrunList';
import faker from 'faker';

export const getServerSideProps = withSession(({ req }) => {
  const user = getLoggedInUser({ req });
  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return { props: {} };
});

const Payruns = () => {
  const breadcrumbs = [{ text: 'Home', href: '/' }, { text: 'Finance' }];
  const tabs = ['Pay Runs', 'Held Payments'];

  const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  const generateData = (total) => {
    const mockData = [];
    const statuses = ['Paid', 'Paid with holds', 'Awaiting Approval'];
    for (let index = 0; index < total; index++) {
      const datum = {
        payRunId: faker.datatype.uuid().substring(12),
        payRunTypeId: 0,
        payRunTypeName: 'Residential Recurring',
        payRunStatusId: 0,
        payRunStatusName: statuses[randomIntFromInterval(0, 2)],
        totalAmountPaid: faker.datatype.number(100000),
        totalAmountHeld: faker.datatype.number(10000),
        dateCreated: faker.date.past(1),
      };
      mockData.push(datum);
    }
    return mockData;
  };
  return (
    <Container>
      <BrokerageHeader />
      <Container background="#FAFAFA" padding="0 0 60px 0">
        <Container maxWidth="1080px" margin="0 auto" padding="0 60px">
          <HorizontalSeparator height="10px" />
          <Breadcrumbs values={breadcrumbs} />
          <HorizontalSeparator height="30px" />
          <Container display="flex" justifyContent="space-between">
            <Heading size="xl">Pay Runs</Heading>
            <Button largeButton>New pay run</Button>
          </Container>
          <HorizontalSeparator height="16px" />
          <PayrunFilters />
        </Container>
      </Container>
      <HorizontalSeparator height="30px" />
      <Container maxWidth="1080px" margin="0 auto" padding="0 60px">
        <Tabs tabs={tabs}>
          <Tab>
            <PayrunList data={generateData(10)} />
            <HorizontalSeparator height="30px" />
            {1 && (
              <AlternativePagination
                totalPages={3}
                totalCount={30}
                pageSize={10}
                currentPage={1}
                changePagination={() => {}}
              />
            )}
          </Tab>
          <Tab>
            <PayrunList data={generateData(6)} />
            <HorizontalSeparator height="30px" />
            {1 && (
              <AlternativePagination
                totalPages={1}
                totalCount={7}
                pageSize={10}
                currentPage={1}
                changePagination={() => {}}
              />
            )}
          </Tab>
        </Tabs>
      </Container>
    </Container>
  );
};

export default Payruns;
