import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import {
  Loading,
  Container,
  HistoryList,
  HistoryOverview,
  TitleSubtitleHeader,
  DynamicBreadcrumbs,
} from 'components';
import withSession from 'lib/session';
import { usePackageHistory, useSingleCorePackageInfo } from 'api';
import { getLoggedInUser, useRedirectIfPackageNotExist } from 'service';
import { DEFAULT_REDIRECT_ROUTE_INFO, getServiceUserPackagesRoute } from 'routes/RouteConstants';

export const getServerSideProps = withSession(({ req }) => {
  const user = getLoggedInUser({ req });
  if (!user) return DEFAULT_REDIRECT_ROUTE_INFO;

  return { props: {} };
});

const History = () => {
  const router = useRouter();
  const { guid: packageId } = router.query;

  const { data: corePackage } = useSingleCorePackageInfo(packageId);

  const coreLoading = useRedirectIfPackageNotExist();

  const { data, isLoading } = usePackageHistory(packageId);

  const breadcrumbs = useMemo(
    () => [{ text: 'Full Overview', href: getServiceUserPackagesRoute(corePackage?.serviceUser?.id) }, { text: 'Package History' }],
    [corePackage?.serviceUser?.id]
  );

  return (
    <div>
      <Loading isLoading={coreLoading || isLoading} />

      <DynamicBreadcrumbs additionalBreadcrumbs={breadcrumbs} />
      <Container maxWidth="1080px" margin="10px auto 60px" padding="0 60px">
        <TitleSubtitleHeader subTitle="Package history" title={data.packageType} />

        <HistoryOverview />

        <HistoryList />
      </Container>
    </div>
  );
};

export default History;
