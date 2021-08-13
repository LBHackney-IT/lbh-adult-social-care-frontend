import React, { useState } from 'react';
import { pick, omit, groupBy, last } from 'lodash';
import { useInvoiceStatusList } from '../../api/SWR';
import Dropdown from '../Dropdown';
import { formatDateWithSign, formatStatus, includeString } from '../../service/helpers';
import PayRunSortTable from './PayRunSortTable';
import Checkbox from '../Checkbox';
import { Button } from '../Button';
import Loading from '../Loading'

const PayRunTable = ({
  onClickTableRow,
  checkedRows,
  loading,
  setCheckedRows,
  changeAllChecked,
  rows = [],
  release,
  releaseAllSelected,
  additionalActions,
  isStatusDropDown = false,
  className = '',
  canCollapseRows = false,
  sortBy,
  selectStatus,
  sorts,
}) => {
  const { data: invoiceStatuses } = useInvoiceStatusList();

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
      collapseRows(item.key);
    }
  };

  return (
    <div className={`table ${className}`}>
      <PayRunSortTable
        additionalActions={additionalActions}
        setCheckedRows={setCheckedRows}
        changeAllChecked={changeAllChecked}
        rows={rows}
        checkedRows={checkedRows}
        sortBy={sortBy}
        sorts={sorts}
      />

      {loading && <Loading className='table-loading' />}
      {!rows.length ? (
        <p>No Table Data</p>
      ) : (
        rows.map((item) => {
          const collapsedRow = collapsedRows.includes(item.key);
          const rowStatus = item.status ? ` ${item.status}` : '';

          return (
            <div key={item.id} className={`table__row${collapsedRow ? ' collapsed' : ''}${rowStatus}`}>
              <div
                onClick={() => clickRow(item)}
                className={`table__row-column-items${clickRow ? ' is-clickable' : ''}`}
              >
                {checkedRows && (
                  <div className="table__row-item table__row-item-checkbox">
                    <Checkbox
                      checked={checkedRows.includes(item.key)}
                      onChange={(value, event) => {
                        event.stopPropagation();
                        setCheckedRows(item.key);
                      }}
                    />
                  </div>
                )}

                {Object.keys(item).map((rowItemKey) => {
                  if (['key', 'invoices'].includes(rowItemKey)) return null;

                  const value = includeString(rowItemKey.toLowerCase(), 'date')
                    ? formatDateWithSign(item[rowItemKey])
                    : item[rowItemKey];

                  const isStatus = rowItemKey === 'invoiceStatusId';
                  const status = invoiceStatuses.find((el) => el.statusId === item.invoiceStatusId);
                  const formattedStatus = isStatus && formatStatus(status?.statusName, '-', true);
                  const statusItemClass = isStatus
                    ? `table__row-item-status ${status?.statusName?.toLowerCase() ?? ''}`
                    : '';

                  if (isStatusDropDown && isStatus) {
                    return (
                      <Dropdown
                        key={`${rowItemKey}${item.id}`}
                        className={`table__row-item ${statusItemClass}`}
                        options={[
                          { text: 'Accepted', value: 'accepted' },
                          { text: 'Held', value: 'held' },
                          { text: 'Rejected', value: 'rejected' },
                          { text: 'In dispute', value: 'in-dispute' },
                        ]}
                        selectedValue={value}
                        onOptionSelect={(value) => selectStatus(item, value)}
                        initialText="Status"
                      />
                    );
                  }

                  return (
                    <div key={`${rowItemKey}${item.id}`} className={`table__row-item ${statusItemClass}`}>
                      <p>{isStatus ? formattedStatus : value}</p>
                    </div>
                  );
                })}

                {additionalActions?.map((action) => {
                  const { Component } = action;
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
                  {item.invoices.map((invoice) => (
                    <div key={invoice.invoiceId} className="table__row-collapsed-container">
                      <div className="table__row-collapsed-header">
                        <div className="table__row-collapsed-header-left">
                          <p>{item.serviceUserName}</p>
                          <p>{item.supplierName}</p>
                        </div>
                        <p>{invoice.invoiceNumber}</p>
                      </div>

                      <div className="table__row-collapsed-main">
                        <div className="table__row-collapsed-main-header">
                          <p>Item</p>
                          <p>Cost</p>
                          <p>Qty</p>
                          <p>Total</p>
                        </div>

                        {invoice.invoiceItems.map((invoiceItem) => (
                          <div key={invoiceItem.invoiceItemId} className="table__row-collapsed-main-item">
                            <p>{invoiceItem.itemName}</p>
                            <p>£{invoiceItem.pricePerUnit}</p>
                            <p>{invoiceItem.quantity}</p>
                            <p>£{invoiceItem.totalPrice}</p>
                          </div>
                        ))}
                      </div>

                      {release && (
                        <Button
                          className="outline green"
                          onClick={(e) => {
                            e.stopPropagation();
                            release(item, invoice);
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
        })
      )}

      {checkedRows.length > 0 && (
        <Button
          className="outline green table__row-release-all"
          onClick={(e) => {
            e.stopPropagation();
            releaseAllSelected(rows);
          }}
        >
          Release all selected
        </Button>
      )}
    </div>
  );
};

export default PayRunTable;
