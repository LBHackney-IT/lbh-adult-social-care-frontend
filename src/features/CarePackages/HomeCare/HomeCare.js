import { format } from "date-fns";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getHomeCareSummaryData } from "../../../api/CarePackages/HomeCareApi";
import { Button } from "../../components/Button";
import ClientSummary from "../../components/ClientSummary";
import Dropdown from "../../components/Dropdown";
import TextArea from "../../components/TextArea";
import TitleHeader from "../../components/TitleHeader";
import Layout from "../../Layout/Layout";
import "./assets/homeCare.scss";
import SummaryDataList from "./components/SummaryDataList";
import WeekCarePicker from "./components/WeekCarePicker";
import { serviceTypes, getServiceTypeCareTimes } from "./HomeCareServiceHelper";

const HomeCare = () => {
  // Parameters
  const params = useParams();
  const { startDate, endDate } = params;

  // State
  const [selectedCareType, setSelectedCareType] = useState(1);
  const [selectedPrimaryCareTime, setSelectedPrimaryCareTime] = useState(1);
  const [selectedSecondaryCareTime, setSelectedSecondaryCareTime] = useState(0);
  const [homeCareSummaryData, setHomeCareSummaryData] = useState(undefined);

  const serviceCareTimes = getServiceTypeCareTimes(selectedCareType);

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
        <div className="home-care-title">
          <label>Homecare Care</label>
          <div className="home-care-date-range">
            <div className="date-entry">
              {format(new Date(startDate), "dd/MM/yyyy")}
              {" - "}
              {format(new Date(endDate), "dd/MM/yyyy")}
            </div>
          </div>
        </div>
        <div className="is-flex is-justify-content-flex-start home-care-options">
          <div className="home-care-option">
            <div>
              <Dropdown
                label="Select Service"
                options={serviceTypes}
                selectedValue={selectedCareType}
                onOptionSelect={(option) => setSelectedCareType(option)}
                buttonStyle={{ minWidth: "239px" }}
              />
            </div>
          </div>
          <div className="home-care-option">
            <div>
              <Dropdown
                label="Primary Carer"
                options={serviceCareTimes}
                selectedValue={selectedPrimaryCareTime}
                onOptionSelect={(option) => setSelectedCareType(option.value)}
                buttonStyle={{ minWidth: "200px" }}
              />
            </div>
          </div>
          <div className="home-care-option">
            <div>
              <Dropdown
                label="Secondary Carer"
                options={serviceCareTimes}
                selectedValue={selectedSecondaryCareTime}
                onOptionSelect={(option) => setSelectedCareType(option.value)}
                buttonStyle={{ minWidth: "200px" }}
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
