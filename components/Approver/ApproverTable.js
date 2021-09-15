import React from 'react';
import SortTable from '../SortTable';
import { formatStatus } from 'service/helpers';

const ApproverTable = ({ onClickTableRow, rows, classes = '', sortBy, sorts, clickPackageType }) => {
  const clickRow = (item) => {
    if (onClickTableRow) {
      onClickTableRow(item);
    }
  };

  return (
    <div className={`approver-hub__table ${classes}`}>
      <SortTable sortBy={sortBy} sorts={sorts} />
      {!rows.length ? (
        <p>No Table Data</p>
      ) : (
        rows.map((item) => {
          return (
            <div key={item.id} className="table__row">
              <div className="table__row-column-items" onClick={() => clickRow(item)}>
                {Object.getOwnPropertyNames(item).map((rowItemName) => {
                  let value = item[rowItemName];
                  let additionalClasses = '';
                  let onClick = () => {};
                  if (rowItemName === 'packageType') {
                    value = formatStatus(value);
                    additionalClasses += 'link-button';
                    onClick = (e) => {
                      //e.stopPropagation();
                      clickPackageType(item[rowItemName]);
                    };
                  }
                  return (
                    <div
                      onClick={onClick}
                      key={`${rowItemName}${item.id}`}
                      className={`table__row-item ${additionalClasses}`}
                    >
                      <p>{value}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ApproverTable;
