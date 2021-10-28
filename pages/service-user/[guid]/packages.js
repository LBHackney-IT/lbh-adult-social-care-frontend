import React from 'react';
import {
  Loading,
  Container,
  Breadcrumbs,
  CareDetails,
  PackageRequest,
  BrokerageHeader,
  ServiceUserDetails,
  HorizontalSeparator,
  TitleSubtitleHeader,
} from 'components';
import { useRouter } from 'next/router';
import { BROKER_PORTAL_ROUTE } from 'routes/RouteConstants';
import useServiceUserApi from 'api/ServiceUser/ServiceUser';

const breadcrumbs = [
  { text: 'Home', href: '/' },
  { text: 'Broker Portal', href: BROKER_PORTAL_ROUTE },
  { text: 'Full overview' },
];

const Packages = () => {
  const router = useRouter();
  const { guid: serviceUserId } = router.query;
  const { data } = useServiceUserApi.getServiceUserCarePackages(serviceUserId);
  const { serviceUser, packages } = data;

  return (
    <>
      <BrokerageHeader />
      <Container maxWidth="1080px" margin="0 auto 60px" padding="10px 60px 0">
        <Breadcrumbs values={breadcrumbs} />
        <TitleSubtitleHeader subTitle="All package details" title="Full overview" />
        <Loading isLoading={data === undefined} />
        {serviceUser && (
          <ServiceUserDetails
            dateOfBirth={serviceUser.dateOfBirth}
            serviceUserName={serviceUser.fullName}
            hackneyId={serviceUser.hackneyId}
            address={serviceUser.postCode}
          />
        )}
        {packages?.map((p, index) => (
          <>
            <PackageRequest packageRequest={p} />
            {index < packages.length - 1 && <HorizontalSeparator height="20px" />}
          </>
        ))}
        <HorizontalSeparator height="48px" />
        {packages?.map((p) => (
          <CareDetails
            packageId={p.packageId}
            title={p.packageType}
            data={p.packageItems}
            isS117Client={p.isS117Client}
            netTotal={p.netTotal}
          />
        ))}
      </Container>
    </>
  );
};

export default Packages;
