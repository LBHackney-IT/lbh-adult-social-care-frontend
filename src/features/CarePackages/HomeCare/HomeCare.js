import { useState } from "react";
import { Button } from "../../components/Button";
import ClientSummary from "../../components/ClientSummary";
import Dropdown from "../../components/Dropdown";
import TextArea from "../../components/TextArea";
import TitleHeader from "../../components/TitleHeader";
import Layout from "../../Layout/Layout";
import "./assets/homeCare.scss";
import WeekCarePicker from "./components/WeekCarePicker";
import { getHomeCareSummaryData } from "../../../api/CarePackages/HomeCareApi";
import SummaryDataList from "./components/SummaryDataList";

// TODO remove
const serviceTypes = [
  { text: "Personal care", value: 1 },
  { text: "Type Two", value: 2 },
];

const HomeCare = () => {
  const [selectedCareType, setSelectedCareType] = useState(1);
  const [homeCareSummaryData, setHomeCareSummaryData] = useState(undefined);

  const addToPackageClick = () => {
    setHomeCareSummaryData(getHomeCareSummaryData());
  };

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
        <div className="is-flex is-justify-content-flex-start home-care-options">
          <div className="home-care-option">
            <div>
              <Dropdown
                label="Select Service"
                options={serviceTypes}
                selectedValue={selectedCareType}
                onOptionSelect={(option) => setSelectedCareType(option.value)}
              />
            </div>
          </div>
          <div className="home-care-option">
            <div>
              <Dropdown
                label="Primary Carer"
                options={serviceTypes}
                selectedValue={selectedCareType}
                onOptionSelect={(option) => setSelectedCareType(option.value)}
              />
            </div>
          </div>
          <div className="home-care-option">
            <div>
              <Dropdown
                label="Secondary Carer"
                options={serviceTypes}
                selectedValue={selectedCareType}
                onOptionSelect={(option) => setSelectedCareType(option.value)}
              />
            </div>
          </div>
        </div>
        <div className="columns mt-2">
          <div className="column">
            <TextArea
              label="Need to Address"
              rows={5}
              placeholder="Add details..."
            />
          </div>
          <div className="column">
            <TextArea
              label="What should be done"
              rows={5}
              placeholder="Add details..."
            />
          </div>
        </div>
        <div className="mt-2">
          <WeekCarePicker />
        </div>
        <div className="level mt-4">
          <div className="level-item level-right">
            <Button onClick={addToPackageClick}>Add to package</Button>
          </div>
        </div>
        {homeCareSummaryData !== undefined ? (
          <div className="mt-4 mb-4">
            <TitleHeader>Package Details</TitleHeader>
            <SummaryDataList summaryData={homeCareSummaryData} />
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default HomeCare;
