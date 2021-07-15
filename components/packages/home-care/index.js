import React, { useEffect, useState } from "react";
import { currency } from "../../../constants/strings";
import DatePick from "../../DatePick";
import Dropdown from "../../Dropdown";
import HomeCareCostEntry from "./components/CostEntry";
import PackageReclaim from "../../PackageReclaim";
import {Button} from "../../Button";
import ApprovalHistory from "../../ProposedPackages/ApprovalHistory";
import SummaryDataList from "../../HomeCare/SummaryDataList";

const stageOptions = [
  { text: "New", value: 1 },
  { text: "Assigned", value: 2 },
  { text: "Querying", value: 3 },
  { text: "Supplier Sourced", value: 4 },
  { text: "Pricing agreed", value: 5 },
  { text: "Submitted For Approver", value: 6 },
];

const supplierOptions = [
  { text: "Supplier type 1", value: 1 },
  { text: "Supplier type 2", value: 2 },
  { text: "Supplier type 3", value: 3 },
  { text: "Supplier type 4", value: 4 },
];

const PackagesHomeCare = ({
  tab,
  addPackageReclaim,
  removePackageReclaim,
  packagesReclaimed,
  changePackageReclaim,
  brokerage,
  changeTab,
  approvalHistory,
  summaryData,
  costCards,
}) => {
  const [elementsData, setElementsData] = useState({
    "30mCall": {
      value: 0,
      quantity: 3,
    },
    "45mCall": {
      value: 0,
      quantity: 2,
    },
    "60m+Call": {
      value: 0,
      quantity: 5,
    },
    secondaryCarer: {
      value: 0,
      quantity: 3,
    },
    domesticCare: {
      value: 0,
      quantity: 3,
    },
    escortServices: {
      value: 0,
      quantity: 5,
    },
    sleepingNight: {
      value: 0,
      quantity: 4,
    },
    wakingNight: {
      value: 0,
      quantity: 2,
    },
    nightOwl: {
      value: 0,
      quantity: 3,
    },
  });

  const [selectedStageType, setSelectedStageType] = useState(0);
  const [selectedSupplierType, setSelectedSupplierType] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [totalCost, setTotalCost] = useState(0);
  const [homeCarePackage, setHomeCarePackage] = useState({});

  const changeElementsData = (field, data) => {
    let elementToUpdate = elementsData[field];
    elementToUpdate.value = data;
    setElementsData({ ...elementsData, [field]: elementToUpdate });
  };

  // Total values
  useEffect(() => {
    let currentTotalCost = 0;
    for (const property in elementsData) {
      const currentElement = elementsData[property];
      currentTotalCost +=
        parseInt(currentElement.value) * currentElement.quantity;
    }
    setTotalCost(currentTotalCost);
  }, [elementsData]);

  return (
    <>
    <div className="mt-5 mb-5 person-care">
      <div className="column proposed-packages__header is-flex is-justify-content-space-between">
        <div>
          <h1 className="container-title">Home Care</h1>
          <h3>
            ID: <span>{brokerage?.homeCare?.id || ""}</span>
          </h3>
        </div>
        <Dropdown
          label=""
          initialText="Stage"
          options={stageOptions}
          selectedValue={selectedStageType}
          onOptionSelect={(option) => setSelectedStageType(option)}
        />
      </div>
      <div className="column">
        <div className="is-flex is-flex-wrap-wrap proposed-packages__supplier-settings">
          <div className="mr-3 is-flex is-align-items-flex-end">
            <Dropdown
              label=""
              initialText="Supplier (please select)"
              options={supplierOptions}
              onOptionSelect={setSelectedSupplierType}
              selectedValue={selectedSupplierType}
            />
          </div>
          <span className="mr-3">
            <DatePick
              label="Start Date"
              dateValue={startDate}
              setDate={setStartDate}
            />
          </span>
          <span className="mr-3">
            <DatePick
              label="End Date"
              dateValue={endDate}
              setDate={setEndDate}
            />
          </span>
        </div>
      </div>
      <div className="proposed-packages__elements column">
        <h2>Elements</h2>
        <div className="mb-5 is-flex is-flex-wrap-wrap is-justify-content-space-between">
          <div className="elements-column">
            <div className="elements-row">
              <div />
              <div className="bold-text">/hr</div>
              <div className="bold-text">hrs/wk</div>
              <div className="bold-text">Total</div>
            </div>
            <div className="elements-row">
              <div>Primary Carer</div>
              <div />
              <div className="bold-text"/>
              <div className="bold-text"/>
            </div>
            <div className="elements-sub-column">
              <HomeCareCostEntry
                label="30m call"
                value={elementsData["30mCall"].value}
                quantity={elementsData["30mCall"].quantity}
                onChange={(value) => {
                  changeElementsData("30mCall", value);
                }}
              />
              <HomeCareCostEntry
                label="45m call"
                value={elementsData["45mCall"].value}
                quantity={elementsData["45mCall"].quantity}
                onChange={(value) => {
                  changeElementsData("45mCall", value);
                }}
              />
              <HomeCareCostEntry
                label="60m+ call"
                value={elementsData["60m+Call"].value}
                quantity={elementsData["60m+Call"].quantity}
                onChange={(value) => {
                  changeElementsData("60m+Call", value);
                }}
              />
              <br />
              <HomeCareCostEntry
                label="Secondary Carer"
                value={elementsData["secondaryCarer"].value}
                quantity={elementsData["secondaryCarer"].quantity}
                onChange={(value) => {
                  changeElementsData("secondaryCarer", value);
                }}
              />
              <p className="proposed-packages__split-rate">Split rate</p>
              <HomeCareCostEntry
                label="Domestic Care"
                value={elementsData["domesticCare"].value}
                quantity={elementsData["domesticCare"].quantity}
                onChange={(value) => {
                  changeElementsData("domesticCare", value);
                }}
              />
              <HomeCareCostEntry
                label="Escort Services"
                value={elementsData["escortServices"].value}
                quantity={elementsData["escortServices"].quantity}
                onChange={(value) => {
                  changeElementsData("escortServices", value);
                }}
              />
            </div>
          </div>
          <div className="vertical-line" />
          <div className="elements-column">
            <div className="elements-row">
              <div />
              <div className="bold-text">/ hr</div>
              <div className="bold-text">hrs/wk</div>
              <div className="bold-text">Total</div>
            </div>
            <HomeCareCostEntry
              label="Sleeping Night"
              value={elementsData["sleepingNight"].value}
              quantity={elementsData["sleepingNight"].quantity}
              onChange={(value) => {
                changeElementsData("sleepingNight", value);
              }}
            />
            <HomeCareCostEntry
              label="Waking Night"
              value={elementsData["wakingNight"].value}
              quantity={elementsData["wakingNight"].quantity}
              onChange={(value) => {
                changeElementsData("wakingNight", value);
              }}
            />
            <HomeCareCostEntry
              label="Night Owl"
              value={elementsData["nightOwl"].value}
              quantity={elementsData["nightOwl"].quantity}
              onChange={(value) => {
                changeElementsData("nightOwl", value);
              }}
            />
          </div>
        </div>
        <div className="proposed-packages__total-cost">
          <p>
            Total Cost /WK{" "}
            <span>
              {currency.euro}
              {totalCost}
            </span>
          </p>
        </div>
        {tab === "package-details" && (
          <div>
            <div className="mt-4 is-flex is-align-items-center is-justify-content-space-between">
              <p className="package-reclaim__text">
                Should the cost of this package be reclaimed in part or full
                from another body, e.g. NHS, CCG, another LA ?
              </p>
              <Button onClick={addPackageReclaim} className="outline green">Add reclaim</Button>
            </div>
            <hr className="horizontal-delimiter" />
          </div>
        )}
      </div>
      {!!packagesReclaimed.length && (
        <div>
          {packagesReclaimed.map((item) => {
            return (
              <PackageReclaim
                remove={tab === 'package-details' ? () => removePackageReclaim(item.id) : undefined}
                key={item.id}
                packageReclaim={item}
                setPackageReclaim={changePackageReclaim(item.id)}
              />
            );
          })}
        </div>
      )}
      <div className="proposed-packages__tabs">
        <div className='proposed-packages__submit-button'>
          <Button>Submit for approval</Button>
        </div>
        {[
          { text: "Approver history", value: "approval-history" },
          { text: "Package details", value: "package-details" },
        ].map((item) => {
          return (
            <div
              key={item.value}
              onClick={() => changeTab(item.value)}
              className={`tab${tab === item.value ? " active-tab" : ""}`}
            >
              <p>{item.text}</p>
              <svg
                width="12"
                height="6"
                viewBox="0 0 12 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.808608 0L11.1914 0C11.9104 0 12.2704 0.766375 11.762 1.21457L6.57063 5.79162C6.2555 6.06946 5.74452 6.06946 5.42939 5.79162L0.23799 1.21457C-0.270409 0.766375 0.0896673 0 0.808608 0Z"
                  fill="#00664F"
                />
              </svg>
            </div>
          );
        })}
      </div>
    </div>
      {tab === 'approval-history' ?
        <ApprovalHistory
          costCards={costCards}
          status='(Ongoing)'
          history={approvalHistory}
          careClientDateOfBirth={homeCarePackage?.homeCarePackage?.clientDateOfBirth}
          careIsFixedPeriodOrOngoing={homeCarePackage?.homeCarePackage?.isFixedPeriodOrOngoing}
          careTermTimeConsiderationOption={homeCarePackage?.homeCarePackage?.termTimeConsiderationOption}
          careClientName={homeCarePackage?.homeCarePackage?.clientName}
          careClientHackneyId={homeCarePackage?.homeCarePackage?.clientHackneyId}
          careClientPostCode={homeCarePackage?.homeCarePackage?.clientPostCode}
          careStartDate={homeCarePackage?.homeCarePackage?.startDate}
          careEndDate={homeCarePackage?.homeCarePackage?.endDate}
        />
        : !!summaryData.length &&
        <SummaryDataList
          edit={(item) => console.log('edit', item)}
          remove={(item) => console.log('remove', item)}
          confirmPackage={false}
          slicedText={true}
          summaryData={summaryData}
        />
      }
    </>
  );
};

export default PackagesHomeCare;
