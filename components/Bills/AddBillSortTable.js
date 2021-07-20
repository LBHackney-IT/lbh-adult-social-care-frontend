import React from 'react';

const AddBillSortTable = ({ sorts }) => (
  <div className="sort-table">
    {sorts.map((item) => (
      <div key={item.name} className="sort">
        <p className="sort__sort-name">{item.text}</p>
      </div>
    ))}
  </div>
);

export default AddBillSortTable;
