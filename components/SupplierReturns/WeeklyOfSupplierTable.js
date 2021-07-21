import React, { useState } from 'react';
import { formatDateWithSign, formatStatus, includeString } from '../../service/helpers';
import Checkbox from '../Checkbox';
import ChatButton from './ChatButton';
import { Button } from '../Button';
import WeekOfSupplierSortTable from './WeekOfSupplierSortTable';

const chatStatuses = ['disputed', 'resubmitted'];

const WeeklyOfSupplierTable = ({
  onClickTableRow,
  openChat,
  checkedRows,
  changeCheckedRowsState,
  setCheckedRows,
  rows,
  additionalActions,
  makeAction,
  requestsQue,
  isIgnoreId = false,
  classes = '',
  canCollapseRows = false,
  sortBy,
  actionAllServices,
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
      <WeekOfSupplierSortTable
        checkedRows={checkedRows}
        setCheckedRows={changeCheckedRowsState}
        rows={rows}
        sortBy={sortBy}
        sorts={sorts}
      />
      {rows.map((supplier) => {
        const collapsedRow = collapsedRows.includes(supplier.id);
        const rowStatus = supplier.status ? ` ${supplier.status}` : '';
        const supplierAction = (e, actionType) => {
          e.stopPropagation();
          makeAction(supplier, null, actionType);
        };

        return (
          <div
            key={supplier.id}
            onClick={() => clickRow(supplier)}
            className={`table__row${collapsedRow ? ' collapsed' : ''}${rowStatus}`}
          >
            {setCheckedRows && (
              <div className="table__row-item table__row-item-checkbox">
                <Checkbox
                  checked={checkedRows.includes(supplier.id)}
                  onChange={(value, event) => {
                    event.stopPropagation();
                    setCheckedRows(supplier.id);
                  }}
                />
              </div>
            )}
            {Object.getOwnPropertyNames(supplier).map((rowItemName) => {
              if (
                Array.isArray(supplier[rowItemName]) ||
                supplier[rowItemName]?.id !== undefined ||
                (isIgnoreId && rowItemName === 'id')
              ) {
                return <></>;
              }
              const value = includeString(rowItemName.toLowerCase(), 'date')
                ? formatDateWithSign(supplier[rowItemName])
                : supplier[rowItemName];
              const isStatus = rowItemName === 'status';
              const formattedStatus = isStatus && formatStatus(supplier[rowItemName]);
              const statusItemClass = isStatus ? ` table__row-item-status ${supplier[rowItemName]}` : '';

              return (
                <div key={`${rowItemName}${supplier.id}`} className={`table__row-item${statusItemClass}`}>
                  <p>{isStatus ? formattedStatus : value}</p>
                </div>
              );
            })}
            {additionalActions &&
              additionalActions.map((action) => {
                const { Component } = action;
                const loading = requestsQue.some((requestId) => String(requestId) === String(supplier.id));
                return (
                  <div key={`${action.id}`} className={`table__row-item ${action.className}`}>
                    {loading && <p className="text-gray">(Pending Supplier)</p>}
                    {!loading && ['submitted', 'in-dispute', 'not-started', 'resubmitted'].includes(supplier.status) && (
                      <Button
                        className="outline green weekly-of-supplier__accept-action"
                        onClick={(e) => supplierAction(e, 'accept-supplier')}
                      >
                        Accept
                      </Button>
                    )}
                    {!loading && ['submitted', 'in-dispute', 'not-started', 'resubmitted'].includes(supplier.status) && (
                      <Button
                        className="weekly-of-supplier__dispute-action gray outline"
                        onClick={(e) => supplierAction(e, 'dispute-supplier')}
                      >
                        Dispute
                      </Button>
                    )}
                    {!loading && ['accepted'].includes(supplier.status) && (
                      <Button
                        className="weekly-of-supplier__revoke-action green outline"
                        onClick={(e) => supplierAction(e, 'revoke-supplier')}
                      >
                        Revoke
                      </Button>
                    )}
                    {['submitted', 'in-dispute', 'resubmitted'].includes(supplier.status) && (
                      <Component
                        onClick={(e) => {
                          e.stopPropagation();
                          action.onClick(supplier);
                        }}
                      />
                    )}
                  </div>
                );
              })}
            {collapsedRow && (
              <div className="table__row-collapsed">
                <div className="table__row-collapsed-container">
                  <div className="table__row-collapsed-header">
                    <p>Service</p>
                    <p>Package Hrs</p>
                    <p>Hrs Delivered</p>
                    <p>Package Visits</p>
                    <p>Actual Visits</p>
                    <p>Comments</p>
                    <p>Status</p>
                    <p>Action</p>
                  </div>
                  {supplier.services.map((service) => {
                    const loading = requestsQue.some(
                      (requestId) => String(requestId) === `${supplier.id}${service.id}`
                    );
                    const actionClick = (e, actionType) => {
                      e.stopPropagation();
                      makeAction(supplier, service, actionType);
                    };
                    return (
                      <div key={`${supplier.id}${service.id}`} className="table__row-collapsed-main">
                        <div className="table__row-collapsed-main-item">
                          <div className="table__row-collapsed-main-item-el">{service.serviceName}</div>
                          <div className="table__row-collapsed-main-item-el">{service.packageHrs}</div>
                          <div className="table__row-collapsed-main-item-el">{service.hrsDelivered}</div>
                          <div className="table__row-collapsed-main-item-el">{service.packageVisits}</div>
                          <div className="table__row-collapsed-main-item-el">{service.actualVisits}</div>
                          <div className="table__row-collapsed-main-item-el">{service.comments}</div>
                          <div className="table__row-collapsed-main-item-el">
                            <span className={`table__row-collapsed-main-item__status ${service.status}`}>
                              {formatStatus(service.status)}
                            </span>
                          </div>
                          <div className="table__row-collapsed-main-item-el">
                            {loading && <p className="text-gray">(Pending Supplier)</p>}
                            {!loading && ['submitted', 'resubmitted', 'not-submitted'].includes(service.status) && (
                              <Button
                                className="outline green weekly-of-supplier__accept-action"
                                onClick={(e) => actionClick(e, 'accept-service')}
                              >
                                Accept
                              </Button>
                            )}
                            {!loading && ['submitted', 'resubmitted', 'not-submitted'].includes(service.status) && (
                              <Button
                                className="outline gray weekly-of-supplier__dispute-action"
                                onClick={(e) => actionClick(e, 'dispute-service')}
                              >
                                Dispute
                              </Button>
                            )}
                            {!loading && ['accepted'].includes(service.status) && (
                              <Button
                                className="outline green weekly-of-supplier__revoke-action"
                                onClick={(e) => actionClick(e, 'revoke-service')}
                              >
                                Revoke
                              </Button>
                            )}
                            <ChatButton
                              classes={!chatStatuses.includes(service.status) && 'hide'}
                              onClick={(e) => {
                                e.stopPropagation();
                                openChat(service);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {!supplier.services.some((service) =>
                    requestsQue.some((item) => String(item) === `${supplier.id}${service.id}`)
                  ) && (
                    <div className="table__row-collapsed-footer-item">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          actionAllServices(supplier, 'dispute');
                        }}
                        className="outline red"
                      >
                        Dispute all
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          actionAllServices(supplier, 'accept');
                        }}
                      >
                        Accept all
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default WeeklyOfSupplierTable;
