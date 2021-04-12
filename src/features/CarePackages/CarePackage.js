import { useState } from "react";
import ClientSummary from "../components/ClientSummary";
import Layout from "../Layout/Layout";
import DayCareSetup from "./DayCare/DayCareSetup";
import HomeCareSetup from "./HomeCare/HomeCareSetup";
import ResidentialCareSetup from "./ResidentialCare/ResidentialCareSetup";
import NursingCareSetup from "./NursingCare/NursingCareSetup";

// TODO remove
const careTypes = [
  { text: "Home care", value: 1 },
  { text: "Day care", value: 2 },
  { text: "Residential care", value: 3 },
  { text: "Nursing care", value: 4 },
];

const CarePackage = ({ history }) => {
  const [selectedCareType, setSelectedCareType] = useState(1);

  const ComponentForCareType = () => {
    switch (selectedCareType) {
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
      default: {
        return <></>;
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
