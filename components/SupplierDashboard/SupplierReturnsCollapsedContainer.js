import React, { useEffect, useState } from 'react'
import Input from '../Input';
import { formatStatus } from '../../service/helpers';
import ChatButton from './ChatButton';

const SupplierReturnsCollapsedContainer = ({
  supplierReturn,
  actions,
  chatStatuses,
  makeAction,
  openChat,
}) => {
  if(!supplierReturn?.services?.length) return <></>;

  const [serviceValues, setServiceValues] = useState([]);

  useEffect(() => {
    setServiceValues(supplierReturn.services.map(() => ({
      actualVisits: '',
      packageHrs: '',
      hrsDelivered: '',
      comments: '',
    })));
  }, [supplierReturn.services]);

  const changeServiceValue = (value, field, index) => {
    const cloneServiceValues = serviceValues.slice();
    cloneServiceValues.splice(index, 1, { ...serviceValues[index], [field]: value });
    setServiceValues(cloneServiceValues);
  };

  return (
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
      {supplierReturn.services.map((service, index) => {
        return (
          <div key={`${supplierReturn.id}${service.id}`} className="table__row-collapsed-main">
            <div className="table__row-collapsed-main-item">
              <div className="table__row-collapsed-main-item-el">{service.serviceName}</div>
              <div className="table__row-collapsed-main-item-el">{service.packageHrs}</div>
              <div className="table__row-collapsed-main-item-el">
                <Input
                  classes={`${
                    parseInt(serviceValues[index]?.hrsDelivered, 10) > parseInt(serviceValues[index]?.packageHrs, 10)
                      ? 'table__row__wrong-input'
                      : ''
                  }`}
                  value={serviceValues[index]?.hrsDelivered}
                  onChange={(value) => changeServiceValue(value, 'hrsDelivered', index)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div className="table__row-collapsed-main-item-el">{service.packageVisits}</div>
              <div className="table__row-collapsed-main-item-el">
                <Input
                  classes={`${
                    parseInt(serviceValues[index]?.actualVisits, 10) === 0 ? 'table__row__wrong-input' : ''
                  }`}
                  value={serviceValues[index]?.actualVisits}
                  onChange={(value) => changeServiceValue(value, 'actualVisits', index)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div className="table__row-collapsed-main-item-el">
                <Input
                  placeholder="Add comment"
                  onClick={(e) => e.stopPropagation()}
                  value={serviceValues[index]?.comments || ''}
                  onChange={(value) => changeServiceValue(value, 'comments', index)}
                />
              </div>
              <div className="table__row-collapsed-main-item-el">
                          <span className={`table__row-collapsed-main-item__status ${service.status}`}>
                            {formatStatus(service.status)}
                          </span>
                {chatStatuses.includes(service.status) && (
                  <ChatButton
                    onClick={(e) => {
                      e.stopPropagation();
                      openChat(service);
                    }}
                  />
                )}
              </div>
              <div
                className="table__row-collapsed-main-item-el"
                onClick={(e) => {
                  e.stopPropagation();
                  makeAction(supplierReturn, service, actions[service.status].actionName);
                }}
              >
                {actions[service.status].text}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  )
};

export default SupplierReturnsCollapsedContainer;
