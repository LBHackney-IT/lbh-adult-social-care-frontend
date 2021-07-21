import React from "react";
import ClientSummary from "../../components/ClientSummary";
import Dropdown from "../../components/Dropdown";
import Layout from "../../components/Layout/Layout";
import useSWR from 'swr';

// TODO remove
const assessmentTypes = [
  { text: "Type One", value: 1 },
  { text: "Type Two", value: 2 },
];

const serverClientHistory = async () => {};

const ClientHistory = () => {
  const { data } = useSWR('', serverClientHistory);

  return (
    <Layout headerTitle="Rapid D2A">
      <ClientSummary
        client="James Stephens"
        hackneyId="786288"
        age="91"
        dateOfBirth="09/12/1972"
        postcode="E9 6EY"
      >
        Client History
      </ClientSummary>
      <div className="mt-5 mb-5">
        <Dropdown
          options={assessmentTypes}
          onOptionSelect={(option) => alert(option.value)}
        />
      </div>
    </Layout>
  );
};

export default ClientHistory;
