import React from "react";
import {CaretDownIcon} from "../../components/Icons";

const PayRunSortTable = ({ checkedRows, sorts, sortBy, additionalActions }) => {
  return (
    <div className='pay-runs__sort-table'>
      {checkedRows && <div className='pay-runs__sort pay-runs__sort-checkbox'/> }
      {sorts.map(item => {
        return (
          <div key={item.name} className='pay-runs__sort'>
            <p className='sort__sort-name'>{item.text}</p>
            <div className='sort__actions'>
              <CaretDownIcon onClick={() => sortBy(item.name, 'increase')} />
              <CaretDownIcon onClick={() => sortBy(item.name, 'decrease')} />
            </div>
          </div>
        );
      })}
      {additionalActions && additionalActions.map(item => <div key={item.id} className='pay-runs__sort'/>)}
    </div>
  )
};

export default PayRunSortTable;
