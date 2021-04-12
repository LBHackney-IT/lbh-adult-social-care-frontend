import { useParams } from "react-router-dom";
import { useState } from "react";
import ClientSummary from "../../components/ClientSummary";
import Layout from "../../Layout/Layout";
import CareTitle from "../components/CareTitle";
import "./assets/residentialCare.scss";
import TextArea from "../../components/TextArea";
import Dropdown from "../../components/Dropdown";
import AdditionalNeeds, {
  getInitialAdditionalNeedsArray,
} from "../components/AdditionalNeedsEntries";

// TODO remove
const careHomeTypes = [
  { text: "Assisted Home", value: 1 },
  { text: "XYZ Home", value: 2 },
];

// TODO remove
const additionalNeedsCostOptions = [
  { text: "Weekly", value: 1 },
  { text: "One off", value: 2 },
];

const ResidentialCare = () => {
  // Parameters
  const params = useParams();
  //const { startDate, endDate, isImmediate, isS117, isFixedPeriod } = params;

  // State
  const [selectedCareHomeType, setSelectedCareHomeType] = useState(1);
  const [additionalNeedsEntries, setAdditionalNeedsEntries] = useState(
    getInitialAdditionalNeedsArray()
  );

  return (
    <Layout headerTitle="BUILD A CARE PACKAGE">
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
        <CareTitle startDate="27/11/1997" endDate="03/09/2021">
          Residential Care
        </CareTitle>
      </div>
      <div className="mt-4 columns">
        <div className="column">
          <TextArea
            label="Need to Address"
            rows={5}
            placeholder="Add details..."
          />
        </div>
        <div className="column">
          <Dropdown
            label="Type of care home"
            options={careHomeTypes}
            selectedValue={selectedCareHomeType}
            onOptionSelect={(option) => setSelectedCareHomeType(option)}
            buttonStyle={{ width: "240px" }}
          />
        </div>
      </div>
      <div className="mt-4">
        <AdditionalNeeds
          costOptions={additionalNeedsCostOptions}
          entries={additionalNeedsEntries}
          setAdditionalNeedsState={setAdditionalNeedsEntries}
        />
      </div>
    </Layout>
  );
};

export default ResidentialCare;
