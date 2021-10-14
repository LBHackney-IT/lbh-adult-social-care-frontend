import React from 'react';
import BrokerageHeader from 'components/Pages/CarePackages/BrokerageHeader/BrokerageHeader';
import { Breadcrumbs, Container, HorizontalSeparator } from 'components/HackneyDS';
import { BROKER_PORTAL_ROUTE } from 'routes/RouteConstants';
import BrokerageContainerHeader from 'components/Pages/CarePackages/BrokerageContainerHeader';
import ServiceUserDetails from 'components/Pages/BrokerPortal/ServiceUserDetails';
import { useRouter } from 'next/router';
import { PackageRequest } from 'components/Pages/ServiceUser/Packages/PackageRequest';
import { CareDetails } from 'components/Pages/ServiceUser/Packages/CareDetails';

const Packages = () => {
  const router = useRouter();
  const serviceUserData = router.query;
  const breadcrumbs = [
    { text: 'Home', href: '/' },
    { text: 'Broker Portal', href: BROKER_PORTAL_ROUTE },
    { text: 'Full overview' },
  ];

  const nursingData = [
    {
      status: 'End',
      element: 'Nursing Care',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      weeklyCost: 1000,
    },
    {
      status: 'End',
      element: 'Additional needs payment / wk',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      weeklyCost: 100,
    },
    {
      status: 'End',
      element: 'Residential SU contribution',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      weeklyCost: -100,
    },
    {
      status: 'Cancelled',
      element: 'Residential SU contribution',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      weeklyCost: -200,
    },
    {
      status: 'End',
      element: 'Residential SU contribution',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      weeklyCost: -500,
    },
    {
      status: 'End',
      element: 'Residential SU contribution',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      weeklyCost: -500,
    },
  ];

  return (
    <>
      <BrokerageHeader />
      <Container maxWidth="1080px" margin="0 auto" padding="8px 60px 0 60px">
        <Breadcrumbs values={breadcrumbs} />
      </Container>
      <Container maxWidth="1080px" margin="0 auto" padding="30px 60px 60px 60px">
        <BrokerageContainerHeader title="All package details" subtitle="Full overview" />
        <ServiceUserDetails
          dateOfBirth={serviceUserData.dateOfBirth}
          serviceUserName={serviceUserData.serviceUserName}
          hackneyId={serviceUserData.hackneyId}
          address={serviceUserData.address}
        />
        <PackageRequest serviceUserData={serviceUserData} />
        <HorizontalSeparator height="48px" />
        <CareDetails title="Nursing Care" data={nursingData} />
      </Container>
    </>
  );
};

export default Packages;
