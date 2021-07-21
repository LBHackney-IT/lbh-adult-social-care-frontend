import React, { useState } from "react";
import ClientSummary from "../../components/ClientSummary";
import Layout from "../../components/Layout/Layout";
import HomeCareSetup from "../../components/Setup/HomeCareSetup";
import DayCareSetup from "../../components/Setup/DayCareSetup";
import NursingCareSetup from "../../components/Setup/NursingCareSetup";
import ResidentialCareSetup from "../../components/Setup/ResidentialCareSetup";
import useSWR from 'swr';

const serverCarePackage = async () => {};

const CarePackage = ({ history }) => {
  const { data } = useSWR('', serverCarePackage);

  const [careTypes] = useState([
    { text: "Home care", value: 1 },
    { text: "Day care", value: 2 },
    { text: "Residential care", value: 3 },
    { text: "Nursing care", value: 4 },
  ]);
  const [selectedCareType, setSelectedCareType] = useState(1);

  const ComponentForCareType = () => {
    switch (selectedCareType) {
      default:
      case 1: {
        return (
          <HomeCareSetup
            history={history}
            careTypes={careTypes}
            setSelectedCareType={setSelectedCareType}
            selectedCareType={selectedCareType}
          />
        );
      }
      case 2: {
        return (
          <DayCareSetup
            history={history}
            careTypes={careTypes}
            setSelectedCareType={setSelectedCareType}
            selectedCareType={selectedCareType}
          />
        );
      }
      case 3: {
        return (
          <ResidentialCareSetup
            history={history}
            careTypes={careTypes}
            setSelectedCareType={setSelectedCareType}
            selectedCareType={selectedCareType}
          />
        );
      }
      case 4: {
        return (
          <NursingCareSetup
            history={history}
            careTypes={careTypes}
            setSelectedCareType={setSelectedCareType}
            selectedCareType={selectedCareType}
          />
        );
      }
    }
  };

  return (
    <Layout headerTitle="Rapid D2A">
      <ClientSummary
        client="James Stephens"
        hackneyId="786288"
        age="91"
        dateOfBirth="09/12/1972"
        postcode="E9 6EY"
      >
        Care Package
      </ClientSummary>
      <div className="mt-5 mb-5">
        <ComponentForCareType />
      </div>
    </Layout>
  );
};

export default CarePackage;
