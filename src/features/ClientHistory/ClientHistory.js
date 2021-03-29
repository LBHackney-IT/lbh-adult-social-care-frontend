import ClientSummary from "../components/ClientSummary";
import Layout from "../Layout/Layout";

const ClientHistory = () => {
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
    </Layout>
  );
};

export default ClientHistory;
