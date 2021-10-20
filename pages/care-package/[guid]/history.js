import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import {
  Loading,
  Container,
  Breadcrumbs,
  HistoryList,
  BrokerageHeader,
  HistoryOverview,
  TitleSubtitleHeader,
} from 'components';
import withSession from 'lib/session';
import { useCarePackageApi } from 'api';
import { getLoggedInUser } from 'service';
import { BROKER_PORTAL_ROUTE, getServiceUserPackagesRoute } from 'routes/RouteConstants';

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
  return { props: {} };
});

const History = () => {
  const router = useRouter();
  const { guid: packageId } = router.query;

  const breadcrumbs = useMemo(
    () => [
      { text: 'Home', href: '/' },
      { text: 'Broker Portal', href: BROKER_PORTAL_ROUTE },
      {
        text: 'Full Overview',
        href: getServiceUserPackagesRoute(packageId),
      },
      { text: 'Package History' },
    ],
    [packageId]
  );

  const { data, isLoading } = useCarePackageApi.history(packageId);

  return (
    <div>
      <BrokerageHeader />

      <Loading isLoading={isLoading} />

      <Container maxWidth="1080px" margin="10px auto" padding="0 60px">
        <Breadcrumbs values={breadcrumbs} />

        <TitleSubtitleHeader subTitle="Package history" title={data.packageType} />

        <HistoryOverview />

        <HistoryList />
      </Container>
    </div>
  );
};

export default History;
