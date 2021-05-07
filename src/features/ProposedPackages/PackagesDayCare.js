import Dropdown from "../components/Dropdown";
import DatePick from "../components/DatePick";
import {currency} from "../../constants/strings";
import EuroInput from "../components/EuroInput";
import {Button} from "../components/Button";
import React, {useState} from "react";
import BaseField from "../components/baseComponents/BaseField";
import Input from "../components/Input";
import PackageReclaim from "../components/PackageReclaim";

const stageOptions = [
  { text: "New", value: 1 },
  { text: "Assigned", value: 2 },
  { text: "Querying", value: 3 },
  { text: "Supplier Sourced", value: 4 },
  { text: "Pricing agreed", value: 5 },
  { text: "Submitted For Approval", value: 6 },
];

const supplierOptions = [
  { text: "Supplier type 1", value: 1 },
  { text: "Supplier type 2", value: 2 },
  { text: "Supplier type 3", value: 3 },
  { text: "Supplier type 4", value: 4 },
];

const PackagesDayCare = ({ tab, brokerage, changeTab, packagesReclaimed, changePackageReclaim, removePackageReclaim, addPackageReclaim }) => {
  const [coreCost, setCoreCost] = useState({
    costPerDay: 'XX',
  });

  const [transport, setTransport] = useState({
    supplier: '',
    costPerDay: 'XXXX',
  });

  const [transportEscort, setTransportEscort] = useState({
    supplier: '',
    hoursPerWeek: 'XXXX',
    costPerWeek: 'XXXX',
  });

  const [dayCareOpportunities, setDayCareOpportunities] = useState({
    supplier: '',
    hoursPerWeek: 'XXXX',
    costPerWeek: 'XXXX',
  });

  const [escort, setEscort] = useState({
    supplier: '',
    hoursPerWeek: 'XXXX',
    costPerWeek: 'XXXX',
  });

  const [selectedStageType, setSelectedStageType] = useState(0);
  const [selectedSupplierType, setSelectedSupplierType] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const changeElementsData = (setter, getter, field, data) => {
    setter({...getter, [field]: data});
  };

  return (
    <div className="mt-5 mb-5 person-care">
      <div className="column proposed-packages__header is-flex is-justify-content-space-between">
        <div>
          <h1 className='container-title'>Day Care</h1>
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
                disabledLabel='Ongoing'
                classes='datepicker-disabled datepicker-ongoing'
                label='End Date'
                disabled={true}
                dateValue={endDate}
                setDate={setEndDate}
              />
          </span>
        </div>
      </div>
      <div className='proposed-packages__elements column'>
        <div className='mb-4'>
          <div className='day-care__core-cost is-flex is-flex-wrap-wrap is-justify-content-space-between'>
            <h2 className='text-title'>Core cost</h2>
            <EuroInput
              onChange={(value => changeElementsData(setCoreCost, coreCost, 'costPerDay', value))}
              classes='default-label day-care__min-input-space'
              label='Cost per day'
              value={coreCost.costPerDay}
            />
            <BaseField label='Days per week' classes='day-care__min-space'><p>4</p></BaseField>
            <BaseField classes='day-care__min-space' />
            <BaseField classes='day-care__cost-week' label='Cost / week'><p>{currency.euro}240</p></BaseField>
          </div>
          <hr className='horizontal-delimiter'/>
          <div className='row-container day-care__transport'>
            <Dropdown
              classes='day-care__fixed-dropdown-width'
              label='Transport'
              initialText='Supplier (please select)'
              options={supplierOptions}
              selectedValue={transport.supplier}
              onOptionSelect={value => changeElementsData(setTransport, transport, 'supplier', value)}
            />
            <BaseField classes='day-care__min-space' label='Days per week'><p>4</p></BaseField>
            <Input
              value={transport.costPerDay}
              onChange={value => changeElementsData(setTransport, transport, 'costPerDay', value)}
              label='Cost per week'
            />
            <BaseField label='Cost'><p>{currency.euro}89</p></BaseField>
          </div>
          <div className='row-container day-care__transport-escort'>
            <Dropdown
              classes='label-bold'
              label='Transport escort'
              initialText='Select Supplier'
              options={supplierOptions}
              selectedValue={transportEscort.supplier}
              onOptionSelect={value => changeElementsData(setTransportEscort, transportEscort, 'supplier', value)}
            />
            <Input
              value={transportEscort.hoursPerWeek}
              label='Hours per week'
              onChange={value => changeElementsData(setTransportEscort, transportEscort, 'hoursPerWeek', value)}
            />
            <Input
              value={transportEscort.costPerWeek}
              label='Cost per week'
              onChange={value => changeElementsData(setTransportEscort, transportEscort, 'costPerWeek', value)}
            />
            <BaseField label='Cost'><p>{currency.euro}89</p></BaseField>
          </div>
          <div className='row-container day-care__opportunities'>
            <Dropdown
              classes='label-bold'
              label='Dare care opportunities'
              initialText='Select Supplier'
              options={supplierOptions}
              onOptionSelect={value => changeElementsData(setDayCareOpportunities, dayCareOpportunities, 'supplier', value)}
              selectedValue={dayCareOpportunities.supplier}
            />
            <Input
              label='Hours per week'
              value={dayCareOpportunities.hoursPerWeek}
              onChange={value => changeElementsData(setTransportEscort, transportEscort, 'hoursPerWeek', value)}
            />
            <Input
              label='Cost per week'
              value={dayCareOpportunities.costPerWeek}
              onChange={value => changeElementsData(setTransportEscort, transportEscort, 'costPerWeek', value)}
            />
            <BaseField label='Cost'><p>{currency.euro}89</p></BaseField>
          </div>
          <div className='row-container day-care__escort'>
            <Dropdown
              classes='label-bold'
              label='Escort'
              initialText='Select Supplier'
              options={supplierOptions}
              onOptionSelect={value => changeElementsData(setEscort, escort, 'supplier', value)}
              selectedValue={escort.supplier}
            />
            <Input
              value={escort.hoursPerWeek}
              label='Hours per week'
              onChange={value => changeElementsData(setEscort, escort, 'hoursPerWeek', value)}
            />
            <Input
              value={escort.costPerWeek}
              label='Cost per week'
              onChange={value => changeElementsData(setEscort, escort, 'costPerWeek', value)}
            />
            <BaseField label='Cost'><p>{currency.euro}89</p></BaseField>
          </div>
        </div>
        <div className='proposed-packages__total-cost day-care__total-cost'>
          <p>Total <span>{currency.euro}XXXX</span></p>
        </div>
        <div>
          <div className='mt-4 is-flex is-align-items-center is-justify-content-space-between'>
            <p className='package-reclaim__text'>Should the cost of this package be reclaimed in
              part or full from another body, e.g. NHS, CCG, another LA ?
            </p>
            <Button onClick={addPackageReclaim} className='outline'>Add reclaim</Button>
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
      <div className='proposed-packages__tabs column'>
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
  )
}

export default PackagesDayCare;
