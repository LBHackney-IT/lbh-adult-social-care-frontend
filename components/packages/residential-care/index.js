import React, { useState, useEffect } from 'react';
import Dropdown from '../../Dropdown';
import DatePick from '../../DatePick';
import { currency } from '../../../constants/strings';
import EuroInput from '../../EuroInput';
import { Button } from '../../Button';
import PackageReclaim from '../../PackageReclaim';
import { getEnGBFormattedDate } from '../../../api/Utils/FuncUtils';
import ResidentialCareSummary from '../../ResidentialCare/ResidentialCareSummary';
import ProposedPackagesTab from '../ProposedPackagesTabs';
import AutocompleteSelect from '../../AutocompleteSelect';
import ApprovalHistory from '../../ProposedPackages/ApprovalHistory';

const PackagesResidentialCare = ({
  tab,
  changeTab,
  packagesReclaimed,
  changePackageReclaim,
  removePackageReclaim,
  addPackageReclaim,
  approvalHistory,
  residentialCarePackage: residentialCarePackageData,
  residentialCareSummary,
  supplierOptions = [],
  stageOptions = [],
  createBrokerageInfo = () => {},
  changePackageBrokeringStage = () => {},
}) => {
  const residentialCarePackage = residentialCarePackageData?.residentialCarePackage;
  const [coreCost, setCoreCost] = useState({
    costPerWeek: residentialCarePackageData?.residentialCore || '',
  });

  const [additionalPayment, setAdditionalPayment] = useState({
    costPerWeek: residentialCarePackageData?.additionalNeedsPayment || '',
  });

  const [additionalPaymentOneOff, setAdditionalPaymentOneOff] = useState({
    oneOf: residentialCarePackageData?.additionalNeedsPaymentOneOff || '',
  });
  const [additionalNeedsEntries, setAdditionalNeedsEntries] = useState([]);
  const [selectedStageType, setSelectedStageType] = useState(residentialCarePackageData?.residentialCarePackage?.stageId);
  const [selectedSupplierType, setSelectedSupplierType] = useState(
    residentialCarePackageData?.residentialCarePackage?.supplierId
  );
  const [startDate, setStartDate] = useState(
    (residentialCarePackageData && new Date(residentialCarePackageData?.residentialCarePackage?.startDate)) || undefined
  );
  const [endDate, setEndDate] = useState(
    (residentialCarePackageData && new Date(residentialCarePackageData?.residentialCarePackage?.endDate)) || undefined
  );
  const [endDateEnabled, setEndDateEnabled] = useState(!residentialCarePackageData?.residentialCarePackage?.endDate);

  const [coreCostTotal, setCoreCostTotal] = useState(0);
  const [additionalCostTotal, setAdditionalNeedsCostTotal] = useState(0);
  const [weeklyCostTotal, setWeeklyTotalCost] = useState(0);
  const [oneOffTotalCost, setOneOffTotalCost] = useState(0);
  const [additionalOneOffCostTotal, setAdditionalNeedsOneOffCostTotal] = useState(0);

  const changeElementsData = (setter, getter, field, data) => {
    setter({ ...getter, [field]: data });
  };

  useEffect(() => {
    setEndDateEnabled(!residentialCarePackageData?.residentialCarePackage?.endDate);

    setEndDate(
      (residentialCarePackageData && new Date(residentialCarePackageData?.residentialCarePackage?.endDate)) || undefined
    );

    setStartDate(
      (residentialCarePackageData && new Date(residentialCarePackageData?.residentialCarePackage?.startDate)) || undefined
    );
  }, [residentialCarePackageData]);

  useEffect(() => {
    setCoreCostTotal(Number(coreCost.costPerWeek));
  }, [coreCost]);

  useEffect(() => {
    setAdditionalNeedsCostTotal(Number(additionalPayment.costPerWeek));
  }, [additionalPayment]);

  useEffect(() => {
    setAdditionalNeedsOneOffCostTotal(Number(additionalPaymentOneOff.oneOf));
  }, [additionalPaymentOneOff]);

  useEffect(() => {
    setWeeklyTotalCost(coreCostTotal + additionalCostTotal);
  }, [coreCostTotal, additionalCostTotal]);

  useEffect(() => {
    setOneOffTotalCost(additionalPaymentOneOff);
  }, [additionalPaymentOneOff]);

  const formIsValid = (brokerageInfoForCreation) =>
    !!(
      !isNaN(Number(brokerageInfoForCreation?.residentialCore)) &&
      !isNaN(Number(brokerageInfoForCreation?.additionalNeedsPayment)) &&
      !isNaN(Number(brokerageInfoForCreation?.additionalNeedsPaymentOneOff)) &&
      selectedSupplierType &&
      selectedStageType
    );

  const handleSaveBrokerage = (event) => {
    event.preventDefault();
    const brokerageInfoForCreation = {
      residentialCarePackageId: residentialCarePackageData?.residentialCarePackageId,
      supplierId: selectedSupplierType,

      stageId: selectedStageType,
      residentialCore: Number(coreCost.costPerWeek),
      additionalNeedsPayment: Number(additionalPayment.costPerWeek),
      additionalNeedsPaymentOneOff: Number(additionalPaymentOneOff.oneOf),
    };
    if (formIsValid(brokerageInfoForCreation)) {
      createBrokerageInfo(residentialCarePackageData?.residentialCarePackageId, brokerageInfoForCreation);
    } else {
      alert('Invalid form. Check to ensure all values are set correctly');
    }
  };

  const handleBrokerageStageChange = (option) => {
    setSelectedStageType(option);
    changePackageBrokeringStage(residentialCarePackageData?.residentialCarePackageId, option);
  };

  return (
    <>
      <div className="mt-5 mb-5 person-care">
        <div className="column proposed-packages__header is-flex is-justify-content-space-between">
          <div>
            <h1 className="container-title">Residential Care</h1>
            <h3>
              ID: <span>{residentialCarePackageData?.residentialCarePackageId || ''}</span>
            </h3>
          </div>
          <Dropdown
            label=""
            initialText="Stage"
            options={stageOptions}
            selectedValue={selectedStageType}
            onOptionSelect={(option) => handleBrokerageStageChange(option)}
          />
        </div>
        <div className="column">
          <div className="is-flex is-flex-wrap-wrap">
            <div className="mr-3 is-flex is-align-items-flex-end">
              <AutocompleteSelect
                placeholder="Supplier (please select)"
                options={supplierOptions}
                selectProvider={setSelectedSupplierType}
                value={selectedSupplierType}
              />
            </div>
            <span className="mr-3">
              <DatePick label="Start Date" dateValue={startDate} setDate={setStartDate} />
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
        <div className="proposed-packages__elements column">
          <div className="mb-4">
            <h2 className="text-align-right font-weight-bold hackney-text-black">Cost / week</h2>
            <div className="row-container residential_care__core is-flex is-align-items-center is-flex-wrap-wrap is-justify-content-space-between">
              <h2 className="pt-5 hackney-text-black font-weight-bold">Residential Core</h2>
              <div className="is-flex is-flex-wrap-wrap is-align-items-center">
                <EuroInput
                  onChange={(value) => changeElementsData(setCoreCost, coreCost, 'costPerWeek', value)}
                  classes="mr-6"
                  label="Cost per week"
                  value={coreCost.costPerWeek}
                />
                <p className="pt-5">
                  {currency.euro}
                  {coreCostTotal}
                </p>
              </div>
            </div>
            <div className="row-container is-align-items-center residential_care__additional-payment">
              <h2 className="pt-5 hackney-text-black font-weight-bold">Additional needs payment</h2>
              <div className="is-align-items-center is-flex is-flex-wrap-wrap">
                <EuroInput
                  classes="mr-6"
                  value={additionalPayment.costPerWeek}
                  onChange={(value) =>
                    changeElementsData(setAdditionalPayment, additionalPayment, 'costPerWeek', value)
                  }
                  label="Cost per week"
                />
                <p className="pt-5">
                  {currency.euro}
                  {additionalCostTotal}
                </p>
              </div>
            </div>
            <div className="row-container is-align-items-center residential_care__additional-payment-one-off">
              <div className="weekly-total-card is-flex">
                <p>
                  Weekly Total {currency.euro}
                  {weeklyCostTotal}
                </p>
              </div>
              <h2 className="hackney-text-black font-weight-bold pt-5">Additional needs payment (one off)</h2>
              <div className="is-flex is-flex-wrap-wrap is-align-items-center">
                <EuroInput
                  value={additionalPaymentOneOff.oneOf}
                  label="One Off"
                  onChange={(value) =>
                    changeElementsData(setAdditionalPaymentOneOff, additionalPaymentOneOff, 'oneOf', value)
                  }
                  classes="mr-6"
                />
                <p className="pt-5">
                  {currency.euro}
                  {additionalOneOffCostTotal}
                </p>
              </div>
            </div>
          </div>
          <div className="proposed-packages__total-cost day-care__total-cost">
            <p>
              One Of Total{' '}
              <span>
                {currency.euro}
                {additionalOneOffCostTotal}
              </span>
            </p>
          </div>
          <div>
            <div className="mt-4 is-flex is-align-items-center is-justify-content-space-between">
              <p className="package-reclaim__text">
                Should the cost of this package be reclaimed in part or full from another body, e.g. NHS, CCG, another
                LA ?
              </p>
              <Button onClick={addPackageReclaim} className="outline green">
                Add reclaim
              </Button>
            </div>
            <hr className="horizontal-delimiter" />
          </div>
          <div className="is-flex is-justify-content-flex-end is-align-content-center is-align-items-center">
            <Button onClick={handleSaveBrokerage} className="button hackney-btn-green">
              Submit for approval
            </Button>
          </div>
          {!!packagesReclaimed.length && (
            <div>
              {packagesReclaimed.map((item) => (
                <PackageReclaim
                  remove={() => removePackageReclaim(item.id)}
                  key={item.id}
                  packageReclaim={item}
                  setPackageReclaim={changePackageReclaim(item.id)}
                />
              ))}
              <p onClick={addPackageReclaim} className="action-button-text">
                + Add another reclaim
              </p>
            </div>
          )}
        </div>
        <ProposedPackagesTab tab={tab} changeTab={changeTab} />
      </div>
      {tab === 'approvalHistory' ? (
        <ApprovalHistory
          history={approvalHistory}
          careType='Residential care'
          approvalData={residentialCarePackage}
          costSummary={{
            costOfCarePerWeek: coreCostTotal,
            anpPerWeek: additionalCostTotal,
            oneOffCost: additionalOneOffCostTotal,
            totalCostPerWeek: weeklyCostTotal,
          }}
        />
      ) : (
        residentialCareSummary && (
          <ResidentialCareSummary
            startDate={residentialCarePackage?.startDate}
            endDate={residentialCarePackage?.endDate !== null
                ? getEnGBFormattedDate(residentialCarePackage?.endDate)
                : 'Ongoing'
            }
            needToAddress={residentialCareSummary.needToAddress}
            additionalNeedsEntries={residentialCareSummary.additionalNeedsEntries}
            setAdditionalNeedsEntries={setAdditionalNeedsEntries}
          />
        )
      )}
    </>
  );
};

export default PackagesResidentialCare;
