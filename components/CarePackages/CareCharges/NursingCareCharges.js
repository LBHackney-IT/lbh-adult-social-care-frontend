import React from 'react';
import NursingCareChargesEdit from './NursingCareChargesEdit';
import NursingCareChargesStatic from './NursingCareChargesStatic';

export const NursingCareCharges = ({
  provisionalAge,
  setProvisionalCost,
  careChargeErrors,
  provisionalCost,
  collectingCharges,
  setCollectingCharges,
  reasonCollectingCharges,
  setReasonCollectingCharges,
  tableData,
}) => {
  return (
    <div className='nursing-care-charges'>
      <div className="row-container is-align-items-center">
        <h2 className="font-weight-bold font-size-19px">Care Charges</h2>
      </div>
      {
        tableData ? <NursingCareChargesStatic tableData={tableData} collectingCharges={collectingCharges}/>
          : <NursingCareChargesEdit
            provisionalAge={provisionalAge}
            setProvisionalCost={setProvisionalCost}
            careChargeErrors={careChargeErrors}
            provisionalCost={provisionalCost}
            collectingCharges={collectingCharges}
            setCollectingCharges={setCollectingCharges}
            reasonCollectingCharges={reasonCollectingCharges}
            setReasonCollectingCharges={setReasonCollectingCharges}
          />
      }
    </div>
  );
};