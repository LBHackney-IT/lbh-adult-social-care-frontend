import React from 'react';
import { useRouter } from 'next/router';
import {
  Loading,
  Container,
  HistoryList,
  BrokerageHeader,
  HistoryOverview,
  TitleSubtitleHeader,
  DynamicBreadcrumbs,
} from 'components';
import withSession from 'lib/session';
import { usePackageHistory } from 'api';
import { getLoggedInUser, useRedirectIfPackageNotExist } from 'service';

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

  useRedirectIfPackageNotExist();

  const { data, isLoading } = usePackageHistory(packageId);

  return (
    <div>
      <BrokerageHeader />

      <Loading isLoading={isLoading} />

      <DynamicBreadcrumbs />
      <Container maxWidth="1080px" margin="10px auto 60px" padding="0 60px">
        <TitleSubtitleHeader subTitle="Package history" title={data.packageType} />

        <HistoryOverview />

        <HistoryList />
      </Container>
    </div>
  );
};

export default History;
