import React from 'react';
import {
  Container,
  CareDetails,
  PackageRequest,
  ServiceUserDetails,
  HorizontalSeparator,
  TitleSubtitleHeader,
  DynamicBreadcrumbs,
  Button,
} from 'components';
import { useRouter } from 'next/router';
import useServiceUserApi from 'api/ServiceUser/ServiceUser';
import withSession from 'lib/session';
import { getLoggedInUser } from 'service';
import { NewHeader } from 'components/NewHeader';
import { handleRoleBasedAccess } from '../../api/handleRoleBasedAccess';
import { accessRoutes } from '../../api/accessMatrix';

export const getServerSideProps = withSession(({ req }) => {
  const user = getLoggedInUser({ req });
  if (!handleRoleBasedAccess(user.roles ?? [], accessRoutes.SERVICE_USER_GUID_PACKAGES)) {
    return {
      redirect: {
        destination: '/401',
        permanent: false,
      },
    };
  }
  return { props: { roles: user.roles } };
});

const Packages = ({ roles }) => {
  const router = useRouter();

  const { guid: serviceUserId } = router.query;
  const { data, isLoading } = useServiceUserApi.getServiceUserCarePackages(serviceUserId);
  const { serviceUser, packages } = data;

  const handleBack = () => router.back();
  return (
    <>
      <NewHeader roles={roles ?? []} />
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
              <React.Fragment key={p.packageId}>
                <PackageRequest packageRequest={p} roles={roles} />
                {index < packages.length - 1 && <HorizontalSeparator height="20px" />}
              </React.Fragment>
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
            .map((p, index) => (
              <CareDetails
                key={p.packageId}
                isLoading={isLoading}
                packageId={p.packageId}
                title={p.packageType}
                data={p.packageItems}
                isS117Client={p.isS117Client}
                isS117ClientConfirmed={p.isS117ClientConfirmed}
                netTotal={p.netTotal}
                packageStatus={p.packageStatus}
                isExpanded={index === 0}
              />
            ))}
        <HorizontalSeparator height={10} />
        <Button secondary color="gray" onClick={handleBack}>
          Back
        </Button>
      </Container>
    </>
  );
};

export default Packages;
