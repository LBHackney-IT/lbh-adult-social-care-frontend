import React from 'react';
import ClientSummary from 'components/ClientSummary';
import Dropdown from 'components/Dropdown';
import Layout from 'components/Layout/Layout';
import withSession from 'lib/session';
import { getUserSession } from 'service/helpers';

// TODO remove
const assessmentTypes = [
  { text: 'Type One', value: 1 },
  { text: 'Type Two', value: 2 },
];

export const getServerSideProps = withSession(async ({ req, res }) => {
  const isRedirect = getUserSession({ req, res });
  if (isRedirect) return { props: {} };

  return {
    props: {}, // will be passed to the page component as props
  };
});

const ClientHistory = () => (
  <Layout
    clientSummaryInfo={{
      client: "James Stephens",
      hackneyId: "786288",
      age: "91",
      dateOfBirth: "09/12/1972",
      postcode: "E9 6EY",
      title: 'Client History',
    }}
  >
    <div className="mt-5 mb-5">
      <Dropdown options={assessmentTypes} onOptionSelect={(option) => alert(option.value)} />
    </div>
  </Layout>
);

export default ClientHistory;
