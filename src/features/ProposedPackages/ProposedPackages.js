import React from "react";
import ClientSummary from "../components/ClientSummary";
import Layout from "../Layout/Layout";
import {useState} from "react";
import DatePick from "../components/DatePick";
import {useSelector} from "react-redux";
import {selectBrokerage} from "../../reducers/brokerageReducer";
import "./assets/proposedPackges.scss";
import Dropdown from "../components/Dropdown";
import Input from "../components/Input";

const stageTypes = [
  { text: "New", value: 1 },
  { text: "Assigned", value: 2 },
  { text: "Querying", value: 3 },
  { text: "Supplier Sourced", value: 4 },
  { text: "Pricing agreed", value: 5 },
  { text: "Submitted For Approval", value: 6 },
];

const supplierTypes = [
  { text: "Supplier type 1", value: 1 },
  { text: "Supplier type 2", value: 2 },
  { text: "Supplier type 3", value: 3 },
  { text: "Supplier type 4", value: 4 },
];

const ProposedPackages = () => {
  const brokerage = useSelector(selectBrokerage);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [inputValue, setInputValue] = useState('XX');
  const [selectedStageType, setSelectedStageType] = useState(0);
  const [selectedSupplierType, setSelectedSupplierType] = useState(0);

  return (
    <Layout headerTitle="Rapid D2A">
      <ClientSummary
        client="James Stephens"
        hackneyId="786288"
        age="91"
        preferredContact='Phone'
        canSpeakEnglish='Fluent'
        packagesCount={4}
        dateOfBirth="09/12/1972"
        postcode="E9 6EY"
      >
        Proposed Packages
      </ClientSummary>
      <div className="mt-5 mb-5 person-care">
        <div className="column proposed-packages__header is-flex is-justify-content-space-between">
          <div>
            <h1 className='container-title'>Home Care</h1>
            <h3><span>ID:</span> {brokerage?.homeCare?.id || ''}</h3>
          </div>
          <Dropdown
            label=''
            initialText='Stage'
            options={stageTypes}
            selectedValue={selectedStageType}
            onOptionSelect={(option) => setSelectedStageType(option)}
          />
        </div>
        <div className="column">
          <div className="is-flex">
            <div className="mr-3 is-flex is-align-items-flex-end">
              <Dropdown
                label=''
                initialText='Supplier (please select)'
                options={supplierTypes}
                onOptionSelect={setSelectedSupplierType}
                selectedValue={selectedSupplierType}
              />
            </div>
            <span className="mr-3">
              <DatePick label='Start Date' dateValue={startDate} setDate={setStartDate} />
            </span>
            <span className="mr-3">
              <DatePick label='End Date' dateValue={endDate} setDate={setEndDate} />
            </span>
          </div>
        </div>
        <div>
          <h3>Elements</h3>
          <Input onChange={value => setInputValue(value)} value={inputValue} preSign='£' />
        </div>
      </div>
    </Layout>
  );
};

export default ProposedPackages;
