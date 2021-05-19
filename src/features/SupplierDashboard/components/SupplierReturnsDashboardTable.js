import React, {useEffect, useState} from "react";
import {formatDateWithSlash, formatStatus} from "../../../service/helpers";
import PayRunSortTable from "./PayRunSortTable";
import Checkbox from "../../components/Checkbox";
import ChatButton from "./ChatButton";
import Input from "../../components/Input";

const actions = {
  'not-submitted': {
    text: 'Submit',
    actionName: 'submit',
  },
  'disputed': {
    text: 'Resubmit',
    actionName: 'resubmit',
  },
};

const chatStatuses = ['disputed'];

const SupplierReturnDashboardTable = ({
  onClickTableRow,
  openChat,
  checkedRows,
  setCheckedRows,
  rows,
  additionalActions,
  makeAction,
  isIgnoreId = false,
  classes = '',
  canCollapseRows = false,
  sortBy,
  sorts,
}) => {
  const [collapsedRows, setCollapsedRows] = useState([]);
  const [serviceValues, setServiceValues] = useState([]);

  const changeServiceValue = (value, field, index) => {
    const foundedIndex = serviceValues.findIndex(item => item.id === index);
    const cloneServiceValues = serviceValues.slice();
    cloneServiceValues.splice(foundedIndex, 1, {...serviceValues[foundedIndex], [field]: value});
    setServiceValues(cloneServiceValues);
  };

  const collapseRows = id => {
    if(collapsedRows.includes(id)) {
      setCollapsedRows(collapsedRows.filter(rowId => rowId != id));
    } else {
      setCollapsedRows([...collapsedRows, id]);
    }
  };

  const clickRow = (item) => {
    if(onClickTableRow) {
      onClickTableRow(item);
    } else if(canCollapseRows) {
      collapseRows(item.id);
    }
  };

  useEffect(() => {
    let newServiceValue = [];
    rows.forEach(item => {
      const services = item.services.map(service => {
        const newServices = {...service};
        newServices.id = `${item.id}${newServices.id}`;
        return newServices;
      });
      newServiceValue = [...newServiceValue, ...services];
    });
    setServiceValues(newServiceValue.slice());
  }, [rows]);

  return (
    <div className={`table ${classes}`}>
      <PayRunSortTable additionalActions={additionalActions} checkedRows={checkedRows} sortBy={sortBy} sorts={sorts} />
      {rows.map(item => {
        const collapsedRow = collapsedRows.includes(item.id);
        const rowStatus = item.status ? ` ${item.status}` : '';
        return (
          <div key={item.id} onClick={() => clickRow(item)} className={`table-row${collapsedRow ? ' collapsed' : ''}${rowStatus}`}>
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
              const formattedStatus = isStatus && formatStatus(item[rowItemName]);
              const statusItemClass = isStatus ? ` table-row-item-status ${item[rowItemName]}` : '';

              return (
                <div key={`${rowItemName}${item.id}`}
                   className={`table-row-item${statusItemClass}`}>
                  <p>{isStatus ? formattedStatus : value}</p>
                </div>
              );
            })}
            {additionalActions && additionalActions.map(action => {
              const Component = action.Component;
              return (
                <div key={`${action.id}`} className={`table-row-item ${action.className}`}>
                  <Component onClick={(e) => {
                    e.stopPropagation();
                    action.onClick(item)
                  }} />
                </div>
              )
            })}
            {collapsedRow &&
            <div className='table-row-collapsed'>
              <div className='table-row-collapsed-container'>
                <div className='table-row-collapsed-header'>
                  <p>Service</p>
                  <p>Package Hrs</p>
                  <p>Hrs Delivered</p>
                  <p>Package Visits</p>
                  <p>Actual Visits</p>
                  <p>Comments</p>
                  <p>Status</p>
                  <p>Action</p>
                </div>
                {item.services.map((service, index) => {
                  const currentService = serviceValues.find(serviceValue => serviceValue.id === `${item.id}${service.id}`);
                  return (
                    <div key={`${item.id}${service.id}`} className='table-row-collapsed-main'>
                        <div  className='table-row-collapsed-main-item'>
                          <div className='table-row-collapsed-main-item-el'>{service.serviceName}</div>
                          <div className='table-row-collapsed-main-item-el'>{service.packageHrs}</div>
                          <div className='table-row-collapsed-main-item-el'>{service.hrsDelivered}</div>
                          <div className='table-row-collapsed-main-item-el'>{service.packageVisits}</div>
                          <div className='table-row-collapsed-main-item-el'>{service.actualVisits}</div>
                          <div className='table-row-collapsed-main-item-el'>
                            <Input
                              placeholder='Add comment'
                              onClick={e => e.stopPropagation()}
                              value={currentService?.comments || ''}
                              onChange={value => changeServiceValue(value, 'comments', `${item.id}${service.id}`)} />
                          </div>
                          <div className='table-row-collapsed-main-item-el'>
                            <span className={`table-row-collapsed-main-item__status ${service.status}`}>{formatStatus(service.status)}</span>
                            {chatStatuses.includes(service.status) && <ChatButton onClick={(e) => {
                              e.stopPropagation();
                              openChat(service);
                            }} />}
                          </div>
                          <div className='table-row-collapsed-main-item-el'
                               onClick={(e) => {
                                 e.stopPropagation();
                                 makeAction(item, service, actions[service.status].actionName);
                               }}>
                            {actions[service.status].text}
                          </div>
                        </div>
                    </div>
                  )
              })}
              </div>
            </div>
            }
          </div>
        )
      })}
    </div>
  )
};

export default SupplierReturnDashboardTable;
