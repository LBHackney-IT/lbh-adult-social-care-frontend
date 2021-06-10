import React, {useState} from "react";
import Dropdown from "../../Dropdown";
import DatePick from "../../DatePick";
import {currency} from "../../../constants/strings";
import EuroInput from "../../EuroInput";
import {Button} from "../../Button";
import Input from "../../Input";
import PackageReclaim from "../../PackageReclaim";
import ApprovalHistory from "../../ProposedPackages/ApprovalHistory";
import SummaryDataList from "../../HomeCare/SummaryDataList";

const stageOptions = [
  { text: "New", value: 1 },
  { text: "Assigned", value: 2 },
  { text: "Querying", value: 3 },
  { text: "SupplierDashboard Sourced", value: 4 },
  { text: "Pricing agreed", value: 5 },
  { text: "Submitted For Approval", value: 6 },
];

const supplierOptions = [
  { text: "SupplierDashboard type 1", value: 1 },
  { text: "SupplierDashboard type 2", value: 2 },
  { text: "SupplierDashboard type 3", value: 3 },
  { text: "SupplierDashboard type 4", value: 4 },
];

const PackagesNursingCare = ({
  tab,
  brokerage,
  changeTab,
  packagesReclaimed,
  changePackageReclaim,
  removePackageReclaim,
  addPackageReclaim,
  approvalHistory,
  summaryData,
  costCards,
  careType = '',
}) => {
  const [coreCost, setCoreCost] = useState({
    costPerWeek: 'XXXX',
  });

  const [additionalPayment, setAdditionalPayment] = useState({
    costPerWeek: 'XXXX',
  });

  const [additionalPaymentOneOff, setAdditionalPaymentOneOff] = useState({
    oneOf: 'XXXX',
  });

  const [selectedStageType, setSelectedStageType] = useState(0);
  const [selectedSupplierType, setSelectedSupplierType] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const changeElementsData = (setter, getter, field, data) => {
    setter({...getter, [field]: data});
  };

  return (
    <>
    <div className="mt-5 mb-5 person-care">
      <div className="column proposed-packages__header is-flex is-justify-content-space-between">
        <div>
          <h1 className='container-title'>Nursing Care {careType && <span className='person-care__care-type'>({careType})</span>}</h1>
          <h3>ID: <span>{brokerage?.homeCare?.id || ''}</span></h3>
        </div>
        <Dropdown
          label=''
          initialText='Stage'
          options={stageOptions}
          selectedValue={selectedStageType}
          onOptionSelect={(option) => setSelectedStageType(option)}
        />
      </div>
      <div className="column">
        <div className="is-flex is-flex-wrap-wrap">
          <div className="mr-3 is-flex is-align-items-flex-end">
            <Dropdown
              label=''
              initialText='Supplier (please select)'
              options={supplierOptions}
              onOptionSelect={setSelectedSupplierType}
              selectedValue={selectedSupplierType}
            />
          </div>
          <span className="mr-3">
              <DatePick
                label='Start Date'
                dateValue={startDate}
                setDate={setStartDate}
              />
          </span>
          <span className="mr-3">
              <DatePick
                label='End Date'
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
            <h2 className='pt-5 hackney-text-black font-weight-bold'>Residential Core</h2>
            <div className='is-flex is-flex-wrap-wrap is-align-items-center'>
              <EuroInput
                onChange={(value => changeElementsData(setCoreCost, coreCost, 'costPerDay', value))}
                classes='mr-6'
                label='Cost per day'
                value={coreCost.costPerWeek}
              />
              <p className='pt-5'>{currency.euro}240</p>
            </div>
          </div>
          <div className='row-container is-align-items-center residential_care__additional-payment'>
            <h2 className='pt-5 hackney-text-black font-weight-bold'>Additional needs payment</h2>
            <div className='is-align-items-center is-flex is-flex-wrap-wrap'>
              <Input
                classes='mr-6'
                value={additionalPayment.costPerWeek}
                onChange={value => changeElementsData(setAdditionalPayment, additionalPayment, 'costPerDay', value)}
                label='Cost per week'
              />
              <p className='pt-5'>{currency.euro}89</p>
            </div>
          </div>
          <div className='row-container is-align-items-center residential_care__additional-payment-one-off'>
            <div className='weekly-total-card is-flex'>
              <p>Weekly Total {currency.euro}XX</p>
            </div>
            <h2 className='hackney-text-black font-weight-bold pt-5'>Additional needs payment (one off)</h2>
            <div className='is-flex is-flex-wrap-wrap is-align-items-center'>
              <Input
                value={additionalPaymentOneOff.oneOf}
                label='Hours per week'
                onChange={value => changeElementsData(setAdditionalPaymentOneOff, additionalPaymentOneOff, 'hoursPerWeek', value)}
                classes='mr-6'
              />
              <p className='pt-5'>{currency.euro}89</p>
            </div>
          </div>
        </div>
        <div className='proposed-packages__total-cost day-care__total-cost'>
          <p>One Of Total <span>{currency.euro}XXXX</span></p>
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
        {[{text: 'Approval history', value: 'approvalHistory'},
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
    {tab === 'approvalHistory' ?
      <ApprovalHistory costCards={costCards} status='(Ongoing)' history={approvalHistory} />
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
  )
}

export default PackagesNursingCare;
