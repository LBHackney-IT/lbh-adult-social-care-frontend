import React, { useState } from 'react';
import { pick, omit, groupBy, last } from 'lodash';
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
  invoiceStatuses,
  sorts,
}) => {
  const groupedData = useGroupedData(rows);

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
        rows={groupedData}
        checkedRows={checkedRows}
        sortBy={sortBy}
        sorts={sorts}
      />

      {loading && <Loading className='table-loading' />}
      {!groupedData.length ? (
        <p>No Table Data</p>
      ) : (
        groupedData.map((item) => {
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
            releaseAllSelected(groupedData);
          }}
        >
          Release all selected
        </Button>
      )}
    </div>
  );
};

const useGroupedData = (data) => {
  // move all invoices to one level and generate key as combination of fields
  let result = data.reduce((rowAcc, payRun) => {
    const row = {
      payRunDate: payRun.payRunDate,
      payRunId: payRun.payRunId,
    };

    payRun.invoices.forEach((invoice) => {
      const invoiceFields = ['serviceUserName', 'packageTypeName', 'supplierName', 'totalAmount', 'invoiceStatusId'];

      const rowResult = {
        ...row,
        ...pick(invoice, invoiceFields),
        waitingFor: last(invoice.disputedInvoiceChat).actionRequiredFromName,
        invoiceInfo: pick(invoice, ['invoiceItems', 'invoiceId', 'invoiceNumber']),
      };

      const keyFields = ['payRunId', 'payRunDate', ...invoiceFields];
      rowResult.key = keyFields.reduce((keyAcc, field) => {
        keyAcc += rowResult[field];
        return keyAcc;
      }, '');

      rowAcc.push(rowResult);
    });

    return rowAcc;
  }, []);

  // group all invoices by generated key
  result = groupBy(result, 'key');

  // format structure from grouped object to an array
  result = Object.values(result).map((invoices) => ({
    ...omit(invoices[0], 'invoiceInfo'),
    invoices: invoices.map((invoice) => ({ ...invoice.invoiceInfo })),
  }));

  return result;
};

export default PayRunTable;
