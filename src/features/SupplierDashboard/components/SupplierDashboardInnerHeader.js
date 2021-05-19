import React, {useState} from "react";
import {Button} from "../../components/Button";
import Input from "../../components/Input";
import Dropdown from "../../components/Dropdown";
import Breadcrumbs from "../../components/Breadcrumbs";

const initialFilters = {
  serviceUser: '',
  invoiceNo: '',
  packageId: '',
  supplier: '',
  type: '',
  status: '',
  dateRange: '',
};

const SupplierDashboardInnerHeader = ({
  supplierOptions = [],
  dateRangeOptions = [],
  typeOptions = [],
  statusOptions = [],
}) => {
  const [filters, setFilters] = useState({...initialFilters});
  const [openedEdit, setOpenedEdit] = useState(false);

  const applyFilters = () => {
    console.log('make an apply filters request');
  };

  const changeFilter = (field, value) => {
    setFilters({
      ...filters,
      [field]: value,
    });
  };

  return (
    <div className='supplier-dashboard__header'>
      <div className='supplier-dashboard__edit'>
        <p className='title'>Supplier Returns for care home 1 ltd</p>
        {!openedEdit && <p className='supplier-dashboard__edit-button' onClick={() => setOpenedEdit(true)}>Edit</p>}
      </div>
    </div>
  )
};

export default SupplierDashboardInnerHeader;
