import React, {useState} from "react";
import {Button} from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import Checkbox from "../../components/Checkbox";

const initialFilters = {
  action: '',
  serviceUser: '',
  packageId: '',
  supplier: '',
  newMessage: '',
  underDelivered: '',
  overDelivered: '',
  withDisputes: '',
};

const WeekOfSupplierViewInnerHeader = ({
 supplierOptions = [],
 careType,
 typeOptions = [],
 actionOptions = [],
 statusOptions = [],
 clickActionButton = () => {},
}) => {
  const [filters, setFilters] = useState({...initialFilters});
  const [action, setAction] = useState('');

  const applyFilters = () => {
    console.log('make an apply filters request');
  };

  const applyAction = () => {
    console.log('apply action', action);
  }

  const changeFilter = (field, value) => {
    setFilters({
      ...filters,
      [field]: value,
    });
  };

  return (
    <div className='week-of-supplier supplier-returns-dashboard__inner-header supplier-returns__inner-header'>
      <div className='supplier-returns-dashboard__upload-evidence'>
        <p className='title'>{careType} Supplier Returns</p>
        <Button className='outline green' onClick={clickActionButton}>Upload Evidence</Button>
      </div>
      <div className='supplier-returns-dashboard__actions'>
        <div className='supplier-returns-dashboard__action mb-3'>
          <Dropdown
            initialText='Action'
            options={actionOptions}
            selectedValue={action}
            onOptionSelect={(option) => setAction(option)}
          />
          <Button onClick={() => applyAction()}>Apply to selected</Button>
        </div>
        <div className='supplier-returns__filters'>
          <div className='supplier-returns__dropdowns'>
            <Dropdown
              initialText='Service user'
              classes='mr-3'
              options={typeOptions}
              selectedValue={filters.serviceUser}
              onOptionSelect={(option) => changeFilter('serviceUser', option)}
            />
            <Dropdown
              initialText='Package ID'
              classes='mr-3'
              options={statusOptions}
              selectedValue={filters.packageId}
              onOptionSelect={(option) => changeFilter('packageId', option)}
            />
            <Dropdown
              initialText='Supplier'
              classes='mr-3'
              options={supplierOptions}
              selectedValue={filters.supplier}
              onOptionSelect={(option) => changeFilter('supplier', option)}
            />
            <Button onClick={applyFilters}>Filter</Button>
          </div>
          <div className='supplier-returns__filters-checkboxes'>
            <Checkbox onChange={value => changeFilter('newMessage', value)} checked={filters.newMessage}><p>New Message</p></Checkbox>
            <Checkbox onChange={value => changeFilter('underDelivered', value)} checked={filters.underDelivered}><p>Under delivered</p></Checkbox>
            <Checkbox onChange={value => changeFilter('overDelivered', value)} checked={filters.overDelivered}><p>Over delivered</p></Checkbox>
            <Checkbox onChange={value => changeFilter('withDisputes', value)} checked={filters.withDisputes}><p>With disputes</p></Checkbox>
          </div>
        </div>
      </div>
    </div>
  )
};

export default WeekOfSupplierViewInnerHeader;
