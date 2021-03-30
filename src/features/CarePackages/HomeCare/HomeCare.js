import { useState } from "react";
import { HOME_CARE } from "../../../routes/RouteConstants";
import { Button } from "../../components/Button";
import Checkbox from "../../components/Checkbox";
import ClientSummary from "../../components/ClientSummary";
import Dropdown from "../../components/Dropdown";
import TextArea from "../../components/TextArea";
import Layout from "../../Layout/Layout";
import getBaseParams from "../CarePackageRouteHelper";
import "./assets/homeCare.scss";
import LegendItem from "./components/LegendItem";
import WeekCarePicker from "./components/WeekCarePicker";
import TitleHeader from "../../components/TitleHeader";

// TODO remove
const serviceTypes = [
  { text: "Personal care", value: 1 },
  { text: "Type Two", value: 2 },
];

const HomeCare = ({ history }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedCareType, setSelectedCareType] = useState(1);
  const [isImmediate, setIsImmediate] = useState(false);
  const [isS117, setIsS117] = useState(false);
  const [isFixedPeriod, setIsFixedPeriod] = useState(1);

  const buildPackage = () => {
    // Get the parameters for the care package route
    const routeParams = getBaseParams(
      isImmediate,
      isS117,
      isFixedPeriod === 1,
      startDate,
      endDate
    );

    switch (selectedCareType) {
      case 1: {
        // Home care
        history.push(HOME_CARE + routeParams);
        break;
      }
      default: {
        break;
      }
    }
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
              <label>
                <strong>Select Service</strong>
              </label>
              <Dropdown
                options={serviceTypes}
                selectedValue={selectedCareType}
                onOptionSelect={(option) => setSelectedCareType(option.value)}
              />
            </div>
          </div>
          <div className="home-care-option">
            <div>
              <label>
                <strong>Primary Carer</strong>
              </label>
              <Dropdown
                options={serviceTypes}
                selectedValue={selectedCareType}
                onOptionSelect={(option) => setSelectedCareType(option.value)}
              />
            </div>
          </div>
          <div className="home-care-option">
            <div>
              <label>
                <strong>Secondary Carer</strong>
              </label>
              <Dropdown
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
            <Button
              onClick={() => {
                alert("Add to package");
              }}
            >
              Add to package
            </Button>
          </div>
        </div>
        <div className="mt-4 mb-4">
          <TitleHeader>Package Details</TitleHeader>
        </div>
      </div>
    </Layout>
  );
};

export default HomeCare;
