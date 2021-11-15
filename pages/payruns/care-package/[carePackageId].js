import React from 'react';
import { useRouter } from 'next/router';
import withSession from 'lib/session';
import { getLoggedInUser } from 'service';
import { Breadcrumbs, Container, Heading, Hint, HorizontalSeparator } from 'components';
import { FINANCE_ROUTE } from 'routes/RouteConstants';

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

const PayrunsHistory = () => {
  const router = useRouter();
  const { guid: packageId } = router.query;
  const breadcrumbs = [
    { text: 'Home', href: '/' },
    { text: 'Finance', href: FINANCE_ROUTE },
  ];

  return (
    <Container maxWidth="1080px" margin="0 auto" padding="0 60px">
      <HorizontalSeparator height="10px" />
      <Breadcrumbs values={breadcrumbs} />
      <HorizontalSeparator height="30px" />
      <Container background="#FAFAFA" padding="24px 16px">
        <Heading size="m">James Stephens</Heading>
        <HorizontalSeparator height="15px" />
        <Container display="grid" gridTemplateColumns="1fr 1fr">
          <Container display="flex" alignItems="center">
            <Heading size="s">Supplier: </Heading> 19329382894
          </Container>
          <Heading size="s">Package Type</Heading>
          <p>Barchester Healthcare Homes Ltd...</p>
          <p>Residential Care</p>
        </Container>
      </Container>
      <HorizontalSeparator height="30px" />
      <Container background="#FAFAFA" padding="30px 16px">
        <Heading size="l">Past Payments</Heading>
        <HorizontalSeparator height="15px" />
        <Hint>Total paid up to</Hint>
      </Container>
    </Container>
  );
};

export default PayrunsHistory;
