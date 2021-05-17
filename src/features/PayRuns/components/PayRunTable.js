import React, {useState} from "react";
import Dropdown from "../../components/Dropdown";
import {formatDateWithSlash} from "../../../service/helpers";
import PayRunSortTable from "./PayRunSortTable";
import {shortMonths} from "../../../constants/strings";
import Checkbox from "../../components/Checkbox";
import {Button} from "../../components/Button";

const PayRunTable = ({
  onClickTableRow,
  checkedRows,
  setCheckedRows,
  rows,
  release,
  additionalActions,
  isIgnoreId = false,
  isStatusDropDown = false,
  classes = '',
  canCollapseRows = false,
  careType,
  sortBy,
  sorts,
}) => {
  const [collapsedRows, setCollapsedRows] = useState([]);

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

  return (
    <div className={`pay-runs__table ${classes}`}>
      <PayRunSortTable additionalActions={additionalActions} checkedRows={checkedRows} sortBy={sortBy} sorts={sorts} />
      {rows.map(item => {
        const collapsedRow = collapsedRows.includes(item.id);
        const rowStatus = item.status ? ` ${item.status}` : '';
        return (
          <div key={item.id} onClick={() => clickRow(item)} className={`pay-runs__table-row${collapsedRow ? ' collapsed' : ''}${rowStatus}`}>
            {checkedRows &&
              <div className='pay-runs__table-row-item pay-runs__table-row-item-checkbox'>
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
              const statusItemClass = isStatus ? ` pay-runs__table-row-item-status ${item[rowItemName]}` : '';
              if(isStatusDropDown && isStatus) {
                return (
                  <Dropdown key={`${rowItemName}${item.id}`}
                    classes={`pay-runs__table-row-item${statusItemClass}`}
                    options={[
                      {text: 'Accepted', value: 'accepted'},
                      {text: 'Held', value: 'held'},
                      {text: 'Rejected', value: 'rejected'},
                      {text: 'In dispute', value: 'in-dispute'}
                    ]}
                    selectedValue={value}
                    onOptionSelect={(value) => console.log(value)}
                    initialText='Status'
                  />
                );
              }

              return (
                <p key={`${rowItemName}${item.id}`}
                   className={`pay-runs__table-row-item${statusItemClass}`}>
                  {isStatus ? formattedStatus : value}
                </p>
              );
            })}
            {additionalActions && additionalActions.map(action => {
              const Component = action.Component;
              return (
                <div key={`${action.id}`} className={`pay-runs__table-row-item ${action.className}`}>
                  <Component onClick={(e) => {
                    e.stopPropagation();
                    action.onClick(item)
                  }} />
                </div>
              )
            })}
            {collapsedRow &&
            <div className='pay-runs__table-row-collapsed'>
              {item.cares.map(care => {
                return (
                  <div key={care.id} className='pay-runs__table-row-collapsed-container'>
                    <div className='pay-runs__table-row-collapsed-header'>
                      <div className='pay-runs__table-row-collapsed-header-left'>
                        <p>{care.userName}</p>
                        <p>{care.supplier}</p>
                      </div>
                      <p>{care.id}</p>
                    </div>
                    <div className='pay-runs__table-row-collapsed-main'>
                      <div className='pay-runs__table-row-collapsed-main-header'>
                        <p>Item</p>
                        <p>Cost</p>
                        <p>Qty</p>
                        <p>Service User</p>
                      </div>
                      {care.items.map(personInfo => {
                        const dateFrom = new Date(personInfo.dateFrom);
                        const dateTo = new Date(personInfo.dateTo);
                        return (
                          <div key={personInfo.id} className='pay-runs__table-row-collapsed-main-item'>
                            <p>
                              {careType} care per week
                              <br/>
                              {dateFrom.getDate()} {shortMonths[dateFrom.getMonth()]}
                              -
                              {dateTo.getDate()} {shortMonths[dateTo.getMonth()]} {dateTo.getFullYear()}
                            </p>
                            <p>{personInfo.cost}</p>
                            <p>{personInfo.qty}</p>
                            <p>{personInfo.serviceUser}</p>
                          </div>
                        )
                      })}
                    </div>
                    {release && <Button className='outline green pay-runs__table-row-release-button' onClick={(e) => {
                      e.stopPropagation();
                      release(item, care);
                    }}>Release</Button>}
                  </div>
                )
              })}
            </div>
            }
          </div>
        )
      })}
    </div>
  )
};

export default PayRunTable;
