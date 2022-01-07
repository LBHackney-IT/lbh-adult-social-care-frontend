import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { Loading, Container, HistoryList, HistoryOverview, TitleSubtitleHeader, DynamicBreadcrumbs } from 'components';
import withSession from 'lib/session';
import { usePackageHistory } from 'api';
import { getLoggedInUser, useRedirectIfPackageNotExist } from 'service';
import { getCarePackageDetailsRoute } from 'routes/RouteConstants';
import { NewHeader } from 'components/NewHeader';
import { handleRoleBasedAccess } from '../../api/handleRoleBasedAccess';
import { accessRoutes } from '../../api/accessMatrix';

export const getServerSideProps = withSession(({ req }) => {
  const user = getLoggedInUser({ req });
  if (!handleRoleBasedAccess(user.roles ?? [], accessRoutes.CARE_PACKAGE_HISTORY)) {
    return {
      redirect: {
        destination: '/401',
        permanent: false,
      },
    };
  }
  return { props: { roles: user.roles } };
});

const History = ({ roles }) => {
  const router = useRouter();
  const { guid: packageId } = router.query;
  const { isLoading: coreLoading } = useRedirectIfPackageNotExist();

  const { data, isLoading } = usePackageHistory(packageId);
  const breadcrumbs = useMemo(
    () => [{ text: 'Full Overview', href: getCarePackageDetailsRoute(packageId) }, { text: 'Package History' }],
    [packageId]
  );

  return (
    <div>
      <NewHeader roles={roles ?? []} />
      <Loading isLoading={coreLoading || isLoading} />
      <DynamicBreadcrumbs additionalBreadcrumbs={breadcrumbs} />
      <Container maxWidth="1080px" margin="10px auto 60px" padding="0 60px">
        <TitleSubtitleHeader subTitle="Package History" title={data.packageType} />
        <HistoryOverview />
        <HistoryList />
      </Container>
    </div>
  );
};

export default History;
