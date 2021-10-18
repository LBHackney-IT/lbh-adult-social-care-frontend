import React from 'react';
import { useRouter } from 'next/router';
import { Breadcrumbs, Container, HorizontalSeparator } from 'components/HackneyDS';
import ServiceUserDetails from 'components/Pages/BrokerPortal/ServiceUserDetails';
import BrokerageHeader from 'components/Pages/CarePackages/BrokerageHeader/BrokerageHeader';
import TitleSubtitleHeader from 'components/Pages/CarePackages/TitleSubtitleHeader';
import { CareDetails } from 'components/Pages/ServiceUser/Packages/CareDetails';
import { PackageRequest } from 'components/Pages/ServiceUser/Packages/PackageRequest';
import { BROKER_PORTAL_ROUTE } from 'routes/RouteConstants';
import { mapServiceUserBasicInfo } from 'api/Mappers/optionsMapper';
import useCarePackageApi from 'api/SWR/CarePackage/useCarePackageApi';
import Loading from '../../../components/Loading';

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

  const { data: packageInfo, isValidating: packageInfoLoading } = useCarePackageApi.singlePackageInfo(packageId);
  const { client, dateOfBirth, hackneyId, postcode } = mapServiceUserBasicInfo(packageInfo.serviceUser);

  return (
    <>
      <BrokerageHeader />

      <Container maxWidth="1080px" margin="0 auto" padding="10px 60px 0">
        <Breadcrumbs values={breadcrumbs} />

        <TitleSubtitleHeader title="All package details" subTitle="Full overview" />

        <Loading className='loading-center' isLoading={packageInfoLoading} />

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
