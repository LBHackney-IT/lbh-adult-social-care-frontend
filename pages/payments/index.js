import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { getUserSession } from '../../service/helpers';
import withSession from '../../lib/session';
import Loading from '../../components/Loading'

export const getServerSideProps = withSession(async ({ req, res }) => {
  const isRedirect = getUserSession({ req, res });
  if (isRedirect) return { props: {} };

  return {
    props: {}, // will be passed to the page component as props
  };
});

const PaymentsPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/payments/pay-runs');
  });
  return (
    <div className="payments-page">
      <Loading className='loading-center' />
    </div>
  );
}

export default PaymentsPage;
