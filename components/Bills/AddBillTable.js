import React from 'react';
import AddBillSortTable from './AddBillSortTable';

const AddBillTable = ({ rows = [], isIgnoreId = false, classes = '', sorts }) => (
  <div className={`table ${classes}`}>
    <p className="table__title">Day Care Invoice from Care Homes Ltd For Mrs Jones</p>
    <AddBillSortTable sorts={sorts} />
    {!rows?.length ? (
      <></>
    ) : (
      rows.map((item) => {
        const rowStatus = item.status ? ` ${item.status}` : '';
        return (
          <div key={item.id} className={`table__row${rowStatus}`}>
            {Object.getOwnPropertyNames(item).map((rowItemName) => {
              if (
                Array.isArray(item[rowItemName]) ||
                item[rowItemName]?.id !== undefined ||
                (isIgnoreId && rowItemName === 'id')
              ) {
                return <React.Fragment key={`${rowItemName}${item.id}`} />;
              }
              return (
                <div key={`${rowItemName}${item.id}`} className="table__row-item">
                  <p>{item[rowItemName]}</p>
                </div>
              );
            })}
          </div>
        );
      })
    )}
  </div>
);

export default AddBillTable;
