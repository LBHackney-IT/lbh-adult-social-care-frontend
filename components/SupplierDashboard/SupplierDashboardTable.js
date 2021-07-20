import React, { useState } from 'react';
import { formatDateWithSign, formatStatus, includeString } from '../../service/helpers';
import SupplierReturnsDashboardSortTable from './SupplierReturnsDashboardSortTable';
import Checkbox from '../Checkbox';

const SupplierDashboardTable = ({
  onClickTableRow,
  checkedRows,
  setCheckedRows,
  rows,
  isIgnoreId = false,
  classes = '',
  canCollapseRows = false,
  sortBy,
  sorts,
}) => {
  const [collapsedRows, setCollapsedRows] = useState([]);

  const collapseRows = (id) => {
    if (collapsedRows.includes(id)) {
      setCollapsedRows(collapsedRows.filter((rowId) => String(rowId) !== String(id)));
    } else {
      setCollapsedRows([...collapsedRows, id]);
    }
  };

  const clickRow = (item) => {
    if (onClickTableRow) {
      onClickTableRow(item);
    } else if (canCollapseRows) {
      collapseRows(item.id);
    }
  };

  return (
    <div className={`table ${classes}`}>
      <SupplierReturnsDashboardSortTable checkedRows={checkedRows} sortBy={sortBy} sorts={sorts} />
      {rows.map((item) => {
        const collapsedRow = collapsedRows.includes(item.id);
        const rowStatus = item.status ? ` ${item.status}` : '';
        return (
          <div
            key={item.id}
            onClick={() => clickRow(item)}
            className={`table__row${collapsedRow ? ' collapsed' : ''}${rowStatus}`}
          >
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
              const value = includeString(rowItemName, 'weekCommencing')
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
        );
      })}
    </div>
  );
};

export default SupplierDashboardTable;
