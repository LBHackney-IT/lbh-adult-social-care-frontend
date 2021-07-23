import React from 'react';
import { getUserSession } from '../../service/helpers';
import withSession from '../../lib/session';

export const getServerSideProps = withSession(async ({ req, res }) => {
  const isRedirect = getUserSession({ req, res });
  if (isRedirect) return { props: {} };

  return {
    props: {}, // will be passed to the page component as props
  };
});

const PaymentsPage = () => (
  <div className="payments-page">
    <p>Payments page</p>
  </div>
);

export default PaymentsPage;
