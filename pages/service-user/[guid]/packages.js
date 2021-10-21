import React from 'react';
import {
  Loading,
  Container,
  Breadcrumbs,
  CareDetails,
  PackageRequest,
  BrokerageHeader,
  ServiceUserDetails,
  TitleSubtitleHeader,
  HorizontalSeparator,
} from 'components';
import { useRouter } from 'next/router';
import { BROKER_PORTAL_ROUTE } from 'routes/RouteConstants';
import { mapServiceUserBasicInfo, useCarePackageApi } from 'api';

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

const breadcrumbs = [
  { text: 'Home', href: '/' },
  { text: 'Broker Portal', href: BROKER_PORTAL_ROUTE },
  { text: 'Full overview' },
];

const Packages = () => {
  const router = useRouter();
  const { guid: packageId } = router.query;

  const { data: packageInfo, isLoading: packageInfoLoading } = useCarePackageApi.singlePackageInfo(packageId);
  const { client, dateOfBirth, hackneyId, postcode } = mapServiceUserBasicInfo(packageInfo.serviceUser);

  return (
    <>
      <BrokerageHeader />

      <Container maxWidth="1080px" margin="0 auto 60px" padding="10px 60px 0">
        <Breadcrumbs values={breadcrumbs} />

        <TitleSubtitleHeader title="All package details" subTitle="Full overview" />

        <Loading isLoading={packageInfoLoading} />

        <ServiceUserDetails
          dateOfBirth={dateOfBirth}
          serviceUserName={client}
          hackneyId={hackneyId}
          address={postcode}
        />

        <PackageRequest />

        <HorizontalSeparator height="48px" />

        <CareDetails title="Nursing Care" data={nursingData} />
      </Container>
    </>
  );
};

export default Packages;
