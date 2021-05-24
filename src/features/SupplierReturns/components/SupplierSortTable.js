import React from "react";
import {CaretDownIcon} from "../../components/Icons";

const SupplierSortTable = ({ checkedRows, sorts, sortBy, additionalActions }) => {
  return (
    <div className='sort-table'>
      {checkedRows && <div className='sort sort-checkbox'/> }
      {sorts.map(item => {
        return (
          <div key={item.name} className='sort'>
            <p className='sort__sort-name'>{item.text}</p>
            <div className='sort__actions'>
              <CaretDownIcon onClick={() => sortBy(item.name, 'increase')} />
              <CaretDownIcon onClick={() => sortBy(item.name, 'decrease')} />
            </div>
          </div>
        );
      })}
      {additionalActions && additionalActions.map(item => <div key={item.id} className='sort'/>)}
    </div>
  )
};

export default SupplierSortTable;
