import React from "react";
import {formatDateWithSlash} from "../../../service/helpers";
import BillsSortTable from "./BillsSortTable";
import Checkbox from "../../components/Checkbox";

const BillsTable = ({
  checkedRows,
  setCheckedRows,
  rows,
  isIgnoreId = false,
  classes = '',
  clickRow = () => {},
  sortBy,
  sorts,
}) => {
  return (
    <div className={`table ${classes}`}>
      <BillsSortTable checkedRows={checkedRows} sortBy={sortBy} sorts={sorts} />
      {rows.map(item => {
        const rowStatus = item.status ? ` ${item.status}` : '';
        return (
          <div onClick={clickRow} key={item.id} className={`table-row${rowStatus}`}>
            {checkedRows &&
              <div className='table-row-item table-row-item-checkbox'>
                <Checkbox checked={checkedRows.includes(item.id)} onChange={(value, event) => {
                  event.stopPropagation();
                  setCheckedRows(item.id)
                }} />
              </div>
            }
            {Object.getOwnPropertyNames(item).map(rowItemName => {
              if(Array.isArray(item[rowItemName]) || (item[rowItemName]?.id !== undefined) || (isIgnoreId && rowItemName === 'id')) {
                return <></>;
              }
              const value = rowItemName.toLowerCase().indexOf('date') > -1 ? formatDateWithSlash(item[rowItemName]) : item[rowItemName];
              const isStatus = rowItemName === 'status';
              const formattedStatus = isStatus && item[rowItemName].split('-').map(text => text.slice(0, 1).toUpperCase() + text.slice(1,text.length)).join(' ');
              const statusItemClass = isStatus ? ` table-row-item-status ${item[rowItemName]}` : '';
              return (
                <div key={`${rowItemName}${item.id}`}
                   className={`table-row-item${statusItemClass}`}>
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

export default BillsTable;
