import React, {useState} from "react";
import Dropdown from "../../components/Dropdown";
import {formatDateWithSlash} from "../../../service/helpers";
import PayRunSortTable from "./PayRunSortTable";

const PayRunTable = ({ onClickTableRow, rows, isStatusDropDown = false, classes = '', canCollapseRows = false, careType, sortBy, sorts }) => {
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
      <PayRunSortTable sortBy={sortBy} sorts={sorts} />
      {rows.map(item => {
        const collapsedRow = collapsedRows.includes(item.id);
        return (
          <div key={item.id} onClick={() => clickRow(item)} className={`pay-runs__table-row${collapsedRow ? ' collapsed' : ''}`}>
            {Object.getOwnPropertyNames(item).map(rowItemName => {
              const value = rowItemName === 'date' ? formatDateWithSlash(item[rowItemName]) : item[rowItemName];
              const isStatus = rowItemName === 'status';
              const formattedStatus = isStatus && item[rowItemName].split('-').map(text => text.slice(0, 1).toUpperCase() + text.slice(1,text.length)).join(' ');
              const statusItemClass = isStatus ? ` pay-runs__table-row-item-status ${item[rowItemName]}` : '';
              if(isStatusDropDown && isStatus) {
                return (
                  <Dropdown key={`${rowItemName}${item.id}`}
                            className={`pay-runs__table-row-item${statusItemClass}`}
                            options={['Accepted', 'Held']}
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
            {collapsedRow &&
            <div className='pay-runs__table-row-collapsed'>
              <div className='pay-runs__table-row-collapsed-header'>
                <p>{item.name}</p>
                <p>{item.supplier}</p>
                <p>{item.id}</p>
              </div>
              {item.cares.map(care => (
                <div className='pay-runs__table-row-collapsed-main'>
                  <div className='pay-runs__table-row-collapsed-main-header'>
                    <p>Item</p>
                    <p>Cost</p>
                    <p>Qty</p>
                    <p>Service User</p>
                  </div>
                  {care.items.map(personsInfo => (
                    <div key={care.id} className='pay-runs__table-row-collapsed-main-item'>
                      <p>{careType} care per week <br/> {new Date(personsInfo.date).getDate()}</p>
                      <p>{personsInfo.cost}</p>
                      <p>{personsInfo.qty}</p>
                      <p>{personsInfo.serviceUser}</p>
                    </div>
                  ))}
                </div>
              ))
              }
            </div>
            }
          </div>
        )
      })}
    </div>
  )
};

export default PayRunTable;
