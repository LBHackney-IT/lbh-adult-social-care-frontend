import React, { useEffect, useState } from 'react';
import Dropdown from '../../Dropdown';
import DatePick from '../../DatePick';
import { currency } from '../../../constants/strings';
import EuroInput from '../../EuroInput';
import { Button } from '../../Button';
import BaseField from '../../baseComponents/BaseField';
import Input from '../../Input';
import PackageReclaim from '../../PackageReclaim';
import PackageCostBox from '../../DayCare/PackageCostBox';
import PackageApprovalHistorySummary from '../../PackageApprovalHistorySummary';
import DayCareSummary from '../../DayCare/DayCareSummary';
import ProposedPackagesTab from '../ProposedPackagesTabs';
import { formatCareDatePeriod } from '../../../service/helpers'
import ClientSummaryItem from '../../CarePackages/ClientSummaryItem'
import PopupAddSupplier from '../../PopupAddSupplier'
import AutocompleteSelect from '../../AutocompleteSelect'
import useSuppliersApi from '../../../api/SWR/useSuppliersApi'
import useDayCareApi from '../../../api/SWR/useDayCareApi'
import { mapCareStageOptions } from '../../../api/Mappers/CarePackageMapper'

const PackagesDayCare = ({
  tab,
  changeTab,
  packagesReclaimed,
  changePackageReclaim,
  removePackageReclaim,
  addPackageReclaim,
  approvalHistory,
  dayCarePackage,
  dayCareSummary,
  createBrokerageInfo = () => {},
  changePackageBrokeringStatus = () => {},
}) => {
  const [coreCost, setCoreCost] = useState({
    costPerDay: 0,
  });

  const [transport, setTransport] = useState({
    supplier: '',
    costPerDay: 0,
  });

  const [transportEscort, setTransportEscort] = useState({
    supplier: '',
    hoursPerWeek: 0,
    costPerWeek: 0,
  });

  const [dayCareOpportunities, setDayCareOpportunities] = useState({
    supplier: '',
    hoursPerWeek: 0,
    costPerHour: 0,
  });

  const [escort, setEscort] = useState({
    supplier: '',
    hoursPerWeek: 0,
    costPerHour: 0,
  });

  const packageDetails = dayCarePackage?.packageDetails;
  const {
    mutate: getSuppliers,
    data: { data: supplierOptions }
  } = useSuppliersApi.supplierList();
  const { data: stageOptions } = useDayCareApi.brokerAgeStages();

  const [selectedStageType, setSelectedStageType] = useState(0);
  const [selectedSupplierType, setSelectedSupplierType] = useState(0);
  const [startDate, setStartDate] = useState(
    (packageDetails?.startDate && new Date(packageDetails?.startDate)) || undefined
  );
  const [endDate, setEndDate] = useState(
    (packageDetails?.endDate && new Date(packageDetails?.endDate)) || undefined
  );
  const [endDateEnabled, setEndDateEnabled] = useState(!packageDetails?.endDate);
  const [corePackageSelectedDaysPerWeek, setCorePackageSelectedDaysPerWeek] = useState(
    packageDetails?.daysPerWeek ?? 0
  );

  // Cost calculations
  const [coreCostTotal, setCoreCostTotal] = useState(0);
  const [transportCostTotal, setTransportCostTotal] = useState(0);
  const [transportEscortCostTotal, setTransportEscortCostTotal] = useState(0);
  const [dayCareOpportunitiesCostTotal, setDayCareOpportunitiesCostTotal] = useState(0);
  const [escortCostTotal, setEscortCostTotal] = useState(0);
  const [totalPackageCost, setTotalPackageCost] = useState(0);
  const [popupAddSupplier, setPopupAddSupplier] = useState(false);

  const changeElementsData = (setter, getter, field, data) => {
    setter({ ...getter, [field]: data });
  };

  useEffect(() => {
    setCorePackageSelectedDaysPerWeek(packageDetails?.daysPerWeek ?? 0);
    setEndDateEnabled(!packageDetails?.endDate);

    setEndDate((packageDetails?.endDate && new Date(packageDetails?.endDate)) || undefined);

    setStartDate((packageDetails?.startDate && new Date(packageDetails?.startDate)) || undefined);
  }, [dayCarePackage]);

  useEffect(() => {
    setCoreCostTotal(Number(corePackageSelectedDaysPerWeek) * Number(coreCost.costPerDay));
  }, [coreCost]);

  useEffect(() => {
    setTransportCostTotal(Number(corePackageSelectedDaysPerWeek) * Number(transport.costPerDay));
  }, [transport]);

  useEffect(() => {
    setTransportEscortCostTotal(Number(transportEscort.costPerWeek));
  }, [transportEscort]);

  useEffect(() => {
    setDayCareOpportunitiesCostTotal(
      Number(dayCareOpportunities.hoursPerWeek) * Number(dayCareOpportunities.costPerHour)
    );
  }, [dayCareOpportunities]);

  useEffect(() => {
    setEscortCostTotal(Number(escort.hoursPerWeek) * Number(escort.costPerHour));
  }, [escort]);

  useEffect(() => {
    setTotalPackageCost(
      coreCostTotal + +transportCostTotal + transportEscortCostTotal + dayCareOpportunitiesCostTotal + escortCostTotal
    );
  }, [coreCostTotal, transportCostTotal, transportEscortCostTotal, dayCareOpportunitiesCostTotal, escortCostTotal]);

  const formIsValid = (brokerageInfoForCreation) => !!(
      brokerageInfoForCreation?.corePackageSupplierId &&
      brokerageInfoForCreation?.corePackageDaysPerWeek &&
      brokerageInfoForCreation?.corePackageCostPerDay &&
      !isNaN(Number(brokerageInfoForCreation?.corePackageCostPerDay)) &&
      brokerageInfoForCreation?.transportSupplierId &&
      brokerageInfoForCreation?.transportDaysPerWeek &&
      brokerageInfoForCreation?.transportCostPerDay &&
      !isNaN(Number(brokerageInfoForCreation?.transportCostPerDay)) &&
      brokerageInfoForCreation?.creatorId
    );

  const handleSaveBrokerage = (event) => {
    event.preventDefault();
    const brokerageInfoForCreation = {
      corePackageSupplierId: selectedSupplierType,
      corePackageDaysPerWeek: corePackageSelectedDaysPerWeek,
      corePackageCostPerDay: Number(coreCost.costPerDay),
      transportSupplierId: transport.supplier,
      transportDaysPerWeek: corePackageSelectedDaysPerWeek,
      transportCostPerDay: Number(transport.costPerDay),
      transportEscortSupplierId: transportEscort.supplier,
      transportEscortHoursPerWeek: transportEscort.hoursPerWeek,
      transportEscortCostPerWeek: Number(transportEscort.costPerWeek),
      dayCareOpportunitiesSupplierId: dayCareOpportunities.supplier,
      dayCareOpportunitiesHoursPerWeek: dayCareOpportunities.hoursPerWeek,
      dayCareOpportunitiesCostPerHour: Number(dayCareOpportunities.costPerHour),
      escortSupplierId: escort.supplier,
      escortHoursPerWeek: escort.hoursPerWeek,
      escortCostPerHour: Number(escort.costPerHour),
      creatorId: '1f825b5f-5c65-41fb-8d9e-9d36d78fd6d8',
    };
    if (formIsValid(brokerageInfoForCreation)) {
      createBrokerageInfo(packageDetails?.dayCarePackageId, brokerageInfoForCreation);
    } else {
      alert('Invalid form. Check to ensure all values are set correctly');
    }
  };

  const handleBrokerageStageChange = (option) => {
    setSelectedStageType(option);
    changePackageBrokeringStatus(packageDetails?.dayCarePackageId, option);
  };

  return (
    <>
      {popupAddSupplier && <PopupAddSupplier getSuppliers={getSuppliers} closePopup={() => setPopupAddSupplier(false)} />}
      <div className="mt-5 mb-5 person-care">
        <div className="column proposed-packages__header is-flex is-justify-content-space-between">
          <div>
            <h1 className="container-title">Day Care</h1>
            <h3>
              ID: <span>{packageDetails?.dayCarePackageId || ''}</span>
            </h3>
          </div>
          <Dropdown
            label=""
            initialText="Stage"
            options={mapCareStageOptions(stageOptions)}
            selectedValue={selectedStageType}
            onOptionSelect={(option) => handleBrokerageStageChange(option)}
          />
        </div>
        <div className="column">
          <div className="is-flex is-flex-wrap-wrap">
            <div className="mr-3 is-flex is-align-items-flex-end">
              <Button className='mr-3' onClick={() => setPopupAddSupplier(true)}>New Supplier</Button>
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
            <div className="day-care__core-cost is-flex is-flex-wrap-wrap is-justify-content-space-between">
              <h2 className="text-title">Core cost</h2>
              <EuroInput
                onChange={(value) => changeElementsData(setCoreCost, coreCost, 'costPerDay', value)}
                classes="default-label day-care__fixed-dropdown-width"
                label="Cost per day"
                value={coreCost.costPerDay}
              />
              <BaseField label="Days per week" classes="day-care__min-space">
                <p>{corePackageSelectedDaysPerWeek}</p>
              </BaseField>
              <BaseField classes="day-care__min-space" />
              <BaseField classes="day-care__cost-week" label="Cost / week">
                <p>
                  {currency.euro}
                  {coreCostTotal}
                </p>
              </BaseField>
            </div>
            <hr className="horizontal-delimiter" />
            <div className="row-container day-care__transport">
              <Dropdown
                classes="day-care__fixed-dropdown-width"
                label="Transport"
                initialText="Supplier (please select)"
                options={supplierOptions}
                selectedValue={transport.supplier}
                onOptionSelect={(value) => changeElementsData(setTransport, transport, 'supplier', value)}
              />
              <BaseField classes="day-care__min-space" label="Days per week">
                <p>{corePackageSelectedDaysPerWeek}</p>
              </BaseField>
              <Input
                value={transport.costPerDay}
                onChange={(value) => changeElementsData(setTransport, transport, 'costPerDay', value)}
                label="Cost per week"
              />
              <BaseField label="Cost" classes="day-care__cost">
                <p>
                  {currency.euro}
                  {transportCostTotal}
                </p>
              </BaseField>
            </div>
            <div className="row-container day-care__transport-escort">
              <Dropdown
                classes="label-bold day-care__fixed-dropdown-width"
                label="Transport escort"
                initialText="Select Supplier"
                options={supplierOptions}
                selectedValue={transportEscort.supplier}
                onOptionSelect={(value) => changeElementsData(setTransportEscort, transportEscort, 'supplier', value)}
              />
              <Input
                value={transportEscort.hoursPerWeek}
                label="Hours per week"
                onChange={(value) => changeElementsData(setTransportEscort, transportEscort, 'hoursPerWeek', value)}
              />
              <Input
                value={transportEscort.costPerWeek}
                label="Cost per week"
                onChange={(value) => changeElementsData(setTransportEscort, transportEscort, 'costPerWeek', value)}
              />
              <BaseField label="Cost" classes="day-care__cost">
                <p>
                  {currency.euro}
                  {transportEscortCostTotal}
                </p>
              </BaseField>
            </div>
            <div className="row-container day-care__opportunities">
              <Dropdown
                classes="label-bold day-care__fixed-dropdown-width"
                label="Dare care opportunities"
                initialText="Select Supplier"
                options={supplierOptions}
                onOptionSelect={(value) =>
                  changeElementsData(setDayCareOpportunities, dayCareOpportunities, 'supplier', value)
                }
                selectedValue={dayCareOpportunities.supplier}
              />
              <Input
                label="Hours per week"
                value={dayCareOpportunities.hoursPerWeek}
                onChange={(value) =>
                  changeElementsData(setDayCareOpportunities, dayCareOpportunities, 'hoursPerWeek', value)
                }
              />
              <Input
                label="Cost per hour"
                value={dayCareOpportunities.costPerHour}
                onChange={(value) =>
                  changeElementsData(setDayCareOpportunities, dayCareOpportunities, 'costPerHour', value)
                }
              />
              <BaseField label="Cost" classes="day-care__cost">
                <p>
                  {currency.euro}
                  {dayCareOpportunitiesCostTotal}
                </p>
              </BaseField>
            </div>
            <div className="row-container day-care__escort">
              <Dropdown
                classes="label-bold day-care__fixed-dropdown-width"
                label="Escort"
                initialText="Select Supplier"
                options={supplierOptions}
                onOptionSelect={(value) => changeElementsData(setEscort, escort, 'supplier', value)}
                selectedValue={escort.supplier}
              />
              <Input
                value={escort.hoursPerWeek}
                label="Hours per week"
                onChange={(value) => changeElementsData(setEscort, escort, 'hoursPerWeek', value)}
              />
              <Input
                value={escort.costPerHour}
                label="Cost per hour"
                onChange={(value) => changeElementsData(setEscort, escort, 'costPerHour', value)}
              />
              <BaseField label="Cost" classes="day-care__cost">
                <p>
                  {currency.euro}
                  {escortCostTotal}
                </p>
              </BaseField>
            </div>
          </div>
          <div className="proposed-packages__total-cost day-care__total-cost">
            <p>
              Total{' '}
              <span>
                {currency.euro}
                {totalPackageCost}
              </span>
            </p>
          </div>
          <div>
            <div className="mt-4 is-flex is-align-items-center is-flex-wrap-wrap is-justify-content-space-between">
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
          <div className="is-flex is-justify-content-flex-end is-align-content-center is-align-items-center">
            <Button onClick={handleSaveBrokerage} className="button hackney-btn-green">
              Submit for approval
            </Button>
          </div>
        </div>
        <ProposedPackagesTab tab={tab} changeTab={changeTab} />
      </div>
      {tab === 'approvalHistory' ? (
        <ApprovalHistory
          history={approvalHistory}
          dayCarePackage={dayCarePackage}
          costSummary={{
            costOfCarePerWeek: coreCostTotal,
            anpPerWeek: dayCareOpportunitiesCostTotal,
            transportCostPerWeek: transportCostTotal,
            totalCostPerWeek: totalPackageCost,
          }}
        />
      ) : (dayCareSummary && (
        <DayCareSummary
          opportunityEntries={dayCareSummary.opportunityEntries}
          needToAddress={dayCareSummary.needToAddress}
          transportNeeded={dayCareSummary.transportNeeded}
          daysSelected={dayCareSummary.daysSelected}
          deleteOpportunity={dayCareSummary.deleteOpportunity}
        />
      ))}
    </>
  );
};

const ApprovalHistory = ({ history, dayCarePackage = undefined, costSummary }) => {
  const packageDetails = dayCarePackage?.packageDetails;
  const datePeriod = formatCareDatePeriod(packageDetails?.startDate, packageDetails?.endDate);
  const periodText = packageDetails?.isFixedPeriodOrOngoing ? 'Fixed Period' : 'Ongoing'
  return (
    <div className="approval-history">
      <h2>
        Day Care{' '}
        <span>
          ({periodText}-{' '}
          {packageDetails?.termTimeConsiderationOption})
        </span>
      </h2>
      <div className="client-summary mb-5 mt-5">
        <ClientSummaryItem itemDetail={datePeriod.startDate} itemName='STARTS' />
        <ClientSummaryItem itemDetail={datePeriod.endDate} itemName='ENDS' />
        <ClientSummaryItem itemDetail={packageDetails?.dayPerWeek} itemName='DAYS/WEEK' />
      </div>
      <div className="package-cost-box__group mb-5">
        <PackageCostBox
          title="COST OF CARE / WK"
          cost={costSummary?.costOfCarePerWeek ?? 0.0}
          costType="ESTIMATE"
        />
        <PackageCostBox title="ANP / WK" cost={costSummary?.anpPerWeek ?? 0.0} costType="ESTIMATE" />
        <PackageCostBox
          title="TRANSPORT / WK"
          cost={costSummary?.transportCostPerWeek ?? 0.0}
          costType="ESTIMATE"
        />
      </div>

      <PackageApprovalHistorySummary approvalHistoryEntries={history} />
    </div>
  );
}

export default PackagesDayCare;
