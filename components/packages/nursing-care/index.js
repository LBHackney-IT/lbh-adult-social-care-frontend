import React, { useState, useEffect } from "react";
import Dropdown from "../../Dropdown";
import DatePick from "../../DatePick";
import EuroInput from "../../EuroInput";
import { Button } from "../../Button";
import { currency } from "../../../constants/strings";
import PackageReclaim from "../../PackageReclaim";
import ClientSummary from "../../ClientSummary";
import {
  getAgeFromDateString,
  getEnGBFormattedDate,
} from "../../../api/Utils/FuncUtils";
import NursingCareSummary from "../../NursingCare/NursingCareSummary";
import PackageApprovalHistorySummary from "../../PackageApprovalHistorySummary";
import PackageCostBox from "../../DayCare/PackageCostBox";

const PackagesNursingCare = ({
  tab,
  changeTab,
  packagesReclaimed,
  changePackageReclaim,
  removePackageReclaim,
  addPackageReclaim,
  approvalHistory,
  nursingCarePackage,
  nursingCareSummary,
  supplierOptions = [],
  stageOptions = [],
  createBrokerageInfo = () => {},
}) => {
  const [coreCost, setCoreCost] = useState({
    costPerWeek: 0,
  });

  const [additionalPayment, setAdditionalPayment] = useState({
    costPerWeek: 0,
  });

  const [additionalPaymentOneOff, setAdditionalPaymentOneOff] = useState({
    oneOf: 0,
  });

  const [additionalNeedsEntries, setAdditionalNeedsEntries] = useState([]);
  const [selectedStageType, setSelectedStageType] = useState(0);
  const [selectedSupplierType, setSelectedSupplierType] = useState(0);
  const [startDate, setStartDate] = useState(
    (nursingCarePackage && new Date(nursingCarePackage?.nursingCarePackage?.startDate)) ||
      undefined
  );
  const [endDate, setEndDate] = useState(
    (nursingCarePackage && new Date(nursingCarePackage?.nursingCarePackage?.endDate)) ||
      undefined
  );
  const [endDateEnabled, setEndDateEnabled] = useState(
    !nursingCarePackage?.nursingCarePackage?.endDate
  );

  const [coreCostTotal, setCoreCostTotal] = useState(0);
  const [additionalCostTotal, setAdditionalNeedsCostTotal] = useState(0);
  const [weeklyCostTotal, setWeeklyTotalCost] = useState(0);
  const [oneOffTotalCost, setOneOffTotalCost] = useState(0);
  const [additionalOneOffCostTotal, setAdditionalNeedsOneOffCostTotal] = useState(0);

  const changeElementsData = (setter, getter, field, data) => {
    setter({...getter, [field]: data});
  };

  useEffect(() => {
    setEndDateEnabled(!nursingCarePackage?.nursingCarePackage?.endDate);

    setEndDate(
      (nursingCarePackage && new Date(nursingCarePackage?.nursingCarePackage?.endDate)) ||
        undefined
    );

    setStartDate(
      (nursingCarePackage && new Date(nursingCarePackage?.nursingCarePackage?.startDate)) ||
        undefined
    );
  }, [nursingCarePackage]);

  useEffect(() => {
    setCoreCostTotal(
      Number(coreCost.costPerWeek)
    );
  }, [coreCost]);

  useEffect(() => {
    setAdditionalNeedsCostTotal(
      Number(additionalPayment.costPerWeek)
    );
  }, [additionalPayment]);

  useEffect(() => {
    setAdditionalNeedsOneOffCostTotal(
      Number(additionalPaymentOneOff.oneOf)
    );
  }, [additionalPaymentOneOff]);

  useEffect(() => {
    setWeeklyTotalCost(
      coreCostTotal +
      additionalCostTotal
    );
  }, [
    coreCostTotal,
    additionalCostTotal
  ]);

  useEffect(() => {
    setOneOffTotalCost(
      additionalPaymentOneOff
    );
  }, [additionalPaymentOneOff]);

  const formIsValid = (brokerageInfoForCreation) => {
    return !!(
      !isNaN(Number(brokerageInfoForCreation?.nursingCore)) &&
      !isNaN(Number(brokerageInfoForCreation?.additionalNeedsPayment)) &&
      !isNaN(Number(brokerageInfoForCreation?.additionalNeedsPaymentOneOff))
    );
  };

  const handleSaveBrokerage = (event) => {
    event.preventDefault();
    const brokerageInfoForCreation = {
      nursingCarePackageId: nursingCarePackage?.nursingCarePackageId,
      supplierId: selectedSupplierType,
      stageId: selectedStageType,
      nursingCore: Number(coreCost.costPerWeek),
      additionalNeedsPayment: Number(additionalPayment.costPerWeek),
      additionalNeedsPaymentOneOff: Number(additionalPaymentOneOff.oneOf)
    };
    if (formIsValid(brokerageInfoForCreation)) {
      createBrokerageInfo(
        nursingCarePackage?.nursingCarePackageId,
        brokerageInfoForCreation
      );
    } else {
      alert("Invalid form. Check to ensure all values are set correctly");
    }
  };

  return (
    <>
    <div className="mt-5 mb-5 person-care">
      <div className="column proposed-packages__header is-flex is-justify-content-space-between">
        <div>
        <h1 className="container-title">Nursing Care</h1>
          <h3>
              ID:{" "}
              <span>
                {nursingCarePackage?.nursingCarePackageId || ""}
              </span>
            </h3>
        </div>
        <Dropdown
          label=""
          initialText="Stage"
          options={stageOptions}
          selectedValue={selectedStageType}
          onOptionSelect={setSelectedStageType}
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
            disabledLabel="Ongoing"
            classes="datepicker-disabled datepicker-ongoing"
            label="End Date"
            disabled={endDateEnabled}
            dateValue={endDate}
            setDate={setEndDate}
          />
          </span>
        </div>
      </div>
      <div className='proposed-packages__elements column'>
        <div className='mb-4'>
          <h2 className='text-align-right font-weight-bold hackney-text-black'>Cost / week</h2>
          <div className='row-container residential_care__core is-flex is-align-items-center is-flex-wrap-wrap is-justify-content-space-between'>
            <h2 className='pt-5 hackney-text-black font-weight-bold'>Nursing Core</h2>
            <div className='is-flex is-flex-wrap-wrap is-align-items-center'>
              <EuroInput
                onChange={(value => changeElementsData(setCoreCost, coreCost, 'costPerWeek', value))}
                classes='mr-6'
                label='Cost per week'
                value={coreCost.costPerWeek}
              />
              <p className='pt-5'>{currency.euro}{coreCostTotal}</p>
            </div>
          </div>
          <div className='row-container is-align-items-center residential_care__additional-payment'>
            <h2 className='pt-5 hackney-text-black font-weight-bold'>Additional needs payment</h2>
            <div className='is-align-items-center is-flex is-flex-wrap-wrap'>
              <EuroInput
                classes='mr-6'
                value={additionalPayment.costPerWeek}
                onChange={value => changeElementsData(setAdditionalPayment, additionalPayment, 'costPerWeek', value)}
                label='Cost per week'
              />
              <p className='pt-5'>{currency.euro}{additionalCostTotal}</p>
            </div>
          </div>
          <div className='row-container is-align-items-center residential_care__additional-payment-one-off'>
            <div className='weekly-total-card is-flex'>
              <p><span className='mr-4'>Weekly Total</span> {currency.euro}{weeklyCostTotal}</p>
            </div>
            <h2 className='hackney-text-black font-weight-bold pt-5'>Additional needs payment (one off)</h2>
            <div className='is-flex is-flex-wrap-wrap is-align-items-center'>
              <EuroInput
                value={additionalPaymentOneOff.oneOf}
                label='One Off'
                onChange={value => changeElementsData(setAdditionalPaymentOneOff, additionalPaymentOneOff, 'oneOf', value)}
                classes='mr-6'
              />
              <p className='pt-5'>{currency.euro}{additionalOneOffCostTotal}</p>
            </div>
          </div>
        </div>
        <div className='proposed-packages__total-cost day-care__total-cost'>
          <p>One Of Total <span>{currency.euro}{additionalOneOffCostTotal}</span></p>
        </div>
        <div>
          <div className='mt-4 is-flex is-align-items-center is-justify-content-space-between'>
            <p className='package-reclaim__text'>Should the cost of this package be reclaimed in
              part or full from another body, e.g. NHS, CCG, another LA ?
            </p>
            <Button onClick={addPackageReclaim} className='outline green'>Add reclaim</Button>
          </div>
          <hr className='horizontal-delimiter'/>
        </div>
        <div className="is-flex is-justify-content-flex-end is-align-content-center is-align-items-center">
            <Button
              onClick={handleSaveBrokerage}
              className="button hackney-btn-green"
            >
              Submit for approval
            </Button>
          </div>
        {!!packagesReclaimed.length &&
          <div>
            {packagesReclaimed.map(item => {
              return (
                <PackageReclaim
                  remove={() => removePackageReclaim(item.id)}
                  key={item.id}
                  packageReclaim={item}
                  setPackageReclaim={changePackageReclaim(item.id)}
                />
              )
            })}
            <p onClick={addPackageReclaim} className='action-button-text'>+ Add another reclaim</p>
          </div>
        }
      </div>
      <div className='proposed-packages__tabs'>
        {[{text: 'Approver history', value: 'approvalHistory'},
          {text: 'Package details', value: 'packageDetails'}]
          .map(item => {
            return (
              <div
                key={item.value}
                onClick={() => changeTab(item.value)}
                className={`tab${tab === item.value ? ' active-tab' : ''}`}>
                <p>{item.text}</p>
                <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.808608 0L11.1914 0C11.9104 0 12.2704 0.766375 11.762 1.21457L6.57063 5.79162C6.2555 6.06946 5.74452 6.06946 5.42939 5.79162L0.23799 1.21457C-0.270409 0.766375 0.0896673 0 0.808608 0Z" fill="#00664F"/>
                </svg>
              </div>)}
          )
        }
      </div>
    </div>
    {tab === "approvalHistory" ? (
        <ApprovalHistory
          history={approvalHistory}
          nursingCarePackage={nursingCarePackage}
          costSummary={{
            costOfCarePerWeek: coreCostTotal,
            anpPerWeek: additionalCostTotal,
            oneOffCost: additionalOneOffCostTotal,
            totalCostPerWeek: weeklyCostTotal,
          }}
        />
      ) : (
        nursingCareSummary && (
          <NursingCareSummary
          startDate={nursingCarePackage?.nursingCarePackage.startDate}
          endDate= {nursingCarePackage?.nursingCarePackage.endDate !== null
            ? nursingCarePackage?.nursingCarePackage.endDate
            : "Ongoing"}
          needToAddress={nursingCareSummary.needToAddress}
          additionalNeedsEntries={nursingCareSummary.additionalNeedsEntries}
          setAdditionalNeedsEntries={setAdditionalNeedsEntries}
        />
        )
      )}
    </>
  )
}

const ApprovalHistory = ({
  history,
  nursingCarePackage = undefined,
  costSummary,
}) => {
  return (
    <div className="approval-history">
      <h2>
        Nursing Care{" "}
        <span>
          (
          {nursingCarePackage?.nursingCarePackage?.isFixedPeriodOrOngoing
            ? "Fixed Period"
            : "Ongoing"}{" "}
          - {nursingCarePackage?.nursingCarePackage.termTimeConsiderationOption})
        </span>
      </h2>
      <ClientSummary
        client={nursingCarePackage?.nursingCarePackage?.clientName}
        hackneyId={nursingCarePackage?.nursingCarePackage?.clientHackneyId}
        age={
          nursingCarePackage?.nursingCarePackage &&
          getAgeFromDateString(nursingCarePackage?.nursingCarePackage?.clientDateOfBirth)
        }
        sourcingCare="hackney"
        dateOfBirth={
          nursingCarePackage?.nursingCarePackage &&
          getEnGBFormattedDate(nursingCarePackage?.nursingCarePackage?.clientDateOfBirth)
        }
        postcode={nursingCarePackage?.nursingCarePackage?.clientPostCode}
      />
      <div className="care-info">
        <div>
          <p>STARTS</p>
          <p>
            {getEnGBFormattedDate(nursingCarePackage?.nursingCarePackage?.startDate)}
          </p>
        </div>
        <div>
          <p>ENDS</p>
          <p>
            {nursingCarePackage?.nursingCarePackage?.endDate !== null
              ? getEnGBFormattedDate(nursingCarePackage?.nursingCarePackage?.endDate)
              : "Ongoing"}
          </p>
        </div>
        <div>
          <p>DAYS/WEEK</p>
          <p />
        </div>
      </div>
      <div className="columns font-size-12px">
        <div className="column">
          <div className="is-flex is-flex-wrap-wrap">
            <PackageCostBox
              title="COST OF CARE / WK"
              cost={costSummary?.costOfCarePerWeek ?? 0.0}
              costType="ESTIMATE"
            />

            <PackageCostBox
              title="ANP / WK"
              cost={costSummary?.anpPerWeek ?? 0.0}
              costType="ESTIMATE"
            />

            <PackageCostBox
              title="ONE OFF COSTS"
              cost={costSummary?.oneOffCost ?? 0.0}
              costType="ESTIMATE"
            />

            <PackageCostBox
              title="TOTAL / WK"
              cost={costSummary?.totalCostPerWeek ?? 0.0}
              costType="ESTIMATE"
            />
          </div>
        </div>
      </div>
      <PackageApprovalHistorySummary approvalHistoryEntries={history} />
    </div>
  );
};

export default PackagesNursingCare;
