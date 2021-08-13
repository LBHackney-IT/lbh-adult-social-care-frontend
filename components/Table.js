import React, { useState } from 'react';
import SortTable from './SortTable';
import Checkbox from './Checkbox';
import Loading from './Loading'

const Table = ({
  changeAllChecked,
  onClickTableRow,
  fields = { id: 'id', tab: 'default' },
  rows = [],
  rowsRules = {},
  className = '',
  sortBy,
  sorts,
  checkedRows,
  canCollapseRows,
  getCollapsedContainer,
  loading,
}) => {
  const [defaultFields] = useState(fields);
  const { tab } = fields;

  const clickRow = (item) => {
    if (onClickTableRow) {
      onClickTableRow(item);
    }
    if(canCollapseRows) {
      collapseRows(item[fields.id])
    }
  };

  const [collapsedRows, setCollapsedRows] = useState([]);

  const collapseRows = (id) => {
    if (collapsedRows.includes(id)) {
      setCollapsedRows(collapsedRows.filter((rowId) => String(rowId) !== String(id)));
    } else {
      setCollapsedRows([...collapsedRows, id]);
    }
  };

  return (
    <div className={`table ${className}`}>
      <SortTable fields={fields} checkedRows={checkedRows} changeAllChecked={changeAllChecked} rows={rows} sortBy={sortBy} sorts={sorts} />
      {loading && <Loading className='table-loading' />}
      {!rows.length ? (
        <p className="ml-2">No Table Data</p>
      ) : (
        <div className='table__row-container'>
          {
            rows.map((item) => {
              const id = item[defaultFields.id];
              const collapsedRow = collapsedRows.includes(item[fields.id]);
              const collapsedClass = collapsedRow ? ' collapsed' : '';
              const rowClass = rowsRules.getClassName && rowsRules.getClassName(item);
              let index = 0;

              return (
                <div key={id} className={`table__row${collapsedClass} ${rowClass || ''}`}>
                  <div onClick={() => clickRow(item)} className="table__row-column-items" role="presentation">
                    {Object.values(defaultFields).map((rowItemName) => {
                      const columnClass = ` table__row-column-${index+1}`;
                      const currentRowRule = rowsRules[rowItemName] || '';
                      const value = item[rowItemName];

                      if (currentRowRule?.hide) return <React.Fragment key={`${tab}${rowItemName}${id}`} />;
                      index += 1;

                      const currentValue = (currentRowRule?.getValue && currentRowRule.getValue(value, item)) || value;
                      const calculatedClassName = currentRowRule?.getClassName
                        ? currentRowRule.getClassName(value, item).toLowerCase()
                        : '';

                      const getComponent = currentRowRule?.getComponent;
                      if (getComponent) {
                        return getComponent(item, currentRowRule, columnClass);
                      }

                      if (currentRowRule?.type === 'checkbox') {
                        return (
                          <div key={`${rowItemName}${id}`} className={`table__row-item-checkbox table__row-item${columnClass}`}>
                            <Checkbox
                              className={calculatedClassName}
                              onChange={(checkedValue, event) => {
                                event.stopPropagation();
                                currentRowRule.onChange(checkedValue, item)
                              }}
                              checked={currentValue}
                            />
                          </div>
                        );
                      }

                      return (
                        <div
                          role="presentation"
                          onClick={(e) => {
                            if (!currentRowRule.onClick) return;
                            e.stopPropagation();
                            currentRowRule.onClick(item, value);
                          }}
                          key={`${tab}${rowItemName}${value}${id}`}
                          className={`table__row-item${columnClass} ${calculatedClassName}`}
                        >
                          <p>{currentValue || '—'}</p>
                        </div>
                      );
                    })}
                  </div>
                  {canCollapseRows && collapsedRow && getCollapsedContainer && (
                    <div className="table__row-collapsed">{getCollapsedContainer(item)}</div>
                  )}
                </div>
              );
            })
          }
        </div>
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
    getClassName: (item) => return 'new-row-class',
    clientName: {
      getClassName: () => 'link-button',
      onClick: (item, prop) => console.log(item, prop),
    },
    payRunId: {
      hide: true,
    },
    checkboxField: {
      type: 'checkbox',
      getValue: (value, item) => checked,
      getClassName: (value, item) => `custom-checkbox ${item.statusName}`,
      onChange: (value, item) => setChecked(item.id),
    },
    dob: {
      getValue: (value, item) => `${value}%`,
      getComponent: (cellItem, cellRule, tableClass) => <SomeComponent className={cellRule.className} someValue={cellItem.someValue} />,
      getClassName: (value, item) => `${value} table__row-item-status`,
    },
 */
