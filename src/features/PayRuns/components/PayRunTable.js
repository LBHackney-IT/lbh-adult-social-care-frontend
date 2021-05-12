import React, {useState} from "react";
import Dropdown from "../../components/Dropdown";
import {formatDateWithSlash} from "../../../service/helpers";
import PayRunSortTable from "./PayRunSortTable";

const PayRunTable = ({ rows, isStatusDropDown = false, canCollapseRows = false, careType, sortBy, sorts }) => {
  const [collapsedRows, setCollapsedRows] = useState([]);

  const collapseRows = id => {
    if(collapsedRows.includes(id)) {
      setCollapsedRows(collapsedRows.filter(rowId => rowId != id));
    } else {
      setCollapsedRows([...collapsedRows, id]);
    }
  }
  return (
    <div className='pay-runs__table'>
      <PayRunSortTable sortBy={sortBy} sorts={sorts} />
      {rows.map(item => (
          <div key={item.id} onClick={() => canCollapseRows && collapseRows(item.id)} className='pay-runs__table-row'>
            {Object.getOwnPropertyNames(item).map(rowItemName => {
              const value = rowItemName === 'date' ? formatDateWithSlash(item[rowItemName]) : item[rowItemName];
              const statusItemClass = rowItemName === 'status' ? ' pay-runs__table-row-item-status' : '';
              if(isStatusDropDown && rowItemName === 'status') {
                return <Dropdown key={`${rowItemName}${item.id}`} options={['Accepted', 'Held']} initialText='Status' />;
              }

              return <p key={`${rowItemName}${item.id}`} className={`pay-runs__table-row-item${statusItemClass}`}>{value}</p>;
            })}
            {collapsedRows.includes(item.id) &&
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
      ))}
    </div>
  )
};

export default PayRunTable;
