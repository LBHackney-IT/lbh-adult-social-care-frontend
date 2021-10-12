import React from 'react';
import { CaretDownIcon } from './Icons';
import Checkbox from './Checkbox';
import { DATA_TYPES } from '../api/Utils/CommonOptions';

const SortTable = ({ changeAllChecked, checkedRule, fields, checkedRows = [], rows = [], sorts, sortBy, additionalActions }) => (
  <div className="sort-table">
    {checkedRows && changeAllChecked && (
      <div className={`sort sort-checkbox 'table__row-column-1`}>
        <Checkbox
          checked={checkedRule !== undefined ? checkedRule() : checkedRows.length === rows.length && rows.length !== 0}
          onChange={(value, event) => {
            event.stopPropagation();
            if(checkedRule !== undefined) {
              return changeAllChecked();
            }

            if (checkedRows.length === rows.length) {
              changeAllChecked([]);
            } else {
              changeAllChecked(rows.map((item) => item[fields.id]));
            }
          }}
        />
      </div>
    )}
    {sorts.map((item, index) => {
      const initialColumn = checkedRows && changeAllChecked ? 2 : 1;
      const columnClass = ` table__row-column-${index+initialColumn}`;
      const outerClass = item.className ? ` ${item.className}` : '';
      return (
        <div key={item.name} className={`sort${outerClass}${columnClass}`}>
          <p className="sort__sort-name">{item.text}</p>
          <div className="sort__actions">
            <CaretDownIcon onClick={() => sortBy(item.name, 'ascending', item?.dataType || DATA_TYPES.STRING)} />
            <CaretDownIcon onClick={() => sortBy(item.name, 'descending', item?.dataType || DATA_TYPES.STRING)} />
          </div>
        </div>
      )
    })}
    {additionalActions && additionalActions.map((item) => <div key={item.id} className="sort" />)}
  </div>
);

export default SortTable;
