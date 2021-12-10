import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { Container, DynamicBreadcrumbs, HistoryList, HistoryOverview, Loading, TitleSubtitleHeader } from 'components';
import { usePackageHistory } from 'api';
import { useRedirectIfPackageNotExist } from 'service';
import { getCarePackageReviewRoute } from 'routes/RouteConstants';

const History = () => {
  const router = useRouter();
  const { guid: packageId } = router.query;
  const { isLoading: coreLoading } = useRedirectIfPackageNotExist();

  const { data, isLoading } = usePackageHistory(packageId);
  const breadcrumbs = useMemo(
    () => [{ text: 'Full Overview', href: getCarePackageReviewRoute(packageId) }, { text: 'Package History' }],
    [packageId]
  );

  return (
    <div>
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
