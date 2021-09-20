import React from 'react';
import NursingCareChargesEdit from './NursingCareChargesEdit';
import faker from 'faker';
import NursingCareChargesStatic from './NursingCareChargesStatic';

const testData = [
  {
    status: 'Active',
    element: 'Residential Care / wk',
    startDate: faker.date.past(20),
    cost: 1000,
  },
  {
    status: 'Active',
    element: 'Additional needs payment / wk',
    startDate: faker.date.past(20),
    cost: 100,
  },
  {
    status: 'End',
    element: 'Residential SU contribution',
    startDate: faker.date.past(20),
    endDate: faker.date.future(20),
    cost: -100,
  },
  {
    status: 'Active',
    element: 'Residential SU contribution',
    startDate: faker.date.past(20),
    endDate: faker.date.future(20),
    cost: -200,
  },
  {
    status: 'Active',
    element: 'Residential SU contribution',
    startDate: faker.date.past(20),
    endDate: faker.date.future(20),
    cost: -200,
  },
];

const NursingCareCharges = ({
  provisionalAge,
  setProvisionalCost,
  careChargeErrors,
  provisionalCost,
  collectingCharges,
  setCollectingCharges,
  reasonCollectingCharges,
  setReasonCollectingCharges,
  tableData = testData,
}) => {
  return (
    <div className='nursing-care-charges'>
      <div className="row-container is-align-items-center">
        <h2 className="hackney-text-black font-weight-bold pt-5 font-size-19px">Care Charges</h2>
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

export default NursingCareCharges;