import React from 'react';
import { formatDateWithSign, formatStatus, includeString } from '../../service/helpers';
import BillsSortTable from './BillsSortTable';
import Checkbox from '../Checkbox';

const BillsTable = ({
  checkedRows,
  setCheckedRows,
  rows,
  isIgnoreId = false,
  className = '',
  clickRow = () => {},
  sortBy,
  sorts,
}) => {
  return (
    <div className={`table ${className}`}>
      <BillsSortTable checkedRows={checkedRows} sortBy={sortBy} sorts={sorts} />
      {rows.map((item) => {
        const rowStatus = item.status ? ` ${item.status}` : '';
        return (
          <div key={item.id} className={`table__row${rowStatus}`}>
            <div onClick={clickRow} className={`table__row-column-items ${clickRow ? ' is-clickable' : ''}`}>
              {checkedRows && (
                <div className="table__row-item table__row-item-checkbox">
                  <Checkbox
                    checked={checkedRows.includes(item.id)}
                    onChange={(value, event) => {
                      event.stopPropagation();
                      setCheckedRows(item.id);
                    }}
                  />
                </div>
              )}
              {Object.getOwnPropertyNames(item).map((rowItemName) => {
                if (
                  Array.isArray(item[rowItemName]) ||
                  item[rowItemName]?.id !== undefined ||
                  (isIgnoreId && rowItemName === 'id')
                ) {
                  return <React.Fragment key={`${rowItemName}${item.id}`} />;
                }
                const value = includeString(rowItemName.toLowerCase(), 'date')
                  ? formatDateWithSign(item[rowItemName])
                  : item[rowItemName];
                const isStatus = rowItemName === 'status';
                const formattedStatus = isStatus && formatStatus(item[rowItemName]);
                const statusItemClass = isStatus ? ` table__row-item-status ${item[rowItemName]}` : '';
                return (
                  <div key={`${rowItemName}${item.id}`} className={`table__row-item${statusItemClass}`}>
                    <p>{isStatus ? formattedStatus : value}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BillsTable;
