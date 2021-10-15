import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { Breadcrumbs, Container } from 'components/HackneyDS';
import BrokerageHeader from 'components/Pages/CarePackages/BrokerageHeader/BrokerageHeader';
import { BROKER_PORTAL_ROUTE, getServiceUserPackagesRoute } from 'routes/RouteConstants';
import TitleSubtitleHeader from 'components/Pages/CarePackages/TitleSubtitleHeader';
import Overview from 'components/Pages/CarePackages/History/Overview';
import { getLoggedInUser } from 'service/helpers';
import withSession from 'lib/session';

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

  return (
    <div>
      <BrokerageHeader />

      <Container maxWidth="1080px" margin="10px auto" padding="0 60px">
        <Breadcrumbs values={breadcrumbs} />

        <TitleSubtitleHeader subTitle="Package history" title="Nursing care" />

        <Overview />
      </Container>
    </div>
  );
};

export default History;
