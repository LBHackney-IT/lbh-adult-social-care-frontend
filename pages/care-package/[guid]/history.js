import React from 'react';
import { Breadcrumbs, Container } from 'components/HackneyDS';
import BrokerageHeader from 'components/Pages/CarePackages/BrokerageHeader/BrokerageHeader';
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

const breadcrumbs = [{ text: 'Home', href: '/' }, { text: 'Broker Portal' }];

const History = () => (
  <div>
    <BrokerageHeader />

    <Container maxWidth="1080px" margin="0 auto">
      <Container className="px-60 pt-10">
        <Breadcrumbs values={breadcrumbs} />
      </Container>
    </Container>
  </div>
);

History.propTypes = {};

export default History;
