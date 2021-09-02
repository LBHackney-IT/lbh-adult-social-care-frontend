import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Dropdown from '../../Dropdown';
import DatePick from '../../DatePick';
import { currency } from 'constants/strings';
import EuroInput from '../../EuroInput';
import { Button } from '../../Button';
import PackageReclaim from '../../PackageReclaim';
import { getEnGBFormattedDate } from 'api/Utils/FuncUtils';
import ResidentialCareSummary from '../../ResidentialCare/ResidentialCareSummary';
import ProposedPackagesTab from '../ProposedPackagesTabs';
import AutocompleteSelect from '../../AutocompleteSelect';
import ApprovalHistory from '../../ProposedPackages/ApprovalHistory';
import PopupAddSupplier from '../../PopupAddSupplier';
import { addNotification } from 'reducers/notificationsReducer';
import useBaseApi from 'api/SWR/useBaseApi';
import useSuppliersApi from 'api/SWR/useSuppliersApi';

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
  createBrokerageInfo = () => {},
  changePackageBrokeringStage = () => {},
}) => {
  const dispatch = useDispatch();
  const { data: stageOptions } = useBaseApi.stages();
  const { mutate: getSuppliers, data: { data: supplierOptions }} = useSuppliersApi.supplierList();

  const residentialCarePackage = residentialCarePackageData?.residentialCarePackage;
  const [coreCost, setCoreCost] = useState({
    costPerWeek: residentialCarePackageData?.residentialCore || 0,
  });

  const [additionalPayment, setAdditionalPayment] = useState({
    costPerWeek: residentialCarePackageData?.additionalNeedsPayment || '',
  });

  const residentialCareAdditionalNeedsCosts = residentialCarePackageData?.residentialCareAdditionalNeedsCosts;

  const [additionalNeedsWeekly, setAdditionalNeedsWeekly] = useState();

  useEffect(() => {
    const needsOneOff = residentialCareAdditionalNeedsCosts?.filter((i) => (
      [2, 4].includes(i.additionalNeedsPaymentTypeId)
    ));
    setAdditionalNeedsOneOff(needsOneOff || []);

    const needsWeekly = residentialCareAdditionalNeedsCosts?.filter((i) =>
      [1, 3].includes(i.additionalNeedsPaymentTypeId)
    );
    setAdditionalNeedsWeekly(needsWeekly || []);
  }, [residentialCareAdditionalNeedsCosts])

  const [additionalNeedsOneOff, setAdditionalNeedsOneOff] = useState([]);

  const [additionalPaymentOneOff, setAdditionalPaymentOneOff] = useState({
    oneOf: residentialCarePackageData?.additionalNeedsPaymentOneOff || '',
  });
  const [additionalNeedsEntries, setAdditionalNeedsEntries] = useState([]);
  const [selectedStageType, setSelectedStageType] = useState(residentialCarePackage?.stageId);
  const [selectedSupplierType, setSelectedSupplierType] = useState(
    residentialCarePackageData?.residentialCarePackage?.supplierId
  );
  const [startDate, setStartDate] = useState(
    (residentialCarePackageData && new Date(residentialCarePackage?.startDate)) || undefined
  );
  const [endDate, setEndDate] = useState(
    (residentialCarePackageData && new Date(residentialCarePackage?.endDate)) || undefined
  );
  const [endDateEnabled, setEndDateEnabled] = useState(residentialCarePackage?.endDate);

  const [coreCostTotal, setCoreCostTotal] = useState(0);
  const [popupAddSupplier, setPopupAddSupplier] = useState(false);
  const [additionalCostTotal, setAdditionalNeedsCostTotal] = useState(0);
  const [weeklyCostTotal, setWeeklyTotalCost] = useState(0);
  const [oneOffTotalCost, setOneOffTotalCost] = useState(0);
  const [additionalOneOffCostTotal, setAdditionalNeedsOneOffCostTotal] = useState(0);

  const changeElementsData = (setter, getter, field, data) => {
    setter({ ...getter, [field]: data });
  };

  const changeArrayData = (setter, getter, idx, data) => {
    const nextState = [...getter];
    nextState[idx].additionalNeedsCost = data;
    setter(nextState);
  };

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
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
    if(additionalNeedsWeekly) {
      setWeeklyTotalCost(coreCostTotal + additionalNeedsWeekly.reduce((sum, i) => sum + i.additionalNeedsCost, 0));
    }
  }, [coreCostTotal, additionalNeedsWeekly]);

  useEffect(() => {
    setOneOffTotalCost(additionalNeedsOneOff.reduce((sum, i) => sum + i.additionalNeedsCost, 0));
  }, [additionalNeedsOneOff]);

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
      pushNotification('Invalid form. Check to ensure all values are set correctly');
    }
  };

  const handleBrokerageStageChange = (option) => {
    setSelectedStageType(option);
    changePackageBrokeringStage(residentialCarePackageData?.residentialCarePackageId, option);
  };

  return (
    <>
      {popupAddSupplier && <PopupAddSupplier getSuppliers={getSuppliers} closePopup={() => setPopupAddSupplier(false)} />}
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
                  onChange={(value) => changeElementsData(setCoreCost, coreCost, 'costPerWeek', +value)}
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
            {additionalNeedsWeekly?.map((i, idx) => (
              <div key={`${i}${idx}`} className="row-container is-align-items-center residential_care__additional-payment">
                <h2 className="pt-5 hackney-text-black font-weight-bold">Additional needs payment</h2>
                <div className="is-align-items-center is-flex is-flex-wrap-wrap">
                  <EuroInput
                    classes="mr-6"
                    value={i.additionalNeedsCost}
                    onChange={(value) => changeArrayData(setAdditionalNeedsWeekly, additionalNeedsWeekly, idx, +value)}
                    label="Cost per week"
                  />
                  <p className="pt-5">
                    {currency.euro}
                    {i.additionalNeedsCost}
                  </p>
                </div>
              </div>
            ))}
            <div className="row-container is-align-items-center residential_care__additional-payment-one-off">
              <div className="weekly-total-card is-flex">
                <p>
                  Weekly Total {currency.euro}
                  {weeklyCostTotal}
                </p>
              </div>
              {additionalNeedsOneOff.map((i, idx) => (
                <div className="row-container full-width">
                  <h2 className="hackney-text-black font-weight-bold pt-5">
                    Additional needs payment ({i.additionalNeedsPaymentTypeName})
                  </h2>
                  <div className="is-flex is-flex-wrap-wrap is-align-items-center">
                    <EuroInput
                      value={i.additionalNeedsCost}
                      label={i.additionalNeedsPaymentTypeName}
                      onChange={(value) => changeArrayData(setAdditionalNeedsOneOff, additionalNeedsOneOff, idx, +value)}
                      classes="mr-6"
                    />
                    <p className="pt-5">
                      {currency.euro}
                      {i.additionalNeedsCost}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="proposed-packages__total-cost day-care__total-cost">
            <p>
              One Of Total{' '}
              <span>
                {currency.euro}
                {oneOffTotalCost}
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
