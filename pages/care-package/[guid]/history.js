import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import {
  Loading,
  Container,
  Breadcrumbs,
  HistoryList,
  BrokerageHeader,
  HistoryOverview,
} from 'components';
import withSession from 'lib/session';
import TitleSubtitleHeader from 'components/Pages/CarePackages/TitleSubtitleHeader';
import { usePackageHistory } from 'api';
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

  const { data, isLoading } = usePackageHistory(packageId);

  return (
    <div>
      <BrokerageHeader />

      <Loading isLoading={isLoading} />

      <Container maxWidth="1080px" margin="10px auto 60px" padding="0 60px">
        <Breadcrumbs values={breadcrumbs} />

        <TitleSubtitleHeader subTitle="Package history" title={data.packageType} />

        <HistoryOverview />

        <HistoryList />
      </Container>
    </div>
  );
};

export default History;
