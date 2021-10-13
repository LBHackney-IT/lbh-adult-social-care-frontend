import React from 'react';
import { CaretDownIcon } from '../Icons';

const SupplierReturnsDashboardSortTable = ({ checkedRows, sorts, sortBy, additionalActions }) => (
  <div className="sort-table">
    {checkedRows && <div className="sort sort-checkbox" />}
    {sorts.map((item) => (
      <div key={item.name} className="sort">
        <p className="sort__sort-name">{item.text}</p>
        <div className="sort__actions">
          <CaretDownIcon onClick={() => sortBy(item.name, 'ascending')} />
          <CaretDownIcon onClick={() => sortBy(item.name, 'descending')} />
        </div>
      </div>
    ))}
    {additionalActions && additionalActions.map((item) => <div key={item.id} className="sort" />)}
  </div>
);

export default SupplierReturnsDashboardSortTable;
