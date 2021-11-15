import React, { useEffect, useMemo, useState } from 'react';
import withSession from 'lib/session';
import { getLoggedInUser } from 'service';
import { Button, Container, HorizontalSeparator, Loading } from 'components';
import { getEnGBFormattedDate, useInvoiceListView } from 'api';
import { PayRunItem } from 'components/Pages/Payruns/SinglePayRun/PayRunItem';
import { useRouter } from 'next/router';

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

const InvoiceDetailPage = () => {
  const router = useRouter();
  const { guid: [payRunId, invoiceId] } = router.query;
  const [payRunItems, setPayRunItems] = useState([]);
  const params = useMemo(() => ({ invoiceId }), [invoiceId]);
  const { data: payRun, isLoading } = useInvoiceListView({ payRunId, params });
  const { payRunItems: payRunData } = payRun;

  useEffect(() => {
    if (payRunData) {
      setPayRunItems(payRunData.data);
    }
  }, [payRunData]);

  return (
    <Container className='invoice-detail'>
      <Loading isLoading={isLoading} />
      <Button className="link-button green">Back</Button>
      <HorizontalSeparator height={50} />
      <Container className='invoice-detail__main-container'>
        <h3 className='title'>Pay run period</h3>
        <p>{getEnGBFormattedDate(dateFrom)}{dateTo ? ` - ${getEnGBFormattedDate(dateTo)}` : ''}</p>
        <HorizontalSeparator height={24} />
        {payRunItems && (
          payRunItems.map((item, index) => (
            <>
              <PayRunItem item={item} index={index} />
              {index < payRunItems.length - 1 && <HorizontalSeparator height="32px" />}
            </>
          ))
        )}
      </Container>
    </Container>
  );
}

export default InvoiceDetailPage;