import React from "react";
import {formatDateWithSlash, formatStatus, includeString} from "../../../service/helpers";
import SupplierSortTable from "./SupplierSortTable";
import Checkbox from "../../components/Checkbox";

const SupplierReturnsTable = ({
  onClickTableRow,
  checkedRows,
  setCheckedRows,
  rows,
  isIgnoreId = false,
  classes = '',
  sortBy,
  sorts,
}) => {
  const clickRow = (item) => {
    if(onClickTableRow) {
      onClickTableRow(item);
    }
  };

  return (
    <div className={`table ${classes}`}>
      <SupplierSortTable checkedRows={checkedRows} sortBy={sortBy} sorts={sorts} />
      {rows.map(item => {
        const rowStatus = item.status ? ` ${item.status}` : '';
        return (
          <div key={item.id} onClick={() => clickRow(item)} className={`table__row${rowStatus}`}>
            {setCheckedRows &&
              <div className='table__row-item table__row-item-checkbox'>
                <Checkbox checked={checkedRows.includes(item.id)} onChange={(value, event) => {
                  event.stopPropagation();
                  setCheckedRows(item.id)
                }} />
              </div>
            }
            {Object.getOwnPropertyNames(item).map(rowItemName => {
              if(rowItemName === 'disputesCount' && item.status !== 'disputes-active') {
                return <div className='table__row-item'/>
              }
              if(Array.isArray(item[rowItemName]) || (item[rowItemName]?.id !== undefined) || (isIgnoreId && rowItemName === 'id')) {
                return <></>;
              }
              const value = includeString(rowItemName, 'weekCommencing') ? formatDateWithSlash(item[rowItemName]) : item[rowItemName];
              const isStatus = rowItemName === 'status';
              const formattedStatus = isStatus && formatStatus(item[rowItemName]);
              const statusItemClass = isStatus ? ` table__row-item-status ${item[rowItemName]}` : '';
              return (
                <div
                  key={`${rowItemName}${item.id}`}
                  className={`table__row-item${statusItemClass}`}
                >
                  <p>{isStatus ? formattedStatus : value}</p>
                </div>
              );
            })}
          </div>
        )
      })}
    </div>
  )
};

export default SupplierReturnsTable;
