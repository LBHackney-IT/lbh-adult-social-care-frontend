import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Dropdown from '../../Dropdown';
import DatePick from '../../DatePick';
import EuroInput from '../../EuroInput';
import { Button } from '../../Button';
import { currency } from 'constants/strings';
import PackageReclaim from '../../PackageReclaim';
import { getEnGBFormattedDate } from 'api/Utils/FuncUtils';
import NursingCareSummary from '../../NursingCare/NursingCareSummary';
import ProposedPackagesTab from '../ProposedPackagesTabs';
import AutocompleteSelect from '../../AutocompleteSelect';
import ApprovalHistory from '../../ProposedPackages/ApprovalHistory';
import { addNotification } from 'reducers/notificationsReducer';
import PopupAddSupplier from '../../PopupAddSupplier';
import useSuppliersApi from 'api/SWR/useSuppliersApi';
import useDayCareApi from 'api/SWR/useDayCareApi';
import { mapCareStageOptions } from 'api/Mappers/CarePackageMapper';
import { FundedNursingCare } from '../../HackneyDS';

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
  createBrokerageInfo = () => {},
  changePackageBrokeringStage = () => {},
  loggedInUserId,
}) => {
  const dispatch = useDispatch();
  const [coreCost, setCoreCost] = useState({
    costPerWeek: nursingCarePackage?.nursingCore || '',
  });
  const [reasonCollectingCharges, setReasonCollectingCharges] = useState('');
  const { mutate: getSuppliers, data: { data: supplierOptions } } = useSuppliersApi.supplierList();
  const { data: stageOptions } = useDayCareApi.brokerAgeStages();
  const [popupAddSupplier, setPopupAddSupplier] = useState(false);
  const [provisionalAge, setProvisionalAge] = useState('25-29');
  const [provisionalCost, setProvisionalCost] = useState('');
  const [careChargeErrors, setCareChargeErrors] = useState({
    provisionalCost: '',
    reasonCollectingCharges: '',
  });
  const [collectingCharges, setCollectingCharges] = useState('hackney-council');

  const [additionalPayment, setAdditionalPayment] = useState({
    costPerWeek: nursingCarePackage?.additionalNeedsPayment || '',
  });

  const [additionalPaymentOneOff, setAdditionalPaymentOneOff] = useState({
    oneOf: nursingCarePackage?.additionalNeedsPaymentOneOff || '',
  });

  const [initialFncCostPerWeek] = useState(187.60);

  const [fncCostPerWeek, setFncCostPerWeek] = useState(initialFncCostPerWeek);

  const [collectedBy, setCollectedBy] = useState({
    value: 'supplier',
    text: 'Supplier'
  });

  const [additionalNeedsEntries, setAdditionalNeedsEntries] = useState([]);
  const [selectedStageType, setSelectedStageType] = useState(nursingCarePackage?.stageId);
  const [selectedSupplierType, setSelectedSupplierType] = useState(nursingCarePackage?.supplierId);
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const [endDateDisabled, setEndDateDisabled] = useState(!nursingCarePackage?.nursingCarePackage?.endDate);

  const [coreCostTotal, setCoreCostTotal] = useState(0);
  const [additionalCostTotal, setAdditionalNeedsCostTotal] = useState(0);
  const [weeklyCostTotal, setWeeklyTotalCost] = useState(0);
  const [oneOffTotalCost, setOneOffTotalCost] = useState(0);
  const [additionalOneOffCostTotal, setAdditionalNeedsOneOffCostTotal] = useState(0);
  const [paidToCareHome, setPaidToCareHome] = useState(0);
  const [hasFNCAssessment, setHasFNCAssessment] = useState('');
  const [uploadFNCAssessment, setUploadFNCAssessment] = useState(null);

  const changeElementsData = (setter, getter, field, data) => {
    setter({ ...getter, [field]: data });
  };

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

  const getFiles = (files) => setUploadFNCAssessment(files);

  useEffect(() => {
    setEndDateDisabled(!nursingCarePackage?.nursingCarePackage?.endDate);

    setEndDate((nursingCarePackage && new Date(nursingCarePackage?.nursingCarePackage?.endDate)) || undefined);

    setStartDate((nursingCarePackage && new Date(nursingCarePackage?.nursingCarePackage?.startDate)) || undefined);
  }, [nursingCarePackage]);

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
    setPaidToCareHome((Number(fncCostPerWeek) - initialFncCostPerWeek).toFixed(2));
  }, [fncCostPerWeek]);

  useEffect(() => {
    setWeeklyTotalCost(coreCostTotal + additionalCostTotal);
  }, [coreCostTotal, additionalCostTotal]);

  useEffect(() => {
    setOneOffTotalCost(additionalPaymentOneOff);
  }, [additionalPaymentOneOff]);

  const formIsValid = (brokerageInfoForCreation) => !!(
    !Number.isNaN(Number(brokerageInfoForCreation?.nursingCore)) &&
    !Number.isNaN(Number(brokerageInfoForCreation?.additionalNeedsPayment)) &&
    !Number.isNaN(Number(brokerageInfoForCreation?.additionalNeedsPaymentOneOff))
  );

  const handleSaveBrokerage = (event) => {
    event.preventDefault();
    const brokerageInfoForCreation = {
      nursingCarePackageId: nursingCarePackage?.nursingCarePackageId,
      supplierId: selectedSupplierType,
      stageId: selectedStageType,
      nursingCore: Number(coreCost.costPerWeek),
      additionalNeedsPayment: Number(additionalPayment.costPerWeek),
      additionalNeedsPaymentOneOff: Number(additionalPaymentOneOff.oneOf),
      creatorId: loggedInUserId,
    };
    if (formIsValid(brokerageInfoForCreation)) {
      createBrokerageInfo(nursingCarePackage?.nursingCarePackageId, brokerageInfoForCreation);
    } else {
      pushNotification('Invalid form. Check to ensure all values are set correctly');
    }
  };

  const handleBrokerageStageChange = (option) => {
    setSelectedStageType(option);
    changePackageBrokeringStage(nursingCarePackage?.nursingCarePackageId, option);
  };

  return (
    <>
      {popupAddSupplier &&
      <PopupAddSupplier getSuppliers={getSuppliers} closePopup={() => setPopupAddSupplier(false)}/>}
      <div className="mt-5 mb-5 person-care">
        <div className="column proposed-packages__header is-flex is-justify-content-space-between">
          <div>
            <h1 className="container-title">Nursing Care</h1>
            <h3>
              ID: <span>{nursingCarePackage?.nursingCarePackageId || ''}</span>
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
              <DatePick label="Start Date" dateValue={startDate} setDate={setStartDate}/>
            </span>
            <span className="mr-3">
              <DatePick
                disabledLabel="Ongoing"
                className="datepicker-disabled datepicker-ongoing"
                label="End Date"
                disabled={endDateDisabled}
                dateValue={endDateDisabled ? '' : endDate}
                setDate={setEndDate}
              />
            </span>
          </div>
        </div>
        <div className="proposed-packages__elements column">
          <div className="mb-4">
            <h2 className="text-align-right font-weight-bold hackney-text-black">Cost / week</h2>
            <div
              className="row-container residential_care__core is-flex is-align-items-center is-flex-wrap-wrap is-justify-content-space-between">
              <h2 className="pt-5 hackney-text-black font-weight-bold">Nursing Core</h2>
              <div className="is-flex is-flex-wrap-wrap is-align-items-center">
                <EuroInput
                  maxLength={6}
                  onChange={(value) => changeElementsData(setCoreCost, coreCost, 'costPerWeek', value)}
                  className="mr-6"
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
                  maxLength={6}
                  className="mr-6"
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
                  <span className="mr-4">Weekly Total</span> {currency.euro}
                  {weeklyCostTotal}
                </p>
              </div>
              <h2 className="hackney-text-black font-weight-bold pt-5">Additional needs payment (one off)</h2>
              <div className="is-flex is-flex-wrap-wrap is-align-items-center">
                <EuroInput
                  maxLength={6}
                  value={additionalPaymentOneOff.oneOf}
                  label="One Off"
                  onChange={(value) =>
                    changeElementsData(setAdditionalPaymentOneOff, additionalPaymentOneOff, 'oneOf', value)
                  }
                  className="mr-6"
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
              One off Total{' '}
              <span>
                {currency.euro}
                {additionalOneOffCostTotal}
              </span>
            </p>
          </div>
          <FundedNursingCare
            getFiles={getFiles}
            setHasFNCAssessment={setHasFNCAssessment}
            hasFNCAssessment={hasFNCAssessment}
            setUploadFNCAssessment={setUploadFNCAssessment}
            uploadFNCAssessment={uploadFNCAssessment}
          />
          <div className="is-flex is-justify-content-space-between is-align-content-center is-align-items-center">
            <Button onClick={addPackageReclaim} className="outline green">
              Add reclaim
            </Button>
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
              <p onClick={addPackageReclaim} className="action-button-text" role="presentation">
                + Add another reclaim
              </p>
            </div>
          )}
        </div>
        <ProposedPackagesTab tab={tab} changeTab={changeTab}/>
      </div>
      {tab === 'approvalHistory' ? (
        <ApprovalHistory
          history={approvalHistory}
          approvalData={nursingCarePackage?.nursingCarePackage}
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
            endDate={
              nursingCarePackage?.nursingCarePackage.endDate !== null
                ? getEnGBFormattedDate(nursingCarePackage?.nursingCarePackage.endDate)
                : 'Ongoing'
            }
            needToAddress={nursingCareSummary.needToAddress}
            additionalNeedsEntries={nursingCareSummary.additionalNeedsEntries}
            setAdditionalNeedsEntries={setAdditionalNeedsEntries}
          />
        )
      )}
    </>
  );
};

export default PackagesNursingCare;
