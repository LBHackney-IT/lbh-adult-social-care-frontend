import React, { useEffect, useState } from 'react';
import withSession from 'lib/session';
import { getLoggedInUser } from 'service';
import { Breadcrumbs, BrokerageHeader, Collapse, Container, Heading, HorizontalSeparator, Loading } from 'components';
import { useRouter } from 'next/router';
import { FINANCE_ROUTE } from 'routes/RouteConstants';
import { PayrunFilters } from 'components/Pages/Payruns/PayrunFilters';
import { SinglePayRunOverview } from 'components/Pages/Payruns/SinglePayRun/SinglePayRunOverview';
import { SinglePayRunBreakdown } from 'components/Pages/Payruns/SinglePayRun/SinglePayRunBreakdown';
import { getSinglePayrun, useSinglePayrunView } from 'api/SWR/payRuns';

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

const SinglePayRun = () => {
  const router = useRouter();
  const { guid: payRunId } = router.query;

  const { data: payRun, isLoading } = getSinglePayrun({ payRunId });
  const { payRunItems: payRunData } = payRun;
  const [payRunItems, setPayRunItems] = useState([]);

  useEffect(() => {
    if (payRunData) {
      setPayRunItems(payRunData.data);
    }
  }, [payRunData]);

  const breadcrumbs = [
    { text: 'Home', href: '/' },
    { text: 'Finance', href: FINANCE_ROUTE },
    { text: `Pay Run ${payRun?.payRunNumber}` },
  ];

  return (
    <Container>
      <BrokerageHeader />
      <Container background="#FAFAFA" padding="0 0 60px 0">
        <Container maxWidth="1080px" margin="0 auto" padding="0 60px">
          <HorizontalSeparator height="10px" />
          <Breadcrumbs values={breadcrumbs} />
          <HorizontalSeparator height="30px" />
          <Heading size="xl">Pay Run {payRun?.payRunNumber}</Heading>
          <HorizontalSeparator height="16px" />
          <PayrunFilters filters={{}} setFilters={{}} clearFilter={{}} />
        </Container>
      </Container>
      <HorizontalSeparator height="30px" />
      <Loading isLoading={isLoading} />
      <Container maxWidth="1080px" margin="0 auto" padding="0 60px">
        {payRunItems &&
          payRunItems.map((item, index) => (
            <>
              <Container background="#FAFAFA" padding="24px 16px">
                <SinglePayRunOverview payRun={item} />
                <HorizontalSeparator height="15px" />
                <Collapse>
                  <HorizontalSeparator height="40px" />
                  <SinglePayRunBreakdown payRun={item} />
                </Collapse>
              </Container>
              {index < payRunItems.length - 1 && <HorizontalSeparator height="32px" />}
            </>
          ))}
      </Container>
    </Container>
  );
};

export default SinglePayRun;
