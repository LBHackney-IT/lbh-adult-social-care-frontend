import { useState } from "react";
import { useParams } from "react-router-dom";
import ClientSummary from "../../components/ClientSummary";
import Dropdown from "../../components/Dropdown";
import TextArea from "../../components/TextArea";
import Layout from "../../Layout/Layout";
import AdditionalNeeds, {
  getInitialAdditionalNeedsArray,
} from "../components/AdditionalNeedsEntries";
import CareTitle from "../components/CareTitle";
import "./assets/nursingCare.scss";

// TODO remove
const careHomeTypes = [
  { text: "Nursing Home", value: 1 },
  { text: "Assisted Home", value: 2 },
];

// TODO remove
const additionalNeedsCostOptions = [
  { text: "Weekly", value: 1 },
  { text: "One off", value: 2 },
];

const NursingCare = () => {
  // Parameters
  const params = useParams();
  //const { startDate, endDate, isImmediate, isS117, isFixedPeriod } = params;

  // State
  const [selectedNursingHomeType, setSelectedNursingHomeType] = useState(1);
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
          Nursing Care
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
            label="Type of nursing home"
            options={careHomeTypes}
            selectedValue={selectedNursingHomeType}
            onOptionSelect={(option) => setSelectedNursingHomeType(option)}
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

export default NursingCare;
