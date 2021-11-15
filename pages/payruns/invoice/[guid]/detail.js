import React from 'react';
import withSession from 'lib/session';
import { getLoggedInUser } from 'service';
import { Button, Container } from 'components';
import { getEnGBFormattedDate } from 'api';

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

const dateFrom = new Date();
const dateTo = new Date(dateFrom.getTime() + 100000);

const InvoiceDetailPage = () => (
  <Container>
    <Button className="link-button green">Back</Button>
    <Container>
      <h3>Pay run period</h3>
      <p>{getEnGBFormattedDate(dateFrom)}{dateTo ? ` - ${getEnGBFormattedDate(dateTo)}` : ''}</p>
    </Container>
  </Container>
);

export default InvoiceDetailPage;