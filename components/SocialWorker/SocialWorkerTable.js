import React from "react";
import {formatDateWithSign, formatStatus, includeString} from "../../service/helpers";
import SortTable from "../SortTable";

const SocialWorkerTable = ({
  onClickTableRow,
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
    <div className={`social-worker__table ${classes}`}>
      <SortTable sortBy={sortBy} sorts={sorts} />
      {rows.map(item => {
        const rowStatus = item.status ? ` ${item.status}` : '';
        return (
          <div key={item.id} onClick={() => clickRow(item)} className={`table__row ${rowStatus}`}>
            {Object.getOwnPropertyNames(item).map(rowItemName => {
              if(Array.isArray(item[rowItemName]) || (item[rowItemName]?.id !== undefined) || (isIgnoreId && rowItemName === 'id')) {
                return <React.Fragment key={`${rowItemName}${item.id}`}/>;
              }
              const value = includeString(rowItemName.toLowerCase(),'date') ? formatDateWithSign(item[rowItemName]) : item[rowItemName];
              const isStatus = rowItemName === 'status';
              const formattedStatus = isStatus && formatStatus(item[rowItemName]);
              const statusItemClass = isStatus ? ` table__row-item-status ${item[rowItemName]}` : '';
              return (
                <div key={`${rowItemName}${item.id}`}
                     className={`table__row-item${statusItemClass}`}>
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

export default SocialWorkerTable;
