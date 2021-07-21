import React, { useState } from 'react';
import Dropdown from '../Dropdown';
import { formatDateWithSign, formatStatus, includeString } from '../../service/helpers';
import PayRunSortTable from './PayRunSortTable';
import { shortMonths } from '../../constants/strings';
import Checkbox from '../Checkbox';
import { Button } from '../Button';

const PayRunTable = ({
  onClickTableRow,
  checkedRows,
  setCheckedRows,
  changeAllChecked,
  rows = [],
  release,
  additionalActions,
  isIgnoreId = false,
  isStatusDropDown = false,
  className = '',
  canCollapseRows = false,
  careType,
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
    <div className={`table ${className}`}>
      <PayRunSortTable
        additionalActions={additionalActions}
        setCheckedRows={setCheckedRows}
        changeAllChecked={changeAllChecked}
        sortBy={sortBy}
        sorts={sorts}
      />
      {!rows.length ? (
        <p>No Table Data</p>
      ) : (rows.map((item) => {
        const collapsedRow = collapsedRows.includes(item.id);
        const rowStatus = item.status ? ` ${item.status}` : '';
        return (
          <div key={item.id} className={`table__row${collapsedRow ? ' collapsed' : ''}${rowStatus}`}>
            <div onClick={() => clickRow(item)} className={`table__row-column-items${clickRow ? ' is-clickable' : ''}`}>
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
                if(
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
                if (isStatusDropDown && isStatus) {
                  return (
                    <Dropdown
                      key={`${rowItemName}${item.id}`}
                      className={`table__row-item${statusItemClass}`}
                      options={[
                        { text: 'Accepted', value: 'accepted' },
                        { text: 'Held', value: 'held' },
                        { text: 'Rejected', value: 'rejected' },
                        { text: 'In dispute', value: 'in-dispute' },
                      ]}
                      selectedValue={value}
                      onOptionSelect={(value) => console.log(value)}
                      initialText="Status"
                    />
                  );
                }

                return (
                  <div key={`${rowItemName}${item.id}`} className={`table__row-item${statusItemClass}`}>
                    <p>{isStatus ? formattedStatus : value}</p>
                  </div>
                );
              })}
              {additionalActions &&
                additionalActions.map((action) => {
                  const {Component} = action;
                  return (
                    <div key={`${action.id}`} className={`table__row-item ${action.className}`}>
                      <Component
                        onClick={(e) => {
                          e.stopPropagation();
                          action.onClick(item);
                        }}
                      />
                    </div>
                  );
                })}
            </div>
            {canCollapseRows && collapsedRow && (
              <div className="table__row-collapsed">
                {item.cares.map((care) => (
                    <div key={care.id} className="table__row-collapsed-container">
                      <div className="table__row-collapsed-header">
                        <div className="table__row-collapsed-header-left">
                          <p>{care.userName}</p>
                          <p>{care.supplier}</p>
                        </div>
                        <p>{care.id}</p>
                      </div>
                      <div className="table__row-collapsed-main">
                        <div className="table__row-collapsed-main-header">
                          <p>Item</p>
                          <p>Cost</p>
                          <p>Qty</p>
                          <p>Total</p>
                        </div>
                        {care.items.map((personInfo) => {
                          const dateFrom = new Date(personInfo.dateFrom);
                          const dateTo = new Date(personInfo.dateTo);
                          return (
                            <div key={personInfo.id} className="table__row-collapsed-main-item">
                              <p>
                                {careType} care per week
                                <br />
                                {dateFrom.getDate()} {shortMonths[dateFrom.getMonth()]}-{dateTo.getDate()}{' '}
                                {shortMonths[dateTo.getMonth()]} {dateTo.getFullYear()}
                              </p>
                              <p>{personInfo.cost}</p>
                              <p>{personInfo.qty}</p>
                              <p>{personInfo.serviceUser}</p>
                            </div>
                          );
                        })}
                      </div>
                      {release && (
                        <Button
                          className="outline green table__row-release-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            release(item, care);
                          }}
                        >
                          Release
                        </Button>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        );
      }))}
    </div>
  );
};

export default PayRunTable;
