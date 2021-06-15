import React from "react";
import {CaretDownIcon} from "../Icons";
import Checkbox from "../Checkbox";

const WeekOfSupplierSortTable = ({ setCheckedRows, checkedRows = [], rows = [], sorts, sortBy, additionalActions }) => {
  console.log(sorts);
  return (
    <div className='sort-table'>
      {
        checkedRows &&
        (setCheckedRows ?
            <div className='sort sort-checkbox'>
              <Checkbox checked={checkedRows?.length === rows?.length} onChange={(value, event) => {
                event.stopPropagation();
                if(checkedRows?.length === rows?.length) {
                  setCheckedRows([]);
                } else {
                  setCheckedRows(rows.map(item => item.id));
                }
              }} />
            </div>
            : <div className='sort sort-checkbox'/>
        )
      }
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

export default WeekOfSupplierSortTable;
