import React, { useState } from 'react'
import SortTable from './SortTable';
import Checkbox from './Checkbox';

const Table = ({
  changeAllChecked,
  onClickTableRow,
  fields = {id: 'id'},
  rows = [],
  rowsRules = {},
  className = '',
  sortBy,
  sorts,
  canCollapseRows,
  collapsedContainer,
}) => {
  const [defaultFields] = useState(fields);

  const clickRow = (item) => {
    if (onClickTableRow) {
      onClickTableRow(item);
    }
  };

  return (
    <div className={`table ${className}`}>
      <SortTable
        changeAllChecked={changeAllChecked}
        rows={rows}
        sortBy={sortBy}
        sorts={sorts}
      />
      {!rows.length ? (
        <p className='ml-2'>No Table Data</p>
      ) : (
        rows.map((item) => {
          const id = item[defaultFields.id];
          return (
            <div key={id} className="table__row">
              <div onClick={() => clickRow(item)} className="table__row-column-items">
                {Object.values(defaultFields).map((rowItemName) => {
                  const currentRowRule = rowsRules[rowItemName] || '';
                  const value = item[rowItemName]

                  if (currentRowRule?.hide) return <React.Fragment key={`${rowItemName}${id}`} />;

                  const currentValue = (currentRowRule?.getValue && currentRowRule.getValue(value)) || value;
                  const calculatedClassName = currentRowRule?.getClassName
                    ? currentRowRule.getClassName(value).toLowerCase()
                    : '';

                  const getComponent = currentRowRule?.getComponent;
                  if (getComponent) {
                    return getComponent(item, currentRowRule)
                  }

                  if (currentRowRule?.type === 'checkbox')
                    return (
                      <Checkbox
                        key={`${rowItemName}${id}`}
                        onChange={currentRowRule.onChange}
                        checked={currentValue}
                      />
                    );

                  return (
                    <div
                      onClick={(e) => {
                        if (!currentRowRule.onClick) return;
                        e.stopPropagation();
                        currentRowRule.onClick(item, value);
                      }}
                      key={`${value}${id}`}
                      className={`table__row-item ${calculatedClassName}`}
                    >
                      <p>{currentValue || '—'}</p>
                    </div>
                  );
                })}
              </div>
              {canCollapseRows && collapsedContainer && (
                <div className="table__row-collapsed">
                  {collapsedContainer}
                </div>
              )}
            </div>
          )
        })
      )}
    </div>
  );
};

export default Table;
/*
  EXAMPLES

  if we have object like this
  {payRunId: 1, clientName: 'Test', dob: '01.01.01'}

  const fields = {
    id: 'payRunId',
    clientName: 'clientName',
    dob: 'dob',
  }


  const rowsRules = {
    typeOfCare: {
      getClassName: () => 'link-button',
      onClick: (item, prop) => console.log(item, prop),
    },
    id: {
      hide: true,
    },
    stage: {
      getValue: (value) => `${value}%`,
      getComponent: (cellItem, cellRule) => <SomeComponent className={cellRule.className} someValue={cellItem.someValue} />,
      getClassName: (value) => `${value} table__row-item-status`,
    },
    owner: {
      value: customValue
      getClassName: (value) => `${value} table__row-item-status border-radius-0`,
    },
 */
