import React from 'react';
import { getUserSession } from '../../../service/helpers';
import withSession from '../../../lib/session';

export const getServerSideProps = withSession(async ({ req }) => {
  const user = getUserSession({ req });
  if (user.redirect) {
    return user;
  }

  return {
    props: {}, // will be passed to the page component as props
  };
});

const Reporting = () => (
  <div className="reporting">
    <p>Reporting</p>
  </div>
);

export default Reporting;
