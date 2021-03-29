import { Button } from "../components/Button";
import { useState } from "react";
import Checkbox from "../components/Checkbox";
import ClientSummary from "../components/ClientSummary";
import DatePick from "../components/DatePick";
import Dropdown from "../components/Dropdown";
import RadioButton from "../components/RadioButton";
import Layout from "../Layout/Layout";
import { getPersonalCare } from "../../routes/RouteConstants";

// TODO remove
const careTypes = [
  { text: "Personal care", value: 1 },
  { text: "Type Two", value: 2 },
];

const CarePackage = ({ history }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedCareType, setSelectedCareType] = useState(1);
  const [isImmediate, setIsImmediate] = useState(false);
  const [isS117, setIsS117] = useState(false);
  const [isFixedPeriod, setIsFixedPeriod] = useState(1);

  const buildPackage = () => {
    alert("Build Package");
    switch (selectedCareType) {
      case 1: {
        history.push(
          getPersonalCare(
            isImmediate,
            isS117,
            isFixedPeriod === 1,
            startDate,
            endDate
          )
        );
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
            <label>
              <strong>Select package</strong>
            </label>
            <Dropdown
              options={careTypes}
              selectedValue={selectedCareType}
              onOptionSelect={(option) => setSelectedCareType(option.value)}
            />
          </div>
          <div className="column">
            <RadioButton
              name="isFixedPeriodRadBtn"
              trueText="Fixed period"
              falseText="Ongoing"
              onChange={setIsFixedPeriod}
              trueIsChecked={isFixedPeriod === 1}
            />
            <div>
              <DatePick dateValue={startDate} setDate={setStartDate} />
              <DatePick dateValue={endDate} setDate={setEndDate} />
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
        <div className="mt-2">
          <Button onClick={buildPackage}>Build package</Button>
        </div>
      </div>
    </Layout>
  );
};

export default CarePackage;
