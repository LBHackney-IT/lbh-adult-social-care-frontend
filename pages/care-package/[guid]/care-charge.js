import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import withSession from 'lib/session';
import { getLoggedInUser } from 'service';
import { getServiceUserPackagesRoute } from 'routes/RouteConstants';
import { Breadcrumbs, BrokerageHeader, Container, TitleSubtitleHeader, ProvisionalCareCharge } from 'components';

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

const useBreadcrumbs = () => {
  const router = useRouter();
  const { guid: packageId } = router.query;

  return useMemo(
    () => [
      { text: 'Home', href: '/' },
      { text: 'Care charges', href: '/' },
      {
        text: 'Full Overview',
        href: getServiceUserPackagesRoute(packageId),
      },
      { text: 'Financial assessment' },
    ],
    [packageId]
  );
};

const CareCharge = () => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <div>
      <BrokerageHeader />

      <Container maxWidth="1080px" margin="10px auto 60px" padding="0 60px">
        <Breadcrumbs values={breadcrumbs} />

        <TitleSubtitleHeader subTitle="Care Charges" title="Add financial assessment" />

        <ProvisionalCareCharge />
      </Container>
    </div>
  );
};

export default CareCharge;
