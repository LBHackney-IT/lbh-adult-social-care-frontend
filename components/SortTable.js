import React from 'react';
import { CaretDownIcon } from './Icons';
import Checkbox from './Checkbox'

const SortTable = ({ changeAllChecked, checkedRows = [], rows = [], sorts, sortBy, additionalActions }) => (
  <div className="sort-table">
    {checkedRows &&
      (changeAllChecked ? (
        <div className="sort sort-checkbox">
          <Checkbox
            checked={checkedRows.length === rows.length && rows.length !== 0}
            onChange={(value, event) => {
              event.stopPropagation();
              if (checkedRows.length === rows.length) {
                changeAllChecked([]);
              } else {
                changeAllChecked(rows.map((item) => item.id));
              }
            }}
          />
        </div>
      ) : (
        <div className="sort sort-checkbox" />
    ))}
    {sorts.map((item) => (
      <div key={item.name} className="sort">
        <p className="sort__sort-name">{item.text}</p>
        <div className="sort__actions">
          <CaretDownIcon onClick={() => sortBy(item.name, 'increase')} />
          <CaretDownIcon onClick={() => sortBy(item.name, 'decrease')} />
        </div>
      </div>
    ))}
    {additionalActions && additionalActions.map((item) => <div key={item.id} className="sort" />)}
  </div>
);

export default SortTable;
