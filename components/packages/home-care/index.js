import Dropdown from "../../Dropdown";
import DatePick from "../../DatePick";
import { currency } from "../../../constants/strings";
import EuroInput from "../../EuroInput";
import { Button } from "../../Button";
import React, { useState } from "react";
import PackageReclaim from "../../PackageReclaim";
import ApprovalHistory from "../../ProposedPackages/ApprovalHistory";
import SummaryDataList from "../../HomeCare/SummaryDataList";
import HomeCareCostEntry from "./components/CostEntry";

const stageOptions = [
  { text: "New", value: 1 },
  { text: "Assigned", value: 2 },
  { text: "Querying", value: 3 },
  { text: "Supplier Sourced", value: 4 },
  { text: "Pricing agreed", value: 5 },
  { text: "Submitted For Approval", value: 6 },
];

const categoryOptions = [
  { text: "Category type 1", value: 1 },
  { text: "Category type 2", value: 2 },
  { text: "Category type 3", value: 3 },
];

const reclaimFromOptions = [
  { text: "Reclaim from 1", value: 1 },
  { text: "Reclaim from 2", value: 2 },
  { text: "Reclaim from 3", value: 3 },
];

const packageReclaimTypes = [
  { value: "percentage", text: "Percentage" },
  { value: "fixedOneOff", text: "Fixed amount - one off" },
  { value: "fixedWeekly", text: "Fixed amount - weekly" },
];

const supplierOptions = [
  { text: "Supplier type 1", value: 1 },
  { text: "Supplier type 2", value: 2 },
  { text: "Supplier type 3", value: 3 },
  { text: "Supplier type 4", value: 4 },
];

const PackagesHomeCare = ({ tab, brokerage, changeTab }) => {
  debugger;
  const [elementsData, setElementsData] = useState({
    "30mCall": 0,
    "45mCall": 0,
    "60m+Call": 0,
    secondaryCarer: 0,
    domesticCare: 0,
    escortServices: 0,
    sleepingNight: 0,
    wakingNight: 0,
    nightOwl: 0,
  });

  const [packageReclaim, setPackageReclaim] = useState({
    type: "percentage",
    notes: "",
    from: ["NHS Bristol"],
    categoryTypes: ["Category 1", "Category 2"],
    amount: "888888",
  });

  const changePackageType = (option) => {
    setPackageReclaim({
      ...packageReclaim,
      type: option.value,
    });
  };

  const [selectedStageType, setSelectedStageType] = useState(0);
  const [selectedSupplierType, setSelectedSupplierType] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const changeElementsData = (field, data) => {
    setElementsData({ ...elementsData, [field]: data });
  };

  return (
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
        <div className="is-flex is-flex-wrap-wrap">
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
        <div className="mb-4 is-flex is-flex-wrap-wrap is-justify-content-space-between">
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
              <div className="bold-text">3</div>
              <div className="bold-text">{currency.euro}XX</div>
            </div>
            <div className="elements-sub-column">
              <HomeCareCostEntry
                label="30m call"
                value={elementsData["30mCall"]}
                quantity={3}
                onChange={(value) => {
                  changeElementsData("30mCall", value);
                }}
              />
              <HomeCareCostEntry
                label="45m call"
                value={elementsData["45mCall"]}
                quantity={2}
                onChange={(value) => {
                  changeElementsData("45mCall", value);
                }}
              />
              <HomeCareCostEntry
                label="60m+ call"
                value={elementsData["60m+Call"]}
                quantity={5}
                onChange={(value) => {
                  changeElementsData("60m+Call", value);
                }}
              />
              <br />
              <HomeCareCostEntry
                label="Secondary Carer"
                value={elementsData["secondaryCarer"]}
                quantity={4}
                onChange={(value) => {
                  changeElementsData("secondaryCarer", value);
                }}
              />
              {/* <p className="proposed-packages__split-rate">Split rate</p> */}
              <div className="elements-row">
                <div>Domestic Care</div>
                <div>
                  <EuroInput
                    onChange={(value) =>
                      changeElementsData("domesticCare", value)
                    }
                    value={elementsData["domesticCare"]}
                  />
                </div>
                <div>3</div>
                <div>{currency.euro}48</div>
              </div>
              <div className="elements-row">
                <div>Escort Services</div>
                <div>
                  <EuroInput
                    onChange={(value) =>
                      changeElementsData("escortServices", value)
                    }
                    value={elementsData["escortServices"]}
                  />
                </div>
                <div>3</div>
                <div>{currency.euro}48</div>
              </div>
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
            <div className="elements-row">
              <div>Sleeping Night</div>
              <div>
                <EuroInput
                  onChange={(value) =>
                    changeElementsData("sleepingNight", value)
                  }
                  value={elementsData["sleepingNight"]}
                />
              </div>
              <div>3</div>
              <div>{currency.euro}300</div>
            </div>
            <div className="elements-row">
              <div>Waking Night</div>
              <div>
                <EuroInput
                  onChange={(value) => changeElementsData("wakingNight", value)}
                  value={elementsData["wakingNight"]}
                />
              </div>
              <div>3</div>
              <div>{currency.euro}300</div>
            </div>
            <div className="elements-row">
              <div>Night Owl</div>
              <div>
                <EuroInput
                  onChange={(value) => changeElementsData("nightOwl", value)}
                  value={elementsData["nightOwl"]}
                />
              </div>
              <div>3</div>
              <div>{currency.euro}300</div>
            </div>
          </div>
        </div>
        <div className="proposed-packages__total-cost">
          <p>
            Total Cost /WK <span>{currency.euro}XXXX</span>
          </p>
        </div>
        {tab === "packageDetails" && (
          <div>
            <div className="mt-4 is-flex is-align-items-center is-justify-content-space-between">
              <p className="package-reclaim__text">
                Should the cost of this package be reclaimed in part or full
                from another body, e.g. NHS, CCG, another LA ?
              </p>
              <Button className="outline">Add reclaim</Button>
            </div>
            <hr className="horizontal-delimiter" />
          </div>
        )}
      </div>
      {/* {!!packagesReclaimed.length && tab === "approvalHistory" && (
        <div>
          {packagesReclaimed.map((item) => {
            return (
              <PackageReclaim
                remove={() => removePackageReclaim(item.id)}
                key={item.id}
                packageReclaim={item}
                setPackageReclaim={changePackageReclaim(item.id)}
              />
            );
          })}
          <p onClick={addPackageReclaim} className="action-button-text">
            + Add another reclaim
          </p>
        </div>
      )} */}
      <div className="proposed-packages__tabs column">
        {[
          { text: "Approval history", value: "approvalHistory" },
          { text: "Package details", value: "packageDetails" },
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
  );
};

export default PackagesHomeCare;
