import React from 'react';
import withSession from 'lib/session';
import { getLoggedInUser } from 'service';
import { Breadcrumbs, BrokerageHeader, Collapse, Container, Heading, HorizontalSeparator } from 'components';
import { useRouter } from 'next/router';
import { FINANCE_ROUTE } from 'routes/RouteConstants';
import { PayrunFilters } from 'components/Pages/Payruns/PayrunFilters';
import { SinglePayRunOverview } from 'components/Pages/Payruns/SinglePayRun/SinglePayRunOverview';
import { SinglePayRunBreakdown } from 'components/Pages/Payruns/SinglePayRun/SinglePayRunBreakdown';

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

const SinglePayRun = () => {
  const router = useRouter();
  const { guid: payRunId } = router.query;
  const breadcrumbs = [
    { text: 'Home', href: '/' },
    { text: 'Finance', href: FINANCE_ROUTE },
    { text: `Pay Run ${payRunId}` },
  ];

  const payRun = {
    id: 'e8c042ff-b7da-49ff-a5a2-5b9ddfd9c0a0',
    invoiceId: '4c0826c5-6ba0-4a22-8039-0f338c73c0d0',
    carePackageId: '89e13474-583b-408a-9230-7922a5e80528',
    serviceUserId: '35027d54-572e-4a0a-9aba-397a3471088c',
    serviceUserName: 'Emma Stone',
    supplierId: 12,
    supplierName: 'Derek Drinkwater',
    invoiceNumber: 'INV 10',
    packageTypeId: 2,
    packageType: 'Residential Care Package',
    grossTotal: 500.0,
    netTotal: 300.0,
    invoiceStatus: 5,
    assignedBrokerName: 'Herman Ferdinand',
    invoiceItems: [
      {
        id: 'facf1253-910f-46eb-9a2d-812bacae7801',
        name: 'Residential Care Core',
        fromDate: '2021-10-21T18:21:13.4075501+03:00',
        toDate: '2021-11-04T18:21:13.4076008+03:00',
        cost: 250.0,
        days: 14,
        quantity: 2.0,
        period: '2 weeks',
        totalCost: 500.0,
        claimCollector: 2,
        claimCollectorName: 'Hackney',
      },
    ],
  };

  return (
    <Container>
      <BrokerageHeader />
      <Container background="#FAFAFA" padding="0 0 60px 0">
        <Container maxWidth="1080px" margin="0 auto" padding="0 60px">
          <HorizontalSeparator height="10px" />
          <Breadcrumbs values={breadcrumbs} />
          <HorizontalSeparator height="30px" />
          <Heading size="xl">Pay Run {payRunId}</Heading>
          <HorizontalSeparator height="16px" />
          <PayrunFilters filters={{}} setFilters={{}} clearFilter={{}} />
        </Container>
      </Container>
      <HorizontalSeparator height="30px" />
      <Container maxWidth="1080px" margin="0 auto" padding="0 60px">
        <Container background="#FAFAFA" padding="24px 16px">
          <SinglePayRunOverview payRun={payRun} />
          <HorizontalSeparator height="15px" />
          <Collapse>
            <HorizontalSeparator height="40px" />
            <SinglePayRunBreakdown payRun={payRun} />
          </Collapse>
        </Container>
      </Container>
    </Container>
  );
};

export default SinglePayRun;
