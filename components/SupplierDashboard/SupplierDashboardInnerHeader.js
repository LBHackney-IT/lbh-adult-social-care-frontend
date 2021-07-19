import React, {useState} from "react";

const SupplierDashboardInnerHeader = () => {
  const [openedEdit, setOpenedEdit] = useState(false);

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
