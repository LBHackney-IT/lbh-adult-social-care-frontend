import React from 'react';
import {
  CareDetails,
  DynamicBreadcrumbs,
  Container,
  HorizontalSeparator,
  ServiceUserDetails,
  TitleSubtitleHeader,
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
  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  if (!handleRoleBasedAccess(user.roles ?? [], accessRoutes.SERVICE_USER_GUID_CARE_CHARGES)) {
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
        <HorizontalSeparator height="48px" />
        {packages &&
          packages.map((p) => (
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
