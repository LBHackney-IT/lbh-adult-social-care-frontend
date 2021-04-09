import { Button } from "../components/Button";
import { useState } from "react";
import Checkbox from "../components/Checkbox";
import ClientSummary from "../components/ClientSummary";
import DatePick from "../components/DatePick";
import Dropdown from "../components/Dropdown";
import RadioButton from "../components/RadioButton";
import Layout from "../Layout/Layout";
import getBaseParams from "./CarePackageRouteHelper";
import { HOME_CARE } from "../../routes/RouteConstants";

// TODO remove
const careTypes = [
  { text: "Home care", value: 1 },
  { text: "Type Two", value: 2 },
];

// TODO remove
const fixedPeriodOptions = [
  { text: "Fixed period", value: 1 },
  { text: "Ongoing", value: 2 },
];

const CarePackage = ({ history }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedCareType, setSelectedCareType] = useState(1);
  const [isImmediate, setIsImmediate] = useState(false);
  const [isS117, setIsS117] = useState(false);
  const [isFixedPeriod, setIsFixedPeriod] = useState(undefined);

  const buildPackage = () => {
    // Get the parameters for the care package route
    const routeParams = getBaseParams(
      isImmediate,
      isS117,
      isFixedPeriod === 1,
      startDate,
      endDate
    );

    // Home care
    // TODO use switch
    history.push(HOME_CARE + routeParams);

    switch (selectedCareType) {
      case 1: {
        break;
      }
      default: {
        break;
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
        <div className="level"></div>
        <div className="columns">
          <div className="column is-5">
            <Dropdown
              label="Select package"
              options={careTypes}
              selectedValue={selectedCareType}
              onOptionSelect={(option) => setSelectedCareType(option.value)}
            />
          </div>
          <div className="column">
            <div style={{ marginBottom: "5px" }}>
              <RadioButton
                options={fixedPeriodOptions}
                onChange={setIsFixedPeriod}
                selectedValue={isFixedPeriod}
              />
            </div>
            <div>
              <span className="mr-3">
                <DatePick dateValue={startDate} setDate={setStartDate} />
              </span>
              <span>
                <DatePick dateValue={endDate} setDate={setEndDate} />
              </span>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <Checkbox
            id="immediateServiceCbx"
            checked={isImmediate}
            onChange={setIsImmediate}
          >
            Is this an immediate service or a re-enablement package?
          </Checkbox>
        </div>
        <div className="mt-2">
          <Checkbox
            id="immediateServiceCbx"
            checked={isS117}
            onChange={setIsS117}
          >
            Is this user under S117 of the Mental Health Act?
          </Checkbox>
        </div>
        <div className="mt-4">
          <Button onClick={buildPackage}>Build package</Button>
        </div>
      </div>
    </Layout>
  );
};

export default CarePackage;
