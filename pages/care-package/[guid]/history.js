import React, { useMemo } from 'react';
import withSession from 'lib/session';
import { useRouter } from 'next/router';
import { useCarePackageApi } from 'api';
import { getLoggedInUser } from 'service/helpers';
import { BROKER_PORTAL_ROUTE, getServiceUserPackagesRoute } from 'routes/RouteConstants';
import { Breadcrumbs, Container, BrokerageHeader, TitleSubtitleHeader, HistoryList, HistoryOverview } from 'components';

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

  const { data } = useCarePackageApi.history(packageId);

  return (
    <div>
      <BrokerageHeader />

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
