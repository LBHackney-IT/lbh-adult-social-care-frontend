import React from 'react';
import {
  CareDetails,
  Container,
  DynamicBreadcrumbs,
  HorizontalSeparator,
  PackageRequest,
  ServiceUserDetails,
  TitleSubtitleHeader,
} from 'components';
import { useRouter } from 'next/router';
import useServiceUserApi from 'api/ServiceUser/ServiceUser';

const Packages = () => {
  const router = useRouter();

  const { guid: serviceUserId } = router.query;
  const { data, isLoading } = useServiceUserApi.getServiceUserCarePackages(serviceUserId);
  const { serviceUser, packages } = data;

  return (
    <>
      <DynamicBreadcrumbs />
      <Container maxWidth="1080px" margin="0 auto 60px" padding="10px 60px 0">
        <TitleSubtitleHeader subTitle="All package details" title="Full overview" />
        {serviceUser && (
          <ServiceUserDetails
            dateOfBirth={serviceUser.dateOfBirth}
            serviceUserName={serviceUser.fullName}
            hackneyId={serviceUser.hackneyId}
            address={serviceUser.postCode}
          />
        )}
        {packages &&
          packages
            .filter(
              (p) =>
                p.packageStatus === 'New' ||
                p.packageStatus === 'In Progress' ||
                p.packageStatus === 'Waiting for approval' ||
                p.packageStatus === 'Not Approved'
            )
            .map((p, index) => (
              <>
                <PackageRequest packageRequest={p} />
                {index < packages.length - 1 && <HorizontalSeparator height="20px" />}
              </>
            ))}
        <HorizontalSeparator height="48px" />
        {packages &&
          packages
            .filter(
              (p) =>
                p.packageStatus === 'Approved' ||
                p.packageStatus === 'Ended' ||
                p.packageStatus === 'Cancelled' ||
                p.packageStatus === 'Active' ||
                p.packageStatus === 'Future'
            )
            .map((p) => (
              <CareDetails
                isLoading={isLoading}
                packageId={p.packageId}
                title={p.packageType}
                data={p.packageItems}
                isS117Client={p.isS117Client}
                isS117ClientConfirmed={p.isS117ClientConfirmed}
                netTotal={p.netTotal}
                packageStatus={p.packageStatus}
              />
            ))}
      </Container>
    </>
  );
};

export default Packages;
